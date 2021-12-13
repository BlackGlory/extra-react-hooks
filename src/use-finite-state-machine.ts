import { useMemo } from 'react'
import {
  ObservableFiniteStateMachine
, IFiniteStateMachineSchema
} from '@blackglory/structures'
import { useObservable, useSubscription } from 'observable-hooks'
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
  , [schema]
  )
  useSubscription(
    useObservable(() => fsm.observeStateChanges(), [fsm])
  , forceUpdate
  )
  return fsm
}
