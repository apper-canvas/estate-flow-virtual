import React from 'react'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for atoms directory

const AppLogo = ({ className = 'text-2xl', iconSize = 'w-6 h-6' }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
        <ApperIcon name="Home" className={`${iconSize} text-white`} />
      </div>
      <h1 className={`${className} font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent`}>
        EstateFlow
      </h1>
    </div>
  )
}

export default AppLogo