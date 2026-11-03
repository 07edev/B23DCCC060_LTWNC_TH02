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
  const next = useStopwatchStore((state) => state.next)
  const end = useStopwatchStore((state) => state.end)

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
        <span>Chọn bài tập để bắt đầu bấm giờ.</span>
      </aside>
    )
  }

  const progress = (elapsedSeconds / activeExercise.duration) * 100

  return (
    <aside className="stopwatch-bar" aria-label="Đồng hồ bấm giờ">
      <div className="stopwatch-info">
        <span className="eyebrow">Đang tập</span>
        <strong>{activeExercise.name}</strong>
        <span>
          {elapsedSeconds} giây / {activeExercise.duration} giây
        </span>
      </div>
      <div className="stopwatch-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="stopwatch-actions">
        <button type="button" className="secondary-button" onClick={next}>Bỏ qua</button>
        <button type="button" onClick={isRunning ? pause : resume}>
          {isRunning ? 'Tạm dừng' : 'Tiếp tục'}
        </button>
        <button type="button" className="secondary-button" onClick={reset}>
          Đặt lại
        </button>
        <button type="button" className="secondary-button" onClick={end}>Kết thúc</button>
      </div>
    </aside>
  )
}
