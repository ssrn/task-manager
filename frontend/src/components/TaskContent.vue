<script setup lang="ts">
import { defineProps } from 'vue'
import type { Task } from '@shared/types/TaslkList'
import IconCircle from './icons/IconCircle.vue'
import IconRectangle from './icons/IconRectangle.vue'
import IconTriangle from './icons/IconTriangle.vue'

const props = defineProps<{ task: Task }>()

const getTypeIconComponent = (type: string) => {
  switch (type) {
    case 'circle': return IconCircle
    case 'rectangle': return IconRectangle
    case 'triangle': return IconTriangle
    default: return 'circle'
  }
}
</script>

<template>
  <span>{{ task.name }}</span>
  <component :is="getTypeIconComponent(task.type)" />
</template>
