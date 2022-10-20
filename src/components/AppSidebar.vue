<template>
  <div
    class="flex flex-col items-center justify-between absolute left-8 top-16 bottom-8 bg-[#E7F6DF] w-20 rounded-lg p-4 sd"
  >
    <!-- sidebar menu -->
    <div class="flex flex-col items-center">
      <app-icon name="icon-logo" type="logo" />
      <div class="font-bold text-lg mt-1 mb-4 text-gray-800">Fiber</div>
      <div class="flex flex-col items-center">
        <div
          v-for="menu in menuOptions"
          :key="menu.label"
          @click="render(menu.path)"
        >
          <n-tooltip
            :show-arrow="false"
            trigger="hover"
            placement="right-start"
            :keep-alive-on-hover="false"
          >
            <template #trigger>
              <app-icon :name="menu.icon" type="menu" />
            </template>
            {{ menu.label }}
          </n-tooltip>
        </div>
      </div>
    </div>

    <!-- user info -->
    <div class="user-panel flex flex-col items-center">
      <img :src="store.user.avatar" class="w-12 h-12 rounded-lg mb-2" />
      <app-icon class="ml-0" name="icon-logout" @click="logout" type="icon" />
    </div>
  </div>
</template>

<script setup>
import { NTooltip } from 'naive-ui'

import AppIcon from './AppIcon.vue'
import useUserStore from '../store/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const render = path => router.push(path)

const logout = () => {
  store.userLogout()
  router.push('/login')
}

const menuOptions = [
  {
    label: '个人中心',
    key: 'user-center',
    icon: 'icon-dashboard',
    path: '/dashboard'
  },
  {
    label: '列表',
    key: 'asset-list',
    icon: 'icon-project',
    path: '/assets'
  },
  {
    label: '盘点',
    key: 'asset-list',
    icon: 'icon-compare',
    path: ''
  },
  {
    label: '工作流',
    key: 'asset-list',
    icon: 'icon-workflow',
    path: ''
  },
  {
    label: '组织',
    key: 'asset-list',
    icon: 'icon-organization',
    path: ''
  }
]
</script>

<style scoped>
.sd {
  box-shadow: -4px 4px 40px -12px rgb(0 0 0 / 0.25);
}

.user-panel {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
