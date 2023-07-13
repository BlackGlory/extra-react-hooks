// 无法在jest里测试ResizeObserver, 因此使用karma:
// - JSDOM不支持ResizeObserver.
// - 现有的Polyfill会通过`element.getBoundingClientRect()`等方式检查元素的尺寸,
//   但由于JSDOM不执行渲染, 因此这些函数总是返回不可用的结果, 这使得Polyfill也无法运行.

import { useRef, useState } from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { useResizeObserver } from '@src/use-resize-observer.js'
import { waitForTimeout } from '@blackglory/wait-for'

describe(`
  useResizeObserver(
    callback: ResizeObserverCallback
  , refs: Array<RefObject<HTMLElement> | MutableRefObject<HTMLElement>>
  ): void
`, () => {
  it('no resize', () => {
    const fn = jasmine.createSpy()

    render(<Tester>{fn}</Tester>)

    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('resize', async () => {
    const fn = jasmine.createSpy()

    render(<Tester>{fn}</Tester>)
    fireEvent.click(screen.getByText('Resize'))
    await waitForTimeout(1000)

    expect(fn).toHaveBeenCalledTimes(1)
  })
})

function Tester(props: { children: ResizeObserverCallback }) {
  const [sideLength, setSideLength] = useState(10)
  const ref = useRef<HTMLDivElement>(null)
  useResizeObserver(props.children, [ref])

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
