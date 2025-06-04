import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for organisms directory
import Button from '../atoms/Button'
import PropertyDetails from './PropertyDetails'
import InquiryForm from './InquiryForm'

const PropertyModal = ({ 
  showModal, 
  selectedProperty, 
  closeModal, 
  inquiryForm, 
  setInquiryForm, 
  handleInquirySubmit, 
  submittingInquiry, 
  formatPrice 
}) => {
  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'

  return (
    <AnimatePresence>
      {showModal &amp;&amp; selectedProperty &amp;&amp; (
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
                src={selectedProperty.images?.[0] || defaultImage}
                alt={selectedProperty.title}
                className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
              />
              <Button
                onClick={closeModal}
                variant="transparent"
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <ApperIcon name="X" className="w-6 h-6 text-surface-600" />
              </Button>
              <div className="absolute bottom-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-semibold text-lg shadow-lg">
                {formatPrice(selectedProperty.price)}
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <PropertyDetails property={selectedProperty} />
                
                <div className="lg:col-span-1">
                  <InquiryForm
                    inquiryForm={inquiryForm}
                    setInquiryForm={setInquiryForm}
                    onSubmit={handleInquirySubmit}
                    submittingInquiry={submittingInquiry}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PropertyModal