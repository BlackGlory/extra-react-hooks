import { useState } from 'react'

export function useToggle(initialState: boolean = false):
[on: boolean, toggle: () => void ] {
  const [state, setState] = useState(initialState)
  const toggle = () => setState(state => !state)

  return [state, toggle]
}
