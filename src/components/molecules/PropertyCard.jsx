import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for molecules directory
import Button from '../atoms/Button'

const PropertyCard = ({ property, onClick, viewMode, index, formatPrice }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-white rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 property-card cursor-pointer overflow-hidden ${
        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
      }`}
      onClick={() => onClick(property)}
    >
      <div className={`relative ${viewMode === 'list' ? 'sm:w-80 sm:h-48' : ''}`}>
        <img 
          src={property.images?.[0] || defaultImage}
          alt={property.title}
          className={`object-cover ${
            viewMode === 'list' 
              ? 'w-full h-48 sm:w-80 sm:h-full' 
              : 'w-full h-48 md:h-56'
          }`}
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {formatPrice(property.price)}
        </div>
        <Button variant="transparent" className="absolute top-4 left-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
          <ApperIcon name="Heart" className="w-5 h-5 text-surface-600" />
        </Button>
        {property.listingType === 'sale' &amp;&amp; (
          <div className="absolute bottom-4 left-4 bg-accent text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-semibold text-lg text-surface-900 leading-tight">
            {property.title || 'Beautiful Property'}
          </h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.status === 'active' 
              ? 'bg-secondary/10 text-secondary' 
              : 'bg-surface-100 text-surface-600'
          }`}>
            {property.status === 'active' ? 'Available' : 'Sold'}
          </span>
        </div>
        
        <div className="flex items-center text-surface-600 mb-4">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.location?.address || 'Premium Location'}, {property.location?.city || 'City'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-surface-600 mb-4">
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
            <span>{property.specifications?.squareFeet?.toLocaleString() || 0} sqft</span>
          </div>
        </div>
        
        {viewMode === 'list' &amp;&amp; (
          <p className="text-surface-600 text-sm mb-4 line-clamp-2">
            {property.description || 'Discover this amazing property with premium amenities and stunning views.'}
          </p>
        )}
        
        <Button variant="ghost" className="w-full bg-primary/10 text-primary py-2 hover:bg-primary hover:text-white font-medium">
          View Details
        </Button>
      </div>
    </motion.div>
  )
}

export default PropertyCard