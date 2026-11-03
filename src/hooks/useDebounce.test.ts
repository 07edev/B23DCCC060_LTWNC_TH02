import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  it('updates only after 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), { initialProps: { value: 'a' } })
    rerender({ value: 'b' })
    expect(result.current).toBe('a')
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('b')
    vi.useRealTimers()
  })
})
