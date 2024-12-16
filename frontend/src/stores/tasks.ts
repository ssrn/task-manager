import { defineStore } from 'pinia'
import axios from 'axios'
import type { Task, TaskList } from '@shared/types/TaslkList'

export const useTasksStore = defineStore('tasksStore', {
  state: () => ({
    taskListName: '',
    incompleteTasks: [] as Task[],
    completedTasks: [] as Task[]
  }),
  actions: {
    async fetchTasks() {
      try {
        const response = await axios.get<TaskList>('http://localhost:3000/taskList')
        this.taskListName = response.data.taskListName
        this.incompleteTasks = response.data.tasks
      } catch (error) {
        console.error('Failed to fetch task list', error)
      }
    },
    completeTask(taskId: string) {
      const taskIndex = this.incompleteTasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        const completedTask = this.incompleteTasks[taskIndex]
        this.completedTasks.push(completedTask)
        this.incompleteTasks.splice(taskIndex, 1)
      }
    },
    resetTasks() {
      this.incompleteTasks = []
      this.completedTasks = []
    }
  },
  getters: {
    hasIncompleteTasks(): boolean {
      return this.incompleteTasks.length > 0
    },
    hasCompletedTasks(): boolean {
      return this.completedTasks.length > 0
    }
  }
})