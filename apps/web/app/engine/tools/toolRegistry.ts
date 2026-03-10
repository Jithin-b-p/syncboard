import { rectangleTool } from './rectangle.tool';
import { selectionTool } from './selection.tool';
import { Tool } from './tool.types';

class ToolRegistry {
  private tools: Map<string, Tool> = new Map();
  private activeTool: string | null = null;

  register(name: string, tool: Tool) {
    this.tools.set(name, tool);

    if (!this.activeTool) {
      this.activeTool = name;
    }
  }

  setActiveTool(name: string) {
    if (!this.tools.has(name)) {
      throw new Error('Tool not registered');
    }

    this.activeTool = name;
  }

  getActiveTool(): Tool {
    if (!this.activeTool) {
      throw new Error('No active tool set');
    }

    const tool = this.tools.get(this.activeTool);

    if (!tool) {
      throw new Error('Active tool not found');
    }

    return tool;
  }
}

export const toolRegistry = new ToolRegistry();

toolRegistry.register('rectangle', rectangleTool);
toolRegistry.register('selection', selectionTool);
