import React from 'react'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for molecules directory
import { motion } from 'framer-motion'

const FeatureCard = ({ 
  iconName, 
  value, 
  label, 
  iconColorClass = 'text-primary', 
  valueColorClass = 'text-primary' 
}) => {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className={`text-2xl md:text-3xl font-bold ${valueColorClass} mb-1`}>{value}</div>
      <div className="text-surface-600 text-sm md:text-base">{label}</div>
    </motion.div>
  )
}

export default FeatureCard