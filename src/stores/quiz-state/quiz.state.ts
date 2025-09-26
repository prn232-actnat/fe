import type { SubStore } from '../type'
import type { QuizState } from './type'

export const getQuizStore: SubStore<QuizState> = (set, get, _store) => ({
  count: 0,
  increase: () =>
    set((s) => {
      s.quiz.count += 1
    }),
  decrease: () =>
    set((s) => {
      s.quiz.count -= 1
    })
})
