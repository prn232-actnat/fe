import type { StateCreator } from 'zustand/vanilla'
import type { AccountState } from './account-state'
import type { QuizState } from './quiz-state'

export type AppState = {
  account: AccountState
  quiz: QuizState
}

export type SubStore<T> = StateCreator<AppState, [['zustand/immer', never]], [], T>
