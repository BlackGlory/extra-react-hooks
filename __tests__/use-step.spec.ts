import { renderHook, act } from '@testing-library/react'
import { useStep } from '@src/use-step.js'
import { NonEmptyArray } from 'justypes'

describe(`
  useStep<T>(
    steps: NonEmptyArray<T>
  , initialStepIndex: number = 0
  ): [currentStep: T, next: () => void, previous: () => void]
`, () => {
  it('initialState', () => {
    const { result } = renderHook(() => useStep(['a', 'b', 'c'], 1))

    const [state] = result.current
    expect(state).toBe('b')
  })

  it('returns same references', () => {
    const steps: NonEmptyArray<string> = ['a', 'b', 'c']
    const { result, rerender } = renderHook(() => useStep(steps, 1))

    const [state1, next1, previous1] = result.current
    rerender()
    const [state2, next2, previous2] = result.current

    expect(state2).toBe(state1)
    expect(next2).toBe(next1)
    expect(previous2).toBe(previous1)
  })

  describe('next', () => {
    describe('current step is the last step', () => {
      it('does nothing', () => {
        const { result } = renderHook(() => useStep(['a', 'b', 'c'], 2))

        act(() => {
          const [, next] = result.current
          next()
        })

        const [state] = result.current
        expect(state).toBe('c')
      })
    })

    it('current step isnt the last step', () => {
      const { result } = renderHook(() => useStep(['a', 'b', 'c'], 1))

      act(() => {
        const [, next] = result.current
        next()
      })

      const [state] = result.current
      expect(state).toBe('c')
    })
  })

  describe('previous', () => {
    describe('current step is the first step', () => {
      it('does nothing', () => {
        const { result } = renderHook(() => useStep(['a', 'b', 'c'], 0))

        act(() => {
          const [,, previous] = result.current
          previous()
        })

        const [state] = result.current
        expect(state).toBe('a')
      })
    })

    it('current step isnt the first step', () => {
      const { result } = renderHook(() => useStep(['a', 'b', 'c'], 1))

      act(() => {
        const [,, previous] = result.current
        previous()
      })

      const [state] = result.current
      expect(state).toBe('a')
    })
  })
})
