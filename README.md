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

## ⚡ Quick Start (5분 설정)

### 1단계: Claude Desktop 설정 파일 열기

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json` 파일을 열거나 생성하세요
**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json` 파일을 열거나 생성하세요

### 2단계: 설정 추가

파일에 다음 내용을 복사 붙여넣기하세요:

```json
{
  "mcpServers": {
    "llm-provider": {
      "command": "npx",
      "args": ["@wnsgur1595/llm-provider-mcp"],
      "env": {
        "OPENAI_API_KEY": "여기에-당신의-openai-키-입력",
        "ANTHROPIC_API_KEY": "여기에-당신의-anthropic-키-입력"
      }
    }
  }
}
```

### 3단계: API 키 입력

- OpenAI API 키를 https://platform.openai.com/api-keys 에서 발급받아 입력하세요
- Anthropic API 키를 https://console.anthropic.com/keys 에서 발급받아 입력하세요
- 필요하지 않은 키는 줄을 삭제하세요

### 4단계: Claude Desktop 재시작

Claude Desktop을 완전히 종료하고 다시 시작하세요.

### 5단계: 사용 시작!

Claude에서 다음과 같이 말해보세요:
- "GPT에게 파이썬 학습 방법을 물어봐"
- "모든 LLM에게 이 코드를 개선하는 방법을 물어봐"

### 🔧 문제 해결

Tools가 보이지 않나요? 터미널에서 다음 명령어로 설정을 확인하세요:

```bash
npx @wnsgur1595/llm-provider-mcp --env-check
```

이 명령어는 API 키 설정 상태를 보여줍니다.

---

## 🔌 다른 MCP 클라이언트와 사용하기

이 MCP 서버는 Claude Desktop 외에도 다양한 MCP 호환 클라이언트에서 사용할 수 있습니다.

### 1. MCP Inspector (개발/테스트용)

웹 브라우저에서 MCP 서버를 직접 테스트하고 디버깅할 수 있습니다:

```bash
# API 키를 환경변수로 설정
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"

# MCP Inspector 실행
npx @modelcontextprotocol/inspector npx @wnsgur1595/llm-provider-mcp
```

브라우저에서 http://localhost:5173 으로 접속하여 tools를 직접 테스트할 수 있습니다.

### 2. VS Code Extensions

MCP를 지원하는 VS Code 확장프로그램에서 사용:

```json
// VS Code settings.json
{
  "mcp.servers": {
    "llm-provider": {
      "command": "npx",
      "args": ["@wnsgur1595/llm-provider-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-openai-key"
      }
    }
  }
}
```

### 3. 커스텀 MCP 클라이언트

MCP SDK를 사용해서 직접 개발한 애플리케이션에서 연결:

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "npx",
  args: ["@wnsgur1595/llm-provider-mcp"],
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  }
});

const client = new Client({
  name: "my-app",
  version: "1.0.0"
}, {
  capabilities: {}
});

await client.connect(transport);
```

### 4. 직접 CLI 실행

터미널에서 서버를 직접 실행하여 stdio 모드로 통신:

```bash
# 환경변수 설정
export OPENAI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-key"

# 서버 실행 (stdio 모드)
npx @wnsgur1595/llm-provider-mcp

# 또는 환경 체크만
npx @wnsgur1595/llm-provider-mcp --env-check
```

### 5. Docker 컨테이너

Docker를 사용한 격리된 환경에서 실행:

```dockerfile
FROM node:20-alpine

# 패키지 설치
RUN npm install -g @wnsgur1595/llm-provider-mcp

# 환경변수 설정
ENV OPENAI_API_KEY=""
ENV ANTHROPIC_API_KEY=""

# 서버 실행
CMD ["llm-provider-mcp"]
```

```bash
# Docker 실행
docker run -e OPENAI_API_KEY="your-key" -e ANTHROPIC_API_KEY="your-key" your-image
```

### 6. 다른 AI 플랫폼과 통합

- **Continue**: VS Code AI 코딩 어시스턴트
- **Aider**: AI 페어 프로그래밍 도구
- **기타 MCP 호환 도구들**

> **💡 팁**: MCP Inspector는 새로운 클라이언트 개발이나 디버깅 시 매우 유용합니다. tools의 스키마와 응답을 실시간으로 확인할 수 있습니다.

---

## 🚀 상세 설치 가이드

### Option 1: Use with npx (Recommended)

No installation required! Just configure Claude Desktop to use:

```json
{
  "mcpServers": {
    "llm-provider": {
      "command": "npx",
      "args": ["@wnsgur1595/llm-provider-mcp"],
      "env": { ... }
    }
  }
}
```

### Option 2: Install globally

```bash
npm install -g @wnsgur1595/llm-provider-mcp
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
      "args": ["@wnsgur1595/llm-provider-mcp"],
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
      "command": "@wnsgur1595/llm-provider-mcp",
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