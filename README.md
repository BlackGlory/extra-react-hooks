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
interface IOption<T> {
  value: T
  index: number
  selected: boolean
  select: () => void
}

function useSingleSelection<T>(values: T[], defaultIndex: number): {
  value: T
  options: Array<IOption<T>>
}
function useSingleSelection<T>(values: T[]): {
  value: T | undefined
  options: Array<IOption<T>>
}
```

### useMount

```ts
function useMount(effect: EffectCallback): void
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

### useIncrement

```ts
function useIncrement(
  initialValue: number
): [value: number, increment: (step?: number) => void, reset: () => void]
```
