import React, { useState, useEffect } from 'react'

export default function AnimatedCounter({ value, duration = 800 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime = null
    let animationFrameId
    const startValue = 0

    const render = (time) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(easeOutQuart * (value - startValue) + startValue)
      
      setDisplayValue(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrameId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(animationFrameId)
  }, [value, duration])

  return <span>{displayValue}</span>
}
