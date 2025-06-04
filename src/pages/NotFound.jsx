import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-light rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ApperIcon name="Home" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-surface-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-surface-900 mb-4">Property Not Found</h2>
          <p className="text-surface-600 mb-8">
            The property you're looking for seems to have moved to a different neighborhood. 
            Let's get you back to browsing amazing homes.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-lg font-medium"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="flex items-center justify-center px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors">
              <ApperIcon name="Search" className="w-4 h-4 mr-2" />
              Search Properties
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-surface-300 text-surface-700 rounded-lg hover:bg-surface-50 transition-colors">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
              Browse by Location
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound