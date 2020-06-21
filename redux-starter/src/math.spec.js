const { isEven } = require('./math');
describe('isEven', () => {
  it(' should return true for even Number', () => {
    const result = isEven(2);
    expect(result).toEqual(true);
  });
  it(' should return false for odd Number', () => {
    const result = isEven(1);
    expect(result).toEqual(false);
  });
});
