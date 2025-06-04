import inquiryData from '../mockData/inquiry.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const inquiryService = {
  async getAll() {
    await delay(300)
    return [...inquiryData]
  },

  async getById(id) {
    await delay(200)
    const inquiry = inquiryData.find(item => item.id === id)
    if (!inquiry) {
      throw new Error('Inquiry not found')
    }
    return { ...inquiry }
  },

  async create(inquiry) {
    await delay(400)
    const newInquiry = {
      ...inquiry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
    inquiryData.push(newInquiry)
    return { ...newInquiry }
  },

  async update(id, updates) {
    await delay(300)
    const index = inquiryData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Inquiry not found')
    }
    inquiryData[index] = { ...inquiryData[index], ...updates }
    return { ...inquiryData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = inquiryData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Inquiry not found')
    }
    const deleted = inquiryData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default inquiryService