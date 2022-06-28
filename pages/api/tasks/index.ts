// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Task } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[] | { message: string }>
) {
  try {
    const session = await getSession({ req })
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const tasks = await prisma.user
      .findUnique({
        where: { email: session?.user?.email || '' },
      })
      .tasks()
    return res.status(200).json(tasks)
  } catch (e: any) {
    return res.status(400).end(e?.message || 'Unexpected error')
  }
}
