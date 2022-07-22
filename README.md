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

The `ObservableFiniteStateMachine` comes from [@blackglory/structures].

[@blackglory/structures]: https://www.npmjs.com/package/@blackglory/structures

### useRenderCounter
```ts
function useRenderCounter(): number
```
