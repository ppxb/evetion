<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="themeOverrides"
  >
    <n-message-provider placement="bottom-right">
      <app-controller />
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import AppController from './components/AppController.vue'
import { NConfigProvider, NMessageProvider, zhCN, dateZhCN } from 'naive-ui'

const themeOverrides = {
  Menu: {
    itemColorActive: '#E7F6DF'
  }
}
</script>
