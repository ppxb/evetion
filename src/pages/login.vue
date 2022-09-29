<template>
  <div class="flex h-screen">
    <div class="flex flex-row w-full">
      <div
        class="flex flex-col justify-between bg-[#ffe85c] py-12 px-8 text-slate-800"
      >
        <div class="flex items-center justify-start space-x-3">
          <span class="bg-white rounded w-8 h-8"></span>
          <div class="font-bold text-2xl">Evetion</div>
        </div>
        <div class="space-y-2">
          <h1 class="text-4xl leading-snug font-extrabold">
            体验全新的智慧化工作流
          </h1>
          <p class="text-lg">该项目作为 Evetion LTS 版本提供技术支持</p>
        </div>
        <div class="font-medium">
          <div>2022 © Built by ppxb</div>
          <div>ver.20220929</div>
        </div>
      </div>

      <div
        class="flex flex-1 flex-col items-center justify-center py-12 px-10 relative text-white"
      >
        <div class="flex flex-1 flex-col justify-center space-y-5 w-full">
          <div class="flex flex-col space-y-2">
            <h2 class="text-3xl font-bold mb-2">👏 欢迎回来</h2>
            <p class="text-md">账号已实现SSO，支持 Evetion 全系统登录</p>
          </div>
          <div class="flex flex-col max-w-md space-y-5">
            <input
              type="text"
              placeholder="账号"
              class="flex px-3 py-2 rounded font-medium placeholder:font-normal text-slate-800"
            />
            <input
              type="password"
              placeholder="密码"
              class="flex px-3 py-2 rounded font-medium placeholder:font-normal text-slate-800"
            />
            <button
              class="flex items-center justify-center px-4 py-3 rounded font-bold bg-[#272727] hover:bg-[#222] transition-all text-white"
            >
              点击登录
            </button>
          </div>
        </div>

        <div
          class="flex justify-center flex-col m-auto mb-8 text-center text-medium dark:text-slate-200"
        >
          <p>Contact me when you have good ideas.</p>
        </div>
      </div>
    </div>
  </div>
</template>
