import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import { ExerciseLibraryPage } from '../pages/ExerciseLibraryPage'
import { RoutineDetailPage } from '../pages/RoutineDetailPage'
import { RoutinesPage } from '../pages/RoutinesPage'
import { SavedExercisesPage } from '../pages/SavedExercisesPage'
import { useStopwatchStore } from '../stores/stopwatchStore'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <ExerciseLibraryPage /> },
      {
        path: 'saved',
        element: (
          <SavedExercisesPage
            onStart={(exercise) => useStopwatchStore.getState().start(exercise)}
          />
        ),
      },
      { path: 'routines', element: <RoutinesPage /> },
      { path: 'routines/:id', element: <RoutineDetailPage /> },
      {
        path: '*',
        element: (
          <main className="page-content">
            <section className="empty-state">
              <h1>Page not found</h1>
              <p>We could not find the page you requested.</p>
            </section>
          </main>
        ),
      },
    ],
  },
])
