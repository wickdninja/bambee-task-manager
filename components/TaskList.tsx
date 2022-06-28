import { Add } from '@mui/icons-material'
import {
  Checkbox,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Link,
  Fab,
} from '@mui/material'
import { Task } from '../lib/models'
import { format, parseISO } from 'date-fns'

export default function TaskList({
  tasks,
  onCheck,
}: {
  tasks: Task[]
  onCheck: (task: Task) => void
}) {
  return (
    <Container>
      <Link
        sx={{
          position: 'absolute',
          top: '7rem',
          right: '4rem',
        }}
        href="/new"
      >
        <Fab color="primary">
          <Add />
        </Fab>
      </Link>

      {(!tasks || tasks.length === 0) && (
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          {Math.random() > 0.5 ? "You're a task master!" : 'All caught up!'}
        </Typography>
      )}

      <List
        sx={{
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              display: 'flex',
              width: '100%',
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#fff',
            }}
          >
            <Checkbox
              checked={task.status === 'COMPLETED'}
              onChange={() => onCheck(task)}
              name={task.name}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            ></Checkbox>
            <ListItemButton href={`/${task.id}`}>
              <ListItemText
                primary={task.name}
                secondary={task.description}
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  marginLeft: '1rem',
                  textDecoration:
                    task.status === 'COMPLETED' ? 'line-through' : 'none',
                }}
              />

              <Typography
                sx={{
                  position: 'absolute',
                  right: '1rem',
                  top: '10%',
                }}
                variant="body2"
              >
                {/*TODO date here but parsed as "today" or "tomorrow" or "MM/dd/yy" */}
                {task && task.due
                  ? format(parseISO(`${task.due}`), 'MM/dd/yy')
                  : ''}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
