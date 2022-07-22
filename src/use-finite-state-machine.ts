import { useMemo, useEffect } from 'react'
import {
  ObservableFiniteStateMachine
, IFiniteStateMachineSchema
} from '@blackglory/structures'
import { useForceUpdate } from './use-force-update'

export {
  ObservableFiniteStateMachine
, IFiniteStateMachineSchema
} from '@blackglory/structures'

export function useFiniteStateMachine<State extends string, Event extends string>(
  schema: IFiniteStateMachineSchema<State, Event>
, initialState: State
): ObservableFiniteStateMachine<State, Event> {
  const forceUpdate = useForceUpdate()
  const fsm = useMemo(
    () => new ObservableFiniteStateMachine(schema, initialState)
  , [schema, initialState]
  )

  useEffect(() => {
    const observable = fsm.observeStateChanges()
    const subscription = observable.subscribe(() => forceUpdate())

    return () => subscription.unsubscribe()
  }, [fsm])

  return fsm
}
