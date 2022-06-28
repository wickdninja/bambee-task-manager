import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
} from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { Task, TaskStatus } from '../lib/models'

export default function TaskDetail({
  task,
  onChange,
  onSave,
  onRemove,
}: {
  task: Task
  onChange: (task: Task) => void
  onSave: (task: Task) => void
  onRemove: (task: Task) => void
}) {
  return (
    <Container
      sx={{
        display: 'flex',
        minHeight: '50vh',
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            sx={{
              width: '100%',
            }}
            id="name"
            label="Title"
            variant="outlined"
            value={task?.name}
            onChange={(e) => onChange({ ...task, name: e.currentTarget.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            sx={{
              width: '100%',
            }}
          >
            <FormLabel id="description-label">Description</FormLabel>
            <TextareaAutosize
              minRows={4}
              style={{
                background: '#fff',
              }}
              name="description"
              id="description"
              value={task?.description}
              onChange={(event) =>
                onChange({ ...task, description: event.target.value })
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DesktopDatePicker
            label="Due Date"
            inputFormat="MM/dd/yyyy"
            value={task?.due}
            onChange={(date) => onChange({ ...task, due: date || undefined })}
            renderInput={(params) => (
              <TextField
                sx={{ width: '100%' }}
                id="due"
                label="Due Date"
                value={task?.due || new Date()}
                {...params}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="status">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="status"
              name="status"
              value={task?.status || 'NEW'}
              onChange={(event) =>
                onChange({
                  ...task,
                  status: event.target.value as TaskStatus,
                })
              }
            >
              <FormControlLabel value="NEW" control={<Radio />} label="New" />
              <FormControlLabel
                value="COMPLETED"
                control={<Radio />}
                label="Completed"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSave(task)}
            >
              Save
            </Button>
            {task.id !== 'new' && (
              <Button
                onClick={() => onRemove(task)}
                variant="contained"
                color="error"
              >
                Delete Task
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
        }}
      ></Box>
    </Container>
  )
}
