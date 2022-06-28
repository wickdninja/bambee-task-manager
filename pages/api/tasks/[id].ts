import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { Task } from '../../../lib/models'

async function putTask(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req
  try {
    if (id.includes('new')) {
      const session = await getSession({ req })
      const task = await prisma.task.create({
        data: {
          ...req.body,
          email: session?.user?.email,
          id: undefined,
        },
      })
      return res.status(200).json(task)
    }
    const task = await prisma.task.update({
      where: { id: String(id) },
      data: req.body,
    })
    return res.status(200).json(task)
  } catch (e) {
    return res.status(404).end('Task not found')
  }
}

async function getTask(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req
  try {
    const task = await prisma.task.findUnique({ where: { id: String(id) } })
    return res.status(200).json(task)
  } catch (e) {
    return res.status(404).end('Task not found')
  }
}

async function deleteTask(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req
  try {
    const task = await prisma.task.delete({ where: { id: String(id) } })
    return res.status(200).json(task)
  } catch (e) {
    return res.status(404).end('Task not found')
  }
}

export default async function taskHandler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { method } = req
  switch (method) {
    case 'GET':
      return getTask(req, res)
    case 'PUT':
      return putTask(req, res)
    case 'DELETE':
      return deleteTask(req, res)
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
