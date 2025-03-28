import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, renderHook, screen } from '@testing-library/react'
import { useFiniteStateMachine, IFiniteStateMachineSchema } from '@src/use-finite-state-machine.js'

type State = 'on' | 'off'
type Event = 'turnOff' | 'turnOn'

const schema: IFiniteStateMachineSchema<State, Event> = {
  on: { turnOff: 'off' }
, off: { turnOn: 'on' }
}

describe(`
  useFiniteStateMachine<State extends string, Event extends string>(
    schema: IFiniteStateMachineSchema<State, Event>
  , initialState: State
  ): ObservableFiniteStateMachine<State, Event>
`, () => {
  it('returns same references', () => {
    const { result, rerender } = renderHook(() => useFiniteStateMachine(schema, 'on'))

    const fsm1 = result.current
    rerender()
    const fsm2 = result.current

    expect(fsm2).toBe(fsm1)
  })

  it('no change state', () => {
    const fn = vi.fn()

    render(
      <Tester initial='on' event='turnOff'>{fn}</Tester>
    )

    expect(screen.queryByText('state: on')).not.toBeNull()
    expect(fn).toBeCalledTimes(1)
  })

  it('change state', async () => {
    const fn = vi.fn()
    render(
      <Tester initial='on' event='turnOff'>{fn}</Tester>
    )

    fireEvent.click(screen.getByText('turnOff'))

    expect(screen.queryByText('state: off')).not.toBeNull()
    expect(fn).toBeCalledTimes(2)
  })
})

function Tester(props: { initial: State, event: Event, children: () => void }) {
  const { initial, event } = props
  const fsm = useFiniteStateMachine<State, Event>(schema, initial)
  props.children()
  return <>
    <span>state: {fsm.state}</span>

    <button onClick={() => fsm.send(event)}>{event}</button>
  </>
}
