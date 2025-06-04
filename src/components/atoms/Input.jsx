import React from 'react'

const Input = ({ 
  label, 
  id, 
  type = 'text', 
  className = '', 
  wrapperClassName = '',
  icon: IconComponent,
  iconPosition = 'left',
  ...props 
}) => {
  return (
    <div className={wrapperClassName}>
      {label &amp;&amp; (
        <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent &amp;&amp; iconPosition === 'left' &amp;&amp; (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${className} ${
            IconComponent &amp;&amp; iconPosition === 'left' ? 'pl-12' : ''
          } ${
            IconComponent &amp;&amp; iconPosition === 'right' ? 'pr-12' : ''
          }`}
          {...props}
        />
        {IconComponent &amp;&amp; iconPosition === 'right' &amp;&amp; (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-surface-400">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Input