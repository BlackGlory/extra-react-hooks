import { useMemo } from 'react'
import { ObservableFiniteStateMachine, IFiniteStateMachineSchema } from 'extra-fsm'
import { useForceUpdate } from './use-force-update.js'
import { useIIFE } from './use-iife.js'

export type {
  ObservableFiniteStateMachine
, IFiniteStateMachineSchema
} from 'extra-fsm'

export function useFiniteStateMachine<
  State extends string | number | symbol
, Event extends string | number | symbol
>(
  schema: IFiniteStateMachineSchema<State, Event>
, initialState: State
): ObservableFiniteStateMachine<State, Event> {
  const forceUpdate = useForceUpdate()
  const fsm = useMemo(
    () => new ObservableFiniteStateMachine(schema, initialState)
  , [schema, initialState]
  )

  useIIFE(() => {
    const observable = fsm.observeStateChanges()
    const subscription = observable.subscribe(() => forceUpdate())

    return () => subscription.unsubscribe()
  }, [fsm])

  return fsm
}
