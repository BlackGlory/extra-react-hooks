import { useEffectAsync } from './use-effect-async.js'

export function useMountAsync(effect: (signal: AbortSignal) => PromiseLike<void>): void {
  useEffectAsync(effect, [])
}
