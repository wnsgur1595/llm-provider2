import { describe, test, expect, beforeEach } from '@jest/globals';
import { getCache } from '../../src/utils/cache.js';

describe('Cache', () => {
  beforeEach(() => {
    // Clear cache before each test
    getCache().flushAll();
  });

  test('should store and retrieve values', () => {
    const cache = getCache();
    const key = 'test-key';
    const value = { message: 'test value' };
    
    cache.set(key, value);
    const retrieved = cache.get(key);
    
    expect(retrieved).toEqual(value);
  });

  test('should return undefined for non-existent keys', () => {
    const cache = getCache();
    const retrieved = cache.get('non-existent-key');
    
    expect(retrieved).toBeUndefined();
  });

  test('should handle cache expiration', async () => {
    const cache = getCache();
    const key = 'expire-key';
    const value = 'expire-value';
    
    // Set with 1 second TTL
    cache.set(key, value, 1);
    
    // Should be available immediately
    expect(cache.get(key)).toBe(value);
    
    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Should be expired
    expect(cache.get(key)).toBeUndefined();
  });

  test('should clear all cache entries', () => {
    const cache = getCache();
    
    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key3', 'value3');
    
    expect(cache.keys()).toHaveLength(3);
    
    cache.flushAll();
    
    expect(cache.keys()).toHaveLength(0);
  });
});