import { create } from 'zustand'

interface SubjectState {
  deletionCount: number
  additionCount: number
  incrementDeletionCount: () => void
  incrementAdditionCount: () => void
}

const useSubjectStore = create<SubjectState>((set) => ({
  deletionCount: 0,
  additionCount: 0,
  incrementDeletionCount: () => set((state) => ({ deletionCount: state.deletionCount + 1 })),
  incrementAdditionCount: () => set((state) => ({ additionCount: state.additionCount + 1 })),
}))

export default useSubjectStore;