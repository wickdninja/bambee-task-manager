import { Task } from './models'

export const uri = `/api/tasks`

export async function getAll(): Promise<Task[]> {
  try {
    const response = await fetch(uri)
    return response.json()
  } catch (e) {
    return []
  }
}

export async function getById(id: string): Promise<Task | null> {
  try {
    const response = await fetch(`${uri}/${id}`)
    return await response.json()
  } catch (error) {
    return null
  }
}

export async function put(task: Task): Promise<Task> {
  try {
    const body = JSON.stringify(task || {})
    const response = await fetch(`${uri}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function remove(id: string): Promise<Task> {
  try {
    const response = await fetch(`${uri}/${id}`, {
      method: 'DELETE',
    })
    return await response.json()
  } catch (e) {
    console.error(e)
    throw e
  }
}
