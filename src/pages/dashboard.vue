<template>
  <div class="flex h-screen bg-[#E7F6DF]">
    <div
      class="flex flex-col w-full pb-12 mt-32 px-12 rounded-tl-2xl rounded-tr-2xl bg-white shadow"
    >
      <div class="text-3xl font-bold text-gray-800 mb-1">可使用的服务</div>
      <div class="text-medium font-bold text-gray-600 mb-6">
        如需开通更多服务，请联系管理员赋权
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useUserStore from '../store/userStore'

onMounted(async () => {
  if (window.ipc) window.ipc.scaleApp()
  const store = useUserStore()
  store.getUserInfo()
})
</script>

<style scoped>
.shadow {
  box-shadow: -25px 0px 50px -12px rgb(0 0 0 / 0.25);
}
</style>
