import type { SubStore } from '../type'
import type { QuizState, QuizConfig, QuizSession } from './type'

export const getQuizStore: SubStore<QuizState> = (set, get, _store) => ({
  count: 0,
  increase: () =>
    set((s) => {
      s.quiz.count += 1
    }),
  decrease: () =>
    set((s) => {
      s.quiz.count -= 1
    }),
  config: null,
  setConfig: (config: QuizConfig) =>
    set((s) => {
      s.quiz.config = config
    }),
  clearConfig: () =>
    set((s) => {
      s.quiz.config = null
    }),
  currentSession: null,
  setCurrentSession: (session: QuizSession) =>
    set((s) => {
      s.quiz.currentSession = session
    }),
  updateAnswer: (questionIndex: number, answer: number) =>
    set((s) => {
      if (s.quiz.currentSession) {
        s.quiz.currentSession.answers[questionIndex] = answer
      }
    }),
  completeQuiz: (score: number) =>
    set((s) => {
      if (s.quiz.currentSession) {
        s.quiz.currentSession.isCompleted = true
        s.quiz.currentSession.score = score
        s.quiz.currentSession.endTime = new Date()
      }
    }),
  clearSession: () =>
    set((s) => {
      s.quiz.currentSession = null
    })
})
