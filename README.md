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

## 🔧 Custom Tools & Agent Architecture

### 🤖 Mastra Agent Framework

The Nigerian Farm Assistant is built using the **Mastra framework** for AI agent orchestration, featuring:

#### **Farm Assistant Agent** (`src/mastra/agents/index.ts`)
- **Agent Name**: `farmAssistant`
- **AI Model**: Google Gemini 2.5 Flash
- **State Management**: Comprehensive farm state tracking
- **Instructions**: Detailed Nigerian agricultural expertise
- **Tool Integration**: Weather tool execution with enforcement

#### **Custom Mastra Tools** (`src/mastra/tools/index.ts`)

##### 🌤️ **Weather Tool** (`get-nigerian-weather`)
**Tool ID**: `get-nigerian-weather`

**Description**: Comprehensive weather data retrieval for Nigerian farming locations with disease risk assessment.

**Parameters**:
- `location` (string, required): Nigerian city or coordinates
- `days` (number, optional): Forecast days (1-14, default: 3)
- `includeAirQuality` (boolean, optional): Air quality data
- `includePollen` (boolean, optional): Pollen forecast data
- `includeAstronomy` (boolean, optional): Sun/moon data
- `includeAlerts` (boolean, optional): Weather alerts
- `includeHourly` (boolean, optional): 24-hour hourly data
- `includeMarine` (boolean, optional): Marine weather data
- `includeTides` (boolean, optional): Tide information
- `farmingType` (enum, optional): `crops`, `animals`, `mixed`, `aquaculture`

**Returns**: Comprehensive weather data including:
- Current weather conditions
- 3-day forecast with hourly breakdowns
- Air quality and pollen levels
- Weather alerts and warnings
- Astronomy data (sunrise/sunset)
- Marine conditions and tides
- **Disease Risk Assessment**:
  - Plant diseases (fungal, bacterial, pest risks)
  - Animal diseases (heat stress, respiratory, parasite risks)
  - Recommended preventive actions

**API Integration**: WeatherAPI.com with fallback data for Nigerian climate patterns.

### 🎨 CopilotKit UI Components

The interface uses **CopilotKit** for advanced chat functionality:

#### **Core CopilotKit Components**

##### 💬 **CopilotChat** (`src/app/page.tsx`)
- **Purpose**: Main chat interface for user interaction
- **Features**: 
  - Real-time conversation with farm assistant
  - Dynamic chat session management
  - Context-aware responses
  - Tool execution visualization

##### ⚡ **CopilotKit Provider** (`src/app/layout.tsx`)
- **Configuration**: Agent integration and API setup
- **Agent**: `farmAssistant` from Mastra framework
- **API Route**: `/api/copilotkit/route.ts`

#### **Custom CopilotKit Actions**

##### 🎨 **Theme Management Action**
```typescript
useCopilotAction({
  name: "setThemeColor",
  parameters: [{ name: "themeColor", type: "string", required: true }],
  handler: async ({ themeColor }) => { /* Theme update logic */ },
  render: ({ themeColor }) => <ThemeColorCard color={themeColor} />
})
```

##### 🌾 **Farm Progress Action**
```typescript
useCopilotAction({
  name: "updateFarmProgress", 
  parameters: [
    { name: "crop", type: "string", required: true },
    { name: "activity", type: "string", required: true },
    { name: "progress", type: "number", required: true }
  ],
  handler: async ({ crop, activity, progress }) => { /* State update */ },
  render: ({ args }) => <FarmProgressCard {...args} />
})
```

##### 💬 **Chat Management Action**
```typescript
useCopilotAction({
  name: "updateChatTitle",
  parameters: [{ name: "title", type: "string", required: true }],
  handler: async ({ title }) => { /* Chat title update */ },
  render: () => <div></div>
})
```

#### **Custom UI Components**

##### 🌤️ **WeatherCard Component**
- **Purpose**: Display comprehensive weather data
- **Features**:
  - Current weather grid (temperature, humidity, wind)
  - 3-day forecast with hourly breakdowns
  - Air quality and pollen information
  - Weather alerts and warnings
  - Marine weather and tide data
  - **Disease Risk Assessment Display**:
    - Plant disease risk indicators
    - Animal disease risk indicators
    - Recommended actions for farmers

##### 🎨 **ThemeColorCard Component**
- **Purpose**: Visual theme color updates
- **Features**: Color preview and application

