import { useState } from 'react'
import { isntNaN } from 'extra-utils'
import { useIIFE } from './use-iife.js'

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
  const [displayValue, setDisplayValue] = useState<string>(() => value.toString())

  useIIFE(() => {
    if (!lazy) {
      const oldValue = Number(displayValue)

      // 以传入的参数值为准.
      // 为了避免妨碍用户输入, 只有在实际代表的值不同时才更新显示值.
      if (oldValue !== value) setDisplayValue(value.toString())
    }
  }, [lazy, value, displayValue])

  useIIFE(() => {
    if (lazy) {
      // 以传入的参数值为准.
      // 由于lazy模式下, 用户焦点不在输入框上, 可以直接覆盖显示值.
      setDisplayValue(value.toString())
    }
  }, [lazy, value])

  return {
    getInputProps() {
      return {
        type: 'number'
      , value: displayValue
      , onChange(e) {
          setDisplayValue(e.target.value)

          if (e.target.reportValidity()) {
            if (!lazy) {
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

            if (
              !lazy ||
              (isntNaN(newValue) && newValue !== value)
            ) {
              onChange(newValue, true)

              // 使用格式化后的新值.
              // 若调用方决定不接受新值, 则该值会在下次渲染时覆盖.
              setDisplayValue(newValue.toString())

              return
            }
          } else {
            if (!lazy) {
              onChange(value, true)

              setDisplayValue(value.toString())

              return
            }
          }

          // 继续使用旧值, 但对旧值格式化.
          setDisplayValue(value.toString())
        }
      }
    }
  }
}
