import React from 'react'
import { useAppStore } from '@/stores'

interface QuizPreviewProps {
  quiz: {
    id: string
    title: string
    topic: string
    questionCount: number
    timeLimit: number
    score: number
    completedAt: string
    description: string
  }
  onBack: () => void
}

export const QuizPreview: React.FC<QuizPreviewProps> = ({ quiz, onBack }) => {
  const { setCurrentSession } = useAppStore((s) => s.quiz)

  // Mock questions for preview (same as in StudentQuizList)
  const mockQuestions: Record<string, any[]> = {
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

  const questions = mockQuestions[quiz.id] || []

  const handleRetakeQuiz = () => {
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

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#f8fafc',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)', 
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0,
              marginBottom: '4px'
            }}>
              Quiz Preview - {quiz.title}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              margin: 0
            }}>
              Completed on {quiz.completedAt} • Score: {quiz.score}%
            </p>
          </div>
          <button
            onClick={onBack}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
            }}
          >
            ← Back to Quizzes
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        overflow: 'hidden'
      }}>
        {/* Left Sidebar - Quiz Info */}
        <div style={{
          width: '320px',
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          padding: '24px',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '20px',
            margin: 0,
            marginBottom: '20px'
          }}>
            Quiz Information
          </h3>
          
          {/* Quiz Stats */}
          <div style={{ 
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ 
                fontSize: '48px', 
                fontWeight: 'bold', 
                color: quiz.score >= 80 ? '#059669' : quiz.score >= 60 ? '#d97706' : '#dc2626',
                marginBottom: '8px'
              }}>
                {quiz.score}%
              </div>
              <div style={{ fontSize: '16px', color: '#6b7280' }}>
                Final Score
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                  {quiz.questionCount}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Questions</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                  {quiz.timeLimit}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Minutes</div>
              </div>
            </div>
          </div>

          {/* Quiz Details */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
              Description
            </h4>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5', margin: 0 }}>
              {quiz.description}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={handleRetakeQuiz}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px',
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
          </div>
        </div>

        {/* Main Content Area - Questions Review */}
        <div style={{ 
          flex: 1, 
          padding: '32px', 
          overflowY: 'auto',
          backgroundColor: 'white'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '32px',
              margin: 0,
              marginBottom: '32px'
            }}>
              Question Review
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {questions.map((question, index) => (
                <div key={question.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '24px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: '16px' 
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#1f2937',
                      margin: 0
                    }}>
                      Question {index + 1}
                    </h3>
                    <div style={{
                      padding: '4px 12px',
                      backgroundColor: '#d1fae5',
                      color: '#059669',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      ✓ Correct
                    </div>
                  </div>
                  
                  <p style={{ 
                    fontSize: '18px', 
                    color: '#1f2937', 
                    marginBottom: '20px',
                    lineHeight: '1.5',
                    margin: 0,
                    marginBottom: '20px'
                  }}>
                    {question.question}
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} style={{
                        padding: '16px 20px',
                        borderRadius: '8px',
                        border: optionIndex === question.correctAnswer 
                          ? '2px solid #059669' 
                          : '1px solid #e5e7eb',
                        backgroundColor: optionIndex === question.correctAnswer 
                          ? '#f0fdf4' 
                          : '#f9fafb',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: optionIndex === question.correctAnswer 
                            ? '#059669' 
                            : '#d1d5db',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {String.fromCharCode(65 + optionIndex)}
                        </div>
                        <span style={{ 
                          color: '#1f2937', 
                          fontSize: '16px',
                          fontWeight: '500'
                        }}>
                          {option}
                        </span>
                        {optionIndex === question.correctAnswer && (
                          <span style={{
                            marginLeft: 'auto',
                            color: '#059669',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            ✓ Correct Answer
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div style={{
                      marginTop: '16px',
                      padding: '16px',
                      backgroundColor: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '8px'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#1e40af',
                        margin: 0,
                        lineHeight: '1.5'
                      }}>
                        <span style={{ fontWeight: '600' }}>Explanation:</span> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
