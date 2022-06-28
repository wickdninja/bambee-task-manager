import { Box, Button, Typography } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import TaskList from '../components/TaskList'
import { uri, getAll, put } from '../lib/fetcher'
import { Task } from '../lib/models'
import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
    include: {
      tasks: true,
    },
  })
  const tasks = user?.tasks || []
  return {
    props: { ssr: JSON.parse(JSON.stringify(tasks)) }, // workaround for nextjs date serialization
    // https://simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
  }
}

const TaskManager: NextPage<{ ssr: Task[] }> = ({ ssr }) => {
  const { data: session, status } = useSession()

  const [tasks, setTasks] = useState(ssr || [])

  const { data, error } = useSWR(uri, getAll)
  useEffect(() => {
    if (data) {
      setTasks(data)
    }
  }, [data])

  const handleCheckChanged = (task: Task) => {
    const newTask: Task = {
      ...task,
      status: task.status === 'NEW' ? 'COMPLETED' : 'NEW',
    }
    console.log('update task', newTask)
    setTasks([...tasks.filter((t) => t.id !== task.id), newTask])
    put(newTask).then((res) => {
      console.log('task updated', res)
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {session ? (
        <TaskList onCheck={handleCheckChanged} tasks={tasks}></TaskList>
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Please{' '}
            <Link href="/api/auth/signin">
              <Button variant="text">login</Button>
            </Link>{' '}
            to continue.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TaskManager
