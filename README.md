# Enhanced LLM Provider MCP Server

An advanced MCP (Model Context Protocol) server that enables Claude to query multiple LLMs simultaneously for verification, comparison, and diverse perspectives. Eliminates the tedious copy-paste workflow when you need multiple AI opinions on complex problems.

## ✨ Features

- **🤖 Multiple LLM Support**: Query OpenAI, Anthropic, Google Gemini, and Perplexity
- **⚡ Parallel Processing**: Query all LLMs simultaneously for instant comparison
- **🔄 Streaming Support**: Real-time response streaming for supported providers
- **💾 Intelligent Caching**: Avoid redundant API calls with smart response caching
- **🔄 Automatic Retry**: Built-in retry logic with exponential backoff
- **📊 Response Analysis**: Compare and analyze differences between LLM responses
- **📈 Usage Tracking**: Monitor token usage and response latency
- **🎯 Model Selection**: Choose specific models from each provider
- **🛡️ Error Handling**: Graceful error handling with detailed logging

## 📋 Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Claude Desktop app
- API keys for the LLM providers you want to use

## 🚀 Installation

### Option 1: Use with npx (Recommended)

No installation required! Just configure Claude Desktop to use:

```json
{
  "mcpServers": {
    "llm-provider": {
      "command": "npx",
      "args": ["llm-provider-mcp"],
      "env": { ... }
    }
  }
}
```

### Option 2: Install globally

```bash
npm install -g llm-provider-mcp
```

### Option 3: Build from Source

```bash
# Clone the repository
git clone https://github.com/wnsgur1595/llm-provider.git
cd llm-provider

# Install dependencies
npm install

# Build the project
npm run build
```

## 🔧 Configuration

### 1. Set up API Keys

You can configure API keys in **two ways** (in order of priority):

#### Option A: Claude Desktop Configuration (Recommended)
Configure directly in Claude Desktop config:

**On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**On Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "llm-provider": {
      "command": "npx",
      "args": ["llm-provider-mcp"],
      "env": {
        "OPENAI_API_KEY": "sk-your-openai-key",
        "ANTHROPIC_API_KEY": "sk-ant-your-anthropic-key",
        "GOOGLE_API_KEY": "your-google-api-key",
        "PERPLEXITY_API_KEY": "pplx-your-perplexity-key",
        
        "OPENAI_MODEL": "gpt-5-mini",
        "ANTHROPIC_MODEL": "claude-sonnet-4",
        "GOOGLE_MODEL": "gemini-2.5-flash",
        "PERPLEXITY_MODEL": "sonar-pro",
        
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

**Alternative (if installed globally):**
```json
{
  "mcpServers": {
    "llm-provider": {
      "command": "llm-provider",
      "env": {
        "OPENAI_API_KEY": "sk-your-openai-key",
        "ANTHROPIC_API_KEY": "sk-ant-your-anthropic-key"
      }
    }
  }
}
```

#### Option B: System Environment Variables
Set environment variables on your system:

**Windows:**
```cmd
# Set user environment variables
setx OPENAI_API_KEY "sk-your-openai-key"
setx ANTHROPIC_API_KEY "sk-ant-your-anthropic-key"
setx GOOGLE_API_KEY "your-google-api-key"
setx PERPLEXITY_API_KEY "pplx-your-perplexity-key"
```

**macOS/Linux:**
```bash
# Add to ~/.bashrc, ~/.zshrc, or ~/.profile
export OPENAI_API_KEY="sk-your-openai-key"
export ANTHROPIC_API_KEY="sk-ant-your-anthropic-key"
export GOOGLE_API_KEY="your-google-api-key"
export PERPLEXITY_API_KEY="pplx-your-perplexity-key"
```

> **🚨 Important:** Only providers with valid API keys will be initialized. Providers without API keys will be automatically skipped.

### 2. Restart Claude Desktop

After saving the configuration, restart Claude Desktop to load the MCP server.

## 💬 Usage Examples

Once configured, you can use natural language commands in Claude:

### Query a Specific LLM
```
"Ask GPT-4 what it thinks about quantum computing"
"Get Gemini's take on this code optimization"
"What does Perplexity say about recent AI developments?"
```

### Query All LLMs
```
"Ask all available LLMs about the best practices for microservices"
"Get everyone's opinion on this technical architecture"
"Cross-check this solution with all models"
```

### Compare Responses
```
"Compare what different LLMs think about this problem"
"Analyze the consensus on this approach"
"Show me how the models differ in their explanations"
```

### Advanced Usage
```
"Ask GPT-4 with temperature 0.9 about creative solutions"
"Query all models with a specific system prompt"
"Use Claude Opus model specifically for this question"
```

## 🛠️ Available Tools

The server provides these MCP tools:

- `ask_openai` - Query OpenAI models
- `ask_anthropic` - Query Anthropic Claude models
- `ask_google` - Query Google Gemini models
- `ask_perplexity` - Query Perplexity models
- `ask_all_llms` - Query all configured LLMs in parallel
- `compare_llm_responses` - Get structured comparison of responses

## 📊 Supported Models

### OpenAI (2025 Latest)
- **GPT-5** (Default) - Latest flagship model with expert-level intelligence
- **GPT-5 Mini** - Fast and cost-effective version
- **GPT-5 Nano** - Ultra-fast and most affordable
- **GPT-5 Chat Latest** - ChatGPT optimized version
- GPT-4o (Optimized) - Legacy support
- GPT-4o Mini - Legacy support

### Anthropic (2025 Latest)
- **Claude Sonnet 4** (Default) - Superior coding and reasoning with precise instruction following
- **Claude Opus 4.1** - Most powerful model with world-class coding abilities (premium pricing)
- **Claude 3.7 Sonnet** - Hybrid reasoning model with step-by-step thinking
- Claude 3.5 Sonnet - Legacy support
- Claude 3.5 Haiku - Legacy support

### Google (2025 Latest)
- **Gemini 2.5 Pro** (Default) - State-of-the-art thinking model with 1M+ context window
- **Gemini 2.5 Flash** - Fast version with thinking capabilities
- Gemini 1.5 Pro - Legacy support
- Gemini 1.5 Flash - Legacy support

### Perplexity (2025 Latest)
- **Sonar** (Default) - Latest model based on Llama 3.3 70B with real-time search
- **Sonar Pro** - Enhanced version for complex questions and detailed answers
- Llama 3.1 Sonar Large Online - Legacy support
- Llama 3.1 Sonar Small Online - Legacy support

## 🔍 Debugging

### Enable Debug Logging

Set the log level in your `.env` file:

```env
LOG_LEVEL=debug
```

### Check Logs

Logs are written to:
- Console output (colored for readability)
- `llm-provider.log` file (JSON format)

### Common Issues

1. **"No LLM providers configured"**
   - Ensure you have at least one API key set in your `.env` file

2. **"Rate limit exceeded"**
   - The server includes automatic retry with exponential backoff
   - Consider implementing request queuing for high-volume usage

3. **"Tool not showing in Claude"**
   - Restart Claude Desktop after configuration changes
   - Check the logs for initialization errors
   - Verify the path to the server is correct

## 🧪 Development

### Running in Development Mode

```bash
npm run dev
```

### Running Tests

```bash
npm test
npm run test:watch  # Watch mode
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

## 🏗️ Project Structure

```
llm-provider-mcp/
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # MCP server setup
│   ├── config/            # Configuration management
│   ├── providers/         # LLM provider implementations
│   ├── tools/             # MCP tool definitions
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files
├── docs/                  # Documentation
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 📈 Performance Optimization

- **Caching**: Responses are cached for 1 hour by default (configurable)
- **Parallel Queries**: All LLMs are queried simultaneously when using `ask_all_llms`
- **Streaming**: Supported providers stream responses for better UX
- **Retry Logic**: Automatic retry with exponential backoff for transient failures

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

```
MIT License

Copyright (c) 2024 LLM Handoff MCP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- Built on the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- Inspired by the original [llm-provider-from-claude-mcp](https://github.com/keyhoffman/llm-provider-from-claude-mcp) project
- Thanks to all LLM providers for their APIs

## 📞 Support

- **Issues**: Open an issue on [GitHub](https://github.com/wnsgur1595/llm-provider/issues)
- **Discussions**: Join our [Discord community](https://discord.gg/yourinvite)
- **Documentation**: Check the [docs](./docs) folder for detailed guides
- **Email**: support@example.com

## 🚦 Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)

---

<div align="center">
Made with ❤️ for the AI community
</div>