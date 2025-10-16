import React from 'react'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', message = 'Loading...', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-orange-200 border-t-orange-500 ${sizeClasses[size]}`}
      />
      {message && <p className='mt-2 text-gray-600 text-sm'>{message}</p>}
    </div>
  )
}

export default Loading
