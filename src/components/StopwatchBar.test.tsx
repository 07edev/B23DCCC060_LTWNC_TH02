import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StopwatchBar } from './StopwatchBar'
import { useStopwatchStore } from '../stores/stopwatchStore'
import type { Exercise } from '../types'

const exercise: Exercise = {
  id: '2',
  name: 'Kéo tạ đơn 2',
  category: 'Lưng',
  trainer: 'Phương Anh',
  muscle: 'Lưng',
  duration: 5,
  description: 'Bài tập lưng.',
}

describe('StopwatchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    useStopwatchStore.setState({
      activeExercise: exercise,
      elapsedSeconds: 0,
      isRunning: true,
    })
  })

  it('updates elapsed time with fake timers', () => {
    render(<StopwatchBar />)
    expect(screen.getByText('0 giây / 5 giây')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByText('2 giây / 5 giây')).toBeInTheDocument()
    vi.useRealTimers()
  })
})
