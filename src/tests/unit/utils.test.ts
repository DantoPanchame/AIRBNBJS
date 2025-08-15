import { describe, it, expect } from 'vitest';
import { diffDays } from '@/lib/utils/dates';
import { calcTotal } from '@/lib/utils/money';

describe('utils', () => {
  it('diffDays computes positive difference', () => {
    const d1 = new Date('2024-01-01');
    const d2 = new Date('2024-01-05');
    expect(diffDays(d1, d2)).toBe(4);
  });

  it('diffDays zero when same day', () => {
    const d = new Date('2024-01-01');
    expect(diffDays(d, d)).toBe(0);
  });

  it('calcTotal sums base and taxes', () => {
    expect(calcTotal(100, 20, 0)).toBe(120);
  });

  it('calcTotal subtracts discounts', () => {
    expect(calcTotal(100, 0, 10)).toBe(90);
  });

  it('calcTotal handles all', () => {
    expect(calcTotal(100, 20, 5)).toBe(115);
  });
});
