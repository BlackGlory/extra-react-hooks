// 由于以下原因, 使用karma:
// - JSDOM不支持IntersectionObserver.

import { useRef, useState } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { useIntersectionObserver } from '@src/use-intersection-observer.js'
import { waitForTimeout } from '@blackglory/wait-for'

describe('useIntersectionObserver', () => {
  it('no intersection', async () => {
    const fn = jasmine.createSpy<IntersectionObserverCallback>()

    render(<Tester callback={fn} />)
    await waitForTimeout(500)

    // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.calls.argsFor(0)[0][0].isIntersecting).toBe(false)
  })

  it('intersection', async () => {
    const fn = jasmine.createSpy<IntersectionObserverCallback>()

    render(<Tester callback={fn} />)
    await waitForTimeout(500)
    fireEvent.click(screen.getByText('Intersect'))
    await waitForTimeout(500)

    // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.calls.argsFor(0)[0][0].isIntersecting).toBe(false)
    expect(fn.calls.argsFor(1)[0][0].isIntersecting).toBe(true)
  })

  describe('deps', () => {
    it('no deps', async () => {
      const fn = jasmine.createSpy<IntersectionObserverCallback>()

      const { rerender } = render(<Tester callback={fn} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} />)
      await waitForTimeout(500)

      // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('empty deps', async () => {
      const fn = jasmine.createSpy<IntersectionObserverCallback>()

      const { rerender } = render(<Tester callback={fn} deps={[]} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} deps={[]} />)
      await waitForTimeout(500)

      // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('same deps', async () => {
      const fn = jasmine.createSpy<IntersectionObserverCallback>()

      const { rerender } = render(<Tester callback={fn} deps={[0]} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} deps={[0]} />)
      await waitForTimeout(500)

      // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('diff deps', async () => {
      const fn = jasmine.createSpy<IntersectionObserverCallback>()

      const { rerender } = render(<Tester callback={fn} deps={[0]} />)
      await waitForTimeout(500)
      rerender(<Tester callback={fn} deps={[1]} />)
      await waitForTimeout(500)

      // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })
})

function Tester({ callback, deps }: {
  callback: IntersectionObserverCallback
  deps?: React.DependencyList
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionObserver(callback, [ref], deps)

  return <>
    <div
      ref={ref}
      style={{
        width: '100vw'
      , height: '100vh'
      , display: visible ? 'block' : 'none'
      }}
    >Rect</div>

    <button onClick={() => {
      setVisible(true)
    }}>Intersect</button>
  </>
}
