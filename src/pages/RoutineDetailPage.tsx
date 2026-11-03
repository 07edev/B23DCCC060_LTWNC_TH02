import { Link, useNavigate, useParams } from 'react-router-dom'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'
import { useRoutines } from '../contexts/RoutineContext'
import { useStopwatchStore } from '../stores/stopwatchStore'
import { useMemo } from 'react'
import { formatDuration } from '../utils/format'

export function RoutineDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { routines, dispatch } = useRoutines()
  const routine = routines.find((item) => item.id === id)
  const availableExercises = useMemo(
    () => exercises.filter((exercise) => !routine?.exerciseIds.includes(exercise.id)),
    [routine],
  )
  const start = useStopwatchStore((state) => state.start)
  const startSession = useStopwatchStore((state) => state.startSession)

  if (!routine) {
    return (
      <main className="page-content">
        <section className="empty-state">
          <h1>Không tìm thấy giáo án</h1>
          <p>Giáo án bạn yêu cầu không tồn tại.</p>
          <button type="button" onClick={() => navigate('/routines')}>
            Quay lại danh sách giáo án
          </button>
        </section>
      </main>
    )
  }

  const routineExercises = routine.exerciseIds
    .map((exerciseId) => exercises.find((exercise) => exercise.id === exerciseId))
    .filter((exercise): exercise is (typeof exercises)[number] => exercise !== undefined)
  const totalDuration = routineExercises.reduce((total, exercise) => total + exercise.duration, 0)

  return (
    <main className="page-content">
      <Link className="back-link" to="/routines">
        ← Tất cả giáo án
      </Link>
      <header className="routine-detail-header">
        <p className="eyebrow">Chi tiết giáo án</p>
        <h1>{routine.name}</h1>
        <p>{routine.description}</p>
        <span className="routine-meta">{routineExercises.length} bài tập · Tổng {formatDuration(totalDuration)}</span>
        <button type="button" onClick={() => startSession(routineExercises)}>Bắt đầu giáo án</button>
      </header>
      <label className="routine-add-exercise">Thêm bài tập
        <select defaultValue="" onChange={(event) => {
          if (event.target.value) dispatch({ type: 'addExercise', id: routine.id, exerciseId: event.target.value })
          event.target.value = ''
        }}>
          <option value="">Chọn bài tập</option>
          {availableExercises.slice(0, 100).map((exercise) => <option key={exercise.id} value={exercise.id}>{exercise.name}</option>)}
        </select>
      </label>
      <div className="routine-exercise-list">
        {routineExercises.map((exercise) => (
          <div className="routine-detail-row" key={exercise.id}>
            <ExerciseCard exercise={exercise} onStart={start} />
            <button type="button" onClick={() => dispatch({ type: 'removeExercise', id: routine.id, exerciseId: exercise.id })}>Xóa khỏi giáo án</button>
          </div>
        ))}
      </div>
    </main>
  )
}
