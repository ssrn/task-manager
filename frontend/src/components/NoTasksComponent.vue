<script setup lang="ts">
import type { Task, TaskType } from '@shared/types/TaslkList'
import IconCircle from './icons/IconCircle.vue'
import IconRectangle from './icons/IconRectangle.vue'
import IconTriangle from './icons/IconTriangle.vue'

const props = defineProps<{
  completedTasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const getIconComponent = (type: TaskType) => {
  switch(type) {
    case 'circle': return IconCircle
    case 'rectangle': return IconRectangle
    case 'triangle': return IconTriangle
  }
}
</script>

<template>
  <v-card>
    <v-card-title class="text-h5">All Tasks Completed!</v-card-title>
    <v-card-text>
      <template v-for="(task, index) in completedTasks" :key="task.id">
          <component :is="getIconComponent(task.type)" />
        </template>
    </v-card-text>
  </v-card>
</template>