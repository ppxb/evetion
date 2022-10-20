<template>
  <div
    class="absolute inset-x-0 top-0 flex flex-col items-end px-8 pt-4 bg-transparent z-[999]"
  >
    <div class="flex items-center mb-4">
      <app-icon name="icon-setting" type="icon" @click="openSetting" />
      <app-icon name="icon-mins" type="icon" @click="minApp" />
      <app-icon name="icon-close" type="icon" @click="closeApp" />
    </div>
    <!-- <div class="flex w-full items-enter place-content-between">
      <div class="flex flex-row" v-if="showTitle">
        <div class="flex items-center mr-8">
          <app-icon name="icon-logo" type="logo" />
          <div class="font-semibold text-2xl leading-none text-[#333]">
            Fiber
          </div>
        </div>
        <div class="flex flex-row">
          <router-link
            v-for="menu in menus"
            :key="menu.path"
            class="flex flex-row items-center mr-4 menu px-6 rounded-xl bg-transparent"
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
    </div> -->
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
  { name: '个人中心', path: '/dashboard', icon: 'icon-dashboard' },
  { name: '资产', path: '/assets', icon: 'icon-asset' },
  { name: '项目', path: '/assets', icon: 'icon-asset' },
  { name: '合同', path: '/assets', icon: 'icon-asset' }
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
