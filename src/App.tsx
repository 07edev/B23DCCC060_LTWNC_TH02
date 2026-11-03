import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { ThemeProvider } from './contexts/ThemeContext'
import { RoutineProvider } from './contexts/RoutineContext'

function App() {
  return <ThemeProvider><RoutineProvider><RouterProvider router={router} /></RoutineProvider></ThemeProvider>
}

export default App
