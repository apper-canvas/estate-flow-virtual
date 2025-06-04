import React from 'react'

const Select = ({ label, id, className = '', children, ...props }) => {
  return (
    <div>
      {label &amp;&amp; (
        <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-2">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

export default Select