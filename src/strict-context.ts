import { useContext, Context, createContext } from 'react'
import { assert } from '@blackglory/prelude'

export type StrictContext<T> = Context<T | typeof dummy>

const dummy = Symbol()

export function createStrictContext<T>(): StrictContext<T> {
  return createContext<T | typeof dummy>(dummy)
}

export function useStrictContext<T>(context: StrictContext<T>): T {
  const value = useContext(context)
  assert(value !== dummy, 'This context cannot be used outside of a provider')

  return value
}
