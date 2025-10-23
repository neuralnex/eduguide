"use client";

import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { useState } from "react";
import { EducationalAgentState as EducationalAgentStateSchema } from "@/mastra/agents";
import { z } from "zod";

type EducationalAgentState = z.infer<typeof EducationalAgentStateSchema>;

export default function EducationalGuidePage() {
  const [themeColor, setThemeColor] = useState("#1f2937");
  const [showChat, setShowChat] = useState(false);

  const { state, setState } = useCoAgent<EducationalAgentState>({
    name: "educationalAgent",
    initialState: {
      learningTopics: [],
      completedResources: [],
      currentLearningPath: undefined,
      progress: 0,
    },
  });

  useCopilotAction({
    name: "setThemeColor",
    parameters: [{
      name: "themeColor",
      description: "The theme color to set for the educational interface. Choose educational colors like gray, blue, or green.",
      required: true,
    }],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  useCopilotAction({
    name: "search-youtube-videos",
    description: "Search for educational YouTube videos on a specific topic",
    available: "frontend",
    parameters: [
      { name: "topic", type: "string", required: true },
      { name: "maxResults", type: "number", required: false },
    ],
    render: ({ args, result, status }) => {
      return <YouTubeVideoCard
        topic={args.topic || ""}
        themeColor={themeColor}
        result={result}
        status={status}
      />
    },
  });

  useCopilotAction({
    name: "find-educational-resources",
    description: "Find free educational resources for learning a specific topic",
    available: "frontend",
    parameters: [
      { name: "topic", type: "string", required: true },
      { name: "difficulty", type: "string", required: false },
    ],
    render: ({ args, result, status }) => {
      return <EducationalResourcesCard
        topic={args.topic || ""}
        themeColor={themeColor}
        result={result}
        status={status}
      />
    },
  });

  useCopilotAction({
    name: "updateLearningProgress",
    available: "frontend",
    parameters: [
      { name: "topic", type: "string", required: true },
      { name: "progress", type: "number", required: true },
    ],
    render: ({ args }) => {
      return <div className="bg-gray-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">📚 Learning Progress Updated</p>
        <div className="mt-2">
          <p className="text-sm text-gray-300">Topic: {args.topic}</p>
          <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
            <div
              className="bg-gray-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${args.progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-300">{args.progress}% Complete</p>
        </div>
      </div>
    },
  });

  // Show full-screen chat interface
  if (showChat) {
  return (
      <div className="h-screen w-screen bg-gray-900 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">EduGuide Assistant</h1>
                <p className="text-gray-400 text-sm">AI-Powered Learning Companion</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Learning Progress Section */}
        {(state.learningTopics && state.learningTopics.length > 0) || 
         state.currentLearningPath || 
         (state.completedResources && state.completedResources.length > 0) ? (
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex-shrink-0 max-h-48 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              {state.learningTopics && state.learningTopics.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
                    <span className="mr-2">📚</span>
                    Active Learning Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.learningTopics.map((topic, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg px-3 py-1 text-sm">
                        <span className="text-gray-300">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {state.currentLearningPath && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
                    <span className="mr-2">🎯</span>
                    Current Learning Path
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">{state.currentLearningPath}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${state.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{state.progress}% Complete</p>
                </div>
              )}

              {state.completedResources && state.completedResources.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
                    <span className="mr-2">✅</span>
                    Completed Resources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {state.completedResources.map((resource, index) => (
                      <div key={index} className="bg-green-900/20 border border-green-700 rounded-lg px-3 py-1 text-sm">
                        <span className="text-green-400 mr-1">✓</span>
                        <span className="text-gray-300">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Full Screen Chat */}
        <div className="flex-1">
          <CopilotChat
            labels={{
              title: "EduGuide Assistant",
              initial: "Hi! 👋 I'm EduGuide, your AI learning companion. I can create comprehensive curricula for any topic - from programming to languages, sciences to arts. What would you like to learn today?",
            }}
            instructions="You are EduGuide, an expert educational curriculum planner and learning coach. You can help with ANY topic or subject. When users ask for help learning anything, you should:

1. **Understand Their Learning Goals:**
   - What topic do they want to learn?
   - What's their current level (beginner, intermediate, advanced)?
   - What are their specific goals or interests?
   - How much time can they commit?

2. **Create a Comprehensive Curriculum:**
   - Break down the topic into logical learning phases (4-8 steps)
   - Each phase should build upon the previous one
   - Include clear learning objectives for each phase
   - Specify prerequisites and dependencies
   - Estimate realistic time requirements

3. **For Each Learning Phase:**
   - Search for relevant YouTube videos using the YouTube tool
   - Find specific educational resources using the educational resources tool
   - Organize resources by difficulty and learning style
   - Provide clear descriptions of what to learn and why

4. **Create a Complete Learning Experience:**
   - Learning objectives for each phase
   - Prerequisites and dependencies
   - Step-by-step learning path
   - Specific resources and videos for each phase
   - Practice exercises and hands-on projects
   - Assessment milestones and progress tracking
   - Next steps and advanced topics

You can handle ANY learning request - from programming languages to foreign languages, from sciences to arts, from technical skills to soft skills. Be adaptable and create personalized learning experiences for whatever the user wants to learn. Always prioritize free resources and provide encouraging, supportive guidance."
            className="h-full bg-gray-900"
          />
        </div>
      </div>
    );
  }

  // Show landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EduGuide</h1>
              <p className="text-gray-300 text-sm">AI-Powered Learning Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-white text-3xl font-bold">🎓</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Welcome to EduGuide
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Your intelligent learning companion that creates personalized educational curricula for any topic. 
              From programming to languages, sciences to arts - I'll design the perfect learning path for you.
            </p>
            
            {/* Get Started Button */}
            <div className="mb-12">
              <button
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started with EduGuide
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Comprehensive Curricula</h3>
              <p className="text-gray-300 leading-relaxed">
                Step-by-step learning paths designed by AI experts. Each curriculum includes clear objectives, prerequisites, and realistic timelines.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl">📺</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">YouTube Integration</h3>
              <p className="text-gray-300 leading-relaxed">
                Curated educational videos from top creators. Each learning phase includes relevant video content to enhance your understanding.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Free Resources</h3>
              <p className="text-gray-300 leading-relaxed">
                Access to premium educational platforms including Khan Academy, Coursera, edX, and MIT OpenCourseWare - all for free.
              </p>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Popular Learning Topics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { topic: "Python Programming", icon: "🐍", color: "from-yellow-500 to-orange-500" },
                { topic: "Machine Learning", icon: "🤖", color: "from-purple-500 to-pink-500" },
                { topic: "Web Development", icon: "🌐", color: "from-blue-500 to-cyan-500" },
                { topic: "Data Science", icon: "📊", color: "from-green-500 to-emerald-500" },
                { topic: "Spanish Language", icon: "🇪🇸", color: "from-red-500 to-rose-500" },
                { topic: "Photography", icon: "📸", color: "from-indigo-500 to-purple-500" },
                { topic: "Blockchain", icon: "⛓️", color: "from-gray-500 to-slate-500" },
                { topic: "Music Theory", icon: "🎵", color: "from-pink-500 to-purple-500" }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-white text-xl">{item.icon}</span>
                  </div>
                  <h4 className="text-white font-semibold text-sm">{item.topic}</h4>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function YouTubeVideoCard({ 
  topic, 
  themeColor,
  result,
  status
}: {
  topic: string; 
  themeColor: string; 
  result: any; 
  status: string; 
}) {
  if (status === 'in_progress') {
    return (
      <div className="bg-gray-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">🔍 Searching YouTube for: {topic}</p>
        <div className="mt-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-gray-300 text-sm">Finding videos...</span>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-red-400 font-medium">❌ Error searching YouTube</p>
        <p className="text-red-300 text-sm mt-1">Could not find videos for: {topic}</p>
      </div>
    );
  }

  if (!result?.videos || result.videos.length === 0) {
    return (
      <div className="bg-gray-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">📺 No YouTube videos found</p>
        <p className="text-gray-300 text-sm mt-1">Topic: {topic}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4 max-w-2xl w-full">
      <p className="text-white font-medium mb-3">📺 YouTube Videos for: {topic}</p>
      <div className="space-y-3">
        {result.videos.map((video: any, index: number) => (
          <div key={index} className="bg-gray-600 rounded-lg p-3">
            <div className="flex space-x-3">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-24 h-18 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm line-clamp-2">{video.title}</h4>
                <p className="text-gray-300 text-xs mt-1 line-clamp-2">{video.description}</p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                  <span>👤 {video.channelTitle}</span>
                  <span>⏱️ {video.duration}</span>
                  <span>👀 {video.viewCount}</span>
                </div>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                >
                  Watch Video
                </a>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationalResourcesCard({ 
  topic, 
  themeColor, 
  result, 
  status 
}: { 
  topic: string; 
  themeColor: string; 
  result: any; 
  status: string; 
}) {
  if (status === 'in_progress') {
    return (
      <div className="bg-gray-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">📚 Finding resources for: {topic}</p>
        <div className="mt-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-gray-300 text-sm">Searching...</span>
        </div>
      </div>
    );
  }

  if (status === 'error') {
  return (
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-red-400 font-medium">❌ Error finding resources</p>
        <p className="text-red-300 text-sm mt-1">Could not find resources for: {topic}</p>
      </div>
    );
  }

  if (!result?.resources || result.resources.length === 0) {
  return (
      <div className="bg-gray-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">📚 No resources found</p>
        <p className="text-gray-300 text-sm mt-1">Topic: {topic}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4 max-w-2xl w-full">
      <p className="text-white font-medium mb-3">📚 Educational Resources for: {topic}</p>
      <div className="space-y-3">
        {result.resources.map((resource: any, index: number) => (
          <div key={index} className="bg-gray-600 rounded-lg p-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm">{resource.title}</h4>
                <p className="text-gray-300 text-xs mt-1">{resource.description}</p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                  <span className={`px-2 py-1 rounded text-xs ${
                    resource.difficulty === 'beginner' ? 'bg-green-900/30 text-green-400' :
                    resource.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {resource.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    resource.cost === 'free' ? 'bg-green-900/30 text-green-400' :
                    resource.cost === 'paid' ? 'bg-red-900/30 text-red-400' :
                    'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {resource.cost}
                  </span>
                  <span>📖 {resource.type}</span>
                  <span>🏢 {resource.platform}</span>
                </div>
              </div>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors flex-shrink-0"
              >
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}