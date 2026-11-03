import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ExerciseCard } from './ExerciseCard'
import type { Exercise } from '../types'

const exercise: Exercise = {
  id: '1',
  name: 'Đẩy tạ đơn 1',
  category: 'Ngực',
  trainer: 'Minh Khang',
  muscle: 'Ngực',
  duration: 60,
  description: 'Bài tập ngực.',
}

describe('ExerciseCard', () => {
  it('adds an exercise to the selected routine', () => {
    const onAddToRoutine = vi.fn()
    render(<ExerciseCard exercise={exercise} onStart={vi.fn()} onAddToRoutine={onAddToRoutine} />)

    fireEvent.click(screen.getByRole('button', { name: '+ Giáo án' }))

    expect(onAddToRoutine).toHaveBeenCalledWith(exercise)
  })

  it('disables adding when no routine is selected', () => {
    render(<ExerciseCard exercise={exercise} onStart={vi.fn()} />)

    expect(screen.getByRole('button', { name: '+ Giáo án' })).toBeDisabled()
  })
})
