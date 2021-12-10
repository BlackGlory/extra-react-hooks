import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useStep } from '@src/use-step'

describe(`
  useStep<T>(
    steps: [T, ...T[]]
  , initialStepIndex: number = 0
  ): [currentStep: T, next: () => void, previous: () => void]
`, () => {
  it('initialState', () => {
    const { result } = renderHook(() => useStep(['a', 'b', 'c'], 1))

    const [state] = result.current
    expect(state).toBe('b')
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
