import { useState } from 'react'

export function useToggle(initialState: boolean = false):
[on: boolean, toggle: () => void ] {
  const [state, setState] = useState(initialState)
  return [state, toggle]

  function toggle() {
    setState(state => !state)
  }
}
