import { describe, it, expect } from 'vitest';
import { canReconfigure } from '../src/canReconfigure';

describe('canReconfigure', () => {
  // it('canReconfigure should be a function', () => {
  //   expect(canReconfigure).toBeTypeOf('function');
  // });
  it('shoul throw if first parameter is missing', () => {
    expect(() => canReconfigure()).toThrow();
  });
  it('should throw if first parameter is not a string', () => {
    expect(() => canReconfigure(1)).toThrow();
  });
  it('should throw if second parameter is not a string', () => {
    expect(() => canReconfigure('a')).toThrow();
  });
  it('should return a boolean', () => {
    expect(canReconfigure('a', 'b')).toBeTypeOf('boolean');
  });
  it('should return false if strings provided have different length even if they have same unique characters', () => {
    expect(canReconfigure('aab', 'ab')).toBe(false);
  });
  it('should return false if strings provided have different number of unique characters', () => {
    expect(canReconfigure('abc', 'bbd')).toBe(false);
  });
  it('should return false if strings provided has different order of transformation', () => {
    expect(canReconfigure('XBOX', 'XXBO')).toBe(false);
  });
});
