import type { Exercise } from '../types'

type ExerciseCardProps = {
  exercise: Exercise
  onStart: (exercise: Exercise) => void
}

export function ExerciseCard({ exercise, onStart }: ExerciseCardProps) {
  return (
    <article className="exercise-card">
      <div>
        <span className="category-badge">{exercise.category}</span>
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
      </div>
      <footer>
        <span>{exercise.duration}s</span>
        <button type="button" onClick={() => onStart(exercise)}>
          Start
        </button>
      </footer>
    </article>
  )
}
