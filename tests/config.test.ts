import { describe, test, expect } from '@jest/globals';
import { loadConfig } from '../src/config/index.js';

describe('Config', () => {
  test('should load default configuration', () => {
    const config = loadConfig();
    
    expect(config).toBeDefined();
    expect(config.server).toBeDefined();
    expect(config.server.logLevel).toBe('info');
    expect(config.server.cacheTTL).toBe(3600);
    expect(config.server.enableStreaming).toBe(true);
    expect(config.server.maxRetries).toBe(3);
  });

  test('should have provider configurations', () => {
    const config = loadConfig();
    
    expect(config.openai).toBeDefined();
    expect(config.anthropic).toBeDefined();
    expect(config.google).toBeDefined();
    expect(config.perplexity).toBeDefined();
  });

  test('should have default models', () => {
    const config = loadConfig();
    
    expect(config.openai.model).toBe('gpt-4o');
    expect(config.anthropic.model).toBe('claude-3-5-sonnet-20241022');
    expect(config.google.model).toBe('gemini-1.5-pro');
    expect(config.perplexity.model).toBe('llama-3.1-sonar-large-128k-online');
  });
});