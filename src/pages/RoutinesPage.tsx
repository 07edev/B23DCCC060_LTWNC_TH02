import { Link } from 'react-router-dom'
import { routines } from '../data/routines'

export function RoutinesPage() {
  return (
    <main className="page-content">
      <header className="page-header">
        <div>
          <p className="eyebrow">Training plans</p>
          <h1>Workout routines</h1>
          <p>Follow a curated sequence or choose a routine for your next session.</p>
        </div>
        <strong className="result-count">{routines.length} routines</strong>
      </header>
      <div className="routine-grid">
        {routines.map((routine) => (
          <article className="routine-card" key={routine.id}>
            <p className="eyebrow">{routine.exerciseIds.length} exercises</p>
            <h2>{routine.name}</h2>
            <p>{routine.description}</p>
            <Link className="routine-link" to={`/routines/${routine.id}`}>
              View routine
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
