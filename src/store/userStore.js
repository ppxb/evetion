import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api'

const useUserStore = defineStore(
  'user',
  () => {
    const user = ref({})

    const getUserInfo = async () => {
      const { data } = await api.userInfo()
      user.value = data
    }

    const userLogout = async () => {
      user.value = {}
      localStorage.removeItem('token')
      if (window.ipc) window.ipc.resetWindow()
    }

    return {
      user,
      getUserInfo,
      userLogout
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
)

export default useUserStore
