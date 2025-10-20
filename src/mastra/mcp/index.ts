import { MCPServer } from "@mastra/mcp"
import { youtubeTool, educationalResourcesTool } from "../tools";
import { educationalAgent } from "../agents";

export const server = new MCPServer({
  name: "Educational Guide Server",
  version: "1.0.0",
  tools: { youtubeTool, educationalResourcesTool },
  agents: { educationalAgent },
});
