# EduGuide: AI-Powered Educational Curriculum Planner
**Built with Mastra Framework & Gemini AI**

![EduGuide](./assets/NosanaBuildersChallenge03.jpg)

## 🎓 Welcome to EduGuide

EduGuide is an intelligent AI-powered educational agent that creates comprehensive learning curricula for any topic. Whether you want to learn programming, languages, sciences, arts, or any other subject, EduGuide acts as your personal learning coach, designing detailed step-by-step learning paths with curated resources and YouTube videos.

## 🎯 What is EduGuide?

**Your Mission:** Create personalized learning experiences for any topic with AI-powered curriculum planning.

**Core Features:**
- **Comprehensive Curriculum Creation**: Break down any topic into structured learning phases
- **YouTube Video Integration**: Find relevant educational videos for each learning step
- **Free Resource Discovery**: Curate resources from top educational platforms
- **Personalized Learning Paths**: Adapt to different skill levels and learning styles
- **Progress Tracking**: Visual progress indicators and milestone tracking
- **Dynamic Content**: Handle any subject from programming to languages to sciences

## 🚀 Key Features

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

## 🛠️ Technical Implementation

### **Architecture**
- **Mastra Framework**: Agent orchestration and tool management
- **Gemini 2.5 Flash**: AI model for curriculum planning and content generation
- **Tool Calling**: YouTube API and educational resource discovery
- **MCP (Model Context Protocol)**: Enhanced agent capabilities
- **CopilotKit**: Modern React chat interface
- **Next.js**: Full-stack web application framework

### **Agent Capabilities**
- **Dynamic Topic Handling**: Can create curricula for ANY subject
- **Multi-Phase Learning**: Breaks down complex topics into manageable steps
- **Resource Curation**: Finds and organizes educational materials
- **Progress Tracking**: Monitors learning milestones and completion
- **Personalized Guidance**: Adapts to user's skill level and goals

## 🏗️ Getting Started

### Prerequisites & Registration

To participate in the Nosana Builders Challenge and get credits/NOS tokens:

