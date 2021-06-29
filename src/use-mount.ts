import { useEffect, EffectCallback } from 'react'

export function useMount(effect: EffectCallback): void {
  useEffect(effect, [])
}
