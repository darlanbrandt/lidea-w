import { describe, it, expect } from 'vitest';
import { getAllBlocks } from '../helpers/parser/blocks/blocksParser';

describe('getAllBlocks', () => {
  it('retorna array para entrada vazia', () => {
    const result = getAllBlocks('');
    expect(Array.isArray(result)).toBe(true);
  });

  it('retorna array para entrada nula', () => {
    const result = getAllBlocks(null);
    expect(Array.isArray(result)).toBe(true);
  });

  it('não lança exceção para entradas inválidas', () => {
    expect(() => getAllBlocks(undefined)).not.toThrow();
    expect(() => getAllBlocks({})).not.toThrow();
  });

  it('retorna array vazio quando não há blocos', () => {
    const result = getAllBlocks('(try-catch (let ((attempt (delay');
    expect(Array.isArray(result)).toBe(true);
  });
});
