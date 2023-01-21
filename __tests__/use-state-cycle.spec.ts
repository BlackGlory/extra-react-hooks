import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useStateCycle } from '@src/use-state-cycle.js'
import { NonEmptyArray } from 'justypes'

describe(`
  useStateCycle<T>(
    orderedStates: NonEmptyArray<T>
  , initialStateIndex: number = 0
  ): [state: T, next: () => void]
`, () => {
  it('initialState', () => {
    const { result } = renderHook(() => useStateCycle(['a', 'b', 'c'], 1))

    const [state] = result.current
    expect(state).toBe('b')
  })

  it('returns same references', () => {
    const orderedStates: NonEmptyArray<string> = ['a', 'b', 'c']
    const { result, rerender } = renderHook(() => useStateCycle(orderedStates, 1))

    const [state1, next1] = result.current
    rerender()
    const [state2, next2] = result.current

    expect(state2).toBe(state1)
    expect(next2).toBe(next1)
  })

  describe('next', () => {
    it('current state isnt the last state', () => {
      const { result } = renderHook(() => useStateCycle(['a', 'b', 'c'], 1))

      act(() => {
        const [, next] = result.current
        next()
      })

      const [state] = result.current
      expect(state).toBe('c')
    })

    it('current state is the last state', () => {
      const { result } = renderHook(() => useStateCycle(['a', 'b', 'c'], 2))

      act(() => {
        const [, next] = result.current
        next()
      })

      const [state] = result.current
      expect(state).toBe('a')
    })
  })
})
