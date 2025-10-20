export interface QuizConfig {
  questionCount: number
  timeLimit: number // in minutes
  topic: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // index of correct option
  explanation?: string
}

export interface QuizSession {
  id: string
  config: QuizConfig
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: (number | null)[]
  startTime: Date | null
  endTime: Date | null
  isCompleted: boolean
  score: number | null
}

export interface QuizState {
  count: number
  increase: () => void
  decrease: () => void
  config: QuizConfig | null
  setConfig: (config: QuizConfig) => void
  clearConfig: () => void
  currentSession: QuizSession | null
  setCurrentSession: (session: QuizSession) => void
  updateAnswer: (questionIndex: number, answer: number) => void
  completeQuiz: (score: number) => void
  clearSession: () => void
}
