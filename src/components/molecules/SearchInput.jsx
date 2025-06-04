import React from 'react'
import Input from '../atoms/Input'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for molecules directory

const SearchInput = ({ searchQuery, onSearch, placeholder }) => {
  return (
    <div className="flex-1 relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={onSearch}
        icon={ApperIcon}
        iconName="Search"
        iconPosition="left"
        className="pl-12" // Ensure padding for icon
      />
    </div>
  )
}

export default SearchInput