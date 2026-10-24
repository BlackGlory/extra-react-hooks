import { describe, test, expect, vi } from 'vitest'
import { act, render, renderHook } from '@testing-library/react'
import { usePromise } from '@src/use-promise.js'
import { Deferred } from '@blackglory/prelude'
import { waitForAllMicrotasksProcessed } from '@blackglory/wait-for'
import { ErrorBoundary } from 'react-error-boundary'

describe('usePromise', () => {
  test('pending', async () => {
    const promise = new Deferred()

    const { result } = renderHook(() => usePromise(promise))
    const state1 = result.current
    await act(waitForAllMicrotasksProcessed)
    const state2 = result.current

    expect(state1).toBe(undefined)
    expect(state2).toBe(undefined)
  })

  test('resolved', async () => {
    const promise = Promise.resolve('foo')

    const { result } = renderHook(() => usePromise(promise))
    const state1 = result.current
    await act(waitForAllMicrotasksProcessed)
    const state2 = result.current

    expect(state1).toBe(undefined)
    expect(state2).toBe('foo')
  })

  test('pending => resolved', async () => {
    const deferred = new Deferred<string>()

    const { result } = renderHook(() => usePromise(deferred))
    const state1 = result.current
    await act(async () => {
      await waitForAllMicrotasksProcessed()
      deferred.resolve('foo')
      await waitForAllMicrotasksProcessed()
    })
    const state2 = result.current

    expect(state1).toBe(undefined)
    expect(state2).toBe('foo')
  })

  test('rejected', async () => {
    const customError = new Error('custom error')
    const promise = Promise.reject(customError)
    const onError = vi.fn()

    render(
      <ErrorBoundary
        fallbackRender={() => <></>}
        onError={onError}
      >
        <Tester promise={promise} />
      </ErrorBoundary>
    )
    await act(waitForAllMicrotasksProcessed)

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0]).toBe(customError)
  })

  test('pending => rejected', async () => {
    const customError = new Error('custom error')
    const deferred = new Deferred<string>()
    const onError = vi.fn()

    render(
      <ErrorBoundary
        fallbackRender={() => <></>}
        onError={onError}
      >
        <Tester promise={deferred} />
      </ErrorBoundary>
    )
    await act(async () => {
      await waitForAllMicrotasksProcessed()
      deferred.reject(customError)
      await waitForAllMicrotasksProcessed()
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0][0]).toBe(customError)
  })

  test('replace promise', async () => {
    const promise1 = Promise.resolve('foo')
    const promise2 = Promise.resolve('bar')

    const { rerender, result } = renderHook<
      string | undefined
    , PromiseLike<string>
    >(
      usePromise
    , { initialProps: promise1 }
    )
    await act(waitForAllMicrotasksProcessed)
    const state1 = result.current
    rerender(promise2)
    await act(waitForAllMicrotasksProcessed)
    const state2 = result.current

    expect(state1).toBe('foo')
    expect(state2).toBe('bar')
  })
})

function Tester({ promise }: {
  promise: PromiseLike<string>
}) {
  return usePromise(promise)
}
