<template>
  <div :class="['app-controller']">
    <div class="controller mb-4">
      <app-icon name="icon-setting" type="icon" @click="openSetting" />
      <app-icon name="icon-mins" type="icon" @click="minApp" />
      <app-icon name="icon-close" type="icon" @click="closeApp" />
    </div>
    <div class="flex flex-row w-full place-content-between items-enter">
      <div class="flex flex-row" v-if="showTitle">
        <app-icon name="icon-logo" type="logo" />
        <div class="flex flex-col mr-16">
          <div class="font-semibold text-2xl leading-none text-[#333]">
            Evetion
          </div>
          <div class="text-gray-800">资产管理系统</div>
        </div>
        <div class="flex flex-row">
          <router-link
            v-for="menu in menus"
            :key="menu.path"
            class="flex flex-row items-center mr-4 menu px-6 rounded-xl"
            :to="menu.path"
          >
            <app-icon
              :name="menu.icon"
              type="menu"
              class="mr-3"
              color="#6E8B81"
              hoverColor="#1D4344"
            />
            <div class="text-[#6E8B81] font-semibold">
              {{ menu.name }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="user rounded-lg bg-white text-gray-900 w-fit" v-if="showUser">
        <img
          :src="store.user.avatar"
          alt=""
          class="w-12 h-12 rounded-tl-lg rounded-bl-lg mr-2"
        />
        <div class="flex flex-col justify-center pr-4">
          <div class="font-bold text-md text-[#333]">{{ store.user.name }}</div>
          <div class="text-sm text-gray-800">{{ store.user.dept }}</div>
        </div>
        <app-icon name="icon-logout" @click="logout" class="mr-2" type="icon" />
      </div>
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
const showTitle = ref(false)

const menus = [
  { name: '看板', path: '/dashboard', icon: 'icon-dashboard' },
  { name: '资产', path: '/assets', icon: 'icon-asset' }
]

watchEffect(() => {
  showUser.value = route.path != '/login' && store.user ? true : false
  showTitle.value = showUser.value
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
  padding: 1rem 2rem;
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
}

.menu {
  transition: all 0.2s ease-in;
  background-color: transparent;
}

.menu:hover {
  cursor: pointer;
  background-color: #bae6a7;
  color: #1d4343;
}
</style>
