import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { propertyService } from '../services'

function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFeaturedProperties = async () => {
      setLoading(true)
      try {
        const allProperties = await propertyService.getAll()
        // Get 3 featured properties (premium listings)
        const featured = allProperties
          .filter(property => property.status === 'active')
          .slice(0, 3)
        setFeaturedProperties(featured)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProperties()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-surface-200">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Home" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                EstateFlow
              </h1>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button className="text-surface-700 hover:text-primary transition-colors font-medium">
                Buy
              </button>
              <button className="text-surface-700 hover:text-primary transition-colors font-medium">
                Rent
              </button>
              <button className="text-surface-700 hover:text-primary transition-colors font-medium">
                Sell
              </button>
              <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors shadow-lg">
                List Property
              </button>
            </nav>
            
            <button className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <ApperIcon name="Menu" className="w-6 h-6 text-surface-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl transform -skew-y-1"></div>
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-surface-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find Your Perfect
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dream Home
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover premium properties with our advanced marketplace. Search, explore, and connect with your ideal home through intelligent matching and immersive experiences.
            </motion.p>
          </div>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">10K+</div>
              <div className="text-surface-600 text-sm md:text-base">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">500+</div>
              <div className="text-surface-600 text-sm md:text-base">Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1">25+</div>
              <div className="text-surface-600 text-sm md:text-base">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-red-500 mb-1">98%</div>
              <div className="text-surface-600 text-sm md:text-base">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Feature */}
      <section className="py-12 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Featured Properties */}
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
                >
                  <div className="relative">
                    <img 
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
                      alt={property.title}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${property.price?.toLocaleString() || 'N/A'}
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

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 md:py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <ApperIcon name="Home" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">EstateFlow</h3>
              </div>
              <p className="text-surface-400 mb-4">
                Your trusted partner in finding the perfect property. We make real estate simple, transparent, and accessible.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy a Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rent a Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mortgage Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Neighborhood Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">Sell Your Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Property Valuation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketing Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agent Network</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-12 pt-8 text-center text-surface-400">
            <p>&copy; 2024 EstateFlow. All rights reserved. Built with innovation and trust.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home