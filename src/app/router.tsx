import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AppLayout } from '../components/AppLayout'
import { ExerciseLibraryPage } from '../pages/ExerciseLibraryPage'
const RoutineDetailPage = lazy(() => import('../pages/RoutineDetailPage').then((module) => ({ default: module.RoutineDetailPage })))
const RoutinesPage = lazy(() => import('../pages/RoutinesPage').then((module) => ({ default: module.RoutinesPage })))
const SavedExercisesPage = lazy(() => import('../pages/SavedExercisesPage').then((module) => ({ default: module.SavedExercisesPage })))
import { useStopwatchStore } from '../stores/stopwatchStore'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <ExerciseLibraryPage /> },
      {
        path: 'saved',
        element: <Suspense fallback={<main className="page-content">Đang tải...</main>}><SavedExercisesPage
            onStart={(exercise) => useStopwatchStore.getState().start(exercise)}
          /></Suspense>,
      },
      { path: 'routines', element: <Suspense fallback={<main className="page-content">Đang tải...</main>}><RoutinesPage /></Suspense> },
      { path: 'routines/:id', element: <Suspense fallback={<main className="page-content">Đang tải...</main>}><RoutineDetailPage /></Suspense> },
      {
        path: '*',
        element: (
          <main className="page-content">
            <section className="empty-state">
              <h1>Không tìm thấy trang</h1>
              <p>Trang bạn yêu cầu không tồn tại.</p>
            </section>
          </main>
        ),
      },
    ],
  },
])
