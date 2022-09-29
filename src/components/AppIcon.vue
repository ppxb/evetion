<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const symbolId = computed(() => `#${props.name}`)
</script>
<style>
.svg-icon {
  width: 1.875rem;
  height: 1.875rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 6px;
  margin-left: 0.875rem;
  backdrop-filter: blur(20px);
  -webkit-app-region: no-drag;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #212121;
}
.svg-icon:hover {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
