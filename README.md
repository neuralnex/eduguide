# EduGuide: AI-Powered Educational Curriculum Planner

![EduGuide](./assets/NosanaBuildersChallenge03.jpg)

## 🎓 About EduGuide

EduGuide is an intelligent AI-powered educational agent that creates comprehensive learning curricula for any topic. Whether you want to learn programming, languages, sciences, arts, or any other subject, EduGuide acts as your personal learning coach, designing detailed step-by-step learning paths with curated resources and YouTube videos.

## ✨ Key Features

### 🎯 **Intelligent Curriculum Planning**
- Creates detailed learning paths with 4-8 logical phases
- Each phase builds upon the previous one
- Clear learning objectives and prerequisites
- Realistic time estimates for each phase

### 📺 **YouTube Video Integration**
- Searches for relevant educational videos using YouTube API
- Curates videos by difficulty level and topic
- Provides direct links and descriptions
- Organized by learning phase

### 📚 **Free Resource Discovery**
- Finds resources from Khan Academy, Coursera, edX, MIT OpenCourseWare
- Includes FreeCodeCamp, MDN, W3Schools, and other platforms
- Difficulty-based recommendations (beginner, intermediate, advanced)
- Mix of video content, written materials, and interactive resources

### 🎨 **Modern Interface**
- Full-page ChatGPT-style chat interface
- Dark theme with educational gray colors
- Responsive design for all devices
- Clean, professional aesthetic
- Real-time progress tracking

## 🛠️ Technical Stack

- **Framework**: Next.js 15 with React 19
- **AI Model**: Google Gemini 2.5 Flash
- **Agent Framework**: Mastra for AI agent orchestration
- **UI Components**: CopilotKit for chat interface
- **Styling**: Tailwind CSS
- **Deployment**: Docker containerization
- **APIs**: YouTube Data API v3, Google Generative AI API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Google Generative AI API key
- YouTube Data API v3 key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/eduguide
   cd eduguide
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
```bash
cp .env.example .env
   ```
   
   Add your API keys to `.env`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
   YOUTUBE_API_KEY=your-youtube-api-key-here
   LOG_LEVEL=info
   ```

4. **Start the development servers**
   ```bash
pnpm run dev:ui      # Start UI server (port 3000)
pnpm run dev:agent   # Start Mastra agent server (port 4111)
```

5. **Open the application**
   - Web Interface: http://localhost:3000
   - Agent Playground: http://localhost:4111

## 🔑 API Keys Setup

### Google Generative AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to your `.env` file

### YouTube Data API v3 Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add to your `.env` file

## 💡 Usage Examples

**Example Prompts:**
- "Create a comprehensive Python programming curriculum"
- "Design a machine learning learning path from beginner to advanced"
- "Build a web development roadmap with projects"
- "Plan a data science learning journey"
- "Create a blockchain and cryptocurrency learning guide"
- "Help me learn Spanish from scratch"
- "Design a photography learning path"

**What EduGuide Provides:**
1. **Structured Learning Path**: Step-by-step progression from basics to advanced
2. **YouTube Videos**: Curated educational videos with titles, descriptions, and links
3. **Free Resources**: Links to courses and tutorials from top educational platforms
4. **Learning Objectives**: Clear goals for each learning phase
5. **Time Estimates**: Realistic completion timelines
6. **Prerequisites**: What you need to know before starting
7. **Practice Exercises**: Hands-on activities and projects
8. **Assessment Milestones**: Ways to measure progress

## 🐳 Docker Deployment

### Build and Run Locally
```bash
# Build the Docker image
docker build -t eduguide:latest .

# Run the container
docker run -p 3000:3000 \
  -e GOOGLE_GENERATIVE_AI_API_KEY=your-api-key \
  -e YOUTUBE_API_KEY=your-youtube-key \
  eduguide:latest
```

### Deploy to Production
```bash
# Tag for your registry
docker tag eduguide:latest yourusername/eduguide:latest

# Push to registry
docker push yourusername/eduguide:latest
```

## 🏗️ Project Structure

```
eduguide/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page component
│   ├── mastra/             # Mastra agent configuration
│   │   ├── agents/         # Agent definitions
│   │   ├── tools/          # Tool implementations
│   │   └── index.ts        # Mastra configuration
│   └── utils/              # Utility functions
├── assets/                 # Images and media
├── nos_job_def/           # Nosana deployment configuration
├── Dockerfile             # Container configuration
└── package.json           # Dependencies and scripts
```

## 🤖 Agent Capabilities

EduGuide's AI agent can handle any learning request:

- **Programming Languages**: Python, JavaScript, Java, C++, Go, Rust, etc.
- **Web Development**: Frontend, backend, full-stack development
- **Data Science**: Machine learning, AI, statistics, visualization
- **Languages**: Spanish, French, Mandarin, Japanese, etc.
- **Sciences**: Physics, chemistry, biology, mathematics
- **Arts**: Photography, music, design, creative writing
- **Business**: Entrepreneurship, marketing, finance
- **Technical Skills**: DevOps, cloud computing, cybersecurity
- **Soft Skills**: Communication, leadership, project management

## 🔧 Development

### Available Scripts
- `pnpm run dev:ui` - Start the Next.js development server
- `pnpm run dev:agent` - Start the Mastra agent server
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start the production server

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Mastra](https://mastra.ai) framework
- Powered by [Google Gemini](https://ai.google.dev) AI
- UI components from [CopilotKit](https://copilotkit.ai)
- Deployed on [Nosana](https://nosana.io) network

---

**EduGuide** - Your AI-powered learning companion for any topic! 🎓✨