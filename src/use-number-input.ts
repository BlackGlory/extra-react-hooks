import { useEffect, useState } from 'react'
import { isntNaN } from 'extra-utils'

export function useNumberInput({ value, lazy, onChange }: {
  value: number
  lazy?: boolean

  onChange(value: number, isEnd: boolean): void
}): {
  getInputProps(): Required<Pick<
    React.ComponentPropsWithoutRef<'input'>
  , 'value'
  | 'onChange'
  | 'onBlur'
  >>
} {
  const [displayValue, setDisplayValue] = useState<string>(() => value.toString())

  useEffect(() => {
    if (!lazy) {
      const oldValue = Number(displayValue)

      // 以传入的值为准, 但只有在实际代表的值不同时, 才更新.
      if (oldValue !== value) setDisplayValue(value.toString())
    }
  }, [value, displayValue])

  useEffect(() => {
    if (lazy) {
      // 以传入的值为准.
      // 由于onChange是惰性调用, 不需要检查值的相等性.
      setDisplayValue(value.toString())
    }
  }, [value])

  return {
    getInputProps() {
      return {
        value: displayValue
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

            if (!lazy || (isntNaN(newValue) && newValue !== value)) {
              onChange(newValue, true)

              // 使用格式化后的新值.
              // 若hook的调用方决定不接受新值, 则displayValue的值会被覆盖.
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
