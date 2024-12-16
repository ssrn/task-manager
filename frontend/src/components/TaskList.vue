<script setup lang="ts">
import type { Task, TaskType } from '@shared/types/TaslkList'
import TaskContent from './TaskContent.vue'
import IconCircle from './icons/IconCircle.vue'
import IconRectangle from './icons/IconRectangle.vue'
import IconTriangle from './icons/IconTriangle.vue'

const props = defineProps<{
  incompleteTasks: Task[]
  completedTasks: Task[]
  name: string
}>()

const emit = defineEmits<{
  (e: 'completeTask', taskId: string): void
}>()
</script>

<template>
  <v-card class="min-w-270">
    <v-card-title class="text-h5">{{ name }}</v-card-title>
    <v-list style="padding-top: 0">
      <v-list-item v-for="task in incompleteTasks" :key="task.id" class="d-flex align-center">
        <div class="d-flex align-center ga-1">
          <v-checkbox @change="emit('completeTask', task.id)" hide-details density="compact" />
          <TaskContent :task="task" />
        </div>
      </v-list-item>

      <v-list-item v-for="task in completedTasks" :key="task.id" class="d-flex align-center">
        <div class="completed-task d-flex align-center ga-1">
          <TaskContent :task="task" />
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.min-w-270 {
  min-width: 270px;
}

.completed-task {
  position: relative;
  padding-left: 5px;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background-color: currentColor;
  }
}
</style>
