<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#fff'
  }
})

const symbolId = computed(() => `#${props.name}`)
</script>
<style>
.svg-icon {
  width: 1.875em;
  height: 1.875em;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 4px 4px;
  margin-left: 0.875rem;
  backdrop-filter: blur(20px);
  -webkit-app-region: no-drag;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.svg-icon:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>
