<template>
  <div class="app-controller">
    <div class="controller mb-4">
      <app-icon name="icon-setting" @click="openSetting" />
      <app-icon name="icon-mins" @click="minApp" />
      <app-icon name="icon-close" @click="closeApp" />
    </div>
    <div
      class="user rounded-lg bg-gray-100 text-gray-900 w-fit"
      v-if="showUser"
    >
      <img :src="store.user.avatar" alt="" class="w-12 h-12 rounded-lg mr-2" />
      <div class="flex flex-col justify-center pr-4">
        <div class="font-bold text-md">{{ store.user.name }}</div>
        <div class="text-sm text-gray-800">{{ store.user.dept }}</div>
      </div>
      <app-icon name="icon-logout" @click="logout" class="mr-2 ml-0" />
    </div>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import useUserStore from '../store/userStore'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useUserStore()
const showUser = ref(false)

watchEffect(() => {
  showUser.value = route.path != '/login' && store.user ? true : false
})

const logout = () => {
  store.userLogout()
  router.push('/login')
}

const closeApp = () => window.ipc.closeApp()
const minApp = () => window.ipc.minApp()
const openSetting = () => console.log('setting panle is opened')
</script>

<style scoped>
.app-controller {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem 2rem 1rem 0;
  background: transparent;
  z-index: 999;
}

.controller {
  display: flex;
  align-items: center;
}

.user {
  display: flex;
  align-items: center;
  -webkit-app-region: no-drag;
}
</style>
