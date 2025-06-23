import {useEffect, useRef, useState} from 'react'
import type { ReactNode } from 'react'

export type Props = {
  slides: Array<string>;
  lengthWithPageLG: number,
  children: ReactNode,
  className: string,
};

export default function Carrousel({slides, lengthWithPageLG, children, className}: Props) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  const getSlidesPerView = () => (window.innerWidth >= 768 ? lengthWithPageLG : 1)

  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxIndex = Math.ceil(slides.length / (slidesPerView !== 1 ? slidesPerView - 1 : slidesPerView))

  const scrollToSlide = (index: number) => {
    const container = carouselRef.current
    if (!container) return

    const slideWidth = container.offsetWidth / (slidesPerView !== 1 ? slidesPerView/2 : slidesPerView)
    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    })
    setCurrentSlide(index)
  }

  const handleNext = () => {
    const nextIndex = (currentSlide + 1) % maxIndex
    scrollToSlide(nextIndex)
  }

  const handlePrev = () => {
    const prevIndex = (currentSlide - 1 + maxIndex) % maxIndex
    scrollToSlide(prevIndex)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-full relative p-8 overflow-hidden rounded-lg content-center">
        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory scroll-smooth transition-transform duration-700 overflow-x-auto hide-scrollbar p-2"
        >
          {children}
        </div>
      </div>
      <button
        onClick={handlePrev}
        className="absolute inset-y-0 start-0 inline-flex justify-center items-center w-12 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-s-lg"
      >
        <svg
          className="shrink-0 w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute inset-y-0 end-0 inline-flex justify-center items-center w-12 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-e-lg"
      >
        <svg
          className="shrink-0 w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <div className={`hidden lg:flex justify-center gap-x-2 mt-3`}>
        {Array.from({ length: maxIndex }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            className={`size-3 border rounded-full cursor-pointer
              ${i === currentSlide
              ? 'bg-orange-500 border-orange-500'
              : 'border-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
