import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for organisms directory
import AppLogo from '../atoms/AppLogo'
import Button from '../atoms/Button'

const NavLink = ({ children, ...props }) => (
  <Button variant="ghost" className="font-medium" {...props}>
    {children}
  </Button>
)

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-40 glass border-b border-surface-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AppLogo />
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink>Buy</NavLink>
            <NavLink>Rent</NavLink>
            <NavLink>Sell</NavLink>
            <Button variant="primary">
              List Property
            </Button>
          </nav>
          
          <Button variant="transparent" className="md:hidden p-2 rounded-lg">
            <ApperIcon name="Menu" className="w-6 h-6 text-surface-700" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader