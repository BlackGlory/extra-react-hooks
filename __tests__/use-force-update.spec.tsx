import { render, fireEvent } from '@testing-library/react'
import { useForceUpdate } from '@src/use-force-update'

describe('useForceUpdate(): () => void', () => {
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
