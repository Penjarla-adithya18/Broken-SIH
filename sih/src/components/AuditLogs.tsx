import React from 'react';


import { Box, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

const logs = [
  { time: '10:01', type: 'AI', action: 'Suggested delay for Train 102' },
  { time: '10:02', type: 'Human', action: 'Override: Train 102 proceed' },
];

const AuditLogs = () => {
  const [search, setSearch] = useState('');
  const filteredLogs = logs.filter(log => log.action.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Audit & Logs</Typography>
      <TextField
        label="Search logs"
        value={search}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <List>
        {filteredLogs.map((log, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`${log.time} - ${log.type}`} secondary={log.action} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AuditLogs;
