import type { Routine } from '../types'

export const routines: Routine[] = [
  {
    id: 'morning-energy',
    name: 'Morning Energy',
    description: 'A balanced routine to wake up your body and build momentum.',
    exerciseIds: [1, 2, 3, 4],
  },
  {
    id: 'strength-foundation',
    name: 'Strength Foundation',
    description: 'A practical bodyweight session for full-body strength.',
    exerciseIds: [2, 6, 7, 4],
  },
  {
    id: 'mobility-reset',
    name: 'Mobility Reset',
    description: 'A gentle sequence for flexibility, balance, and recovery.',
    exerciseIds: [8, 4, 16, 24],
  },
]
