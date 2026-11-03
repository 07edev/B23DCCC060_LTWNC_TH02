import { useState } from 'react'
import './App.css'
import { StopwatchBar } from './components/StopwatchBar'
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage'
import { SavedExercisesPage } from './pages/SavedExercisesPage'
import { useStopwatchStore } from './stores/stopwatchStore'
import type { Exercise } from './types'

type View = 'library' | 'saved'

function App() {
  const [view, setView] = useState<View>('library')
  const start = useStopwatchStore((state) => state.start)
  const startExercise = (exercise: Exercise) => start(exercise)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" onClick={() => setView('library')}>
          Tempo<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <button
            type="button"
            className={view === 'library' ? 'active-nav' : ''}
            onClick={() => setView('library')}
          >
            Library
          </button>
          <button
            type="button"
            className={view === 'saved' ? 'active-nav' : ''}
            onClick={() => setView('saved')}
          >
            Saved
          </button>
        </nav>
        <span className="topbar-caption">Workout timer</span>
      </header>
      {view === 'library' ? (
        <ExerciseLibraryPage />
      ) : (
        <SavedExercisesPage onStart={startExercise} />
      )}
      <StopwatchBar />
    </div>
  )
}

export default App
