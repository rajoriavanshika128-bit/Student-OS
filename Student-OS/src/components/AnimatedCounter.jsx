import React, { useState, useEffect } from 'react'

export default function AnimatedCounter({ value, onComplete }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (value === 0 || value === undefined) {
      setDisplayValue(value || 0)
      if (onComplete) onComplete()
      return
    }

    let current = 0
    const step = value / 40
    const interval = setInterval(() => {
      current += step
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
        if (onComplete) onComplete()
      } else {
        setDisplayValue(current)
      }
    }, 30)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span>{Math.round(displayValue)}</span>
}
