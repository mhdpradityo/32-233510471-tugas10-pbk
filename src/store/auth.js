import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    dummyUsers: [
      { username: 'tester', password: '12345' },
      { username: 'admin', password: 'admin123' }
    ]
  }),

  actions: {
    async login(username, password) {
      
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users?username=${username}&password=${password}`
        )
        if (res.data.length === 1) {
          this.user = res.data[0]
          return true
        }
      } catch (err) {
        console.warn('API production unavailable, trying localhost...')
      }

      
      try {
        const res = await axios.get(
          `http://localhost:3000/users?username=${username}&password=${password}`
        )
        if (res.data.length === 1) {
          this.user = res.data[0]
          return true
        }
      } catch (err) {
        console.warn('Localhost API unavailable, fallback to frontend...')
      }

      
      const found = this.dummyUsers.find(
        (user) => user.username === username && user.password === password
      )
      if (found) {
        this.user = found
        return true
      } else {
        return false
      }
    },

    logout() {
      this.user = null
    }
  },

  persist: true
})
