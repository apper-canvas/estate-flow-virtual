import React from 'react'

const Textarea = ({ label, id, className = '', ...props }) => {
  return (
    <div>
      {label &amp;&amp; (
        <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none ${className}`}
        {...props}
      />
    </div>
  )
}

export default Textarea