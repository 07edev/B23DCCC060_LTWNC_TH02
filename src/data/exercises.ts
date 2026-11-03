import type { Exercise, ExerciseCategory } from '../types'

const categories: ExerciseCategory[] = [
  'Cardio',
  'Strength',
  'Flexibility',
  'Balance',
]

const exerciseNames = [
  'Jumping Jacks',
  'Bodyweight Squats',
  'Mountain Climbers',
  'Plank Hold',
  'High Knees',
  'Lunges',
  'Push Ups',
  'Shoulder Stretch',
]

export const exercises: Exercise[] = Array.from({ length: 10_000 }, (_, index) => {
  const name = exerciseNames[index % exerciseNames.length]
  const category = categories[index % categories.length]

  return {
    id: index + 1,
    name: `${name} ${index + 1}`,
    category,
    duration: 30 + ((index * 15) % 271),
    description: `A focused ${category.toLowerCase()} session for building a consistent training habit.`,
  }
})
