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
          <p className="eyebrow">Bộ sưu tập</p>
          <h1>Bài tập đã lưu</h1>
          <p>Lưu lại những bài tập yêu thích cho buổi tập tiếp theo.</p>
        </div>
        <strong className="result-count">{savedExercises.length} bài đã lưu</strong>
      </header>
      {savedExercises.length === 0 ? (
        <section className="empty-state">
          <h2>Chưa có bài tập nào</h2>
          <p>Hãy lưu một bài tập từ kho để xem bài tập ở đây.</p>
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
