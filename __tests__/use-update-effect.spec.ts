import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUpdateEffect } from '@src/use-update-effect.js'

describe(`
  useUpdateEffect(
    effect: EffectCallback
  , deps?: React.DependencyList
  ): void
`, () => {
  it('only call effect on update', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useUpdateEffect(fn))

    expect(fn).toBeCalledTimes(0)
    rerender()
    expect(fn).toBeCalledTimes(1)
    rerender()
    expect(fn).toBeCalledTimes(2)
  })

  it('unmount', () => {
    const fn = vi.fn()
    const { rerender, unmount } = renderHook(() => useUpdateEffect(() => fn))

    rerender()
    expect(fn).toBeCalledTimes(0)
    unmount()
    expect(fn).toBeCalledTimes(1)
  })
})
