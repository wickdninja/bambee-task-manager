import { ArrowBack } from '@mui/icons-material'
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
  Avatar,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()
  const showBackButton = router.pathname !== '/'
  const { data: session, status } = useSession()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                flexGrow: 1,
              }}
              onClick={() => router.back()}
            >
              <ArrowBack />
            </IconButton>
          )}

          {session ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '1.5rem',
                }}
              >
                <Avatar
                  sx={{
                    marginRight: '1rem',
                  }}
                  alt={session?.user?.name || ''}
                  src={session?.user?.image || ''}
                />
                <Typography>{session?.user?.name}</Typography>
              </Box>

              <Link href="/api/auth/signout">
                <Button
                  variant="text"
                  sx={{
                    color: 'primary.contrastText',
                  }}
                >
                  Logout
                </Button>
              </Link>
            </Box>
          ) : (
            <Link href="/api/auth/signin">
              <Button
                variant="text"
                sx={{
                  color: 'primary.contrastText',
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
