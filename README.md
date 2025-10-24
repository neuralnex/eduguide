# Nigerian Farm Assistant: AI-Powered Agricultural Advisor

![Nigerian Farm Assistant](./assets/NosanaBuildersChallenge03.jpg)

## 🌾 About Nigerian Farm Assistant

Nigerian Farm Assistant is an intelligent AI-powered agricultural agent that provides comprehensive farming advice for Nigerian farmers. Combining real-time weather data with deep agricultural expertise, it offers practical guidance for crop farming, animal husbandry, disease monitoring, and business planning tailored to Nigeria's unique climate and agricultural conditions.

## ✨ Key Features

### 🌤️ **Real-Time Weather Integration**
- Comprehensive weather data from WeatherAPI.com
- Current conditions, 3-day forecasts, and hourly breakdowns
- Air quality, pollen levels, and marine conditions
- Weather alerts and astronomical data
- Tide information for coastal farming

### 🌱 **Advanced Disease Risk Assessment**
- Plant disease risk analysis (fungal, bacterial, pest)
- Animal disease risk monitoring (heat stress, respiratory, parasite)
- Weather-based risk calculations
- Preventive action recommendations
- Feed contamination risk assessment

### 🚜 **Nigerian Agricultural Expertise**
- Deep knowledge of Nigerian crops (rice, maize, cassava, yam, sorghum)
- Local soil types and climate zones
- Traditional and modern farming practices
- Seasonal farming calendars
- Market considerations and profitability

### 🐄 **Comprehensive Farming Support**
- Crop-specific planting and harvesting advice
- Animal farming guidance (cattle, goats, poultry)
- Business planning and budget considerations
- Scaling strategies for different farm sizes
- Government support programs information

### 🎨 **Beautiful Farm-Themed Interface**
- Stunning farm imagery and visual design
- Responsive layout for all devices
- Interactive weather cards and progress tracking
- Professional agricultural aesthetic
- Real-time farm activity updates

## 🛠️ Technical Stack

- **Framework**: Next.js 15 with React 19
- **AI Model**: Google Gemini 2.5 Flash
- **Agent Framework**: Mastra for AI agent orchestration
- **UI Components**: CopilotKit for chat interface
- **Styling**: Tailwind CSS with farm-themed design
- **Deployment**: Docker containerization on Nosana Network
- **APIs**: WeatherAPI.com, Google Generative AI API
- **Storage**: LibSQLStore for agent memory
- **Logging**: ConsoleLogger with configurable levels

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Google Generative AI API key
- WeatherAPI.com API key

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/neuralnexu/eduguide
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
   WEATHER_API_KEY=your-weatherapi-key-here
   LOG_LEVEL=info
   ```

4. **Start the development server**
   ```bash
   pnpm run dev
   ```

5. **Open the application**
   - Web Interface: http://localhost:3000

## 🔑 API Keys Setup

### Google Generative AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to your `.env` file

### WeatherAPI.com Key
1. Go to [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to your `.env` file

## 💡 Usage Examples

**Example Prompts:**
- "What's the weather like in Lagos and how should I plan my rice farming?"
- "I want to start a maize farm with ₦500,000 budget in Abuja"
- "Check disease risk for my tomato farm in Kano"
- "How should I manage my cattle during this hot weather in Sokoto?"
- "What crops are best to plant this season in Port Harcourt?"
- "Help me plan a mixed farming operation in Ibadan"
- "What are the market prices for groundnut in Kaduna?"

**What Nigerian Farm Assistant Provides:**
1. **Real-Time Weather Analysis**: Current conditions and forecasts for farming decisions
2. **Disease Risk Assessment**: Plant and animal disease risk based on weather conditions
3. **Crop-Specific Advice**: Tailored recommendations for Nigerian crops
4. **Animal Farming Guidance**: Health monitoring and management for livestock
5. **Business Planning**: Budget considerations and profitability analysis
6. **Seasonal Planning**: Optimal timing for planting and harvesting
7. **Market Insights**: Pricing and demand information
8. **Risk Mitigation**: Weather alerts and preventive measures

## 🐳 Docker Deployment

### Build and Run Locally
```bash
# Build the Docker image
docker build -t nigerian-farm-assistant:latest .

# Run the container
docker run -p 3000:3000 \
  -e GOOGLE_GENERATIVE_AI_API_KEY=your-api-key \
  -e WEATHER_API_KEY=your-weather-key \
  nigerian-farm-assistant:latest
```

### Deploy to Nosana Network
```bash
# Tag for your registry
docker tag eduguide:latest neuralnexu/eduguide:latest

# Push to registry
docker push neuralnexu/eduguide:latest
```

## 🏗️ Project Structure

```
nigerian-farm-assistant/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes (CopilotKit)
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page with farm UI
│   ├── mastra/             # Mastra agent configuration
│   │   ├── agents/         # Farm Assistant agent
│   │   ├── tools/          # Weather tool implementation
│   │   ├── mcp/            # MCP server configuration
│   │   └── index.ts        # Mastra configuration
│   └── utils/              # Utility functions
├── public/
│   └── images/             # Farm images and assets
├── nos_job_def/           # Nosana deployment configuration
├── Dockerfile             # Container configuration
└── package.json           # Dependencies and scripts
```

## 🤖 Agent Capabilities

Nigerian Farm Assistant's AI agent provides comprehensive agricultural support:

- **Crop Farming**: Rice, maize, cassava, yam, sorghum, groundnut, okra, tomatoes
- **Animal Farming**: Cattle, goats, poultry, sheep management
- **Disease Monitoring**: Plant and animal disease risk assessment
- **Weather Analysis**: Real-time conditions, forecasts, and alerts
- **Business Planning**: Budget considerations, profitability analysis
- **Market Intelligence**: Pricing trends and demand patterns
- **Seasonal Guidance**: Optimal planting and harvesting timing
- **Risk Management**: Weather alerts and preventive measures
- **Scaling Strategies**: Small, medium, and large farm operations
- **Government Programs**: Support programs and subsidies information

## 🔧 Development

### Available Scripts
- `pnpm run dev` - Start the Next.js development server
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start the production server
- `pnpm run lint` - Run ESLint for code quality

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly with Nigerian farming scenarios
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Mastra](https://mastra.ai) framework
- Powered by [Google Gemini](https://ai.google.dev) AI
- Weather data from [WeatherAPI.com](https://www.weatherapi.com/)
- UI components from [CopilotKit](https://copilotkit.ai)
- Deployed on [Nosana](https://nosana.io) network
- Farm imagery and agricultural expertise

---

**Nigerian Farm Assistant** - Your AI-powered agricultural companion for successful farming in Nigeria! 🌾🚜✨