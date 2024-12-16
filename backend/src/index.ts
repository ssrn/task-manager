import express, { Request, Response } from 'express'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import { Task, TaskType, TaskList } from '@shared/types/TaslkList'

const TASK_TYPES: Record<string, TaskType> = {
  "Hand brew": "rectangle",
  "Avocado Toast": "rectangle",
  "Pancakes": "triangle",
  "Smoothie bowl": "triangle",
  "Matcha Latte": "rectangle",
  "Cappuccino": "rectangle",
  "Brownie": "circle",
  "Salad": "triangle",
  "Croissant": "circle",
  "Espresso": "circle",
  "Iced Latte": "circle",
  "Mushroom Burger": "triangle",
  "Tea": "circle",
  "Hot Chocolate": "triangle"
};

const TASK_LIST_NAMES = [
  "Table 1",
  "Table 2",
  "Table 3",
  "Table 4",
  "Table 5",
  "Takeaway",
];

function generateTaskList(): TaskList {
  const taskCount = Math.floor(Math.random() * 10) + 1
  const tasksNames = Object.keys(TASK_TYPES)


  const tasks: Task[] = Array.from({ length: taskCount }, () => {
    const taskName = tasksNames[Math.floor(Math.random() * tasksNames.length)]

    return {
      id: uuidv4(),
      name: taskName,
      type: TASK_TYPES[taskName]
    }
  })

  return {
    taskListName: TASK_LIST_NAMES[Math.floor(Math.random() * TASK_LIST_NAMES.length)],
    tasks
  }
}

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }))

app.get('/taskList', (req: Request, res: Response) => {
  const taskList = generateTaskList()
  res.json(taskList)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export { app, generateTaskList }
