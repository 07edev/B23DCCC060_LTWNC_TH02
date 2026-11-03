import { describe, expect, it } from 'vitest'
import { routineReducer } from './RoutineContext'

describe('routineReducer', () => {
  const routine = { id: 'r1', name: 'Test', description: '', exerciseIds: ['1'] }
  it('creates, avoids duplicate exercises, removes exercise and routine', () => {
    let state = routineReducer([], { type: 'create', routine })
    state = routineReducer(state, { type: 'addExercise', id: 'r1', exerciseId: '1' })
    expect(state[0].exerciseIds).toEqual(['1'])
    state = routineReducer(state, { type: 'addExercise', id: 'r1', exerciseId: '2' })
    expect(state[0].exerciseIds).toEqual(['1', '2'])
    state = routineReducer(state, { type: 'removeExercise', id: 'r1', exerciseId: '1' })
    expect(state[0].exerciseIds).toEqual(['2'])
    expect(routineReducer(state, { type: 'remove', id: 'r1' })).toEqual([])
  })
})
