import React from 'react'
import Button from '../atoms/Button'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for molecules directory

const FilterToggle = ({ showFilters, onToggle, viewMode, onSetViewMode }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={onToggle}
        variant={showFilters ? 'primary' : 'outline'}
        icon={() => <ApperIcon name="Filter" className="w-4 h-4" />}
        className="px-4 py-3" // Override default padding for specific style
      >
        Filters
      </Button>
      
      <div className="flex border border-surface-300 rounded-xl overflow-hidden">
        <Button
          onClick={() => onSetViewMode('grid')}
          variant={viewMode === 'grid' ? 'primary' : 'transparent'}
          icon={() => <ApperIcon name="Grid3X3" className="w-4 h-4" />}
          className="px-4 py-3 rounded-none" // Override default rounded and padding
        >
          {/* No children, icon only */}
        </Button>
        <Button
          onClick={() => onSetViewMode('list')}
          variant={viewMode === 'list' ? 'primary' : 'transparent'}
          icon={() => <ApperIcon name="List" className="w-4 h-4" />}
          className="px-4 py-3 rounded-none" // Override default rounded and padding
        >
          {/* No children, icon only */}
        </Button>
      </div>
    </div>
  )
}

export default FilterToggle