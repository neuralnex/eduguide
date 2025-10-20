import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { google } from 'googleapis';

export type YouTubeVideoResult = z.infer<typeof YouTubeVideoResultSchema>;

const YouTubeVideoResultSchema = z.object({
  videos: z.array(z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
    channelTitle: z.string(),
    viewCount: z.string(),
  })),
});

export const youtubeTool = createTool({
  id: 'search-youtube-videos',
  description: 'Search for educational YouTube videos on a specific topic',
  inputSchema: z.object({
    topic: z.string().describe('The educational topic to search for'),
    maxResults: z.number().optional().default(5).describe('Maximum number of videos to return'),
  }),
  outputSchema: YouTubeVideoResultSchema,
  execute: async ({ context }) => {
    return await searchYouTubeVideos(context.topic, context.maxResults);
  },
});

const searchYouTubeVideos = async (topic: string, maxResults: number = 5) => {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    const response = await youtube.search.list({
      part: ['snippet'],
      q: `${topic} tutorial course learn education`,
      type: ['video'],
      maxResults,
      order: 'relevance',
      videoDuration: 'medium',
      videoDefinition: 'high',
    });

    const videos = response.data.items?.map((item) => ({
      title: item.snippet?.title || '',
      description: item.snippet?.description || '',
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      thumbnail: item.snippet?.thumbnails?.medium?.url || '',
      duration: '',
      channelTitle: item.snippet?.channelTitle || '',
      viewCount: '',
    })) || [];

    return { videos };
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error(`Failed to search YouTube videos: ${error}`);
  }
};

export type EducationalResourceResult = z.infer<typeof EducationalResourceResultSchema>;

const EducationalResourceResultSchema = z.object({
  resources: z.array(z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    type: z.enum(['course', 'tutorial', 'documentation', 'book', 'article', 'practice']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    cost: z.enum(['free', 'paid', 'freemium']),
    platform: z.string(),
  })),
});

export const educationalResourcesTool = createTool({
  id: 'find-educational-resources',
  description: 'Find free educational resources for learning a specific topic',
  inputSchema: z.object({
    topic: z.string().describe('The educational topic to find resources for'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe('Preferred difficulty level'),
  }),
  outputSchema: EducationalResourceResultSchema,
  execute: async ({ context }) => {
    return await findEducationalResources(context.topic, context.difficulty);
  },
});

const findEducationalResources = async (topic: string, difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
  const freePlatforms = [
    {
      name: 'Khan Academy',
      url: 'https://www.khanacademy.org',
      searchUrl: `https://www.khanacademy.org/search?page_search_query=${encodeURIComponent(topic)}`,
    },
    {
      name: 'Coursera (Free Courses)',
      url: 'https://www.coursera.org',
      searchUrl: `https://www.coursera.org/search?query=${encodeURIComponent(topic)}&productDifficultyLevel=beginner`,
    },
    {
      name: 'edX',
      url: 'https://www.edx.org',
      searchUrl: `https://www.edx.org/search?q=${encodeURIComponent(topic)}`,
    },
    {
      name: 'MIT OpenCourseWare',
      url: 'https://ocw.mit.edu',
      searchUrl: `https://ocw.mit.edu/search/?d=OCW&s=${encodeURIComponent(topic)}`,
    },
    {
      name: 'FreeCodeCamp',
      url: 'https://www.freecodecamp.org',
      searchUrl: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(topic)}`,
    },
    {
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      searchUrl: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(topic)}`,
    },
    {
      name: 'W3Schools',
      url: 'https://www.w3schools.com',
      searchUrl: `https://www.w3schools.com/search/search.asp?search=${encodeURIComponent(topic)}`,
    },
  ];

  const resources = freePlatforms.map((platform) => ({
    title: `Learn ${topic} on ${platform.name}`,
    description: `Free educational content about ${topic} available on ${platform.name}`,
    url: platform.searchUrl,
    type: 'course' as const,
    difficulty: (difficulty || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
    cost: 'free' as const,
    platform: platform.name,
  }));

  return { resources };
};