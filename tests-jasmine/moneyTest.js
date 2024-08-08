import { formatCurrency } from '../scripts/utils/money.js'

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
})

/* You can use describe inside a describe to make the it more clean by grouping them.
example you can use describe('rounding', and inside that can make two 'it' => 'round down' & 'round up')  */