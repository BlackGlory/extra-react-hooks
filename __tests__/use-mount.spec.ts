import { renderHook, act } from '@testing-library/react-hooks'
import { useMount } from '@src/use-mount'

test('useMount(effect: EffectCallback): void', () => {
  const fn = jest.fn()

  renderHook(() => useMount(fn))

  expect(fn).toBeCalledTimes(1)
})
