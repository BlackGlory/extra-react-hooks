# extra-react-hooks
## Install
```sh
npm install --save extra-react-hooks
# or
yarn add extra-react-hooks
```

## API
```ts
interface IOptionState {
  selected: boolean
}
```

### useToggle
```ts
function useToggle(initialState: boolean = false): [on: boolean, toggle: () => void]
```

### useSingleSelection
```ts
function useSingleSelection<T>(
  options: NonEmptyArray<T>
, defaultSelectedIndex: number
): {
  selectedIndex: number
  optionStates: IOptionState[]
  select: (index: number) => void
}
```

### useMultipleSelection
```ts
function useMultipleSelection<T>(
  options: NonEmptyArray<T>
, defaultSelectedIndexes: number[] = []
): {
  selectedIndexes: number[]
  optionStates: IOptionState[]
  toggle: (index: number) => void
  select: (index: number) => void
  unselect: (index: number) => void
}
```

### useMount
```ts
function useMount(effect: EffectCallback): void
```

### useMountAsync
```ts
function useMountAsync(effect: (signal: AbortSignal) => Promise<void>): void
```

### useUnmount
```ts
function useUnmount(effect: () => void): void 
```

### useEffectAsync
```ts
function useEffectAsync(
  effect: (signal: AbortSignal) => Promise<void>
, deps?: DependencyList
): void
```

### useCallbackAsync
```ts
function useCallbackAsync<Args extends unknown[]>(
  callback: (...args: [...args: Args, signal: AbortSignal]) => Promise<void>
, deps: DependencyList
): (...args: Args) => void
```

### useUpdateEffect
```ts
function useUpdateEffect(
  effect: EffectCallback
, deps?: React.DependencyList
): void
```

### useStateCycle
```ts
function useStateCycle<T>(
  orderedStates: NonEmptyArray<T>
, initialStateIndex: number = 0
): [state: T, next: () => void]
```

### useIsMounted
```ts
function useIsMounted(): () => boolean
```

### useIsFirstRender
```ts
function useIsFirstRender(): () => boolean
```

### useIncrement
```ts
function useIncrement(
  initialValue: number
): [value: number, increment: (step?: number) => void, reset: () => void]
```

### useResizeObserver
```ts
function useResizeObserver(
  callback: ResizeObserverCallback
, refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
): void
```

### useStep
```ts
function useStep<T>(
  steps: NonEmptyArray<T>
, initialStepIndex: number = 0
): [currentStep: T, next: () => void, previous: () => void]
```

### useForceUpdate
```ts
function useForceUpdate(): () => void
```

### useFiniteStateMachine
```ts
function useFiniteStateMachine<State extends string, Event extends string>(
  schema: IFiniteStateMachineSchema<State, Event>
, initialState: State
): ObservableFiniteStateMachine<State, Event>
```

The `ObservableFiniteStateMachine` comes from [extra-fsm].

[extra-fsm]: https://www.npmjs.com/package/extra-fsm

### useRenderCounter
```ts
function useRenderCounter(): number
```

### useIIFE
```ts
function useIIFE(iife: () => void, deps: React.DependencyList): void
```

### useMemoWithCleanup
```ts
function useMemoWithCleanup<T>(
  factory: () => T
, cleanup: (value: T) => void
, deps?: React.DependencyList
): T
```

### useGetSet
```ts
function useGetSet<T>(
  initialValue: T
): [get: () => T, set: (value: T) => void]
```
