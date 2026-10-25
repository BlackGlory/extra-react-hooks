import { describe, test, expect } from 'vitest'
import { createStrictContext, StrictContext, useStrictContext } from '@src/strict-context.js'
import { render, renderHook, screen } from '@testing-library/react'
import { getError } from '@blackglory/prelude'

describe('Strict Context', () => {
  test('inside of a provider', () => {
    const Context = createStrictContext<string>()

    render(
      <Context value={'foo'}>
        <Tester context={Context} />
      </Context>
    )

    screen.getByText('foo')
  })

  test('outside of a provider', () => {
    const Context = createStrictContext<string>()

    const err = getError(() => renderHook(() => useStrictContext(Context)))

    expect(err).toBeInstanceOf(Error)
  })
})

function Tester({ context }: {
  context: StrictContext<string>
}) {
  return useStrictContext(context)
}
