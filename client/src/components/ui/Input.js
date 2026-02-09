'use client'

import { forwardRef } from 'react'

const Input = forwardRef(({
  className = '',
  variant = 'default',
  error,
  ...props
}, ref) => {
  const variants = {
    default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500'
  }

  return (
    <div className="w-full">
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-lg border
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${variants[error ? 'error' : variant]}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input