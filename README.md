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