##### 🌾 **FarmProgressCard Component**
- **Purpose**: Track farming activities and progress
- **Features**: Progress bars, activity tracking, crop management

### 🔄 Agent-Tool Integration Flow

1. **User Query** → CopilotChat interface
2. **Agent Processing** → Mastra farmAssistant agent
3. **Tool Execution** → Weather tool with Nigerian location mapping
4. **API Calls** → WeatherAPI.com for real-time data
5. **Disease Assessment** → Custom risk calculation algorithms
6. **Response Generation** → Gemini AI with weather context
7. **UI Rendering** → CopilotKit components with custom cards
8. **State Updates** → Farm progress and chat management

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

## 🔧 Advanced Tool Calling Features

### **Enforced Tool Execution**
The agent is specifically programmed to **ALWAYS execute tools** rather than just mentioning them:

```typescript
// Critical Tool Execution Rule in Agent Instructions
🚨 YOU MUST ACTUALLY EXECUTE THE WEATHER TOOL - NOT JUST MENTION IT! 🚨
```

### **Dynamic Tool Parameters**
The weather tool accepts multiple parameters for comprehensive data:

```typescript
// Example tool call with all parameters
getNigerianWeather({
  location: "Lagos",
  days: 7,
  includeAirQuality: true,
  includePollen: true,
  includeAstronomy: true,
  includeAlerts: true,
  includeHourly: true,
  includeMarine: true,
  includeTides: true,
  farmingType: "mixed"
})
```

### **Custom Disease Risk Algorithm**
Advanced risk calculation based on weather parameters:

```typescript
// Plant Disease Risk Calculation
if (humidity > 80 && temperature > 20 && temperature < 30) {
  fungalRisk = Math.min(90, (humidity - 70) * 2);
  recommendedActions.push('High fungal disease risk - apply fungicide preventively');
}

// Animal Disease Risk Calculation  
if (temperature > 30) {
  heatStressRisk = Math.min(95, (temperature - 25) * 5);
  recommendedActions.push('High heat stress risk - provide shade and water');
}
```

### **Nigerian Location Mapping**
Intelligent city name mapping for better API results:

```typescript
const nigerianCities = {
  'lagos': 'Lagos, Nigeria',
  'abuja': 'Abuja, Nigeria', 
  'kano': 'Kano, Nigeria',
  'port harcourt': 'Port Harcourt, Nigeria',
  'ibadan': 'Ibadan, Nigeria',
  'benue': 'Benue State, Nigeria'
};
```

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

### **Core Frameworks & Tools**
- **🤖 Agent Framework**: [Mastra](https://mastra.ai) - AI agent orchestration with custom tool integration
- **🧠 AI Model**: [Google Gemini 2.5 Flash](https://ai.google.dev) - Advanced language model for agricultural reasoning
- **💬 UI Framework**: [CopilotKit](https://copilotkit.ai) - Advanced chat interface with custom actions and components
- **🌤️ Weather API**: [WeatherAPI.com](https://www.weatherapi.com/) - Comprehensive weather data with air quality, pollen, marine, and astronomy
- **☁️ Deployment**: [Nosana Network](https://nosana.io) - Decentralized compute platform

### **Custom Tool Implementation**
- **Weather Tool**: Custom Mastra tool with Nigerian location mapping and disease risk assessment
- **Disease Risk Algorithm**: Proprietary calculation engine for plant and animal disease risk based on weather parameters
- **Farm Progress Tracking**: Custom CopilotKit actions for real-time farm activity monitoring
- **Chat Management**: Advanced chat session management with history and title updates

### **Technical Features**
- **Enforced Tool Execution**: Agent programmed to always execute tools rather than just mention them
- **Dynamic Parameters**: Weather tool accepts 9+ parameters for comprehensive data retrieval
- **Fallback Data**: Nigerian climate patterns for offline functionality
- **Real-time Updates**: Live weather data integration with farming advice
- **Responsive Design**: Farm-themed UI with beautiful imagery and animations

### **Agricultural Expertise**
- Nigerian crop knowledge (rice, maize, cassava, yam, sorghum, groundnut, okra, tomatoes)
- Animal farming guidance (cattle, goats, poultry, sheep)
- Disease monitoring and prevention strategies
- Business planning and market intelligence
- Seasonal farming calendars and government support programs

---

**Nigerian Farm Assistant** - Your AI-powered agricultural companion for successful farming in Nigeria! 🌾🚜✨