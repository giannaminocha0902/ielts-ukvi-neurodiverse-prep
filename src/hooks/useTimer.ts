import { useRef, useEffect, useState } from 'react'

interface UseTimerProps {
  initialSeconds: number
  onTimeUp?: () => void
  autoStart?: boolean
}

export function useTimer({ initialSeconds, onTimeUp, autoStart = false }: UseTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [isRunning, onTimeUp])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setSeconds(initialSeconds)
    setIsRunning(false)
  }

  return { seconds, isRunning, start, pause, reset }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
