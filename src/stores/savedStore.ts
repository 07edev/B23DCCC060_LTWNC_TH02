import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SavedState = {
  savedIds: string[]
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      toggleSaved: (id) =>
        set((state) => ({
          savedIds: state.savedIds.includes(id)
            ? state.savedIds.filter((savedId) => savedId !== id)
            : [...state.savedIds, id],
        })),
      isSaved: (id) => get().savedIds.includes(id),
    }),
    { name: 'tempo-saved-exercises' },
  ),
)
