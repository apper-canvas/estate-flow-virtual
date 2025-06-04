import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'icon'
  size = 'md', // 'sm', 'md', 'lg'
  className = '', 
  icon: IconComponent, // Renamed to avoid conflict with 'icon' prop
  iconPosition = 'left', // 'left', 'right'
  loading = false,
  ...props 
}) => {
  const baseClasses = "flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg focus:ring-primary/50",
    secondary: "bg-surface-200 text-surface-800 hover:bg-surface-300 shadow-sm focus:ring-surface-400/50",
    ghost: "text-surface-700 hover:text-primary hover:bg-surface-100 focus:ring-surface-200/50",
    outline: "border border-surface-300 text-surface-700 hover:bg-surface-50 focus:ring-surface-200/50",
    link: "text-primary hover:text-primary-dark underline-offset-4 hover:underline focus:ring-primary/50",
    transparent: "bg-transparent text-surface-700 hover:bg-surface-100 focus:ring-surface-200/50"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    icon: "p-2" // For icon-only buttons
  };

  const currentSizeClass = IconComponent &amp;&amp; !children ? sizeClasses.icon : sizeClasses[size];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${currentSizeClass} ${className} ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          {/* Using a generic spinner or passing it as a prop for flexibility */}
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {IconComponent &amp;&amp; iconPosition === 'left' &amp;&amp; <IconComponent className="mr-2" />}
          {children}
          {IconComponent &amp;&amp; iconPosition === 'right' &amp;&amp; <IconComponent className="ml-2" />}
        </>
      )}
    </motion.button>
  );
};

export default Button;