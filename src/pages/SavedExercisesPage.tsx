import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'
import { useSavedStore } from '../stores/savedStore'
import type { Exercise } from '../types'

type SavedExercisesPageProps = {
  onStart: (exercise: Exercise) => void
}

export function SavedExercisesPage({ onStart }: SavedExercisesPageProps) {
  const savedIds = useSavedStore((state) => state.savedIds)
  const savedExercises = exercises.filter((exercise) => savedIds.includes(exercise.id))

  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Your collection</p>
          <h1>Saved exercises</h1>
          <p>Keep your favorite sessions ready for your next workout.</p>
        </div>
        <strong className="result-count">{savedExercises.length} saved</strong>
      </header>
      {savedExercises.length === 0 ? (
        <section className="empty-state">
          <h2>No saved exercises yet</h2>
          <p>Save an exercise from the library to see it here.</p>
        </section>
      ) : (
        <div className="saved-grid">
          {savedExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} onStart={onStart} />
          ))}
        </div>
      )}
    </main>
  )
}
