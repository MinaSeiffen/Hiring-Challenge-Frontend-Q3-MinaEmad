import { DateFormatter } from '../utils';

describe('DateFormatter', () => {
  it('formats a Date object correctly', () => {
    const date = new Date(2023, 9, 15); // October 15, 2023 (months are 0-indexed)
    expect(DateFormatter(date)).toBe('2023-10-15');
  });

  it('formats a date string correctly', () => {
    const dateString = '2023-10-15T00:00:00Z';
    expect(DateFormatter(dateString)).toBe('2023-10-15');
  });

  it('pads single digit month and day with zeros', () => {
    const date = new Date(2023, 0, 5); // January 5, 2023
    expect(DateFormatter(date)).toBe('2023-01-05');
  });
});
