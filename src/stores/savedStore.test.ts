import { beforeEach, describe, expect, it } from 'vitest'
import { useSavedStore } from './savedStore'

describe('saved store', () => {
  beforeEach(() => {
    useSavedStore.setState({ savedIds: [] })
  })

  it('saves and unsaves an exercise', () => {
    const store = useSavedStore.getState()
    store.toggleSaved('7')
    expect(useSavedStore.getState().savedIds).toEqual(['7'])
    expect(useSavedStore.getState().isSaved('7')).toBe(true)

    store.toggleSaved('7')
    expect(useSavedStore.getState().savedIds).toEqual([])
    expect(useSavedStore.getState().isSaved('7')).toBe(false)
  })
})
