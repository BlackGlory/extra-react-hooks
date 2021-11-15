import { renderHook } from '@testing-library/react-hooks/dom'
import { useIsMounted } from '@src/use-is-mounted'

it('useIsMounted(): () => boolean', () => {
  const { result, unmount } = renderHook(() => useIsMounted())

  expect(result.current()).toBe(true)
  unmount()
  expect(result.current()).toBe(false)
})
