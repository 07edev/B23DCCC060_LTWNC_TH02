export type ExerciseCategory =
  | 'Ngực'
  | 'Chân'
  | 'Tay'
  | 'Lưng'
  | 'Vai'

export type Exercise = {
  id: string
  name: string
  category: ExerciseCategory
  trainer: string
  muscle: ExerciseCategory
  duration: number
  description: string
}

export type Routine = {
  id: string
  name: string
  description: string
  exerciseIds: string[]
}
