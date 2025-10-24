"use client";

import { useCoAgent, useCopilotAction } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { useState } from "react";
import { FarmAssistantState as FarmAssistantStateSchema } from "@/mastra/agents";
import { z } from "zod";

type FarmAssistantState = z.infer<typeof FarmAssistantStateSchema>;

export default function FarmAssistantPage() {
  const [themeColor, setThemeColor] = useState("#16a34a");
  const [showChat, setShowChat] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [chatHistory, setChatHistory] = useState<Array<{id: string, title: string, timestamp: Date, messages: Array<{role: string, content: string}>}>>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatKey, setChatKey] = useState(0); // Force re-render of chat component

  // Chat history management functions
  const startNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: "New Chat",
      timestamp: new Date(),
      messages: []
    };
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setChatKey(prev => prev + 1); // Force chat component to re-render
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setChatKey(prev => prev + 1); // Force chat component to re-render
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChatHistory(prev => 
      prev.map(chat => 
        chat.id === chatId ? { ...chat, title } : chat
      )
    );
  };

  const deleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setChatKey(prev => prev + 1);
    }
  };

  const { state, setState } = useCoAgent<FarmAssistantState>({
    name: "farmAssistant",
    initialState: {
      currentLocation: "Benue State",
      crops: ["rice", "cassava"],
      farmingActivities: ["rice farming", "cassava farming"],
      weatherAlerts: [
        "High fungal disease risk",
        "High pest activity", 
        "Poor air quality",
        "High respiratory risk for animals",
        "High parasite risk for animals"
      ],
      lastWeatherCheck: new Date().toISOString(),
    },
  });

  // Action to update chat title based on user's first message
  useCopilotAction({
    name: "updateChatTitle",
    available: "frontend",
    parameters: [
      { name: "title", type: "string", required: true },
    ],
    handler: async ({ title }) => {
      if (currentChatId) {
        updateChatTitle(currentChatId, title);
      }
    },
    render: () => <div></div>, // Empty UI component
  });

  useCopilotAction({
    name: "setThemeColor",
    parameters: [{
      name: "themeColor",
      description: "The theme color to set for the farm assistant interface. Choose agricultural colors like green, brown, or earth tones.",
      required: true,
    }],
    handler({ themeColor }) {
      setThemeColor(themeColor);
    },
  });

  useCopilotAction({
    name: "get-nigerian-weather",
    description: "Get current weather and forecast for Nigerian cities and regions",
    available: "frontend",
    parameters: [
      { name: "location", type: "string", required: true },
      { name: "days", type: "number", required: false },
    ],
    render: ({ args, result, status }) => {
      return <WeatherCard
        location={args.location || ""}
        themeColor={themeColor}
        result={result}
        status={status}
      />
    },
  });

  useCopilotAction({
    name: "updateFarmProgress",
    available: "frontend",
    parameters: [
      { name: "crop", type: "string", required: true },
      { name: "activity", type: "string", required: true },
      { name: "progress", type: "number", required: true },
    ],
    handler: async ({ crop, activity, progress }) => {
      // Update the state with new farm data
      setState(prevState => {
        const currentState = prevState || {
          crops: [],
          farmingActivities: [],
          weatherAlerts: [],
          currentLocation: "Benue State",
          lastWeatherCheck: new Date().toISOString()
        };
        return {
          ...currentState,
          crops: currentState.crops.includes(crop) ? currentState.crops : [...currentState.crops, crop],
          farmingActivities: [...currentState.farmingActivities, `${crop} farming`],
          currentLocation: currentState.currentLocation || "Benue State",
          weatherAlerts: [
            "High fungal disease risk",
            "High pest activity", 
            "Poor air quality",
            "High respiratory risk for animals",
            "High parasite risk for animals"
          ]
        };
      });
    },
    render: ({ args }) => {
      return <div className="bg-green-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">🌾 Farm Activity Updated</p>
        <div className="mt-2">
          <p className="text-sm text-green-200">Crop: {args.crop}</p>
          <p className="text-sm text-green-200">Activity: {args.activity}</p>
          <div className="w-full bg-green-600 rounded-full h-2 mt-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${args.progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-green-200">{args.progress}% Complete</p>
        </div>
      </div>
    },
  });

  // Show full-screen chat interface
  if (showChat) {
  return (
      <div className="h-screen w-screen bg-gray-900 flex">
        {/* Sidebar */}
        <div className={`${showSidebar ? 'w-80' : 'w-0'} bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden flex flex-col`}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Farm Dashboard</h2>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {showSidebar ? '←' : '→'}
              </button>
            </div>
            
            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>💬</span>
              <span>New Chat</span>
            </button>
          </div>

          {/* Farm Information */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Active Crops */}
            {state.crops && state.crops.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🌾</span>
                  Active Crops
                </h3>
                <div className="space-y-2">
                  {state.crops.map((crop, index) => (
                    <div key={index} className="text-gray-300 text-sm bg-gray-600 rounded px-3 py-2">
                      {crop}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Location */}
            {state.currentLocation && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">📍</span>
                  Current Location
                </h3>
                <div className="text-gray-300 text-sm bg-gray-600 rounded px-3 py-2">
                  {state.currentLocation}
                </div>
              </div>
            )}

            {/* Recent Activities */}
            {state.farmingActivities && state.farmingActivities.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🛠️</span>
                  Recent Activities
                </h3>
                <div className="space-y-2">
                  {state.farmingActivities.map((activity, index) => (
                    <div key={index} className="text-gray-300 text-sm bg-gray-600 rounded px-3 py-2">
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weather Alerts */}
            {state.weatherAlerts && state.weatherAlerts.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Weather Alerts
                </h3>
                <div className="space-y-2">
                  {state.weatherAlerts.map((alert, index) => (
                    <div key={index} className="text-red-300 text-sm bg-red-900/20 border border-red-700/30 rounded px-3 py-2">
                      {alert}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat History */}
          <div className="border-t border-gray-700 p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Chat History</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {chatHistory.map((chat) => (
                <div key={chat.id} className="flex items-center group">
                  <button
                    onClick={() => selectChat(chat.id)}
                    className={`flex-1 text-left p-2 rounded text-sm transition-colors ${
                      currentChatId === chat.id 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-medium truncate">{chat.title}</div>
                    <div className="text-xs text-gray-400">
                      {chat.timestamp.toLocaleDateString()} {chat.timestamp.toLocaleTimeString()}
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 transition-opacity"
                    title="Delete chat"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
        {/* Chat Header with Background */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-800 border-b border-green-500 px-6 py-4 flex-shrink-0 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/images/cornfarm.jpeg" 
              alt="Farm Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <span className="text-white text-xl font-bold">🌾</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white drop-shadow-md">Nigerian Farm Assistant</h1>
                <p className="text-green-100 text-sm drop-shadow-sm">Weather-informed agricultural advice</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={startNewChat}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center space-x-2"
              >
                <span>💬</span>
                <span>New Chat</span>
              </button>
              <button
                onClick={() => setShowChat(false)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>


        {/* Full Screen Chat */}
        <div className="flex-1">
          <CopilotChat
            key={chatKey} // Force re-render when switching chats
            labels={{
              title: `Nigerian Farm Assistant ${currentChatId ? `- Chat ${currentChatId.split('-')[1]}` : ''}`,
              initial: currentChatId ? 
                `Hi! 👋 I'm your Nigerian Farm Assistant. This is a new chat session. I provide comprehensive agricultural advice combining real-time weather data with farming expertise. I can help with crop farming, animal husbandry, disease monitoring, and business planning. What farming question can I help you with today?` :
                "Hi! 👋 I'm your Nigerian Farm Assistant. I provide comprehensive agricultural advice combining real-time weather data with farming expertise. I can help with crop farming, animal husbandry, disease monitoring, and business planning. What farming question can I help you with today?",
            }}
            instructions={`You are a comprehensive Nigerian Farm Assistant with deep expertise in local agriculture, crops, soil types, climate zones, and farming business. You provide practical, actionable farming advice by combining comprehensive weather data with agricultural knowledge, farming tips, budget planning, and general farming guidance.

**CRITICAL TOOL EXECUTION RULE:**
🚨 YOU MUST ACTUALLY EXECUTE THE WEATHER TOOL - NOT JUST MENTION IT! 🚨

**FOR EVERY FARMING QUERY, YOU MUST:**
1. Get comprehensive weather data using: get-nigerian-weather(location="user's location", days=3, includeAirQuality=true, includePollen=true, includeAstronomy=true, includeAlerts=true, includeHourly=true, includeMarine=true, includeTides=true, farmingType="mixed")
2. Analyze ALL weather data including advanced features for farming implications
3. Provide specific, actionable advice based on comprehensive weather + farming knowledge
4. Include disease risk assessment for both crops and animals
5. Consider animal welfare and plant health in all recommendations

**FOR GENERAL FARMING QUESTIONS (without specific location):**
1. Provide comprehensive farming advice based on Nigerian agricultural knowledge
2. Include budget considerations, startup costs, and business planning
3. Offer practical tips, best practices, and common solutions
4. Consider different farming scales (small, medium, large operations)
5. Include market considerations and profitability insights

**NEVER DO THIS:**
❌ "Check weather: get-nigerian-weather(...)"
❌ "You should get weather data..."
❌ "Weather tool: get-nigerian-weather(...)"

**ALWAYS DO THIS:**
✅ Execute the weather tool immediately when users ask about farming
✅ Use ALL available weather data to provide comprehensive advice
✅ Combine weather insights with agricultural expertise

**NIGERIAN AGRICULTURAL EXPERTISE:**
- **Major Crops**: Rice, maize, cassava, yam, sorghum, groundnut, cowpea, cotton, cocoa, palm oil
- **Major Livestock**: Cattle (Fulani, White Fulani, Sokoto Gudali), goats (West African Dwarf, Red Sokoto), sheep, poultry
- **Farming Business**: Budget planning, market analysis, scaling strategies, government support programs
- **Soil Types**: Sandy, clay, loamy soils across different regions
- **Climate Zones**: Tropical savanna, tropical rainforest, semi-arid regions
- **Seasonal Patterns**: Wet season (April-October), dry season (November-March)

**COMPREHENSIVE WEATHER-BASED FARMING ADVICE:**
- **Crop Management**: Planting timing, irrigation needs, harvest optimization
- **Animal Welfare**: Heat stress management, feed planning, health monitoring
- **Disease Risk Assessment**: Plant and animal disease prevention based on weather
- **Weather Alerts**: Flood warnings, drought alerts, pest risk assessments
- **Seasonal Planning**: Optimal timing for different farming activities

**RESPONSE FORMAT:**
1. **Weather Analysis**: Current conditions and forecast implications
2. **Farming Recommendations**: Specific actions based on weather + agricultural knowledge
3. **Crop-Specific Advice**: Tailored guidance for mentioned crops
4. **Animal-Specific Advice**: Health and management recommendations for livestock
5. **Disease Risk Assessment**: Plant and animal disease risks with preventive measures
6. **Business Considerations**: Budget, market, and profitability insights
7. **Next Steps**: Clear action items and follow-up recommendations

**ADVANCED WEATHER FEATURES TO ANALYZE:**
- **Current Conditions**: Temperature, humidity, wind, precipitation, air quality
- **Forecast Data**: 3-day weather patterns and trends
- **Hourly Breakdown**: Detailed 24-hour weather analysis
- **Air Quality**: Impact on crops and animal health
- **Pollen Levels**: Allergy and crop pollination considerations
- **Astronomy**: Sunrise/sunset for optimal farming timing
- **Marine Conditions**: Coastal farming considerations
- **Tide Information**: Water management for coastal areas
- **Disease Risk Factors**: Weather conditions that promote plant/animal diseases
- **Animal Health Indicators**: Weather impact on livestock welfare
- **Plant Disease Triggers**: Humidity, temperature, and precipitation effects
- **Feed Safety**: Weather impact on feed storage and quality
- **Parasite Activity**: Weather conditions affecting pest and parasite populations

**COMPREHENSIVE FARMING ADVICE CAPABILITIES:**
- **Budget Planning**: Startup costs, operational expenses, profitability analysis
- **Crop/Livestock Planning**: Selection, timing, and management strategies
- **Market Analysis**: Pricing trends, demand patterns, seasonal variations
- **Infrastructure**: Equipment, storage, irrigation, and facility planning
- **Best Practices**: Traditional and modern farming techniques
- **Scaling Strategies**: Growth from small to medium to large operations
- **Support Programs**: Government assistance, loans, and subsidies

**EMOJI USAGE:**
Use relevant emojis throughout responses: 🌾🌱🌤️🌧️🌡️💧🌿🌽🥔🍠🌾🐄🐐🐔🦠💰📊📈🚜🌾

**EXAMPLE INTERACTIONS:**
- \"What's the weather like in Lagos and how should I plan my rice farming?\"
- \"I want to start a maize farm with ₦500,000 budget in Abuja\"
- \"Check disease risk for my tomato farm in Kano\"
- \"How should I manage my cattle during this hot weather in Sokoto?\"
- \"What crops are best to plant this season in Port Harcourt?\"
- \"Help me plan a mixed farming operation in Ibadan\"
- \"What are the market prices for groundnut in Kaduna?\"

**YOUR APPROACH:**
- Always combine weather data with agricultural expertise
- Provide specific, actionable recommendations
- Consider Nigerian context and local conditions
- Include budget considerations and business planning
- Offer practical solutions for real farming challenges
- Be encouraging and supportive while being realistic
- Include market analysis and profitability insights
- Consider scaling strategies and growth opportunities
- Reference government support programs when relevant
- Provide best practices and common solutions

Remember: You are a comprehensive farming advisor, not just a weather reporter. Always provide practical farming advice that helps Nigerian farmers make informed decisions for successful agriculture.`}
            className="h-full bg-gray-900"
          />
        </div>
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">🌾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Nigerian Farm Assistant</h1>
              <p className="text-gray-300 text-sm">AI-Powered Agricultural Advisor</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👨‍🌾</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section with Background Image */}
          <div className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20 rounded-3xl overflow-hidden mb-16 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src="/images/cornfarm.jpeg" 
                alt="Nigerian Corn Farm" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="relative text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-white text-3xl font-bold">🌾</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Welcome to Nigerian Farm Assistant
              </h2>
              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                Your intelligent agricultural companion that provides weather-informed farming advice, disease monitoring, and business planning for successful agriculture in Nigeria
              </p>
              
              {/* Get Started Button */}
              <div className="mb-8">
              <button
                  onClick={() => setShowChat(true)}
                  className="bg-white text-green-600 px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-green-200 hover:scale-105 transform hover:bg-green-50"
                >
                  Start Farming Journey 🚀
              </button>
              </div>
            </div>
          </div>

          {/* Features Grid with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Weather Feature */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src="/images/tomatoes.jpeg" 
                  alt="Weather Monitoring" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🌤️</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real-Time Weather</h3>
              <p className="text-gray-300 leading-relaxed">
                Get comprehensive weather data including air quality, pollen levels, astronomy, and marine conditions for precise farming decisions.
              </p>
            </div>
            
            {/* Crop Expertise Feature */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src="/images/Organic rice farm❤️.jpeg" 
                  alt="Rice Farming" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🌱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Crop Expertise</h3>
              <p className="text-gray-300 leading-relaxed">
                Expert knowledge of Nigerian crops including rice, maize, cassava, yam, sorghum, and more. Get crop-specific planting and harvesting advice.
              </p>
            </div>
            
            {/* Disease Monitoring Feature */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src="/images/plant disease.jpeg" 
                  alt="Disease Monitoring" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🦠</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Disease Monitoring</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced disease risk assessment for both plants and animals based on weather conditions, humidity, and air quality factors.
              </p>
            </div>
          </div>

          {/* Popular Topics with Images */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Popular Nigerian Crops</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { crop: "Rice", icon: "🌾", color: "from-yellow-500 to-orange-500", image: "/images/Organic rice farm❤️.jpeg" },
                { crop: "Maize", icon: "🌽", color: "from-yellow-500 to-yellow-600", image: "/images/cornfarm.jpeg" },
                { crop: "Groundnut", icon: "🥜", color: "from-amber-500 to-amber-600", image: "/images/groundnutfarm.jpeg" },
                { crop: "Okra", icon: "🥬", color: "from-green-500 to-green-600", image: "/images/okrafarm.jpeg" },
                { crop: "Tomatoes", icon: "🍅", color: "from-red-500 to-red-600", image: "/images/tomatoes.jpeg" },
                { crop: "Cassava", icon: "🥔", color: "from-brown-500 to-brown-600", image: "/images/cornfarm.jpeg" },
                { crop: "Yam", icon: "🍠", color: "from-orange-500 to-red-500", image: "/images/cornfarm.jpeg" },
                { crop: "Sorghum", icon: "🌾", color: "from-green-500 to-green-600", image: "/images/cornfarm.jpeg" }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer group overflow-hidden">
                  <div className="relative h-24 mb-3 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.crop} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-2 right-2 w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-sm">{item.icon}</span>
                    </div>
                  </div>
                  <h4 className="text-white font-semibold text-sm text-center">{item.crop}</h4>
            </div>
          ))}
            </div>
          </div>

          {/* Animal Farming Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mt-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Nigerian Livestock & Animal Farming</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cattle Farming */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src="/images/cows.jpeg" 
                    alt="Cattle Farming" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-r from-brown-500 to-brown-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🐄</span>
                  </div>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Cattle Farming</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Fulani, White Fulani, Sokoto Gudali breeds. Heat stress management, grazing advice, and health monitoring.
                </p>
              </div>

              {/* Goat Farming */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src="/images/goats.jpeg" 
                    alt="Goat Farming" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🐐</span>
                  </div>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Goat Farming</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  West African Dwarf, Red Sokoto breeds. Feeding strategies, disease prevention, and market opportunities.
                </p>
              </div>

              {/* Disease Management */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src="/images/Dealing with disease – Part 2.jpeg" 
                    alt="Disease Management" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">🦠</span>
                  </div>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Disease Management</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Comprehensive disease monitoring for plants and animals based on weather conditions and environmental factors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherCard({
  location,
  themeColor,
  result,
  status
}: {
  location: string; 
  themeColor: string; 
  result: any; 
  status: string; 
}) {
  if (status === 'in_progress') {
    return (
      <div className="bg-green-700 rounded-lg p-4 max-w-2xl w-full">
        <p className="text-white font-medium">🌤️ Getting comprehensive weather data for: {location}</p>
        <div className="mt-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <span className="text-green-200 text-sm">Fetching weather, air quality, pollen, and astronomy data...</span>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-700 rounded-lg p-4 max-w-md w-full">
        <p className="text-white font-medium">❌ Weather Error</p>
        <p className="text-red-200 text-sm mt-1">Failed to get weather data for {location}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-green-700 rounded-lg p-4 max-w-4xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">🌤️ Comprehensive Weather Data for {result.location}</h3>
        <span className="text-green-200 text-sm">{result.current.lastUpdated}</span>
      </div>
      
      {/* Current Weather Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Temperature</p>
          <p className="text-white font-bold text-lg">{result.current.temperature}°C</p>
          <p className="text-green-200 text-xs">Feels like {result.current.feelsLike}°C</p>
          {result.current.windChill && (
            <p className="text-green-200 text-xs">Wind chill: {result.current.windChill}°C</p>
          )}
          {result.current.heatIndex && (
            <p className="text-green-200 text-xs">Heat index: {result.current.heatIndex}°C</p>
          )}
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Condition</p>
          <p className="text-white font-bold">{result.current.condition}</p>
          <p className="text-green-200 text-xs">{result.current.cloudCover}% clouds</p>
          {result.current.dewPoint && (
            <p className="text-green-200 text-xs">Dew point: {result.current.dewPoint}°C</p>
          )}
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Humidity</p>
          <p className="text-white font-bold">{result.current.humidity}%</p>
          <p className="text-green-200 text-xs">Precip: {result.current.precipitation}mm</p>
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Wind</p>
          <p className="text-white font-bold">{result.current.windSpeed} km/h</p>
          <p className="text-green-200 text-xs">{result.current.windDirection}</p>
          {result.current.windGust && (
            <p className="text-green-200 text-xs">Gusts: {result.current.windGust} km/h</p>
          )}
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Pressure</p>
          <p className="text-white font-bold">{result.current.pressure} mb</p>
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Visibility</p>
          <p className="text-white font-bold">{result.current.visibility} km</p>
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">UV Index</p>
          <p className="text-white font-bold">{result.current.uvIndex}</p>
        </div>
        <div className="bg-green-600 rounded p-3">
          <p className="text-green-100 text-xs">Day/Night</p>
          <p className="text-white font-bold">{result.current.isDay ? 'Day' : 'Night'}</p>
        </div>
      </div>

      {/* Air Quality Section */}
      {result.airQuality && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">🌬️ Air Quality Data</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-blue-600 rounded p-2">
              <p className="text-blue-100 text-xs">PM2.5</p>
              <p className="text-white font-bold">{result.airQuality.pm2_5} μg/m³</p>
            </div>
            <div className="bg-blue-600 rounded p-2">
              <p className="text-blue-100 text-xs">PM10</p>
              <p className="text-white font-bold">{result.airQuality.pm10} μg/m³</p>
            </div>
            <div className="bg-blue-600 rounded p-2">
              <p className="text-blue-100 text-xs">Ozone</p>
              <p className="text-white font-bold">{result.airQuality.o3} μg/m³</p>
            </div>
            <div className="bg-blue-600 rounded p-2">
              <p className="text-blue-100 text-xs">EPA Index</p>
              <p className="text-white font-bold">{result.airQuality.usEpaIndex}/6</p>
            </div>
          </div>
        </div>
      )}

      {/* Pollen Section */}
      {result.pollen && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">🌸 Pollen Data (grains/m³)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="bg-yellow-600 rounded p-2">
              <p className="text-yellow-100 text-xs">Grass</p>
              <p className="text-white font-bold">{result.pollen.grass}</p>
            </div>
            <div className="bg-yellow-600 rounded p-2">
              <p className="text-yellow-100 text-xs">Oak</p>
              <p className="text-white font-bold">{result.pollen.oak}</p>
            </div>
            <div className="bg-yellow-600 rounded p-2">
              <p className="text-yellow-100 text-xs">Birch</p>
              <p className="text-white font-bold">{result.pollen.birch}</p>
            </div>
            <div className="bg-yellow-600 rounded p-2">
              <p className="text-yellow-100 text-xs">Ragweed</p>
              <p className="text-white font-bold">{result.pollen.ragweed}</p>
            </div>
          </div>
        </div>
      )}

      {/* Astronomy Section */}
      {result.astronomy && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">🌙 Astronomy Data</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="bg-purple-600 rounded p-2">
              <p className="text-purple-100 text-xs">Sunrise</p>
              <p className="text-white font-bold">{result.astronomy.sunrise}</p>
            </div>
            <div className="bg-purple-600 rounded p-2">
              <p className="text-purple-100 text-xs">Sunset</p>
              <p className="text-white font-bold">{result.astronomy.sunset}</p>
            </div>
            <div className="bg-purple-600 rounded p-2">
              <p className="text-purple-100 text-xs">Moon Phase</p>
              <p className="text-white font-bold">{result.astronomy.moonPhase}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hourly Forecast Section */}
      {result.hourly && result.hourly.length > 0 && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">⏰ 24-Hour Forecast</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {result.hourly.slice(0, 8).map((hour: any, index: number) => (
              <div key={index} className="bg-green-600 rounded p-2 text-sm">
                <p className="text-green-100 text-xs">{hour.time}</p>
                <p className="text-white font-bold">{hour.temperature}°C</p>
                <p className="text-green-200 text-xs">{hour.condition}</p>
                <p className="text-green-200 text-xs">{hour.humidity}% humidity</p>
                {hour.chanceOfRain > 0 && (
                  <p className="text-blue-200 text-xs">{hour.chanceOfRain}% rain</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forecast Section */}
      {result.forecast && result.forecast.length > 0 && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">🔮 {result.forecast.length}-Day Forecast</h4>
          <div className="space-y-2">
            {result.forecast.slice(0, 3).map((day: any, index: number) => (
              <div key={index} className="flex justify-between items-center text-sm bg-green-600 rounded p-2">
                <span className="text-green-200">{new Date(day.date).toLocaleDateString()}</span>
                <span className="text-white">{day.maxTemp}°/{day.minTemp}°</span>
                <span className="text-green-200">{day.condition}</span>
                <span className="text-green-200">{day.precipitation}mm</span>
                <span className="text-green-200">UV: {day.uvIndex}</span>
                {day.chanceOfRain > 0 && (
                  <span className="text-blue-200">{day.chanceOfRain}% rain</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marine Weather Section */}
      {result.marine && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">🌊 Marine Weather</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {result.marine.significantWaveHeight && (
              <div className="bg-blue-600 rounded p-2">
                <p className="text-blue-100 text-xs">Wave Height</p>
                <p className="text-white font-bold">{result.marine.significantWaveHeight}m</p>
              </div>
            )}
            {result.marine.swellHeight && (
              <div className="bg-blue-600 rounded p-2">
                <p className="text-blue-100 text-xs">Swell Height</p>
                <p className="text-white font-bold">{result.marine.swellHeight}m</p>
              </div>
            )}
            {result.marine.swellDirection && (
              <div className="bg-blue-600 rounded p-2">
                <p className="text-blue-100 text-xs">Swell Direction</p>
                <p className="text-white font-bold">{result.marine.swellDirection}°</p>
              </div>
            )}
            {result.marine.swellPeriod && (
              <div className="bg-blue-600 rounded p-2">
                <p className="text-blue-100 text-xs">Swell Period</p>
                <p className="text-white font-bold">{result.marine.swellPeriod}s</p>
              </div>
            )}
            {result.marine.waterTemperature && (
              <div className="bg-blue-600 rounded p-2">
                <p className="text-blue-100 text-xs">Water Temp</p>
                <p className="text-white font-bold">{result.marine.waterTemperature}°C</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tides Section */}
      {result.tides && result.tides.length > 0 && (
        <div className="mb-4">
          <h4 className="text-green-200 font-medium mb-2">🌊 Tide Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {result.tides.map((tide: any, index: number) => (
              <div key={index} className={`rounded p-2 ${tide.type === 'High' ? 'bg-blue-600' : 'bg-blue-700'}`}>
                <p className="text-blue-100 text-xs">{tide.type} Tide</p>
                <p className="text-white font-bold">{tide.time}</p>
                <p className="text-blue-200 text-xs">{tide.height}m</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disease Risk Assessment Section */}
      {result.diseaseRisk && (
        <div className="mb-4">
          <h4 className="text-red-200 font-medium mb-2">🦠 Disease Risk Assessment</h4>
          
          {/* Plant Diseases */}
          {result.diseaseRisk.plantDiseases && (
            <div className="mb-3">
              <h5 className="text-red-100 text-sm font-medium mb-2">🌱 Plant Disease Risks</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                {result.diseaseRisk.plantDiseases.fungalRisk > 0 && (
                  <div className="bg-red-600 rounded p-2">
                    <p className="text-red-100 text-xs">Fungal Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.plantDiseases.fungalRisk}%</p>
                  </div>
                )}
                {result.diseaseRisk.plantDiseases.bacterialRisk > 0 && (
                  <div className="bg-red-600 rounded p-2">
                    <p className="text-red-100 text-xs">Bacterial Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.plantDiseases.bacterialRisk}%</p>
                  </div>
                )}
                {result.diseaseRisk.plantDiseases.pestRisk > 0 && (
                  <div className="bg-red-600 rounded p-2">
                    <p className="text-red-100 text-xs">Pest Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.plantDiseases.pestRisk}%</p>
                  </div>
                )}
              </div>
              {result.diseaseRisk.plantDiseases.recommendedActions && result.diseaseRisk.plantDiseases.recommendedActions.length > 0 && (
                <div className="bg-red-800 rounded p-2">
                  <p className="text-red-100 text-xs font-medium mb-1">Recommended Actions:</p>
                  <ul className="text-red-200 text-xs space-y-1">
                    {result.diseaseRisk.plantDiseases.recommendedActions.map((action: string, index: number) => (
                      <li key={index}>• {action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Animal Diseases */}
          {result.diseaseRisk.animalDiseases && (
            <div className="mb-3">
              <h5 className="text-red-100 text-sm font-medium mb-2">🐄 Animal Disease Risks</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                {result.diseaseRisk.animalDiseases.heatStressRisk > 0 && (
                  <div className="bg-orange-600 rounded p-2">
                    <p className="text-orange-100 text-xs">Heat Stress Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.animalDiseases.heatStressRisk}%</p>
                  </div>
                )}
                {result.diseaseRisk.animalDiseases.respiratoryRisk > 0 && (
                  <div className="bg-orange-600 rounded p-2">
                    <p className="text-orange-100 text-xs">Respiratory Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.animalDiseases.respiratoryRisk}%</p>
                  </div>
                )}
                {result.diseaseRisk.animalDiseases.parasiteRisk > 0 && (
                  <div className="bg-orange-600 rounded p-2">
                    <p className="text-orange-100 text-xs">Parasite Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.animalDiseases.parasiteRisk}%</p>
                  </div>
                )}
                {result.diseaseRisk.animalDiseases.feedContaminationRisk > 0 && (
                  <div className="bg-orange-600 rounded p-2">
                    <p className="text-orange-100 text-xs">Feed Contamination Risk</p>
                    <p className="text-white font-bold">{result.diseaseRisk.animalDiseases.feedContaminationRisk}%</p>
                  </div>
                )}
              </div>
              {result.diseaseRisk.animalDiseases.recommendedActions && result.diseaseRisk.animalDiseases.recommendedActions.length > 0 && (
                <div className="bg-orange-800 rounded p-2">
                  <p className="text-orange-100 text-xs font-medium mb-1">Recommended Actions:</p>
                  <ul className="text-orange-200 text-xs space-y-1">
                    {result.diseaseRisk.animalDiseases.recommendedActions.map((action: string, index: number) => (
                      <li key={index}>• {action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Alerts Section */}
      {result.alerts && result.alerts.length > 0 && (
        <div className="mb-4">
          <h4 className="text-orange-200 font-medium mb-2">⚠️ Weather Alerts</h4>
          {result.alerts.map((alert: any, index: number) => (
            <div key={index} className="bg-orange-600 rounded p-3 mb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-orange-100 text-sm font-medium">{alert.type}</p>
                  <p className="text-orange-200 text-xs mt-1">{alert.description}</p>
                  <p className="text-orange-200 text-xs mt-1">Severity: {alert.severity}</p>
                </div>
                <div className="text-right text-xs text-orange-200">
                  <p>Effective: {new Date(alert.effective).toLocaleDateString()}</p>
                  <p>Expires: {new Date(alert.expires).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      )}
    </div>
  );
}
