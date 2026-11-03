import { Link, useNavigate, useParams } from 'react-router-dom'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'
import { routines } from '../data/routines'
import { useStopwatchStore } from '../stores/stopwatchStore'

export function RoutineDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const start = useStopwatchStore((state) => state.start)
  const routine = routines.find((item) => item.id === id)

  if (!routine) {
    return (
      <main className="page-content">
        <section className="empty-state">
          <h1>Routine not found</h1>
          <p>The routine you requested does not exist.</p>
          <button type="button" onClick={() => navigate('/routines')}>
            Back to routines
          </button>
        </section>
      </main>
    )
  }

  const routineExercises = routine.exerciseIds
    .map((exerciseId) => exercises.find((exercise) => exercise.id === exerciseId))
    .filter((exercise) => exercise !== undefined)

  return (
    <main className="page-content">
      <Link className="back-link" to="/routines">
        ← All routines
      </Link>
      <header className="routine-detail-header">
        <p className="eyebrow">Workout routine</p>
        <h1>{routine.name}</h1>
        <p>{routine.description}</p>
      </header>
      <div className="routine-exercise-list">
        {routineExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} onStart={start} />
        ))}
      </div>
    </main>
  )
}
