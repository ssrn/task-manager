<script setup lang="ts">
import { useTasksStore } from './stores/tasks'
import TaskList from './components/TaskList.vue'
import NoTasksComponent from './components/NoTasksComponent.vue'

const taskStore = useTasksStore()

const requestTasks = async () => {
  taskStore.resetTasks()
  await taskStore.fetchTasks()
}

const completeTask = (taskId: string) => {
  taskStore.completeTask(taskId)
}
</script>

<template>
  <div class="d-flex flex-column justify-center align-center">
    <TaskList v-if="taskStore.hasIncompleteTasks" :name="taskStore.taskListName" :incompleteTasks="taskStore.incompleteTasks"
      :completedTasks="taskStore.completedTasks" @completeTask="completeTask" />

    <NoTasksComponent v-if="!taskStore.hasIncompleteTasks && taskStore.hasCompletedTasks"
      :completedTasks="taskStore.completedTasks" />

    <v-btn v-if="!taskStore.hasIncompleteTasks" @click="requestTasks" color="primary" size="large" class="my-5">
      Request Tasks
    </v-btn>
  </div>
</template>
