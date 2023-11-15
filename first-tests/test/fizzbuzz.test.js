import { describe, it, expect } from 'vitest';
import { fizzbuzz } from '../src/fizzbuzz';

describe('fizzbuzz', () => {
  //* este test lo desactivo posteriormente porque es redundante.
  // it('should be a function', () => {
  //   expect(typeof fizzbuzz).toBe('function');
  // });
  it('should throw a specific error message if not number is provided as parameter', () => {
    expect(() => fizzbuzz()).toThrow('parameter provided must be a number');
  });
  it('should throw a specific error message if not a number is provided', () => {
    expect(() => fizzbuzz(NaN)).toThrow('parameter provided must be a number');
  });
  it('should return 1 if number provided is 1', () => {
    expect(fizzbuzz(1)).toBe(1);
  });
  it('should return 2 if number provided is 2', () => {
    expect(fizzbuzz(2)).toBe(2);
  });
  it('should return "fizz" if number provided is 3', () => {
    expect(fizzbuzz(3)).toBe('fizz');
  });
  it('should return "fizz" if number provided is multiple of 3', () => {
    expect(fizzbuzz(6)).toBe('fizz');
    expect(fizzbuzz(9)).toBe('fizz');
    expect(fizzbuzz(12)).toBe('fizz');
  });
  //* este test ya está cubierto en el algoritmo.
  // it('should return 4 if number provided is 4', () => {
  //   expect(fizzbuzz(4)).toBe(4);
  // });
  it('should return "buzz" if number provided is 5', () => {
    expect(fizzbuzz(5)).toBe('buzz');
  });
  it('should return "buzz" if number provided is multiple of 5', () => {
    expect(fizzbuzz(10)).toBe('buzz');
    expect(fizzbuzz(20)).toBe('buzz');
  });
  it('should return "fizzbuzz" if number provided is 15', () => {
    expect(fizzbuzz(15)).toBe('fizzbuzz');
  });
  it('should return "fizzbuzz" if number provided is multiple of 5 and 3', () => {
    expect(fizzbuzz(30)).toBe('fizzbuzz');
    expect(fizzbuzz(45)).toBe('fizzbuzz');
  });
  it('should return "bazz" if number provided is 7', () => {
    expect(fizzbuzz(7)).toBe('bazz');
  });
  it('should return "fizzbazz" if number provided is multiple of 3 and 7', () => {
    expect(fizzbuzz(21)).toBe('fizzbazz');
    expect(fizzbuzz(42)).toBe('fizzbazz');
  });
  it('should return "buzzbazz" if number provided is multiple of 5 and 7', () => {
    expect(fizzbuzz(35)).toBe('buzzbazz');
    expect(fizzbuzz(70)).toBe('buzzbazz');
  });
});
