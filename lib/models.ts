export type TaskStatus = 'NEW' | 'COMPLETED'
export interface Task {
  id: string
  name: string
  description: string
  userId: string
  due?: Date | string
  status: TaskStatus
}

export interface User {
  id: string
  name: string
  email: string
  emailVerified: Date
  image: string
  createdAt: Date
  updatedAt: Date
  tasks: Task[]
}
