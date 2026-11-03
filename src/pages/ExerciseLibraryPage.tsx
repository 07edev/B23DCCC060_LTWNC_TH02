import { useMemo, useState, type CSSProperties } from 'react'
import { FixedSizeList } from 'react-window'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'
import type { Exercise } from '../types'

type ExerciseRowProps = {
  index: number
  style: CSSProperties
  data: {
    items: Exercise[]
    onStart: (exercise: Exercise) => void
  }
}

function ExerciseRow({ index, style, data }: ExerciseRowProps) {
  return (
    <div style={style}>
      <ExerciseCard exercise={data.items[index]} onStart={data.onStart} />
    </div>
  )
}

export function ExerciseLibraryPage() {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  const filteredExercises = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()

    return exercises.filter((exercise) => {
      const matchesKeyword =
        !normalizedKeyword ||
        exercise.name.toLowerCase().includes(normalizedKeyword)
      const matchesCategory =
        category === 'All' || exercise.category === category

      return matchesKeyword && matchesCategory
    })
  }, [category, keyword])

  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Training library</p>
          <h1>Find your next workout</h1>
          <p>Explore 10,000 exercises and start a focused session.</p>
        </div>
        <strong className="result-count">{filteredExercises.length} exercises</strong>
      </header>

      <section className="filters" aria-label="Exercise filters">
        <label>
          Search exercises
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by name"
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>All</option>
            <option>Cardio</option>
            <option>Strength</option>
            <option>Flexibility</option>
            <option>Balance</option>
          </select>
        </label>
      </section>

      <FixedSizeList
        className="exercise-list"
        height={520}
        itemCount={filteredExercises.length}
        itemSize={154}
        width="100%"
        itemData={{ items: filteredExercises, onStart: setSelectedExercise }}
      >
        {ExerciseRow}
      </FixedSizeList>

      {selectedExercise && (
        <div className="dialog-backdrop" role="presentation">
          <section className="exercise-dialog" role="dialog" aria-modal="true">
            <button
              className="close-button"
              type="button"
              aria-label="Close exercise details"
              onClick={() => setSelectedExercise(null)}
            >
              ×
            </button>
            <span className="category-badge">{selectedExercise.category}</span>
            <h2>{selectedExercise.name}</h2>
            <p>{selectedExercise.description}</p>
            <p className="dialog-duration">Suggested duration: {selectedExercise.duration}s</p>
          </section>
        </div>
      )}
    </main>
  )
}
