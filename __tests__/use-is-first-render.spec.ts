import { renderHook } from '@testing-library/react-hooks/dom'
import { useIsFirstRender } from '@src/use-is-first-render'

it('useIsFirstRender(): () => boolean', () => {
  const { result, rerender } = renderHook(() => useIsFirstRender())

  expect(result.current()).toBe(true)
  rerender()
  expect(result.current()).toBe(false)
})
