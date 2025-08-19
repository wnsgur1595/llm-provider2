import { describe, test, expect, beforeEach } from '@jest/globals';
import { BaseProvider } from '../../src/providers/base.js';
import { LLMResponse, QueryOptions } from '../../src/types/index.js';

class TestProvider extends BaseProvider {
  constructor(apiKey: string = 'test-key') {
    super('Test', apiKey, 'test-model', 0.7, 1000);
  }

  protected async doQuery(prompt: string, options?: QueryOptions): Promise<LLMResponse> {
    return {
      provider: this.name,
      model: options?.model || this.defaultModel,
      content: `Test response for: ${prompt}`,
      latency: 0,
      timestamp: ''
    };
  }
}

describe('BaseProvider', () => {
  let provider: TestProvider;

  beforeEach(() => {
    provider = new TestProvider();
  });

  test('should be available with API key', () => {
    expect(provider.isAvailable()).toBe(true);
  });

  test('should not be available without API key', () => {
    const emptyProvider = new TestProvider('');
    expect(emptyProvider.isAvailable()).toBe(false);
  });

  test('should query successfully', async () => {
    const response = await provider.query('Hello world');
    
    expect(response).toBeDefined();
    expect(response.provider).toBe('Test');
    expect(response.model).toBe('test-model');
    expect(response.content).toBe('Test response for: Hello world');
    expect(response.latency).toBeGreaterThanOrEqual(0);
    expect(response.timestamp).toBeTruthy();
  });

  test('should use custom options', async () => {
    const options = {
      model: 'custom-model',
      temperature: 0.9,
      maxTokens: 2000
    };
    
    const response = await provider.query('Hello', options);
    expect(response.model).toBe('custom-model');
  });

  test('should handle errors gracefully', async () => {
    class ErrorProvider extends BaseProvider {
      constructor() {
        super('Error', 'test-key', 'test-model');
      }

      protected async doQuery(): Promise<LLMResponse> {
        throw new Error('Test error');
      }
    }

    const errorProvider = new ErrorProvider();
    const response = await errorProvider.query('test');
    
    expect(response.error).toBe('Test error');
    expect(response.content).toBe('');
  });
});