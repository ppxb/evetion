import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api'

const useUserStore = defineStore('user', () => {
  const user = ref({})

  const getUserInfo = async () => {
    const { data } = await api.userInfo()
    user.value = data
  }

  const userLogout = async () => {
    user.value = {}
    localStorage.removeItem('token')
  }

  return {
    user,
    getUserInfo,
    userLogout
  }
})

export default useUserStore
