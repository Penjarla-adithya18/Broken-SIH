import React from 'react';


import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

const trains = [
  { id: '101', priority: 'High', aiRecommendation: 'Proceed', manualOverride: false },
  { id: '102', priority: 'Medium', aiRecommendation: 'Hold', manualOverride: true },
];

const TrainControlPanel = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Train Control Panel</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Train ID</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>AI Recommendation</TableCell>
              <TableCell>Manual Override</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.map(train => (
              <TableRow key={train.id}>
                <TableCell>{train.id}</TableCell>
                <TableCell>{train.priority}</TableCell>
                <TableCell>{train.aiRecommendation}</TableCell>
                <TableCell>{train.manualOverride ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" size="small">Override</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainControlPanel;
