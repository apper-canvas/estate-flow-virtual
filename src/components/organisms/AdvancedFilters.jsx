import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Select from '../atoms/Select'
import Button from '../atoms/Button'

const AdvancedFilters = ({ showFilters, filters, setFilters }) => {
  const handleClearFilters = () => {
    setFilters({ priceRange: [0, 2000000], bedrooms: '', bathrooms: '', propertyType: '' })
  }

  const propertyTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' }
  ]

  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' }
  ]

  const bathroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' }
  ]

  const maxPriceOptions = [
    { value: '2000000', label: 'No Max' },
    { value: '500000', label: '$500,000' },
    { value: '750000', label: '$750,000' },
    { value: '1000000', label: '$1,000,000' },
    { value: '1500000', label: '$1,500,000' }
  ]

  return (
    <AnimatePresence>
      {showFilters &amp;&amp; (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-surface-50 rounded-xl p-6 mb-8 overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Property Type"
              id="propertyType"
              value={filters.propertyType}
              onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
              options={propertyTypeOptions}
            />
            
            <Select
              label="Min Bedrooms"
              id="minBedrooms"
              value={filters.bedrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
              options={bedroomOptions}
            />
            
            <Select
              label="Min Bathrooms"
              id="minBathrooms"
              value={filters.bathrooms}
              onChange={(e) => setFilters(prev => ({ ...prev, bathrooms: e.target.value }))}
              options={bathroomOptions}
            />
            
            <Select
              label="Max Price"
              id="maxPrice"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
              }))}
              options={maxPriceOptions}
            />
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              variant="link"
              onClick={handleClearFilters}
              className="font-medium"
            >
              Clear All Filters
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdvancedFilters