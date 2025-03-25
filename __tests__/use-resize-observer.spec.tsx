import { describe, it, expect, vi } from 'vitest'
import { useRef, useState } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { useResizeObserver } from '@src/use-resize-observer.js'
import { waitForTimeout } from '@blackglory/wait-for'

describe('useResizeObserver', () => {
  it('no resize', async () => {
    const fn = vi.fn<ResizeObserverCallback>()

    render(<Tester callback={fn} />)
    await waitForTimeout(500)

    // ResizeObserver的回调函数会在观察目标元素时立即调用一次.
    expect(fn).toBeCalledTimes(1)
  })

  it('resize', async () => {
    const fn = vi.fn<ResizeObserverCallback>()

    render(<Tester callback={fn} />)
    await waitForTimeout(500)
    fireEvent.click(screen.getByText('Resize'))
    await waitForTimeout(500)

    // ResizeObserver的回调函数会在观察目标元素时立即调用一次.
    expect(fn).toBeCalledTimes(2)
  })

  describe('deps', () => {
    it('no deps', async () => {
      const fn = vi.fn<ResizeObserverCallback>()

      const { rerender } = render(<Tester callback={fn} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} />)
      await waitForTimeout(500)

      // ResizeObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toBeCalledTimes(2)
    })

    it('empty deps', async () => {
      const fn = vi.fn<ResizeObserverCallback>()

      const { rerender } = render(<Tester callback={fn} deps={[]} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} deps={[]} />)
      await waitForTimeout(500)

      // ResizeObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toBeCalledTimes(1)
    })

    it('same deps', async () => {
      const fn = vi.fn<ResizeObserverCallback>()

      const { rerender } = render(<Tester callback={fn} deps={[0]} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} deps={[0]} />)
      await waitForTimeout(500)

      // ResizeObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toBeCalledTimes(1)
    })

    it('diff deps', async () => {
      const fn = vi.fn<ResizeObserverCallback>()

      const { rerender } = render(<Tester callback={fn} deps={[0]} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} deps={[1]} />)
      await waitForTimeout(500)

      // ResizeObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toBeCalledTimes(2)
    })
  })
})

function Tester({ callback, deps }: {
  callback: ResizeObserverCallback
  deps?: React.DependencyList
}) {
  const [sideLength, setSideLength] = useState(10)
  const ref = useRef<HTMLDivElement>(null)
  useResizeObserver(callback, [ref], deps)

  return <>
    <div
      ref={ref}
      style={{
        height: `${sideLength}px`
      , width: `${sideLength}px`
      }}
    >Rect</div>

    <button onClick={() => {
      setSideLength(length => length + 10)
    }}>Resize</button>
  </>
}
