import React, { useState } from 'react'
import { useAppStore } from '@/stores'
import { QuizPreview } from './QuizPreview'
import type { QuizQuestion } from '@/stores/quiz-state/type'

// Mock data for available quizzes
const mockAvailableQuizzes = [
  {
    id: 'quiz-1',
    title: 'English Grammar - Present Tense',
    topic: 'Present Tense',
    questionCount: 15,
    timeLimit: 20,
    status: 'not_started' as const,
    createdAt: '2024-01-15',
    description: 'Test your knowledge of present tense in English grammar'
  },
  {
    id: 'quiz-2',
    title: 'English Vocabulary - Animals',
    topic: 'Animals',
    questionCount: 12,
    timeLimit: 15,
    status: 'in_progress' as const,
    createdAt: '2024-01-14',
    description: 'Learn and test animal vocabulary in English'
  },
  {
    id: 'quiz-3',
    title: 'English Reading Comprehension',
    topic: 'Reading',
    questionCount: 10,
    timeLimit: 25,
    status: 'completed' as const,
    createdAt: '2024-01-13',
    description: 'Improve your reading comprehension skills',
    score: 85,
    completedAt: '2024-01-15 10:30:00'
  },
  {
    id: 'quiz-4',
    title: 'English Listening - Daily Conversations',
    topic: 'Listening',
    questionCount: 8,
    timeLimit: 18,
    status: 'completed' as const,
    createdAt: '2024-01-12',
    description: 'Practice listening to daily English conversations',
    score: 92,
    completedAt: '2024-01-14 16:45:00'
  }
]

// Mock questions for each quiz
const mockQuestions: Record<string, QuizQuestion[]> = {
  'quiz-1': [
    {
      id: 'q1',
      question: 'What is the correct form of the verb "to be" for "I"?',
      options: ['am', 'is', 'are', 'be'],
      correctAnswer: 0,
      explanation: 'The correct form of "to be" for "I" is "am".'
    },
    {
      id: 'q2',
      question: 'She _____ to school every day.',
      options: ['go', 'goes', 'going', 'gone'],
      correctAnswer: 1,
      explanation: 'With third person singular (she), we use "goes".'
    }
  ],
  'quiz-2': [
    {
      id: 'q1',
      question: 'What do you call a baby cat?',
      options: ['Puppy', 'Kitten', 'Cub', 'Chick'],
      correctAnswer: 1,
      explanation: 'A baby cat is called a kitten.'
    }
  ],
  'quiz-3': [
    {
      id: 'q1',
      question: 'What is the main idea of the passage?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'The main idea is clearly stated in the first paragraph.'
    }
  ],
  'quiz-4': [
    {
      id: 'q1',
      question: 'What did the speaker say about the weather?',
      options: ['It\'s sunny', 'It\'s raining', 'It\'s cold', 'It\'s hot'],
      correctAnswer: 1,
      explanation: 'The speaker mentioned it was raining heavily.'
    }
  ]
}

export const StudentQuizList: React.FC = () => {
  const { setCurrentSession } = useAppStore((s) => s.quiz)
  const [previewQuiz, setPreviewQuiz] = useState<any>(null)


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span>
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
      case 'not_started':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Not Started</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">-</span>
    }
  }

  const handleStartQuiz = (quiz: any) => {
    const questions = mockQuestions[quiz.id] || []
    const session = {
      id: `session-${Date.now()}`,
      config: {
        questionCount: quiz.questionCount,
        timeLimit: quiz.timeLimit,
        topic: quiz.topic
      },
      questions,
      currentQuestionIndex: 0,
      answers: new Array(quiz.questionCount).fill(null),
      startTime: new Date(),
      endTime: null,
      isCompleted: false,
      score: null
    }
    setCurrentSession(session)
  }

  const handlePreviewQuiz = (quiz: any) => {
    setPreviewQuiz(quiz)
  }

  const handleBackFromPreview = () => {
    setPreviewQuiz(null)
  }

  // Show preview screen if a quiz is selected for preview
  if (previewQuiz) {
    return <QuizPreview quiz={previewQuiz} onBack={handleBackFromPreview} />
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Quizzes</h1>
        <p className="text-gray-600">Choose a quiz to start practicing your English skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAvailableQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow border hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {quiz.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {quiz.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Questions:</span>
                  <span className="font-medium">{quiz.questionCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time Limit:</span>
                  <span className="font-medium">{quiz.timeLimit} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  {getStatusBadge(quiz.status)}
                </div>
                {quiz.status === 'completed' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Score:</span>
                      <span className="font-medium text-green-600">{quiz.score}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Completed:</span>
                      <span className="font-medium">{quiz.completedAt}</span>
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {quiz.status === 'not_started' && (
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
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
                    Start Quiz
                  </button>
                )}
                {quiz.status === 'in_progress' && (
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      backgroundColor: '#d97706',
                      color: 'white',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: '500',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#b45309'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#d97706'
                    }}
                  >
                    Continue
                  </button>
                )}
                {quiz.status === 'completed' && (
                  <>
                    <button
                      onClick={() => handlePreviewQuiz(quiz)}
                      style={{
                        flex: 1,
                        padding: '8px 16px',
                        backgroundColor: '#059669',
                        color: 'white',
                        borderRadius: '6px',
                        border: 'none',
                        fontWeight: '500',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#047857'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#059669'
                      }}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      style={{
                        flex: 1,
                        padding: '8px 16px',
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
                      Retake
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
