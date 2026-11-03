import { beforeEach, describe, expect, it } from 'vitest'
import { useStopwatchStore } from './stopwatchStore'
import type { Exercise } from '../types'

const exercise: Exercise = {
  id: '1',
  name: 'Đẩy tạ đơn 1',
  category: 'Ngực',
  trainer: 'Minh Khang',
  muscle: 'Ngực',
  duration: 3,
  description: 'Bài tập ngực.',
}

describe('stopwatch store', () => {
  beforeEach(() => {
    useStopwatchStore.setState({
      activeExercise: null,
      elapsedSeconds: 0,
      isRunning: false,
    })
  })

  it('starts a new exercise from zero', () => {
    useStopwatchStore.getState().start(exercise)

    expect(useStopwatchStore.getState()).toMatchObject({
      activeExercise: exercise,
      elapsedSeconds: 0,
      isRunning: true,
    })
  })

  it('ticks until the exercise duration and then stops', () => {
    const store = useStopwatchStore.getState()
    store.start(exercise)
    store.tick()
    store.tick()
    store.tick()
    store.tick()

    expect(useStopwatchStore.getState()).toMatchObject({
      elapsedSeconds: 3,
      isRunning: false,
    })
  })

  it('pauses, resumes, and resets the timer', () => {
    const store = useStopwatchStore.getState()
    store.start(exercise)
    store.tick()
    store.pause()
    expect(useStopwatchStore.getState().isRunning).toBe(false)
    store.resume()
    expect(useStopwatchStore.getState().isRunning).toBe(true)
    store.reset()
    expect(useStopwatchStore.getState()).toMatchObject({
      elapsedSeconds: 0,
      isRunning: false,
    })
  })

  it('moves to the next exercise and ends after the final exercise', () => {
    const second = { ...exercise, id: '2', name: 'Kéo tạ đơn 2' }
    const store = useStopwatchStore.getState()
    store.startSession([exercise, second])
    store.next()
    expect(useStopwatchStore.getState().activeExercise?.id).toBe('2')
    store.next()
    expect(useStopwatchStore.getState().isRunning).toBe(false)
  })
})
