import { describe, it, expect, vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import { render, fireEvent, screen } from '@testing-library/react'
import { useNumberInput } from '@src/use-number-input.js'

describe('useNumberInput', () => {
  it('value', () => {
    const onChangeHandler = vi.fn()
    const value = 1

    render(<Tester value={value} onChange={onChangeHandler} />)

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    expect(input.value).toBe('1')
  })

  describe('lazy = false', () => {
    describe('onChange', () => {
      it('number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={false}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.type(input, '2')

        expect(input.value).toBe('1')
        expect(onChangeHandler).toBeCalledTimes(1)
        expect(onChangeHandler).toBeCalledWith(12, false)
      })

      it('not a number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={false}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.click(input)
        await userEvent.keyboard('[Backspace]')

        expect(input.value).toBe('1')
        expect(onChangeHandler).not.toBeCalled()
      })
    })

    describe('onBlur', () => {
      it('number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={false}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.type(input, '2')
        fireEvent.blur(input)

        expect(input.value).toBe('1')
        expect(onChangeHandler).toBeCalledTimes(2)
        expect(onChangeHandler).nthCalledWith(1, 12, false)
        expect(onChangeHandler).nthCalledWith(2, value, true)
      })

      it('not a number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={false}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.click(input)
        await userEvent.keyboard('[Backspace]')
        fireEvent.blur(input)

        expect(input.value).toBe('1')
        expect(onChangeHandler).toBeCalledTimes(1)
        expect(onChangeHandler).toBeCalledWith(value, true)
      })
    })
  })

  describe('lazy = true', () => {
    describe('onChange', () => {
      it('number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={true}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.type(input, '2')

        expect(input.value).toBe('12')
        expect(onChangeHandler).not.toBeCalled()
      })

      it('not a number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={true}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.click(input)
        await userEvent.keyboard('[Backspace]')

        expect(input.value).toBe('')
        expect(onChangeHandler).not.toBeCalled()
      })
    })

    describe('onBlur', () => {
      it('number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={true}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.type(input, '2')
        fireEvent.blur(input)

        expect(input.value).toBe('12')
        expect(onChangeHandler).toBeCalledTimes(1)
        expect(onChangeHandler).toBeCalledWith(12, true)
      })

      it('not a number', async () => {
        const onChangeHandler = vi.fn()
        const value = 1
        render(
          <Tester
            value={value}
            onChange={onChangeHandler}
            lazy={true}
          />
        )

        const input = screen.getByRole<HTMLInputElement>('spinbutton')
        await userEvent.click(input)
        await userEvent.keyboard('[Backspace]')
        fireEvent.blur(input)

        expect(input.value).toBe('1')
        expect(onChangeHandler).not.toBeCalled()
      })
    })
  })
})

function Tester(props: {
  value: number
  lazy?: boolean

  onChange(value: number): void
}) {
  const { getInputProps } = useNumberInput(props)

  return <input
    type='number'
    {...getInputProps()}
  />
}
