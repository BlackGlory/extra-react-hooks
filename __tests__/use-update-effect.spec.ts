import { renderHook } from '@testing-library/react-hooks/dom'
import { useUpdateEffect } from '@src/use-update-effect'

describe(`
  useUpdateEffect(
    effect: EffectCallback
  , deps?: React.DependencyList
  ): void
`, () => {
  it('only call effect on update', () => {
    const fn = jasmine.createSpy()
    const { rerender } = renderHook(() => useUpdateEffect(fn))

    expect(fn).toHaveBeenCalledTimes(0)
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('unmount', () => {
    const fn = jasmine.createSpy()
    const { rerender, unmount } = renderHook(() => useUpdateEffect(() => fn))

    rerender()
    expect(fn).toHaveBeenCalledTimes(0)
    unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
