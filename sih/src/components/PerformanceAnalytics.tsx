import React from 'react';


import { Box, Typography, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Delays (min)',
      data: [5, 10, 3, 8, 2],
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.2)',
    },
    {
      label: 'Throughput (trains/hr)',
      data: [18, 20, 17, 19, 21],
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,255,0.2)',
    },
    {
      label: 'Utilization (%)',
      data: [80, 85, 78, 90, 88],
      borderColor: 'green',
      backgroundColor: 'rgba(0,255,0,0.2)',
    },
  ],
};

const PerformanceAnalytics = () => {
  const handleExport = () => {
    // Export logic placeholder
    alert('Report exported!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Performance & Analytics</Typography>
      <Line data={data} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleExport}>Export Report</Button>
    </Box>
  );
};

export default PerformanceAnalytics;
