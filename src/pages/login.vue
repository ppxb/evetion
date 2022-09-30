<template>
  <div class="flex h-screen">
    <div class="flex flex-row w-full">
      <div
        class="flex flex-col flex-auto justify-between bg-[#ffe85c] pb-8 pt-12 px-8 text-gray-800"
      >
        <div class="flex items-center justify-start space-x-3">
          <span class="bg-gray-800 rounded w-8 h-8"></span>
          <div class="font-extrabold text-2xl">Evetion</div>
        </div>
        <div>
          <h1 class="text-4xl font-semibold">体验全新的智慧化工作流</h1>
          <p class="text-lg">
            该项目作为
            <span class="font-semibold">Evetion LTS</span> 版本提供技术支持
          </p>
        </div>
        <div class="font-medium text-sm">
          <div class="flex flex-row items-center">
            <div>Ver.{{ version }}</div>
            <div class="ml-2 px-1 bg-gray-900 rounded-md text-white">
              latest
            </div>
          </div>
          <div>2022 © Built by ppxb</div>
        </div>
      </div>

      <div
        class="flex flex-auto flex-col items-center justify-center py-12 px-10 relative text-gray-800"
      >
        <div class="flex flex-1 flex-col justify-center space-y-5 w-full">
          <div class="flex flex-col space-y-2">
            <h2 class="text-3xl font-bold mb-1">👏 欢迎回来</h2>
            <p class="text-md">账号已实现 SSO ，支持 Evetion 全系统登录</p>
          </div>
          <div class="flex flex-col max-w-md space-y-5">
            <input
              type="text"
              placeholder="账号"
              class="flex px-3 py-2 rounded-lg font-medium placeholder:font-normal text-gray-800 bg-neutral-100"
              v-model="loginForm.username"
            />
            <input
              type="password"
              placeholder="密码"
              class="flex px-3 py-2 rounded-lg font-medium placeholder:font-normal text-gray-800 bg-neutral-100"
              v-model="loginForm.password"
            />
            <button
              class="flex items-center justify-center text-md px-4 py-3 rounded-lg font-bold bg-[#ffe85c] hover:bg-[#ffe32d] transition-all ease-in text-gray-800"
              @click="login"
            >
              点击登录
            </button>
          </div>
        </div>

        <div
          class="flex justify-center flex-col m-auto mb-8 text-center text-medium dark:text-gray-200"
        >
          <p>Contact me if you have any good ideas.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const loginForm = reactive({
  username: '',
  password: ''
})
const version = ref('20220930')

const router = useRouter()

const login = async () => {
  if (loginForm.username == '' || loginForm.password == '') return
  const res = await api.login(loginForm)

  if (res.code === 200) router.push('/serviceList')
}
</script>
