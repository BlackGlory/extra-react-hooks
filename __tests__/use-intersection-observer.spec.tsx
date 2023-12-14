// 由于以下原因, 使用karma:
// - JSDOM不支持IntersectionObserver.

import { useRef, useState } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { useIntersectionObserver } from '@src/use-intersection-observer.js'
import { waitForTimeout } from '@blackglory/wait-for'

describe('useIntersectionObserver', () => {
  it('no intersection', async () => {
    const fn = jasmine.createSpy<IntersectionObserverCallback>()

    render(<Tester>{fn}</Tester>)
    await waitForTimeout(500)

    // IntersectionObserver的回调函数会在观察目标元素时立即调用一次.
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn.calls.argsFor(0)[0][0].isIntersecting).toBe(false)
  })

  it('intersection', async () => {
    const fn = jasmine.createSpy<IntersectionObserverCallback>()

    render(<Tester>{fn}</Tester>)
    await waitForTimeout(500)
    fireEvent.click(screen.getByText('Intersect'))
    await waitForTimeout(500)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn.calls.argsFor(0)[0][0].isIntersecting).toBe(false)
    expect(fn.calls.argsFor(1)[0][0].isIntersecting).toBe(true)
  })
})

function Tester(props: { children: IntersectionObserverCallback }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useIntersectionObserver(props.children, [ref])

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
