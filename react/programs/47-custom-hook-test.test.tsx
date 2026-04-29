import {renderHook} from '@testing-library/react';
import {useDebouncedValue} from './12-custom-hook-debounce';

test('returns initial debounced value', () => {
  const {result} = renderHook(() => useDebouncedValue('react', 300));

  expect(result.current).toBe('react');
});
