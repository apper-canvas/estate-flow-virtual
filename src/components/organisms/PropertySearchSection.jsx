import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { propertyService, inquiryService } from '../../services'
import SearchInput from '../molecules/SearchInput'
import FilterToggle from '../molecules/FilterToggle'
import AdvancedFilters from './AdvancedFilters'
import PropertyGrid from './PropertyGrid'
import PropertyModal from './PropertyModal'

const PropertySearchSection = () => {
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

  const loadProperties = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    loadProperties()
  }, [loadProperties])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredProperties = properties.filter(property => {
    const matchesSearch = !searchQuery || 
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPrice = property.price >= filters.priceRange[0] &amp;&amp; property.price <= filters.priceRange[1]
    const matchesBedrooms = !filters.bedrooms || property.specifications?.bedrooms >= parseInt(filters.bedrooms)
    const matchesBathrooms = !filters.bathrooms || property.specifications?.bathrooms >= parseInt(filters.bathrooms)
    const matchesType = !filters.propertyType || property.listingType === filters.propertyType

    return matchesSearch &amp;&amp; matchesPrice &amp;&amp; matchesBedrooms &amp;&amp; matchesBathrooms &amp;&amp; matchesType
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
    <section className="py-12 md:py-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-neu-light p-6 md:p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 mb-4">
              Discover Your Next Home
            </h2>
            <p className="text-surface-600 text-base md:text-lg">
              Search through thousands of properties with advanced filters and interactive features.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <SearchInput
              searchQuery={searchQuery}
              onSearch={handleSearch}
              placeholder="Search by location, property type, or keywords..."
            />
            
            <FilterToggle
              showFilters={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
              viewMode={viewMode}
              onSetViewMode={setViewMode}
            />
          </div>

          <AdvancedFilters
            showFilters={showFilters}
            filters={filters}
            setFilters={setFilters}
          />

          <PropertyGrid
            loading={loading}
            error={error}
            filteredProperties={filteredProperties}
            properties={properties}
            loadProperties={loadProperties}
            viewMode={viewMode}
            openPropertyModal={openPropertyModal}
            formatPrice={formatPrice}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <PropertyModal
            showModal={showModal}
            selectedProperty={selectedProperty}
            closeModal={closeModal}
            inquiryForm={inquiryForm}
            setInquiryForm={setInquiryForm}
            handleInquirySubmit={handleInquirySubmit}
            submittingInquiry={submittingInquiry}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </section>
  )
}

export default PropertySearchSection