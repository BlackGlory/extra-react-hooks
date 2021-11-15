import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useStateCycle } from '@src/use-state-cycle'

describe(`
  useStateCycle<T>(
    stateList: [T, ...T[]]
  , initialStateIndex: number = 0
  ): [state: T, next: () => void]
`, () => {
  it('initialState', () => {
    const { result } = renderHook(() => useStateCycle(['a', 'b', 'c'], 1))

    const [state] = result.current
    expect(state).toBe('b')
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
