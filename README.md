# extra-react-hooks
## Install
```sh
npm install --save extra-react-hooks
# or
yarn add extra-react-hooks
```

## API
### useToggle
```ts
function useToggle(initialState: boolean = false): [on: boolean, toggle: () => void]
```

### useSingleSelection
```ts
interface ISingleSelectionOption<T> {
  value: T
  index: number
  selected: boolean

  select(): void
}

function useSingleSelection<T>(
  values: T[]
, defaultSelectedIndex: number
): {
  selectedValue: T
  options: Array<ISingleSelectionOption<T>>
}
function useSingleSelection<T>(values: T[]): {
  selectedValue: T | undefined
  options: Array<ISingleSelectionOption<T>>
}
```

### useMultipleSelection
```ts
interface IMultipleSelectionOption<T> {
  value: T
  index: number
  selected: boolean

  select(): void
  unselect(): void
  toggle(): void
}

function useMultipleSelection<T>(
  values: T[]
, defaultSelectedIndexes: number[] = []
): {
  selectedValues: T[]
  options: Array<IMultipleSelectionOption<T>>
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
  stateList: [T, ...T[]]
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
  steps: [T, ...T[]]
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
