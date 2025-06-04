import React from 'react'
import AppHeader from '../organisms/AppHeader'
import HeroSection from '../organisms/HeroSection'
import FeaturedPropertiesSection from '../organisms/FeaturedPropertiesSection'
import PropertySearchSection from '../organisms/PropertySearchSection'
import AppFooter from '../organisms/AppFooter'

const HomeTemplate = ({ featuredProperties, loading, error, openPropertyModal, formatPrice }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      <AppHeader />
      <HeroSection />
      <PropertySearchSection />
      <FeaturedPropertiesSection 
        featuredProperties={featuredProperties} 
        loading={loading} 
        error={error} 
        openPropertyModal={openPropertyModal}
        formatPrice={formatPrice}
      />
      <AppFooter />
    </div>
  )
}

export default HomeTemplate