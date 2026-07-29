import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

type AnimationSnapshot = Record<string, string | number>

type BlurTextProps = {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
  rootMargin?: string
  animationFrom?: AnimationSnapshot
  animationTo?: AnimationSnapshot[]
  easing?: (value: number) => number
  onAnimationComplete?: () => void
  onAnimationStart?: () => void
  stepDuration?: number
  initialDelay?: number
  startOnMount?: boolean
}

const buildKeyframes = (from: AnimationSnapshot, steps: AnimationSnapshot[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(step => Object.keys(step))])
  const keyframes: Record<string, Array<string | number | undefined>> = {}

  keys.forEach(key => {
    keyframes[key] = [from[key], ...steps.map(step => step[key])]
  })

  return keyframes
}

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = value => 1 - Math.pow(1 - value, 3),
  onAnimationComplete,
  onAnimationStart,
  stepDuration = 0.4,
  initialDelay = 0,
  startOnMount = false,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!ref.current || reduceMotion || startOnMount) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin, reduceMotion, startOnMount])

  useEffect(() => {
    if (!inView || reduceMotion || startedRef.current || !onAnimationStart) return
    const timer = window.setTimeout(() => {
      startedRef.current = true
      onAnimationStart()
    }, initialDelay)
    return () => window.clearTimeout(timer)
  }, [inView, initialDelay, onAnimationStart, reduceMotion])

  const defaultFrom = useMemo(
    () => ({
      filter: 'blur(16px)',
      opacity: 0,
      y: direction === 'top' ? -42 : 42,
    }),
    [direction],
  )

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.65, y: direction === 'top' ? 4 : -4 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo
  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, index) =>
    stepCount === 1 ? 0 : index / (stepCount - 1),
  )

  return (
    <span
      ref={ref}
      className={`blur-text ${className}`}
      style={{ display: 'flex', flexWrap: 'wrap' } as CSSProperties}
      aria-label={text}
    >
      {elements.map((segment, index) => {
        const visibleState = reduceMotion ? { filter: 'none', opacity: 1, y: 0 } : buildKeyframes(fromSnapshot, toSnapshots)
        return (
          <span className="blur-text__mask" key={`${segment}-${index}`} aria-hidden="true">
            <motion.span
              className="blur-text__segment"
              initial={reduceMotion ? false : fromSnapshot}
              animate={inView ? visibleState : fromSnapshot}
              transition={reduceMotion ? { duration: 0 } : {
                duration: totalDuration,
                times,
                delay: (initialDelay + index * delay) / 1000,
                ease: easing,
              }}
              onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            >
              {segment === ' '
                ? '\u00A0'
                : segment.endsWith('.')
                  ? <>{segment.slice(0, -1)}<span className="blur-text__punctuation">.</span></>
                  : segment}
              {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
