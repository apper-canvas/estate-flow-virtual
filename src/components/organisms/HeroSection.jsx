import React from 'react'
import { motion } from 'framer-motion'
import HeroText from '../molecules/HeroText'
import FeatureCard from '../molecules/FeatureCard'

const HeroSection = () => {
  const stats = [
    { value: '10K+', label: 'Properties', color: 'primary' },
    { value: '500+', label: 'Agents', color: 'secondary' },
    { value: '25+', label: 'Cities', color: 'accent' },
    { value: '98%', label: 'Satisfaction', color: 'red-500' },
  ]

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform -skew-y-1"></div>
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroText
          title="Find Your Perfect"
          subtitle="Discover premium properties with our advanced marketplace. Search, explore, and connect with your ideal home through intelligent matching and immersive experiences."
        />
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <FeatureCard
              key={index}
              value={stat.value}
              label={stat.label}
              valueColorClass={`text-${stat.color}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection