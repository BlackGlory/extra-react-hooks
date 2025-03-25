import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsMounted } from '@src/use-is-mounted.js'

describe('useIsMounted(): () => boolean', () => {
  it('returns isMounted()', () => {
    const { result, unmount } = renderHook(() => useIsMounted())

    expect(result.current()).toBe(true)
    unmount()
    expect(result.current()).toBe(false)
  })

  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useIsMounted())

    const fn1 = result.current
    rerender()
    const fn2 = result.current

    expect(fn2).toBe(fn1)
  })
})
