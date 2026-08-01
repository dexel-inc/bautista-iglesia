import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  animation?: string // e.g. "animate-fadeInUp"
  /** Si es true, la animación se repite cada vez que el elemento entra en pantalla */
  repeat?: boolean
  className?: string
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function AnimateOnScroll({
  children,
  animation = 'animate-fadeInUp',
  repeat = false,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReducedMotion(true)
      setIsVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Una sola vez: evita el parpadeo al volver a subir
          if (!repeat) observer.unobserve(entry.target)
        } else if (repeat) {
          setIsVisible(false)
        }
      },
      {
        // threshold 0 + rootMargin se comporta igual con elementos altos y bajos
        threshold: 0,
        rootMargin: '0px 0px -12% 0px',
      }
    )

    observer.observe(node)

    // Por si el elemento ya está en pantalla al montar (above the fold)
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) setIsVisible(true)

    return () => observer.disconnect()
  }, [repeat])

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${className} ${
        isVisible ? `${animation} opacity-100` : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
