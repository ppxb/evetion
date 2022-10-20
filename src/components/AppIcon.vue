<template>
  <svg aria-hidden="true" :class="iconType" :style="iconColor">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  color: {
    type: String
  }
})

const symbolId = computed(() => `#${props.name}`)
const iconType = computed(() => {
  switch (props.type) {
    case 'icon':
      return 'svg-icon'
    case 'logo':
      return 'svg-logo'
    default:
      return 'svg-menu'
  }
})
const iconColor = computed(() => `color:${props.color}`)
</script>
<style>
.svg-icon {
  width: 1.875rem;
  height: 1.875rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 6px;
  margin-left: 0.875rem;
  backdrop-filter: blur(20px);
  -webkit-app-region: no-drag;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #212121;
}
.svg-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.svg-logo {
  width: 2.5rem;
  height: 2.5rem;
  -webkit-app-region: no-drag;
  color: #333;
}

.svg-menu {
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  border-radius: 4px;
  padding: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-app-region: no-drag;
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 12px;
}

.svg-menu:hover {
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
}
</style>
