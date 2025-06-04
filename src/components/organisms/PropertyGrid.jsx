import React from 'react'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for organisms directory
import PropertyCard from '../molecules/PropertyCard'
import Button from '../atoms/Button'

const PropertyGrid = ({ 
  loading, 
  error, 
  filteredProperties, 
  properties, 
  loadProperties, 
  viewMode, 
  openPropertyModal, 
  formatPrice, 
  searchQuery, 
  setSearchQuery 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-surface-100 rounded-2xl animate-pulse">
            <div className="h-48 bg-surface-200 rounded-t-2xl"></div>
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
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-surface-600 mb-4">Failed to load properties</p>
        <Button
          onClick={loadProperties}
          variant="primary"
          className="px-6 py-2"
        >
          Try Again
        </Button>
      </div>
    )
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="Search" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
        <p className="text-surface-600 mb-2">No properties found</p>
        <p className="text-surface-500 text-sm">Try adjusting your search criteria or filters</p>
      </div>
    )
  }

  return (
    &lt;&gt;
      &lt;div className="flex items-center justify-between mb-6"&gt;
        &lt;p className="text-surface-600"&gt;
          Showing {filteredProperties.length} of {properties.length} properties
        &lt;/p&gt;
        {searchQuery &amp;&amp; (
          &lt;div className="flex items-center space-x-2"&gt;
            &lt;span className="text-sm text-surface-600"&gt;Search:&lt;/span&gt;
            &lt;span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium"&gt;
              "{searchQuery}"
            &lt;/span&gt;
            &lt;button
              onClick={() => setSearchQuery('')}
              className="text-surface-400 hover:text-surface-600"
            &gt;
              &lt;ApperIcon name="X" className="w-4 h-4" /&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        )}
      &lt;/div&gt;

      &lt;div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-6"
      }&gt;
        {filteredProperties.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={openPropertyModal}
            viewMode={viewMode}
            index={index}
            formatPrice={formatPrice}
          />
        ))}
      &lt;/div&gt;
    &lt;/&gt;
  )
}

export default PropertyGrid