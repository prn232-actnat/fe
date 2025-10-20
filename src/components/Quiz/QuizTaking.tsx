import React, { useState, useEffect } from 'react'
import { useAppStore } from '@/stores'

export const QuizTaking: React.FC = () => {
  const { currentSession, updateAnswer, completeQuiz, clearSession } = useAppStore((s) => s.quiz)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  useEffect(() => {
    if (!currentSession) return

    // Calculate time left in seconds
    const totalSeconds = currentSession.config.timeLimit * 60
    const elapsed = currentSession.startTime ? 
      Math.floor((Date.now() - currentSession.startTime.getTime()) / 1000) : 0
    setTimeLeft(Math.max(0, totalSeconds - elapsed))

    // Update time every second
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up, auto submit
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentSession])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }


  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    updateAnswer(questionIndex, answerIndex)
  }

  const handleNextQuestion = () => {
    if (currentSession && currentSession.currentQuestionIndex < currentSession.questions.length - 1) {
      // Move to next question
      const newSession = {
        ...currentSession,
        currentQuestionIndex: currentSession.currentQuestionIndex + 1
      }
      useAppStore.getState().quiz.setCurrentSession(newSession)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentSession && currentSession.currentQuestionIndex > 0) {
      // Move to previous question
      const newSession = {
        ...currentSession,
        currentQuestionIndex: currentSession.currentQuestionIndex - 1
      }
      useAppStore.getState().quiz.setCurrentSession(newSession)
    }
  }

  const handleSubmitQuiz = () => {
    if (!currentSession) return

    // Calculate score
    let correctAnswers = 0
    currentSession.questions.forEach((question, index) => {
      const userAnswer = currentSession.answers[index]
      if (userAnswer === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / currentSession.questions.length) * 100)
    completeQuiz(score)
    setShowConfirmSubmit(false)
  }

  const handleExitQuiz = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      clearSession()
    }
  }

  if (!currentSession) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Active Quiz</h2>
        <p className="text-gray-600">Please select a quiz to start.</p>
      </div>
    )
  }

  const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex]
  const progress = ((currentSession.currentQuestionIndex + 1) / currentSession.questions.length) * 100

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
      {/* Header - Fixed */}
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
              {currentSession.config.topic}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              margin: 0
            }}>
              Question {currentSession.currentQuestionIndex + 1} of {currentSession.questions.length}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: timeLeft <= 60 ? '#dc2626' : timeLeft <= 300 ? '#d97706' : '#059669',
              padding: '6px 12px',
              backgroundColor: timeLeft <= 60 ? '#fef2f2' : timeLeft <= 300 ? '#fffbeb' : '#f0fdf4',
              borderRadius: '6px',
              border: `1px solid ${timeLeft <= 60 ? '#fecaca' : timeLeft <= 300 ? '#fed7aa' : '#bbf7d0'}`
            }}>
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={handleExitQuiz}
              style={{
                padding: '6px 12px',
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
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Flexible */}
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden'
      }}>
        {/* Left Sidebar - Question Navigation */}
        <div style={{
          width: '280px',
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          padding: '20px',
          overflowY: 'auto',
          flexShrink: 0
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '16px',
            margin: 0,
            marginBottom: '16px'
          }}>
            Question Navigation
          </h3>
          
          {/* Progress Summary */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Answered</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>
                {currentSession.answers.filter(answer => answer !== null).length}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
                {currentSession.questions.length}
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '8px',
            marginBottom: '20px'
          }}>
            {currentSession.questions.map((_, index) => {
              const isAnswered = currentSession.answers[index] !== null
              const isCurrent = index === currentSession.currentQuestionIndex
              const isFlagged = false // TODO: Add flagging functionality
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    const newSession = {
                      ...currentSession,
                      currentQuestionIndex: index
                    }
                    useAppStore.getState().quiz.setCurrentSession(newSession)
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: isCurrent ? '2px solid #2563eb' : '1px solid #d1d5db',
                    backgroundColor: isCurrent 
                      ? '#eff6ff' 
                      : isAnswered 
                        ? '#d1fae5' 
                        : '#f9fafb',
                    color: isCurrent 
                      ? '#2563eb' 
                      : isAnswered 
                        ? '#059669' 
                        : '#6b7280',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = isAnswered ? '#bbf7d0' : '#f3f4f6'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = isAnswered ? '#d1fae5' : '#f9fafb'
                    }
                  }}
                >
                  {index + 1}
                  {isFlagged && (
                    <div style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#f59e0b',
                      borderRadius: '50%'
                    }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#d1fae5', 
                borderRadius: '4px', 
                marginRight: '8px' 
              }} />
              Answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#f9fafb', 
                borderRadius: '4px', 
                marginRight: '8px',
                border: '1px solid #d1d5db'
              }} />
              Not answered
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#eff6ff', 
                borderRadius: '4px', 
                marginRight: '8px',
                border: '2px solid #2563eb'
              }} />
              Current question
            </div>
          </div>
        </div>

        {/* Main Content Area - Fixed Height */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0 // Important for flex child to shrink properly
        }}>
          {/* Question Content - Fixed Height */}
          <div style={{ 
            flex: 1, // Take remaining space
            padding: '32px', 
            overflowY: 'auto',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0 // Important for flex child to shrink
          }}>
            <div style={{ 
              maxWidth: '800px', 
              margin: '0 auto', 
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Question Title - Fixed Height */}
              <div style={{ 
                minHeight: '120px',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  lineHeight: '1.4',
                  margin: 0,
                  width: '100%'
                }}>
                  {currentQuestion.question}
                </h2>
              </div>
              
              {/* Answer Options - Fixed Height Container */}
              <div style={{ 
                flex: 1,
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                minHeight: '400px', // Minimum height for options
                maxHeight: '500px', // Maximum height to prevent too much stretching
                overflowY: 'auto' // Scroll if content exceeds max height
              }}>
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '20px 24px',
                      border: currentSession.answers[currentSession.currentQuestionIndex] === index 
                        ? '2px solid #2563eb' 
                        : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      backgroundColor: currentSession.answers[currentSession.currentQuestionIndex] === index 
                        ? '#eff6ff' 
                        : 'white',
                      transition: 'all 0.2s ease',
                      boxShadow: currentSession.answers[currentSession.currentQuestionIndex] === index 
                        ? '0 4px 6px -1px rgba(37, 99, 235, 0.1)' 
                        : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                      minHeight: '60px', // Fixed height for each option
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      if (currentSession.answers[currentSession.currentQuestionIndex] !== index) {
                        e.currentTarget.style.borderColor = '#9ca3af'
                        e.currentTarget.style.backgroundColor = '#f9fafb'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSession.answers[currentSession.currentQuestionIndex] !== index) {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.backgroundColor = 'white'
                      }
                    }}
                  >
                    <input
                      type="radio"
                      name={`question-${currentSession.currentQuestionIndex}`}
                      checked={currentSession.answers[currentSession.currentQuestionIndex] === index}
                      onChange={() => handleAnswerSelect(currentSession.currentQuestionIndex, index)}
                      style={{
                        marginRight: '16px',
                        width: '20px',
                        height: '20px',
                        accentColor: '#2563eb',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ 
                      color: '#1f2937', 
                      fontSize: '18px',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      wordWrap: 'break-word'
                    }}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Footer - Fixed */}
          <div style={{ 
            backgroundColor: 'white', 
            borderTop: '1px solid #e5e7eb',
            padding: '20px 32px',
            flexShrink: 0
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentSession.currentQuestionIndex === 0}
                style={{
                  padding: '12px 24px',
                  backgroundColor: currentSession.currentQuestionIndex === 0 ? '#f9fafb' : '#f3f4f6',
                  color: currentSession.currentQuestionIndex === 0 ? '#9ca3af' : '#1f2937',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontWeight: '500',
                  cursor: currentSession.currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  opacity: currentSession.currentQuestionIndex === 0 ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (currentSession.currentQuestionIndex > 0) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentSession.currentQuestionIndex > 0) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                  }
                }}
              >
                ← Previous
              </button>

              <div style={{ display: 'flex', gap: '12px' }}>
                {currentSession.currentQuestionIndex === currentSession.questions.length - 1 ? (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    style={{
                      padding: '12px 32px',
                      backgroundColor: '#059669',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '16px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#047857'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#059669'
                    }}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    style={{
                      padding: '12px 32px',
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
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              width: '100%',
              maxWidth: '448px',
              margin: '0 16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
              Submit Quiz?
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Are you sure you want to submit your quiz? You cannot change your answers after submission.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirmSubmit(false)}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuiz}
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
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
