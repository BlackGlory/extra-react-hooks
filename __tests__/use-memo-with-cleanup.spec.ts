import { useMemoWithCleanup } from '@src/use-memo-with-cleanup.js'
import { renderHook } from '@testing-library/react'
import { AbortController } from 'extra-abort'

describe('useMemoWithCleanup', () => {
  it('mount', () => {
    const factory = jasmine.createSpy()
      .and.callFake(() => new AbortController())
    const cleanup = jasmine.createSpy()
      .and.callFake((controller: AbortController) => controller.abort())

    const { result } = renderHook(() => useMemoWithCleanup(
      factory
    , cleanup
    , []
    ))
    const value = result.current

    expect(factory).toHaveBeenCalledTimes(1)
    expect(cleanup).not.toHaveBeenCalled()
    expect(value).toBeInstanceOf(AbortController)
    expect(value.signal.aborted).toBe(false)
  })

  it('unmount', () => {
    const factory = jasmine.createSpy()
      .and.callFake(() => new AbortController())
    const cleanup = jasmine.createSpy()
      .and.callFake((controller: AbortController) => controller.abort())

    const { result, unmount } = renderHook(() => useMemoWithCleanup(
      factory
    , cleanup
    , []
    ))
    unmount()
    const value = result.current

    expect(factory).toHaveBeenCalledTimes(1)
    expect(cleanup).toHaveBeenCalledOnceWith(value)
    expect(value.signal.aborted).toBe(true)
  })

  describe('deps', () => {
    it('empty deps', () => {
      const factory = jasmine.createSpy()
        .and.callFake(() => new AbortController())
      const cleanup = jasmine.createSpy()
        .and.callFake((controller: AbortController) => controller.abort())

      const { result, rerender } = renderHook(() => useMemoWithCleanup(
        factory
      , cleanup
      , []
      ))
      const value1 = result.current
      rerender()
      const value2 = result.current

      expect(factory).toHaveBeenCalledTimes(1)
      expect(cleanup).not.toHaveBeenCalled()
      expect(value1).toBe(value2)
      expect(value1.signal.aborted).toBe(false)
    })

    it('same deps', () => {
      const factory = jasmine.createSpy()
        .and.callFake(() => new AbortController())
      const cleanup = jasmine.createSpy()
        .and.callFake((controller: AbortController) => controller.abort())
      const i = 0

      const { result, rerender } = renderHook(() => useMemoWithCleanup(
        factory
      , cleanup
      , [i]
      ))
      const value1 = result.current
      rerender()
      const value2 = result.current

      expect(factory).toHaveBeenCalledTimes(1)
      expect(cleanup).not.toHaveBeenCalled()
      expect(value1).toBe(value2)
      expect(value1.signal.aborted).toBe(false)
    })

    it('diff deps', () => {
      const factory = jasmine.createSpy()
        .and.callFake(() => new AbortController())
      const cleanup = jasmine.createSpy()
        .and.callFake((controller: AbortController) => controller.abort())
      let i = 0

      const { result, rerender } = renderHook(() => useMemoWithCleanup(
        factory
      , cleanup
      , [i++]
      ))
      const value1 = result.current
      rerender()
      const value2 = result.current

      expect(factory).toHaveBeenCalledTimes(2)
      expect(cleanup).toHaveBeenCalledOnceWith(value1)
      expect(value1).not.toBe(value2)
      expect(value1.signal.aborted).toBe(true)
      expect(value2.signal.aborted).toBe(false)
    })
  })
})
