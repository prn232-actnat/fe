import { create } from 'zustand'
import type { AppState } from './type'
import { immer } from 'zustand/middleware/immer'
import { getAccountStore } from './account-state'
import { getQuizStore } from './quiz-state'

export * from './account-state'
export * from './quiz-state'
export * from './type'

export const useAppStore = create<AppState>()(
  immer((set, get, store) => ({
    account: getAccountStore(set, get, store),
    quiz: getQuizStore(set, get, store)
  }))
)
