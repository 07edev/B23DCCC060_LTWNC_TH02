import { useEffect } from 'react'
import { useStopwatchStore } from '../stores/stopwatchStore'

export function StopwatchBar() {
  const activeExercise = useStopwatchStore((state) => state.activeExercise)
  const elapsedSeconds = useStopwatchStore((state) => state.elapsedSeconds)
  const isRunning = useStopwatchStore((state) => state.isRunning)
  const pause = useStopwatchStore((state) => state.pause)
  const resume = useStopwatchStore((state) => state.resume)
  const reset = useStopwatchStore((state) => state.reset)
  const tick = useStopwatchStore((state) => state.tick)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const timerId = window.setInterval(tick, 1000)
    return () => window.clearInterval(timerId)
  }, [isRunning, tick])

  if (!activeExercise) {
    return (
      <aside className="stopwatch-bar empty-stopwatch">
        <span>Select an exercise to start your timer.</span>
      </aside>
    )
  }

  const progress = (elapsedSeconds / activeExercise.duration) * 100

  return (
    <aside className="stopwatch-bar" aria-label="Workout stopwatch">
      <div className="stopwatch-info">
        <span className="eyebrow">Now training</span>
        <strong>{activeExercise.name}</strong>
        <span>
          {elapsedSeconds}s / {activeExercise.duration}s
        </span>
      </div>
      <div className="stopwatch-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="stopwatch-actions">
        <button type="button" onClick={isRunning ? pause : resume}>
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button type="button" className="secondary-button" onClick={reset}>
          Reset
        </button>
      </div>
    </aside>
  )
}
