<template>
  <div class="flex h-screen bg-[#E7F6DF]">
    <div
      class="flex flex-col w-full py-8 mt-32 px-12 rounded-tl-2xl rounded-tr-2xl bg-white shadow"
    >
      <div class="text-gray-600 font-semibold mb-8">
        {{
          route.path.split('/')[1].substring(0, 1).toUpperCase() +
          route.path.split('/')[1].substring(1)
        }}
      </div>
      <div class="mb-1 flex justify-between items-end">
        <div class="text-6xl font-bold text-[#090046]">项目列表</div>
        <button
          class="bg-[#EAE8FF] rounded-xl px-6 py-3 text-[#090046] font-bold add"
        >
          新增项目
        </button>
      </div>
      <div class="text-gray-500 mb-6">更新于 32 分钟前</div>
      <div class="flex flex-col justify-center items-center h-full">
        没有正在管理的项目
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.shadow {
  box-shadow: -25px 0px 50px -12px rgb(0 0 0 / 0.25);
}

.add {
  transition: all 0.2s ease-in;
}

.add:hover {
  background-color: #dcd8ff;
}
</style>
