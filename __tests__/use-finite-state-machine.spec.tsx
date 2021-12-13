import { render, fireEvent } from '@testing-library/react'
import { useFiniteStateMachine, IFiniteStateMachineSchema } from '@src/use-finite-state-machine'

describe(`
  useFiniteStateMachine<State extends string, Event extends string>(
    schema: IFiniteStateMachineSchema<State, Event>
  , initialState: State
  ): ObservableFiniteStateMachine<State, Event>
`, () => {
  it('no change state', () => {
    const fn = jasmine.createSpy()

    const { queryByText } = render(
      <Tester initial='on' event='turnOff'>{fn}</Tester>
    )

    expect(queryByText('state: on')).not.toBeNull()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('change state', async () => {
    const fn = jasmine.createSpy()

    const { getByText, queryByText, container } = render(
      <Tester initial='on' event='turnOff'>{fn}</Tester>
    )
    fireEvent.click(getByText('turnOff'))

    expect(queryByText('state: off')).not.toBeNull()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

type State = 'on' | 'off'
type Event = 'turnOff' | 'turnOn'

const schema: IFiniteStateMachineSchema<State, Event> = {
  on: { turnOff: 'off' }
, off: { turnOn: 'on' }
}

function Tester(props: { initial: State, event: Event, children: () => void }) {
  const { initial, event } = props
  const fsm = useFiniteStateMachine<State, Event>(schema, initial)
  props.children()
  return <>
    <span>state: {fsm.state}</span>

    <button onClick={() => fsm.send(event)}>{event}</button>
  </>
}
