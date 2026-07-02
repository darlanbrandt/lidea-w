import { describe, it, expect } from 'vitest';
import {
  getScreensInfo,
  getAllComponents,
  getComponentProperties,
} from '../helpers/parser/components/componentsParser';

describe('getScreensInfo', () => {
  it('retorna objeto vazio para entrada vazia', () => {
    const result = getScreensInfo('');
    expect(typeof result).toBe('object');
  });

  it('retorna objeto vazio para entrada nula', () => {
    const result = getScreensInfo(null);
    expect(typeof result).toBe('object');
  });

  it('não lança exceção para entradas inválidas', () => {
    expect(() => getScreensInfo(undefined)).not.toThrow();
    expect(() => getScreensInfo({})).not.toThrow();
    expect(() => getScreensInfo(42)).not.toThrow();
  });
});

describe('getAllComponents', () => {
  it('retorna objeto para entrada vazia', () => {
    const result = getAllComponents('');
    expect(typeof result).toBe('object');
  });

  it('não lança exceção para entradas inválidas', () => {
    expect(() => getAllComponents(null)).not.toThrow();
    expect(() => getAllComponents(undefined)).not.toThrow();
  });
});

describe('getComponentProperties', () => {
  it('retorna objeto para entrada vazia', () => {
    const result = getComponentProperties('');
    expect(typeof result).toBe('object');
  });

  it('não lança exceção para entradas inválidas', () => {
    expect(() => getComponentProperties(null)).not.toThrow();
    expect(() => getComponentProperties(undefined)).not.toThrow();
  });
});
