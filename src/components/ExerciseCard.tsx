import type { Exercise } from '../types'
import { useSavedStore } from '../stores/savedStore'

type ExerciseCardProps = {
  exercise: Exercise
  onStart: (exercise: Exercise) => void
}

export function ExerciseCard({ exercise, onStart }: ExerciseCardProps) {
  const isSaved = useSavedStore((state) => state.savedIds.includes(exercise.id))
  const toggleSaved = useSavedStore((state) => state.toggleSaved)

  return (
    <article className="exercise-card">
      <div>
        <span className="category-badge">{exercise.category}</span>
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
      </div>
      <footer>
        <span>{exercise.duration}s</span>
        <button
          type="button"
          className="save-button"
          aria-label={isSaved ? `Unsave ${exercise.name}` : `Save ${exercise.name}`}
          onClick={() => toggleSaved(exercise.id)}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button type="button" onClick={() => onStart(exercise)}>
          Start
        </button>
      </footer>
    </article>
  )
}
