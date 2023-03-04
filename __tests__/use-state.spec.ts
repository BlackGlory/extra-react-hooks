import { useState } from 'react'
import { renderHook } from '@testing-library/react'

describe('useState', () => {
  it('does not return the same array', () => {
    const { result, rerender } = renderHook(() => useState({}))

    const arr1 = result.current
    rerender()
    const arr2 = result.current

    expect(arr2).not.toBe(arr1)
  })

  it('returns the same state and setter', () => {
    const { result, rerender } = renderHook(() => useState({}))

    const [state1, setState1] = result.current
    rerender()
    const [state2, setState2] = result.current

    expect(state2).toBe(state1)
    expect(setState2).toBe(setState1)
  })
})