1. Register at [SuperTeam](https://earn.superteam.fun/listing/nosana-builders-challenge-agents-102)
2. Register at the [Luma Page](https://luma.com/zkob1iae)
3. Star these repos:
   - [this repo](https://github.com/nosana-ci/agent-challenge)
   - [Nosana CLI](https://github.com/nosana-ci/nosana-cli)
   - [Nosana SDK](https://github.com/nosana-ci/nosana-sdk)
4. Complete [this registration form](https://e86f0b9c.sibforms.com/serve/MUIFALaEjtsXB60SDmm1_DHdt9TOSRCFHOZUSvwK0ANbZDeJH-sBZry2_0YTNi1OjPt_ZNiwr4gGC1DPTji2zdKGJos1QEyVGBzTq_oLalKkeHx3tq2tQtzghyIhYoF4_sFmej1YL1WtnFQyH0y1epowKmDFpDz_EdGKH2cYKTleuTu97viowkIIMqoDgMqTD0uBaZNGwjjsM07T)

### Setup Your Development Environment

#### **Step 1: Fork, Clone and Quickstart**

```bash
# Fork this repo on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/agent-challenge

cd agent-challenge

cp .env.example .env

pnpm i

pnpm run dev:ui      # Start UI server (port 3000)
pnpm run dev:agent   # Start Mastra agent server (port 4111)
```

Open <http://localhost:3000> to see EduGuide in action.
Open <http://localhost:4111> to open the Mastra Agent Playground.

#### **Step 2: Configure API Keys**

EduGuide requires API keys for full functionality:

1. **Google Generative AI API Key** (Required):
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add to your `.env`:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
   ```

2. **YouTube API Key** (Required for video search):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Add to your `.env`:
   ```env
   YOUTUBE_API_KEY=your-youtube-api-key-here
   ```

3. **Complete `.env` setup**:
   ```env
   # EduGuide API Configuration
   GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-api-key-here
   YOUTUBE_API_KEY=your-youtube-api-key-here
   LOG_LEVEL=info
   ```

#### **Step 3: Using EduGuide**

Once your servers are running, interact with EduGuide through the web interface:

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

## 🎨 Interface Features

### **Full-Page Design**
- **Clean, spacious layout** - No more cramped interfaces
- **Dark theme** with educational gray colors
- **Responsive design** that works on all screen sizes
- **Professional aesthetic** similar to ChatGPT but education-focused

### **Smart Progress Tracking**
- **Learning Topics**: Visual tags showing current subjects
- **Progress Bars**: Real-time completion tracking
- **Completed Resources**: Mark finished materials
- **Milestone Tracking**: Visual progress indicators

### **Dynamic Content**
- **No hardcoded suggestions** - Fully dynamic based on user queries
- **Gemini 2.5 Flash** handles all queries intelligently
- **Tool integration** - YouTube videos and resources display as interactive cards
- **Real-time updates** - Progress and content update dynamically

## 🏗️ Implementation Timeline

**Important Dates:**
- Start Challenge: 10 October
- Submission Deadline: 24 October
- Winners Announced: 31 October

### Phase 1: Development
1. **Setup**: Fork repo, install dependencies, configure APIs
2. **Build**: Implement curriculum planning and resource discovery
3. **Test**: Validate functionality at http://localhost:3000

### Phase 2: Containerization
1. **Clean up**: Remove unused agents from `src/mastra/index.ts`
2. **Build**: Create Docker container using the provided `Dockerfile`
3. **Test locally**: Verify container works correctly

```bash
# Build your container
docker build -t yourusername/eduguide:latest .

# Test locally first
docker run -p 3000:3000 yourusername/eduguide:latest 

# Push to Docker Hub
docker login
docker push yourusername/eduguide:latest
```

### Phase 3: Deployment to Nosana
1. **Deploy your complete stack**: The provided `Dockerfile` will deploy:
   - Your Mastra agent
   - Your frontend interface
   - Gemini AI integration (all in one container!)
2. **Verify**: Test your deployed agent on Nosana network
3. **Capture proof**: Screenshot or get deployment URL for submission

### Phase 4: Video Demo
Record a 1-3 minute video demonstrating:
- EduGuide **running on Nosana** (show the deployed version!)
- Key features and functionality
- The frontend interface in action
- Real-world curriculum creation demonstration
- Upload to YouTube, Loom, or similar platform

### Phase 5: Documentation
Update this README with:
- Agent description and purpose
- What tools/APIs your agent uses
- Setup instructions
- Environment variables required
- Example usage and screenshots

## ✅ Minimum Requirements

Your submission **must** include:

- [ ] **Agent with Tool Calling** - YouTube API and educational resource discovery
- [ ] **Frontend Interface** - Working UI to interact with your agent
- [ ] **Deployed on Nosana** - Complete stack running on Nosana network
- [ ] **Docker Container** - Published to Docker Hub
- [ ] **Video Demo** - 1-3 minute demonstration
- [ ] **Updated README** - Clear documentation in your forked repo
- [ ] **Social Media Post** - Share on X/BlueSky/LinkedIn with #NosanaAgentChallenge

## Submission Process

1. **Complete all requirements** listed above
2. **Commit all of your changes to the `main` branch of your forked repository**
   - All your code changes
   - Updated README
   - Link to your Docker container
   - Link to your video demo
   - Nosana deployment proof
3. **Social Media Post** (Required): Share your submission on X (Twitter), BlueSky, or LinkedIn
   - Tag @nosana_ai
   - Include a brief description of your agent
   - Add hashtag #NosanaAgentChallenge
4. **Finalize your submission on the [SuperTeam page](https://earn.superteam.fun/listing/nosana-builders-challenge-agents-102)**
   - Add your forked GitHub repository link
   - Add a link to your social media post
   - Submissions that do not meet all requirements will not be considered

## 🚀 Deploying to Nosana

### Using Nosana Dashboard
1. Open [Nosana Dashboard](https://dashboard.nosana.com/deploy)
2. Click `Expand` to open the job definition editor
3. Edit `nos_job_def/nosana_mastra.json` with your Docker image:
   ```json
   {
     "image": "yourusername/eduguide:latest"
   }
   ```
4. Copy and paste the edited job definition
5. Select a GPU
6. Click `Deploy`

### Using Nosana CLI (Alternative)
```bash
npm install -g @nosana/cli
nosana job post --file ./nos_job_def/nosana_mastra.json --market nvidia-3090 --timeout 30
```

## 🏆 Judging Criteria

Submissions evaluated on 4 key areas (25% each):

### 1. Innovation 🎨
- Originality of agent concept
- Creative use of AI capabilities
- Unique problem-solving approach

### 2. Technical Implementation 💻
- Code quality and organization
- Proper use of Mastra framework
- Efficient tool implementation
- Error handling and robustness

### 3. Nosana Integration ⚡
- Successful deployment on Nosana
- Resource efficiency
- Stability and performance
- Proper containerization

### 4. Real-World Impact 🌍
- Practical use cases
- Potential for adoption
- Clear value proposition
- Demonstration quality

## 🎁 Prizes

**Top 10 submissions will be rewarded:**
- 🥇 1st Place: $1,000 USDC
- 🥈 2nd Place: $750 USDC
- 🥉 3rd Place: $450 USDC
- 🏅 4th Place: $200 USDC
- 🏅 5th-10th Place: $100 USDC each

## 📚 Learning Resources

For more information, check out the following resources:

- [Nosana Documentation](https://docs.nosana.io)
- [Mastra Documentation](https://mastra.ai/en/docs) - Learn more about Mastra and its features
- [CopilotKit Documentation](https://docs.copilotkit.ai) - Explore CopilotKit's capabilities
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Docker Documentation](https://docs.docker.com)
- [Nosana CLI](https://github.com/nosana-ci/nosana-cli)
- [Mastra Agents Overview](https://mastra.ai/en/docs/agents/overview)
- [Build an AI Stock Agent Guide](https://mastra.ai/en/guides/guide/stock-agent)
- [Mastra Tool Calling Documentation](https://mastra.ai/en/docs/agents/tools)

## 🆘 Support & Community

### Get Help
- **Discord**: Join [Nosana Discord](https://nosana.com/discord) 
- **Dedicated Channel**: [Builders Challenge Dev Chat](https://discord.com/channels/236263424676331521/1354391113028337664)
- **Twitter**: Follow [@nosana_ai](https://x.com/nosana_ai) for live updates

## 🎉 Ready to Build?

1. **Fork** this repository
2. **Build** your AI agent
3. **Deploy** to Nosana
4. **Present** your creation

Good luck, builders! We can't wait to see the innovative AI agents you create for the Nosana ecosystem.

**Happy Building!** 🚀

## Stay in the Loop

Want access to exclusive builder perks, early challenges, and Nosana credits?
Subscribe to our newsletter and never miss an update.

👉 [ Join the Nosana Builders Newsletter ](https://e86f0b9c.sibforms.com/serve/MUIFALaEjtsXB60SDmm1_DHdt9TOSRCFHOZUSvwK0ANbZDeJH-sBZry2_0YTNi1OjPt_ZNiwr4gGC1DPTji2zdKGJos1QEyVGBzTq_oLalKkeHx3tq2tQtzghyIhYoF4_sFmej1YL1WtnFQyH0y1epowKmDFpDz_EdGKH2cYKTleuTu97viowkIIMqoDgMqTD0uBaZNGwjjsM07T)

Be the first to know about:
- 🧠 Upcoming Builders Challenges
- 💸 New reward opportunities
- ⚙ Product updates and feature drops
- 🎁 Early-bird credits and partner perks

Join the Nosana builder community today — and build the future of decentralized AI.