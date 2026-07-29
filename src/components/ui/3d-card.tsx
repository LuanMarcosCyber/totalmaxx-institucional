import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type CardContextValue = {
  isMouseEntered: boolean
  canUse3d: boolean
}

type CardContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  containerClassName?: string
}

type CardBodyProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

type CardItemProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

const CardContext = createContext<CardContextValue | undefined>(undefined)

function useCard() {
  const context = useContext(CardContext)
  if (!context) throw new Error('CardItem must be used within CardContainer')
  return context
}

function toLength(value?: number | string) {
  if (value === undefined) return '0px'
  return typeof value === 'number' ? `${value}px` : value
}

function canUseDesktop3d() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function CardContainer({ children, className = '', containerClassName = '', ...props }: CardContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)
  const [canUse3d, setCanUse3d] = useState(false)

  useEffect(() => {
    const update = () => setCanUse3d(canUseDesktop3d())
    update()

    const pointer = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    pointer.addEventListener('change', update)
    reduced.addEventListener('change', update)

    return () => {
      pointer.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canUse3d || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = (y - rect.height / 2) / 24
    const rotateY = (rect.width / 2 - x) / 24

    ref.current.style.setProperty('--card-rotate-x', `${rotateX}deg`)
    ref.current.style.setProperty('--card-rotate-y', `${rotateY}deg`)
    ref.current.style.setProperty('--card-pointer-x', `${(x / rect.width) * 100}%`)
    ref.current.style.setProperty('--card-pointer-y', `${(y / rect.height) * 100}%`)
  }

  const handleMouseLeave = () => {
    setIsMouseEntered(false)
    ref.current?.style.setProperty('--card-rotate-x', '0deg')
    ref.current?.style.setProperty('--card-rotate-y', '0deg')
  }

  return (
    <CardContext.Provider value={{ isMouseEntered, canUse3d }}>
      <div
        ref={ref}
        className={`card-3d-container ${containerClassName}`}
        onMouseEnter={() => canUse3d && setIsMouseEntered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className={`card-3d-inner ${className}`}>{children}</div>
      </div>
    </CardContext.Provider>
  )
}

export function CardBody<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  style,
  ...props
}: CardBodyProps<T>) {
  const Component = as ?? 'div'
  return (
    <Component className={`card-3d-body ${className}`} style={style as CSSProperties} {...props}>
      {children}
    </Component>
  )
}

export function CardItem<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  style,
  ...props
}: CardItemProps<T>) {
  const Component = as ?? 'div'
  const { isMouseEntered, canUse3d } = useCard()
  const transform = canUse3d && isMouseEntered
    ? `translateX(${toLength(translateX)}) translateY(${toLength(translateY)}) translateZ(${toLength(translateZ)}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    : 'translateX(0) translateY(0) translateZ(0) rotateX(0) rotateY(0) rotateZ(0)'

  return (
    <Component className={`card-3d-item ${className}`} style={{ ...(style as CSSProperties), transform }} {...props}>
      {children}
    </Component>
  )
}
