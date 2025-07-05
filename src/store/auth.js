import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`)
        if (res.data.length === 1) {
          this.user = res.data[0]
          return true
        } else {
          return false
        }
      } catch (err) {
        console.error('Login error:', err)
        return false
      }
    },
    logout() {
      this.user = null
    }
  },
  persist: true
})
