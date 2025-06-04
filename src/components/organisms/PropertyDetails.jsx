import React from 'react'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for organisms directory

const StatBox = ({ iconName, value, label }) => (
  <div className="text-center p-4 bg-surface-50 rounded-xl">
    <ApperIcon name={iconName} className="w-6 h-6 mx-auto mb-2 text-primary" />
    <div className="font-semibold text-surface-900">{value}</div>
    <div className="text-sm text-surface-600">{label}</div>
  </div>
)

const PropertyDetails = ({ property }) => {
  return (
    <div className="lg:col-span-2">
      <h3 className="text-2xl md:text-3xl font-bold text-surface-900 mb-4">
        {property.title}
      </h3>
      
      <div className="flex items-center text-surface-600 mb-6">
        <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
        <span>
          {property.location?.address}, {property.location?.city}, {property.location?.state}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatBox iconName="Bed" value={property.specifications?.bedrooms} label="Bedrooms" />
        <StatBox iconName="Bath" value={property.specifications?.bathrooms} label="Bathrooms" />
        <StatBox iconName="Maximize" value={property.specifications?.squareFeet?.toLocaleString()} label="Sq Ft" />
        <StatBox iconName="Calendar" value={property.specifications?.yearBuilt} label="Built" />
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold text-lg text-surface-900 mb-3">Description</h4>
        <p className="text-surface-600 leading-relaxed">
          {property.description || 'This beautiful property offers modern amenities, stunning views, and premium finishes throughout. Located in a desirable neighborhood with easy access to schools, shopping, and entertainment.'}
        </p>
      </div>
      
      {property.amenities &amp;&amp; property.amenities.length > 0 &amp;&amp; (
        <div>
          <h4 className="font-semibold text-lg text-surface-900 mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-3">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-secondary" />
                <span className="text-surface-600">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetails