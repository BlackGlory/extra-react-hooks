import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMount } from '@src/use-mount.js'

describe('useMount(effect: EffectCallback): void', () => {
  it('mount', () => {
    const fn = vi.fn()

    renderHook(() => useMount(fn))

    expect(fn).toBeCalledTimes(1)
  })

  it('rerender', () => {
    const fn = vi.fn()
    const { rerender } = renderHook(() => useMount(fn))

    rerender()

    expect(fn).toBeCalledTimes(1)
  })

  it('unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useMount(() => fn))

    expect(fn).toBeCalledTimes(0)
    unmount()
    expect(fn).toBeCalledTimes(1)
  })
})
