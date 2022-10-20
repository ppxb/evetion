<template>
  <div class="flex h-screen bg-[#F8FAFB]">
    <AppSidebar />
    <div class="flex flex-col w-full pl-36 pr-8 pt-16 px-12">
      <div class="text-3xl font-bold text-gray-800">
        <div>下午好，{{ store.user.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import AppSidebar from '../components/AppSidebar.vue'
import useUserStore from '../store/userStore'

const store = useUserStore()

onMounted(async () => {
  if (window.ipc) window.ipc.scaleApp()
})
</script>

<style scoped>
.shadow {
  box-shadow: -25px 0px 50px -12px rgb(0 0 0 / 0.25);
}
</style>
