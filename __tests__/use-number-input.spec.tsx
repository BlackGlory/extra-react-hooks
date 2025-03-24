import { userEvent } from '@testing-library/user-event'
import { render, fireEvent, screen } from '@testing-library/react'
import { useNumberInput } from '@src/use-number-input.js'

describe('useNumberInput', () => {
  it('value', () => {
    const onChangeHandler = jasmine.createSpy()
    const value = 1

    render(<Tester value={value} onChange={onChangeHandler} />)

    const input = screen.getByRole<HTMLInputElement>('spinbutton')
    expect(input.value).toBe('1')
  })

  describe('lazy = false', () => {
    describe('onChange', () => {
      it('number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).toHaveBeenCalledTimes(1)
        expect(onChangeHandler).toHaveBeenCalledWith(12)
      })

      it('not a number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).not.toHaveBeenCalled()
      })
    })

    describe('onBlur', () => {
      it('number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).toHaveBeenCalledTimes(1)
        expect(onChangeHandler.calls.allArgs()).toEqual([
          [12]
        ])
      })

      it('not a number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).not.toHaveBeenCalled()
      })
    })
  })

  describe('lazy = true', () => {
    describe('onChange', () => {
      it('number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).not.toHaveBeenCalled()
      })

      it('not a number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).not.toHaveBeenCalled()
      })
    })

    describe('onBlur', () => {
      it('number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).toHaveBeenCalledTimes(1)
        expect(onChangeHandler.calls.allArgs()).toEqual([
          [12]
        ])
      })

      it('not a number', async () => {
        const onChangeHandler = jasmine.createSpy()
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
        expect(onChangeHandler).not.toHaveBeenCalled()
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
