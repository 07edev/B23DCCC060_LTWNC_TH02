import { describe, expect, it } from 'vitest'
import { exercises } from './exercises'

describe('exercise data', () => {
  it('creates exactly 10000 exercises with required fields', () => {
    expect(exercises).toHaveLength(10_000)
    expect(exercises[0]).toMatchObject({
      id: '1',
      name: expect.any(String),
      trainer: expect.any(String),
      muscle: expect.any(String),
      duration: expect.any(Number),
    })
    expect(new Set(exercises.map((exercise) => exercise.id)).size).toBe(10_000)
  })
})
