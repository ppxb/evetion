<template>
  <div class="flex h-screen bg-[#E7F6DF]">
    <div
      class="flex flex-col w-full py-8 mt-32 px-12 rounded-tl-2xl rounded-tr-2xl bg-white shadow"
    >
      <div class="text-3xl font-bold text-gray-800 mb-1">正在开发！</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  if (window.ipc) window.ipc.scaleApp()
})
</script>

<style scoped>
.shadow {
  box-shadow: -25px 0px 50px -12px rgb(0 0 0 / 0.25);
}
</style>
