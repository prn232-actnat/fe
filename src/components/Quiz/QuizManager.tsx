import React from 'react'
import { useAppStore } from '@/stores'
import { StudentQuizList, QuizTaking, QuizResult } from './'

export const QuizManager: React.FC = () => {
  const { currentSession } = useAppStore((s) => s.quiz)

  // If there's an active quiz session
  if (currentSession) {
    // If quiz is completed, show results
    if (currentSession.isCompleted) {
      return <QuizResult />
    }
    // Otherwise show the quiz taking interface
    return <QuizTaking />
  }

  // If no active session, show quiz list
  return <StudentQuizList />
}
