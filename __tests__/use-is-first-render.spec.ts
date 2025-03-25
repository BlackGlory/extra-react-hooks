import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsFirstRender } from '@src/use-is-first-render.js'

describe('useIsFirstRender(): () => boolean', () => {
  it('returns isFirstRender()', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender())

    expect(result.current()).toBe(true)
    rerender()
    expect(result.current()).toBe(false)
  })

  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender())

    const fn1 = result.current
    rerender()
    const fn2 = result.current

    expect(fn2).toBe(fn1)
  })
})
