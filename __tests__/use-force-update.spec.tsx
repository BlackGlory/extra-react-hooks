import { render, fireEvent } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks/dom'
import { useForceUpdate } from '@src/use-force-update'

describe('useForceUpdate(): () => void', () => {
  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useForceUpdate())

    const fn1 = result.current
    rerender()
    const fn2 = result.current

    expect(fn2).toBe(fn1)
  })

  it('not update', () => {
    const fn = jasmine.createSpy()

    render(<Tester>{fn}</Tester>)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('update', () => {
    const fn = jasmine.createSpy()

    const { getByText } = render(<Tester>{fn}</Tester>)
    fireEvent.click(getByText('Force Update'))

    expect(fn).toHaveBeenCalledTimes(2)
  })
})

function Tester(props: { children: () => void }) {
  const forceUpdate = useForceUpdate()
  props.children()
  return <button onClick={forceUpdate}>Force Update</button>
}
