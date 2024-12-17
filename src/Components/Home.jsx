import * as React from 'react';
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList() {
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const handleAddTask = () => {
    if (task.trim()) {
      const newTasks = [...tasks, { text: task, completed: false }];
      setTasks(newTasks);
      setTask('');
      // Save tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      // Show alert message
      alert('Task added successfully!');
    } else {
      alert('Please enter a valid task.');
    }
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const handleDeleteTask = (indexToDelete) => {
    const newTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(newTasks);
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    //main box
    <Box component="section" sx={{ 
       height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient( rgb(78, 22, 138), #2575fc, #ff5722)', }}>
      
      {/* backgroud box using paper  */}
      <Paper sx={{ p: 3, width: '80%', maxWidth: 500, }}>
        
        {/* heading */}
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
          To-do List
        </Typography>

        {/* textbox */}
        <TextField
          label="New Task"
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            }
          }}
          sx={{ marginBottom: 2 }}
        />
                
        {/* button */}        
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          fullWidth
        >
          Add Task
        </Button>
        
        {/* use of the list to display the check box */}
        <List sx={{ marginTop: 2 }}>
          {tasks.map((task, index) => (
            // list item with checkbox and delete icon
            <ListItem key={index} secondaryAction={
              <IconButton
              edge="end" 
              aria-label="delete" 
              onClick={() => handleDeleteTask(index)}
              onKeyPress={(e) => {
                if (e.key === 'Delete') {
                  handleDeleteTask(index);
                }
              }}
              >
                <DeleteIcon />
              </IconButton> }>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <ListItemText
                primary={task.text}
                sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
} 
