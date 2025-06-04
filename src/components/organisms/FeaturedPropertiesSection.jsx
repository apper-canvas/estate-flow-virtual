import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for organisms directory
import PropertyCard from '../molecules/PropertyCard'

const FeaturedPropertiesSection = ({ 
  loading, 
  error, 
  featuredProperties, 
  formatPrice, 
  openPropertyModal 
}) => {
  return (
    <section className="py-12 md:py-20 bg-surface-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-4xl font-bold text-surface-900 mb-4">
            Featured Properties
          </h3>
          <p className="text-surface-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in the most desirable locations.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-card animate-pulse">
                <div className="h-48 md:h-64 bg-surface-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-surface-200 rounded mb-3"></div>
                  <div className="h-6 bg-surface-200 rounded mb-4"></div>
                  <div className="flex space-x-4">
                    <div className="h-4 bg-surface-200 rounded w-16"></div>
                    <div className="h-4 bg-surface-200 rounded w-16"></div>
                    <div className="h-4 bg-surface-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-surface-600">Failed to load featured properties</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 property-card overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openPropertyModal(property)}
              >
                <div className="relative">
                  <img 
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
                    alt={property.title}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {formatPrice(property.price)}
                  </div>
                  <button className="absolute top-4 left-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <ApperIcon name="Heart" className="w-5 h-5 text-surface-600" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-lg text-surface-900 mb-2">
                    {property.title || 'Beautiful Property'}
                  </h4>
                  <p className="text-surface-600 mb-4 text-sm">
                    {property.location?.address || 'Premium Location'}, {property.location?.city || 'City'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-surface-600">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Bed" className="w-4 h-4" />
                      <span>{property.specifications?.bedrooms || 0} beds</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Bath" className="w-4 h-4" />
                      <span>{property.specifications?.bathrooms || 0} baths</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Maximize" className="w-4 h-4" />
                      <span>{property.specifications?.squareFeet || 0} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedPropertiesSection