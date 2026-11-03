import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import { routines as initialRoutines } from '../data/routines'
import type { Routine } from '../types'

type Action =
  | { type: 'create'; routine: Routine }
  | { type: 'rename'; id: string; name: string }
  | { type: 'remove'; id: string }
  | { type: 'addExercise'; id: string; exerciseId: string }
  | { type: 'removeExercise'; id: string; exerciseId: string }

export function routineReducer(state: Routine[], action: Action): Routine[] {
  switch (action.type) {
    case 'create': return [...state, action.routine]
    case 'rename': return state.map((item) => item.id === action.id ? { ...item, name: action.name } : item)
    case 'remove': return state.filter((item) => item.id !== action.id)
    case 'addExercise': return state.map((item) => item.id === action.id && !item.exerciseIds.includes(action.exerciseId) ? { ...item, exerciseIds: [...item.exerciseIds, action.exerciseId] } : item)
    case 'removeExercise': return state.map((item) => item.id === action.id ? { ...item, exerciseIds: item.exerciseIds.filter((exerciseId) => exerciseId !== action.exerciseId) } : item)
  }

}

function routineLogger(state: Routine[], action: Action): Routine[] {
  const next = routineReducer(state, action)
  console.info('[RoutineContext]', action.type)
  return next
}

type RoutineContextValue = { routines: Routine[]; dispatch: React.Dispatch<Action> }
const RoutineContext = createContext<RoutineContextValue | null>(null)

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, dispatch] = useReducer(routineLogger, initialRoutines, (items) => {
    const stored = localStorage.getItem('tempo-routines')
    return stored ? JSON.parse(stored) as Routine[] : items
  })
  const value = useMemo(() => ({ routines, dispatch }), [routines])
  localStorage.setItem('tempo-routines', JSON.stringify(routines))
  return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>
}

export function useRoutines() {
  const value = useContext(RoutineContext)
  if (!value) throw new Error('useRoutines phải được dùng trong RoutineProvider')
  return value
}
