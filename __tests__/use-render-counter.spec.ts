import { renderHook } from '@testing-library/react'
import { useRenderCounter } from '@src/use-render-counter.js'

it('useRenderCounter(): number', () => {
  const { result, rerender } = renderHook(() => useRenderCounter())

  expect(result.current).toBe(1)
  rerender()
  expect(result.current).toBe(2)
})
