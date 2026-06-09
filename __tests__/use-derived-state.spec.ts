import { describe, test, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDerivedState } from '@src/use-derived-state.js'

describe('useDerivedState', () => {
  test('initialState', () => {
    const value = {}
    const { result } = renderHook(() => useDerivedState(value))

    const [derivedState] = result.current
    expect(derivedState).toBe(value)
  })

  test('return the same reference', () => {
    const value = {}
    const { result, rerender } = renderHook(() => useDerivedState(value))

    const [derviedState1, setDerviedState1] = result.current
    rerender()
    const [derviedState2, setDerviedState2] = result.current

    expect(derviedState1).toBe(derviedState2)
    expect(setDerviedState1).toBe(setDerviedState2)
  })

  test('setDerviedState', () => {
    const { result } = renderHook(() => useDerivedState(1))

    act(() => {
      const [, setDerivedState] = result.current
      setDerivedState(2)
    })

    const [derivedState] = result.current
    expect(derivedState).toBe(2)
  })

  test('refresh', () => {
    let value = 1
    const { result } = renderHook(() => useDerivedState(value))

    act(() => {
      const [, setDerivedState] = result.current
      setDerivedState(2)
      value = 3
    })

    const [derivedState] = result.current
    expect(derivedState).toBe(3)
  })
})
