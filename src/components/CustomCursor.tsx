'use client'
import React, { useEffect, useRef } from 'react'

const cursorContainerBase: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 10000,
  left: 0,
  top: 0,
  willChange: 'transform',
}

const ringContainerBase: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 9999,
  left: 0,
  top: 0,
  willChange: 'transform',
}

const cursorInnerBase: React.CSSProperties = {
  borderRadius: '50%',
  background: 'var(--coral, #D97757)',
  boxShadow: '0 0 10px rgba(217, 119, 87, 0.5)',
  width: '12px',
  height: '12px',
  transform: 'translate3d(-50%, -50%, 0)',
  transition: 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1), height 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s',
}

const ringInnerBase: React.CSSProperties = {
  borderRadius: '50%',
  border: '1px solid var(--coral, #D97757)',
  boxShadow: '0 0 15px rgba(217, 119, 87, 0.3)',
  width: '40px',
  height: '40px',
  transform: 'translate3d(-50%, -50%, 0)',
  transition: 'width 0.25s cubic-bezier(0.25, 1, 0.5, 1), height 0.25s cubic-bezier(0.25, 1, 0.5, 1), transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s',
}

export default function CustomCursor() {
  const dotContainerRef = useRef<HTMLDivElement>(null)
  const ringContainerRef = useRef<HTMLDivElement>(null)
  const dotInnerRef = useRef<HTMLDivElement>(null)
  const ringInnerRef = useRef<HTMLDivElement>(null)

  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafIdRef = useRef<number | null>(null)
  
  const isOverClickableRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const dotContainer = dotContainerRef.current
    const ringContainer = ringContainerRef.current
    const dotInner = dotInnerRef.current
    const ringInner = ringInnerRef.current

    if (!dotContainer || !ringContainer || !dotInner || !ringInner) return

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickableSelector = 'a, button, .product-card, .cursor-pointer, [role="button"]'
      const clickable = target.closest(clickableSelector) as HTMLElement
      
      if (clickable) {
        dotInner.style.width = '24px'
        dotInner.style.height = '24px'
        dotInner.style.background = 'transparent'
        dotInner.style.border = '2px solid var(--coral, #D97757)'
        
        ringInner.style.width = '64px'
        ringInner.style.height = '64px'
        ringInner.style.background = 'rgba(217, 119, 87, 0.05)'
        
        isOverClickableRef.current = true
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const relatedTarget = e.relatedTarget as HTMLElement
      
      const clickableSelector = 'a, button, .product-card, .cursor-pointer, [role="button"]'
      const currentClickable = target.closest(clickableSelector)
      const nextClickable = relatedTarget?.closest(clickableSelector)

      if (currentClickable && !nextClickable) {
        dotInner.style.width = '12px'
        dotInner.style.height = '12px'
        dotInner.style.background = 'var(--coral, #D97757)'
        dotInner.style.border = 'none'

        ringInner.style.width = '40px'
        ringInner.style.height = '40px'
        ringInner.style.background = 'transparent'
        
        isOverClickableRef.current = false
      }
    }

    const onMouseDown = () => {
      dotInner.style.transform = 'translate3d(-50%, -50%, 0) scale(0.6)'
      ringInner.style.transform = 'translate3d(-50%, -50%, 0) scale(0.8)'
      ringInner.style.background = 'rgba(217, 119, 87, 0.15)'
    }

    const onMouseUp = () => {
      dotInner.style.transform = 'translate3d(-50%, -50%, 0) scale(1)'
      ringInner.style.transform = 'translate3d(-50%, -50%, 0) scale(1)'
      
      if (isOverClickableRef.current) {
        ringInner.style.background = 'rgba(217, 119, 87, 0.05)'
      } else {
        ringInner.style.background = 'transparent'
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver)
    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const tick = () => {
      const { x, y } = mouseRef.current
      
      dotContainer.style.transform = `translate3d(${x}px, ${y}px, 0)`
      
      ringPosRef.current.x += (x - ringPosRef.current.x) * 0.15
      ringPosRef.current.y += (y - ringPosRef.current.y) * 0.15
      ringContainer.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`
      
      rafIdRef.current = requestAnimationFrame(tick)
    }
    
    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotContainerRef} id="cursor" style={cursorContainerBase}>
        <div ref={dotInnerRef} style={cursorInnerBase} />
      </div>
      <div ref={ringContainerRef} id="cursor-ring" style={ringContainerBase}>
        <div ref={ringInnerRef} style={ringInnerBase} />
      </div>
    </>
  )
}
