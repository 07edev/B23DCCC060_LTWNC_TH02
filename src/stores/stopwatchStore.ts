import { create } from 'zustand'
import type { Exercise } from '../types'

type StopwatchState = {
  activeExercise: Exercise | null
  elapsedSeconds: number
  isRunning: boolean
  start: (exercise: Exercise) => void
  pause: () => void
  resume: () => void
  reset: () => void
  tick: () => void
}

export const useStopwatchStore = create<StopwatchState>((set) => ({
  activeExercise: null,
  elapsedSeconds: 0,
  isRunning: false,
  start: (exercise) =>
    set({ activeExercise: exercise, elapsedSeconds: 0, isRunning: true }),
  pause: () => set({ isRunning: false }),
  resume: () =>
    set((state) => ({
      isRunning: state.activeExercise !== null,
    })),
  reset: () => set({ elapsedSeconds: 0, isRunning: false }),
  tick: () =>
    set((state) => {
      if (!state.isRunning || !state.activeExercise) {
        return state
      }

      const elapsedSeconds = Math.min(
        state.elapsedSeconds + 1,
        state.activeExercise.duration,
      )

      return {
        elapsedSeconds,
        isRunning: elapsedSeconds < state.activeExercise.duration,
      }
    }),
}))
