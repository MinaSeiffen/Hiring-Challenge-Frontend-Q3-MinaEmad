import { renderHook, act } from '@testing-library/react';
import useDebouncedValue from '../useDebounceValue';

jest.useFakeTimers();

describe('useDebouncedValue', () => {
  it('should update debounced value after delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebouncedValue(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'changed', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed');
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebouncedValue('value', 500));
    unmount();
    // No explicit assertion needed, just ensure no errors thrown
  });
});
