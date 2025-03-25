import { it, expect } from 'vitest'
import { useLayoutEffect } from 'react'
import { useIsomorphicLayoutEffect } from '@src/use-isomorphic-layout-effect.js'

it('useIsomorphicLayoutEffect', () => {
  expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect)
})
