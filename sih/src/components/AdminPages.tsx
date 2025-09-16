import React from 'react';


import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

const initialTimetable = [
  { train: '101', time: '10:00', section: 'A' },
  { train: '102', time: '10:15', section: 'B' },
];

const AdminPages = () => {
  const [timetable, setTimetable] = useState(initialTimetable);
  const [newTrain, setNewTrain] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newSection, setNewSection] = useState('');

  const addTimetable = () => {
    setTimetable([...timetable, { train: newTrain, time: newTime, section: newSection }]);
    setNewTrain(''); setNewTime(''); setNewSection('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Admin Pages</Typography>
      <Typography variant="h6">Timetable Management</Typography>
      <List>
        {timetable.map((item, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`Train ${item.train} - ${item.time} - Section ${item.section}`} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
  <TextField label="Train" value={newTrain} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTrain(e.target.value)} />
  <TextField label="Time" value={newTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTime(e.target.value)} />
  <TextField label="Section" value={newSection} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSection(e.target.value)} />
        <Button variant="contained" onClick={addTimetable}>Add</Button>
      </Box>
      <Typography variant="h6" sx={{ mt: 4 }}>Constraints</Typography>
      <Typography>Max trains per section: 2</Typography>
      <Typography>Allowed sections: A, B, C</Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>User Roles</Typography>
      <Typography>Controller, Admin, Auditor</Typography>
    </Box>
  );
};

export default AdminPages;
