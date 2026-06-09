import { useRef } from 'react'
import { isntNaN } from 'extra-utils'
import { useIIFE } from './use-iife.js'
import { useForceUpdate } from './use-force-update.js'

export function useNumberInput({ value, lazy, onChange }: {
  value: number
  lazy?: boolean

  /**
   * @param isEnd 表示输入结束, 每次输入结束一定会产生一个`isEnd = true`的调用.
   */
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
        // `input[type='number']`的特异行为:
        // 如果设置的value与元素内部的值在数字上相同, 则界面不会发生更新.
        // 要解决这个问题需要对DOM快速更新两次: 清空, 然后重新设置值, 不适用于React的受控组件模型.
      , value: displayValue
        // `input[type='number']`的特异行为:
        // 如果只是在数字后面输入点`.`, 不会触发change事件.
      , onChange(e) {
          if (lazy) {
            e.target.reportValidity()

            setDisplayValue(e.target.value)
          } else {
            if (e.target.reportValidity()) {
              const newValue = e.target.valueAsNumber

              if (isntNaN(newValue) && newValue !== value) {
                onChange(newValue, false)
              }
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

              onChange(value, true)
            }
          } else {
            setDisplayValue(value.toString())

            onChange(value, true)
          }
        }
      }
    }
  }
}

function useDerivedState<T>(dep: T): [
  state: T
, setState: (newState: T) => void
] {
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
