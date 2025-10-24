import { MCPServer } from "@mastra/mcp"
import { weatherTool } from "../tools";
import { farmAssistant } from "../agents";

export const server = new MCPServer({
  name: "Nigerian Farm Assistant Server",
  version: "1.0.0",
  tools: { weatherTool },
  agents: { farmAssistant },
});
