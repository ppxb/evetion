<template>
  <div class="flex h-screen">
    <div class="flex flex-col w-full pb-12 pt-24 px-12">
      <div class="text-3xl font-bold text-gray-800 mb-1">可使用的服务</div>
      <div class="text-medium font-bold text-gray-600 mb-6">
        如需开通更多服务，请联系管理员赋权
      </div>
      <div
        v-for="service in serviceList"
        :key="service.id"
        class="h-fit w-fit px-4 py-4 rounded-lg flex flex-col bg-white shadow-xl"
      >
        <div class="text-2xl font-bold text-gray-800">{{ service.name }}</div>
        <div class="text-md font-medium text-gray-600">{{ service.alias }}</div>
        <div class="text-md font-medium text-gray-600">
          ver {{ service.version }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useUserStore from '../store/userStore'

onMounted(async () => {
  const store = useUserStore()
  store.getUserInfo()
})

const serviceList = [
  {
    id: 1,
    name: '资产管理系统',
    alias: 'Enterprise Asset Management',
    version: '1.0.0'
  }
]
</script>
