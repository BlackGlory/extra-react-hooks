import { useRef } from 'react'

export function useRenderCounter(): number {
  const counter = useRef(0)

  counter.current++

  return counter.current
}
