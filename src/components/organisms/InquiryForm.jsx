import React from 'react'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import ApperIcon from '../../components/ApperIcon' // Path adjusted for organisms directory

const InquiryForm = ({ inquiryForm, setInquiryForm, onSubmit, submittingInquiry }) => {
  return (
    <div className="bg-surface-50 rounded-2xl p-6 sticky top-6">
      <h4 className="font-semibold text-lg text-surface-900 mb-4">Contact Agent</h4>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Full Name *"
          id="name"
          type="text"
          required
          value={inquiryForm.name}
          onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter your name"
        />
        
        <FormField
          label="Email *"
          id="email"
          type="email"
          required
          value={inquiryForm.email}
          onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter your email"
        />
        
        <FormField
          label="Phone"
          id="phone"
          type="tel"
          value={inquiryForm.phone}
          onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter your phone"
        />
        
        <FormField
          label="Message"
          id="message"
          type="textarea"
          rows={4}
          value={inquiryForm.message}
          onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
          placeholder="I'm interested in this property..."
        />
        
        <Button
          type="submit"
          loading={submittingInquiry}
          className="w-full py-3"
          icon={() => submittingInquiry ? null : <ApperIcon name="Send" className="w-4 h-4" />}
          iconPosition="left"
        >
          {submittingInquiry ? 'Sending...' : 'Send Inquiry'}
        </Button>
      </form>
    </div>
  )
}

export default InquiryForm