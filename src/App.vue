<template>
  <n-message-provider placement="bottom-right">
    <app-controller />
    <router-view></router-view>
  </n-message-provider>
</template>

<script setup>
import AppController from './components/AppController.vue'
import { NMessageProvider } from 'naive-ui'
</script>
