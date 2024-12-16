export type TaskType = 'circle' | 'rectangle' | 'triangle';

export interface Task {
  id: string
  name: string
  type: TaskType
  completed?: boolean
}

export interface TaskList {
  taskListName: string
  tasks: Task[]
}
