import userData from '../mockData/user.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const userService = {
  async getAll() {
    await delay(300)
    return [...userData]
  },

  async getById(id) {
    await delay(200)
    const user = userData.find(item => item.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return { ...user }
  },

  async create(user) {
    await delay(400)
    const newUser = {
      ...user,
      id: Date.now().toString(),
      savedSearches: [],
      favoriteProperties: []
    }
    userData.push(newUser)
    return { ...newUser }
  },

  async update(id, updates) {
    await delay(300)
    const index = userData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    userData[index] = { ...userData[index], ...updates }
    return { ...userData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = userData.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('User not found')
    }
    const deleted = userData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default userService