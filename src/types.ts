export type ExerciseCategory =
  | 'Cardio'
  | 'Strength'
  | 'Flexibility'
  | 'Balance'

export type Exercise = {
  id: number
  name: string
  category: ExerciseCategory
  duration: number
  description: string
}

export type Routine = {
  id: string
  name: string
  description: string
  exerciseIds: number[]
}
