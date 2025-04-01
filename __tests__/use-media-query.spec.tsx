import { describe, test } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { useMediaQuery } from '@src/use-media-query.js'
import { page } from '@vitest/browser/context'
import { toString } from '@blackglory/prelude'
import { waitForTimeout } from '@blackglory/wait-for'

describe('useMediaQuery', () => {
  test('initial value', async () => {
    await page.viewport(800, 600)

    render(<Tester query='(max-width: 800px)' />)

    screen.getByText('true')
  })

  test('handle change', async () => {
    await page.viewport(800, 600)
    render(<Tester query='(max-width: 800px)' />)

    await act(async () => {
      await page.viewport(1280, 720)
      await waitForTimeout(500)
    })

    screen.getByText('false')
  })
})

function Tester({ query }: { query: string }) {
  const result = useMediaQuery(query)

  return toString(result)
}
