import { describe, it, expect } from 'vitest';
import { getComponents } from '../helpers/componentsHelper';

describe('getComponents', () => {
  it('retorna { components, screenName } para entrada vazia', async () => {
    const result = await getComponents('');
    expect(result).toHaveProperty('components');
    expect(result).toHaveProperty('screenName');
    expect(Array.isArray(result.components)).toBe(true);
    expect(typeof result.screenName).toBe('string');
  });

  it('não lança exceção para entrada nula', async () => {
    await expect(getComponents(null)).resolves.toBeDefined();
  });
});
