import './App.css'
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/">
          Tempo<span>.</span>
        </a>
        <span className="topbar-caption">Workout timer</span>
      </header>
      <ExerciseLibraryPage />
    </div>
  )
}

export default App
