import { useState } from 'react'
import { useAppStore } from '@/stores'
import { QuizModal, QuizReport, QuizManager } from '@/components/Quiz'
import type { QuizConfig } from '@/stores/quiz-state/type'

export const Dashboard = () => {
  const { count: accountCount, increase: incAccount } = useAppStore((s) => s.account)
  const { count: quizCount, increase: incQuiz } = useAppStore((s) => s.quiz)
  const { setConfig } = useAppStore((s) => s.quiz)
  
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  const [showQuizReport, setShowQuizReport] = useState(false)
  const [showStudentQuiz, setShowStudentQuiz] = useState(false)

  const handleQuizConfirm = (config: QuizConfig) => {
    setConfig(config)
    setShowQuizReport(true)
  }

  const handleBackToDashboard = () => {
    setShowQuizReport(false)
    setShowStudentQuiz(false)
  }

  if (showQuizReport) {
    return <QuizReport />
  }

  if (showStudentQuiz) {
    return (
      <div>
        <div style={{ padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
          <button
            onClick={handleBackToDashboard}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
        <QuizManager />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Section */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Management</h2>
          <div className="text-3xl font-bold text-blue-600 mb-4">{accountCount}</div>
          <button 
            onClick={incAccount}
            style={{
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
            + Add Account
          </button>
        </div>

        {/* Quiz Section */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quiz Management</h2>
          <div className="text-3xl font-bold text-green-600 mb-4">{quizCount}</div>
          <div className="space-y-2">
            <button 
              onClick={() => setIsQuizModalOpen(true)}
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#059669',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#047857'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#059669'
              }}
            >
              Create New Quiz
            </button>
            <button 
              onClick={() => setShowStudentQuiz(true)}
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginBottom: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb'
              }}
            >
              Student Quiz View
            </button>
            <button 
              onClick={incQuiz}
              style={{
                width: '100%',
                padding: '8px 16px',
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
              + Add Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onConfirm={handleQuizConfirm}
      />
    </div>
  )
}
