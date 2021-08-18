import { renderHook } from '@testing-library/react-hooks'
import { useIsMounted } from '@src/use-is-mounted'

test('useIsMounted(): () => boolean', () => {
  const { result, unmount } = renderHook(() => useIsMounted())

  expect(result.current()).toBe(true)
  unmount()
  expect(result.current()).toBe(false)
})
