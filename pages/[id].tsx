import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import TaskDetail from '../components/TaskDetail'
import { Task } from '../lib/models'
import prisma from '../lib/prisma'
import { uri, put, remove, getById } from '../lib/fetcher'
import useSWR from 'swr'
import { addDays } from 'date-fns'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id || ''
  if (id === 'new') {
    return {
      props: {
        ssr: JSON.parse(
          JSON.stringify({
            id: 'new',
            name: '',
            description: '',
            due: addDays(new Date(), 1),
          })
        ),
      },
    }
  }
  const task = await prisma.task.findUnique({
    where: {
      id: String(id),
    },
  })
  return { props: { ssr: JSON.parse(JSON.stringify(task || {})) } } // workaround for nextjs serialization issue
  // https://simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
}

export default function TaskDetailPage({ ssr }: { ssr: Task }) {
  const router = useRouter()
  const [task, setTask] = useState(ssr)
  useEffect(() => {
    setTask(ssr)
  }, [ssr])

  const handleChange = (t: Task) => {
    setTask(t)
  }

  const handleSave = async (t: Task) => {
    try {
      const result = await put(t)
      console.log('task saved', result)
      router.replace('/')
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  const handleRemove = async (t: Task) => {
    try {
      const result = await remove(task.id)
      console.log('task removed', result)
      router.replace('/')
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  if (!task) {
    return <div>Loading...</div>
  }
  return (
    <TaskDetail
      task={task}
      onChange={handleChange}
      onSave={handleSave}
      onRemove={handleRemove}
    />
  )
}
