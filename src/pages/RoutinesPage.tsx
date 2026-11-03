import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useRoutines } from '../contexts/RoutineContext'
import { exercises } from '../data/exercises'
import { formatDuration } from '../utils/format'

export function RoutinesPage() {
  const { routines, dispatch } = useRoutines()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const createRoutine = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Vui lòng nhập tên giáo án.')
      return
    }
    dispatch({ type: 'create', routine: { id: crypto.randomUUID(), name: trimmed, description: 'Giáo án cá nhân của bạn.', exerciseIds: [] } })
    setName('')
    setError('')
  }
  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Kế hoạch tập luyện</p>
          <h1>Danh sách giáo án</h1>
          <p>Chọn một giáo án phù hợp cho buổi tập tiếp theo của bạn.</p>
        </div>
        <strong className="result-count">{routines.length} giáo án</strong>
      </header>
      <form className="routine-create-form" onSubmit={(event) => { event.preventDefault(); createRoutine() }}>
        <input aria-label="Tên giáo án mới" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tên giáo án mới" />
        <button type="submit">Tạo giáo án</button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="routine-grid">
        {routines.map((routine) => (
          <article className="routine-card" key={routine.id}>
            <p className="eyebrow">{routine.exerciseIds.length} bài tập · {formatDuration(routine.exerciseIds.reduce((total, id) => total + (exercises.find((exercise) => exercise.id === id)?.duration ?? 0), 0))}</p>
            <h2>{routine.name}</h2>
            <p>{routine.description}</p>
            <span className="routine-meta">{routine.exerciseIds.length} bài tập · Tổng {formatDuration(routine.exerciseIds.reduce((total, id) => total + (exercises.find((exercise) => exercise.id === id)?.duration ?? 0), 0))}</span>
            <button type="button" className="routine-rename" onClick={() => {
              const nextName = window.prompt('Tên giáo án mới', routine.name)?.trim()
              if (nextName) dispatch({ type: 'rename', id: routine.id, name: nextName })
            }}>Đổi tên</button>
            <button type="button" className="routine-delete" onClick={() => dispatch({ type: 'remove', id: routine.id })}>Xóa</button>
            <Link className="routine-link" to={`/routines/${routine.id}`}>
              Xem chi tiết
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
