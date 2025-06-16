import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  animation?: string // e.g. "animate-fadeInUp"
}

export default function AnimateOnScroll({ children, animation = 'animate-fadeInUp' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${
        isVisible ? `${animation} opacity-100` : `opacity-0`
      }`}
    >
      {children}
    </div>
  )
}
