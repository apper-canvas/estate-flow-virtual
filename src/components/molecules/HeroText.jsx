import React from 'react'
import { motion } from 'framer-motion'

const HeroText = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <motion.h2 
        className="text-3xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {title}
        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dream Home
        </span>
      </motion.h2>
      <motion.p 
        className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </div>
  )
}

export default HeroText