import { useRef } from 'react'
import { isntNaN } from 'extra-utils'
import { useIIFE } from './use-iife.js'
import { useForceUpdate } from './use-force-update.js'

export function useNumberInput({ value, lazy, onChange }: {
  value: number
  lazy?: boolean

  onChange(value: number, isEnd: boolean): void
}): {
  getInputProps(): Required<Pick<
    React.ComponentPropsWithoutRef<'input'>
  , 'type'
  | 'value'
  | 'onChange'
  | 'onBlur'
  >>
} {
  const [displayValue, setDisplayValue] = useDerivedState<string>(value.toString())

  return {
    getInputProps() {
      return {
        type: 'number'
      , value: displayValue
      , onChange(e) {
          if (e.target.reportValidity()) {
            if (lazy) {
              setDisplayValue(e.target.value)
            } else {
              const newValue = e.target.valueAsNumber

              if (isntNaN(newValue) && newValue !== value) {
                onChange(newValue, false)
              }
            }
          } else {
            if (lazy) {
              setDisplayValue(e.target.value)
            }
          }
        }
      , onBlur(e) {
          if (e.target.checkValidity()) {
            const newValue = e.target.valueAsNumber

            if (isntNaN(newValue) && newValue !== value) {
              setDisplayValue(newValue.toString())

              onChange(newValue, true)
            } else {
              setDisplayValue(value.toString())
            }
          } else {
            setDisplayValue(value.toString())
          }
        }
      }
    }
  }
}

function useDerivedState<T>(dep: T): [state: T, setState: (newState: T) => void] {
  const forceUpdate = useForceUpdate()
  const stateRef = useRef<T>(dep)

  useIIFE(() => {
    stateRef.current = dep
  }, [dep])

  return [
    stateRef.current
  , newState => {
      if (stateRef.current !== newState) {
        stateRef.current = newState

        forceUpdate()
      }
    }
  ]
}
