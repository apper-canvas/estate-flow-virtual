import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { propertyService, inquiryService } from '../services'

function MainFeature() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submittingInquiry, setSubmittingInquiry] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 2000000],
    bedrooms: '',
    bathrooms: '',
    propertyType: ''
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await propertyService.getAll()
      setProperties(result || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = !searchQuery || 
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    const matchesBedrooms = !filters.bedrooms || property.specifications?.bedrooms >= parseInt(filters.bedrooms)
    const matchesBathrooms = !filters.bathrooms || property.specifications?.bathrooms >= parseInt(filters.bathrooms)
    const matchesType = !filters.propertyType || property.listingType === filters.propertyType

    return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms && matchesType
  })

  const openPropertyModal = (property) => {
    setSelectedProperty(property)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProperty(null)
    setInquiryForm({ name: '', email: '', phone: '', message: '' })
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    if (!selectedProperty) return

    setSubmittingInquiry(true)
    try {
      await inquiryService.create({
        propertyId: selectedProperty.id,
        userId: 'user-123', // In real app, this would come from auth
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        message: inquiryForm.message
      })
      toast.success('Inquiry sent successfully! We will contact you soon.')
      closeModal()
    } catch (err) {
      toast.error('Failed to send inquiry. Please try again.')
    } finally {
      setSubmittingInquiry(false)
    }
  }

  const formatPrice = (price) => {
    if (!price) return 'Price on request'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-3xl shadow-neu-light p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 mb-4">
          Discover Your Next Home
        </h2>
        <p className="text-surface-600 text-base md:text-lg">
          Search through thousands of properties with advanced filters and interactive features.
        </p>
      </div>

      {/* Search and Filters Header */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <ApperIcon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location, property type, or keywords..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-3 rounded-xl transition-all ${
              showFilters 
                ? 'bg-primary text-white shadow-lg' 
                : 'border border-surface-300 text-surface-700 hover:bg-surface-50'
            }`}
          >
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filters
          </button>
          
          <div className="flex border border-surface-300 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'text-surface-700 hover:bg-surface-50'
              }`}
            >
              <ApperIcon name="Grid3X3" className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-3 transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white' : 'text-surface-700 hover:bg-surface-50'
              }`}
            >
              <ApperIcon name="List" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface-50 rounded-xl p-6 mb-8 overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Min Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters(prev => ({ ...prev, bedrooms: e.target.value }))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Min Bathrooms
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters(prev => ({ ...prev, bathrooms: e.target.value }))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Max Price
                </label>
                <select
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                  }))}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="2000000">No Max</option>
                  <option value="500000">$500,000</option>
                  <option value="750000">$750,000</option>
                  <option value="1000000">$1,000,000</option>
                  <option value="1500000">$1,500,000</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({ priceRange: [0, 2000000], bedrooms: '', bathrooms: '', propertyType: '' })}
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-surface-600">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>
        {searchQuery && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-surface-600">Search:</span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">
              "{searchQuery}"
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-surface-400 hover:text-surface-600"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Property Grid/List */}
      {loading ? (
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
      ) : error ? (
        <div className="text-center py-12">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-surface-600 mb-4">Failed to load properties</p>
          <button
            onClick={loadProperties}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-12">
          <ApperIcon name="Search" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <p className="text-surface-600 mb-2">No properties found</p>
          <p className="text-surface-500 text-sm">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-6"
        }>
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-white rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 property-card cursor-pointer overflow-hidden ${
                viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
              }`}
              onClick={() => openPropertyModal(property)}
            >
              <div className={`relative ${viewMode === 'list' ? 'sm:w-80 sm:h-48' : ''}`}>
                <img 
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
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
                <button className="absolute top-4 left-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg">
                  <ApperIcon name="Heart" className="w-5 h-5 text-surface-600" />
                </button>
                {property.listingType === 'sale' && (
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
                
                {viewMode === 'list' && (
                  <p className="text-surface-600 text-sm mb-4 line-clamp-2">
                    {property.description || 'Discover this amazing property with premium amenities and stunning views.'}
                  </p>
                )}
                
                <button className="w-full bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary hover:text-white transition-all font-medium">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Property Detail Modal */}
      <AnimatePresence>
        {showModal && selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProperty.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'}
                  alt={selectedProperty.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ApperIcon name="X" className="w-6 h-6 text-surface-600" />
                </button>
                <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold text-lg shadow-lg">
                  {formatPrice(selectedProperty.price)}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl md:text-3xl font-bold text-surface-900 mb-4">
                      {selectedProperty.title}
                    </h3>
                    
                    <div className="flex items-center text-surface-600 mb-6">
                      <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
                      <span>
                        {selectedProperty.location?.address}, {selectedProperty.location?.city}, {selectedProperty.location?.state}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-surface-50 rounded-xl">
                        <ApperIcon name="Bed" className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold text-surface-900">{selectedProperty.specifications?.bedrooms}</div>
                        <div className="text-sm text-surface-600">Bedrooms</div>
                      </div>
                      <div className="text-center p-4 bg-surface-50 rounded-xl">
                        <ApperIcon name="Bath" className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold text-surface-900">{selectedProperty.specifications?.bathrooms}</div>
                        <div className="text-sm text-surface-600">Bathrooms</div>
                      </div>
                      <div className="text-center p-4 bg-surface-50 rounded-xl">
                        <ApperIcon name="Maximize" className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold text-surface-900">{selectedProperty.specifications?.squareFeet?.toLocaleString()}</div>
                        <div className="text-sm text-surface-600">Sq Ft</div>
                      </div>
                      <div className="text-center p-4 bg-surface-50 rounded-xl">
                        <ApperIcon name="Calendar" className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="font-semibold text-surface-900">{selectedProperty.specifications?.yearBuilt}</div>
                        <div className="text-sm text-surface-600">Built</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-lg text-surface-900 mb-3">Description</h4>
                      <p className="text-surface-600 leading-relaxed">
                        {selectedProperty.description || 'This beautiful property offers modern amenities, stunning views, and premium finishes throughout. Located in a desirable neighborhood with easy access to schools, shopping, and entertainment.'}
                      </p>
                    </div>
                    
                    {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-lg text-surface-900 mb-3">Amenities</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedProperty.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <ApperIcon name="Check" className="w-4 h-4 text-secondary" />
                              <span className="text-surface-600">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="lg:col-span-1">
                    <div className="bg-surface-50 rounded-2xl p-6 sticky top-6">
                      <h4 className="font-semibold text-lg text-surface-900 mb-4">Contact Agent</h4>
                      <form onSubmit={handleInquirySubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={inquiryForm.name}
                            onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="Enter your name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={inquiryForm.email}
                            onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={inquiryForm.phone}
                            onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder="Enter your phone"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1">
                            Message
                          </label>
                          <textarea
                            rows={4}
                            value={inquiryForm.message}
                            onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                            placeholder="I'm interested in this property..."
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={submittingInquiry}
                          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {submittingInquiry ? (
                            <>
                              <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                              Send Inquiry
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature