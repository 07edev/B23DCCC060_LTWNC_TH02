import { memo } from 'react'
import { useSavedStore } from '../stores/savedStore'
import type { Exercise } from '../types'
import { formatDuration } from '../utils/format'

type ExerciseCardProps = {
  exercise: Exercise
  onStart: (exercise: Exercise) => void
  onAddToRoutine?: (exercise: Exercise) => void
}

export const ExerciseCard = memo(function ExerciseCard({ exercise, onStart, onAddToRoutine }: ExerciseCardProps) {
  const isSaved = useSavedStore((state) => state.isSaved(exercise.id))
  const toggleSaved = useSavedStore((state) => state.toggleSaved)
  const duration = formatDuration(exercise.duration)

  return (
    <article className="exercise-card">
      <span className="exercise-number">{exercise.id}</span>
      <strong className="exercise-name">{exercise.name}</strong>
      <span className="exercise-trainer">{exercise.trainer}</span>
      <span className="exercise-muscle">{exercise.muscle}</span>
      <span className="exercise-duration">{duration}</span>
      <footer>
        <button type="button" className="save-button" aria-label={isSaved ? `Bỏ lưu ${exercise.name}` : `Lưu ${exercise.name}`} onClick={() => toggleSaved(exercise.id)}>
          {isSaved ? '★' : '☆'}
        </button>
        <button type="button" onClick={() => onStart(exercise)}>Bắt đầu</button>
        <button type="button" className="routine-button" disabled={!onAddToRoutine} onClick={() => onAddToRoutine?.(exercise)}>+ Giáo án</button>
      </footer>
    </article>
  )
})
