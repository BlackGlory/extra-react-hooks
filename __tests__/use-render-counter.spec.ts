import { renderHook } from '@testing-library/react-hooks/dom'
import { useRenderCounter } from '@src/use-render-counter'

it('useRenderCounter(): number', () => {
  const { result, rerender } = renderHook(() => useRenderCounter())

  expect(result.current).toBe(1)
  rerender()
  expect(result.current).toBe(2)
})
