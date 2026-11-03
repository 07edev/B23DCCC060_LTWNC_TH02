import { create } from 'zustand'
import type { Exercise } from '../types'

type StopwatchState = {
  exercises: Exercise[]
  currentIndex: number
  elapsed: number
  activeExercise: Exercise | null
  elapsedSeconds: number
  isRunning: boolean
  start: (exercise: Exercise) => void
  pause: () => void
  resume: () => void
  reset: () => void
  tick: () => void
  startSession: (exercises: Exercise[], startIndex?: number) => void
  next: () => void
  addToSession: (exercise: Exercise) => void
  end: () => void
}

export const useStopwatchStore = create<StopwatchState>((set) => ({
  exercises: [],
  currentIndex: 0,
  elapsed: 0,
  activeExercise: null,
  elapsedSeconds: 0,
  isRunning: false,
  start: (exercise) =>
    set({ exercises: [exercise], currentIndex: 0, activeExercise: exercise, elapsed: 0, elapsedSeconds: 0, isRunning: true }),
  pause: () => set({ isRunning: false }),
  resume: () =>
    set((state) => ({
      isRunning:
        state.activeExercise !== null &&
        state.elapsedSeconds < state.activeExercise.duration,
    })),
  reset: () => set({ elapsed: 0, elapsedSeconds: 0, isRunning: false }),
  startSession: (exercises, startIndex = 0) =>
    set({ exercises, currentIndex: startIndex, activeExercise: exercises[startIndex] ?? null, elapsed: 0, elapsedSeconds: 0, isRunning: exercises.length > 0 }),
  addToSession: (exercise) =>
    set((state) => ({ exercises: state.exercises.some((item) => item.id === exercise.id) ? state.exercises : [...state.exercises, exercise] })),
  next: () =>
    set((state) => {
      const nextIndex = state.currentIndex + 1
      const nextExercise = state.exercises[nextIndex]
      return nextExercise
        ? { currentIndex: nextIndex, activeExercise: nextExercise, elapsed: 0, elapsedSeconds: 0, isRunning: true }
        : { isRunning: false }
    }),
  end: () => set({ isRunning: false, activeExercise: null, exercises: [], currentIndex: 0, elapsed: 0, elapsedSeconds: 0 }),
  tick: () =>
    set((state) => {
      if (!state.isRunning || !state.activeExercise) {
        return state
      }

      const elapsedSeconds = Math.min(
        state.elapsedSeconds + 1,
        state.activeExercise.duration,
      )

      if (elapsedSeconds >= state.activeExercise.duration && state.exercises.length > state.currentIndex + 1) {
        const nextExercise = state.exercises[state.currentIndex + 1]
        return { currentIndex: state.currentIndex + 1, activeExercise: nextExercise, elapsed: 0, elapsedSeconds: 0, isRunning: true }
      }
      return {
        elapsed: elapsedSeconds,
        elapsedSeconds,
        isRunning: elapsedSeconds < state.activeExercise.duration,
      }
    }),
}))
