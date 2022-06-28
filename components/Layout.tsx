import { Container, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import NavBar from './NavBar'

//ts ignore:next-line
export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="Task manager for authenticated users"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {session && (
          <Typography
            variant="h3"
            sx={{
              width: '100%',
              textAlign: 'center',
              marginTop: '2rem',
              marginBottom: '2rem',
            }}
          >
            Task Manager
          </Typography>
        )}
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'start',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          {children}
        </main>
      </Container>
    </>
  )
}
