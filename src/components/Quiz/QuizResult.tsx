import React from 'react'
import { useAppStore } from '@/stores'

export const QuizResult: React.FC = () => {
  const { currentSession, clearSession } = useAppStore((s) => s.quiz)

  if (!currentSession || !currentSession.isCompleted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Quiz Results</h2>
        <p className="text-gray-600">Please complete a quiz to see results.</p>
      </div>
    )
  }

  const { config, questions, answers, score, startTime, endTime } = currentSession
  const timeSpent = endTime && startTime ? 
    Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60) : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent! Outstanding performance!'
    if (score >= 80) return 'Great job! Well done!'
    if (score >= 70) return 'Good work! Keep it up!'
    if (score >= 60) return 'Not bad! Try to improve more.'
    return 'Keep practicing! You can do better!'
  }

  const correctAnswers = questions.filter((question, index) => 
    answers[index] === question.correctAnswer
  ).length

  const handleRetakeQuiz = () => {
    // Reset the quiz session
    const newSession = {
      ...currentSession,
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(null),
      startTime: new Date(),
      endTime: null,
      isCompleted: false,
      score: null
    }
    useAppStore.getState().quiz.setCurrentSession(newSession)
  }

  const handleBackToQuizzes = () => {
    clearSession()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h1>
          <p className="text-gray-600">Here are your results for "{config.topic}"</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(score!)}`}>
              {score}%
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {getScoreMessage(score!)}
            </h2>
            <p className="text-gray-600">
              You answered {correctAnswers} out of {questions.length} questions correctly
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{questions.length}</div>
            <div className="text-gray-600">Total Questions</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}</div>
            <div className="text-gray-600">Correct Answers</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{timeSpent}m</div>
            <div className="text-gray-600">Time Spent</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Question Review</h3>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.correctAnswer
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-800">
                      Question {index + 1}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isCorrect 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{question.question}</p>
                  
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      let optionClass = 'p-2 rounded border '
                      if (optionIndex === question.correctAnswer) {
                        optionClass += 'bg-green-50 border-green-200 text-green-800'
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        optionClass += 'bg-red-50 border-red-200 text-red-800'
                      } else {
                        optionClass += 'bg-gray-50 border-gray-200 text-gray-700'
                      }
                      
                      return (
                        <div key={optionIndex} className={optionClass}>
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <span className="ml-2 text-red-600 font-medium">✗ Your Answer</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={handleRetakeQuiz}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb'
            }}
          >
            Retake Quiz
          </button>
          <button
            onClick={handleBackToQuizzes}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4b5563',
              color: 'white',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#374151'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563'
            }}
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    </div>
  )
}
