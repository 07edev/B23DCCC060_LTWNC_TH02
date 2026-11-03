import { describe, expect, it } from 'vitest'
import { formatDuration } from './format'

describe('formatDuration', () => {
  it.each([[0, '0:00'], [67, '1:07'], [120, '2:00']])('%s formats as %s', (seconds, expected) => {
    expect(formatDuration(seconds)).toBe(expected)
  })
})
