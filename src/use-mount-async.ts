import { useEffectAsync } from './use-effect-async.js'

export function useMountAsync(effect: (signal: AbortSignal) => Promise<void>): void {
  useEffectAsync(effect, [])
}
