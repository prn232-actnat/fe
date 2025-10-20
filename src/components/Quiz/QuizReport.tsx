import React from 'react'
import { useAppStore } from '@/stores'

// Mock data for quiz reports
const mockQuizReports = [
  {
    id: 1,
    studentName: 'John Smith',
    studentId: 'ST001',
    score: 85,
    totalQuestions: 10,
    correctAnswers: 8.5,
    timeSpent: 25, // minutes
    completedAt: '2024-01-15 14:30:00',
    status: 'completed' as const
  },
  {
    id: 2,
    studentName: 'Sarah Johnson',
    studentId: 'ST002',
    score: 92,
    totalQuestions: 10,
    correctAnswers: 9.2,
    timeSpent: 28,
    completedAt: '2024-01-15 14:35:00',
    status: 'completed' as const
  },
  {
    id: 3,
    studentName: 'Mike Wilson',
    studentId: 'ST003',
    score: 78,
    totalQuestions: 10,
    correctAnswers: 7.8,
    timeSpent: 30,
    completedAt: '2024-01-15 14:40:00',
    status: 'completed' as const
  },
  {
    id: 4,
    studentName: 'Emily Brown',
    studentId: 'ST004',
    score: 0,
    totalQuestions: 10,
    correctAnswers: 0,
    timeSpent: 0,
    completedAt: null,
    status: 'not_started' as const
  },
  {
    id: 5,
    studentName: 'David Lee',
    studentId: 'ST005',
    score: 0,
    totalQuestions: 10,
    correctAnswers: 0,
    timeSpent: 0,
    completedAt: null,
    status: 'in_progress' as const
  }
]

export const QuizReport: React.FC = () => {
  const { config, clearConfig } = useAppStore((s) => s.quiz)

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const averageScore = mockQuizReports
    .filter(report => report.status === 'completed')
    .reduce((sum, report) => sum + report.score, 0) / 
    mockQuizReports.filter(report => report.status === 'completed').length || 0

  const completedCount = mockQuizReports.filter(report => report.status === 'completed').length

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Quiz Report</h1>
          <button
            onClick={clearConfig}
            className="px-4 py-2 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-medium border border-gray-300 shadow-sm"
          >
            Back
          </button>
        </div>
        
        {config && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Quiz Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-700">Topic:</span>
                <span className="ml-2 text-blue-600">{config.topic}</span>
              </div>
              <div>
                <span className="font-medium text-blue-700">Questions:</span>
                <span className="ml-2 text-blue-600">{config.questionCount}</span>
              </div>
              <div>
                <span className="font-medium text-blue-700">Time Limit:</span>
                <span className="ml-2 text-blue-600">{config.timeLimit} minutes</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-blue-600">{mockQuizReports.length}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-yellow-600">
            {mockQuizReports.length - completedCount}
          </div>
          <div className="text-sm text-gray-600">Not Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="text-2xl font-bold text-purple-600">
            {averageScore.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockQuizReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {report.studentName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getScoreColor(report.score)}`}>
                      {report.status === 'completed' 
                        ? `${report.score}% (${report.correctAnswers}/${report.totalQuestions})`
                        : '-'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {report.status === 'completed' ? `${report.timeSpent} minutes` : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {report.completedAt || '-'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
