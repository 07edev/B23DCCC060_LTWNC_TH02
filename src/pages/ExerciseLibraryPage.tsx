import { useCallback, useMemo, useState, type CSSProperties } from 'react'
import { FixedSizeList } from 'react-window'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'
import type { Exercise } from '../types'
import { useStopwatchStore } from '../stores/stopwatchStore'
import { useDebounce } from '../hooks/useDebounce'
import { useRoutines } from '../contexts/RoutineContext'

type RowProps = { index: number; style: CSSProperties; data: { items: Exercise[]; onStart: (exercise: Exercise) => void; onAddToRoutine?: (exercise: Exercise) => void } }

function ExerciseRow({ index, style, data }: RowProps) {
  return <div style={style}><ExerciseCard exercise={data.items[index]} onStart={data.onStart} onAddToRoutine={data.onAddToRoutine} /></div>
}

export function ExerciseLibraryPage() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [sort, setSort] = useState('Mặc định')
  const debouncedKeyword = useDebounce(keyword)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [selectedRoutineId, setSelectedRoutineId] = useState('')
  const [routineMessage, setRoutineMessage] = useState('')
  const { routines, dispatch } = useRoutines()
  const start = useStopwatchStore((state) => state.start)
  const handleStart = useCallback((exercise: Exercise) => {
    setSelectedExercise(exercise)
    start(exercise)
  }, [start])

  const filteredExercises = useMemo(() => {
    const normalized = debouncedKeyword.trim().toLowerCase()
    const result = exercises.filter((exercise) => {
      const matchesKeyword = !normalized || exercise.name.toLowerCase().includes(normalized) || exercise.trainer.toLowerCase().includes(normalized)
      return matchesKeyword && (category === 'Tất cả' || exercise.muscle === category)
    })
    return [...result].sort((a, b) => sort === 'Tên A-Z' ? a.name.localeCompare(b.name) : sort === 'Thời lượng tăng dần' ? a.duration - b.duration : Number(a.id) - Number(b.id))
  }, [category, debouncedKeyword, sort])
  const addToRoutine = useCallback((exercise: Exercise) => {
    if (!selectedRoutineId) {
      setRoutineMessage('Hãy chọn giáo án trước khi thêm bài tập.')
      return
    }
    dispatch({ type: 'addExercise', id: selectedRoutineId, exerciseId: exercise.id })
    setRoutineMessage(`Đã thêm "${exercise.name}" vào giáo án.`)
  }, [dispatch, selectedRoutineId])
  const listData = useMemo(() => ({ items: filteredExercises, onStart: handleStart, onAddToRoutine: addToRoutine }), [addToRoutine, filteredExercises, handleStart])

  return (
    <main className="page-content">
      <header className="page-header">
        <div><p className="eyebrow">WORKOUT TIMER</p><h1>Kho bài tập</h1></div>
        <span className="build-tag">10.000 bài tập</span>
      </header>
      <section className="filters" aria-label="Bộ lọc bài tập">
        <label>Tìm kiếm<input type="search" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tên bài tập hoặc huấn luyện viên" /></label>
        <label>Nhóm cơ<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Tất cả</option>{['Ngực', 'Chân', 'Tay', 'Lưng', 'Vai'].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Giáo án đang chọn<select value={selectedRoutineId} onChange={(event) => setSelectedRoutineId(event.target.value)}><option value="">Chưa có giáo án</option>{routines.map((routine) => <option key={routine.id} value={routine.id}>{routine.name}</option>)}</select></label>
        <label>Sắp xếp<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Mặc định</option><option>Tên A-Z</option><option>Thời lượng tăng dần</option></select></label>
      </section>
      {routineMessage && <p className="form-message" role="status">{routineMessage}</p>}
      <p className="result-summary">Tìm thấy {filteredExercises.length} bài tập</p>
      {filteredExercises.length === 0 ? <section className="empty-state"><h2>Không tìm thấy bài tập nào</h2><p>Hãy thử từ khóa hoặc bộ lọc khác.</p></section> : <div className="exercise-table">
        <div className="exercise-table-header"><span>#</span><span>BÀI TẬP</span><span>HUẤN LUYỆN VIÊN</span><span>NHÓM CƠ</span><span>THỜI LƯỢNG</span><span>THAO TÁC</span></div>
        <FixedSizeList className="exercise-list" height={520} itemCount={filteredExercises.length} itemSize={72} width="100%" itemData={listData}>{ExerciseRow}</FixedSizeList>
      </div>}
      {selectedExercise && <div className="dialog-backdrop" role="presentation"><section className="exercise-dialog" role="dialog" aria-modal="true"><button className="close-button" type="button" aria-label="Đóng" onClick={() => setSelectedExercise(null)}>×</button><span className="category-badge">{selectedExercise.muscle}</span><h2>{selectedExercise.name}</h2><p>{selectedExercise.description}</p></section></div>}
    </main>
  )
}
