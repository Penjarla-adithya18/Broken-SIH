import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import '../styles/WhatIfSimulation.css';

const scenarios = [
  { value: 'delay', label: 'Train Delay' },
  { value: 'trackClosure', label: 'Track Closure' },
  { value: 'reroute', label: 'Train Rerouting' },
];

const WhatIfSimulation = () => {
  const [scenario, setScenario] = useState('delay');
  const [trainId, setTrainId] = useState('');
  const [delay, setDelay] = useState(0);
  const [section, setSection] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [output, setOutput] = useState<any>(null);

  const handleSimulate = () => {
    let summary = '';
    if (scenario === 'delay') {
      summary = `Train ${trainId} delayed by ${delay} min in section ${section}. Throughput drops by 10%, on-time drops to 80%.`;
      setOutput({
        affectedTrains: [trainId],
        newConflicts: 1,
        kpi: { throughput: '90%', onTime: '80%' },
      });
    } else if (scenario === 'trackClosure') {
      summary = `Track ${section} closed. Trains rerouted, throughput drops by 20%.`;
      setOutput({
        affectedTrains: ['101', '102'],
        newConflicts: 2,
        kpi: { throughput: '80%', onTime: '75%' },
      });
    } else if (scenario === 'reroute') {
      summary = `Train ${trainId} rerouted via section ${section}. Minimal impact.`;
      setOutput({
        affectedTrains: [trainId],
        newConflicts: 0,
        kpi: { throughput: '98%', onTime: '95%' },
      });
    }
    setResult(summary);
  };

  const handleReset = () => {
    setScenario('delay');
    setTrainId('');
    setDelay(0);
    setSection('');
    setResult(null);
    setComments('');
    setOutput(null);
  };

  return (
    <Box className="simulation-container">
      <Typography variant="h4" gutterBottom className="simulation-title">
        What-if Simulation
      </Typography>

      <Paper className="simulation-form">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Scenario</InputLabel>
              <Select
                value={scenario}
                label="Scenario"
                onChange={(e) => setScenario(e.target.value)}
              >
                {scenarios.map((s) => (
                  <MenuItem key={s.value} value={s.value}>
                    {s.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Train ID"
              value={trainId}
              onChange={(e) => setTrainId(e.target.value)}
              fullWidth
              margin="normal"
              disabled={scenario === 'trackClosure'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          {scenario === 'delay' && (
            <Grid item xs={12} md={4}>
              <TextField
                label="Delay (minutes)"
                type="number"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                fullWidth
                margin="normal"
              />
            </Grid>
          )}
          <Grid item xs={12} md={8}>
            <TextField
              label="Comments/Notes"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
        <Box className="simulation-buttons">
          <Button variant="contained" onClick={handleSimulate}>
            Simulate
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Paper>

      {result && (
        <Card className="simulation-output">
          <CardContent>
            <Typography variant="h6" className="output-title">
              Simulation Output
            </Typography>
            <Typography className="output-summary">{result}</Typography>
            {output && (
              <Box className="output-details">
                <Typography>
                  <b>Affected Trains:</b> {output.affectedTrains.join(', ')}
                </Typography>
                <Typography>
                  <b>New Conflicts:</b> {output.newConflicts}
                </Typography>
                <Typography>
                  <b>KPIs:</b> Throughput: {output.kpi.throughput}, On-Time:{' '}
                  {output.kpi.onTime}
                </Typography>
              </Box>
            )}
            <Typography className="output-comments">
              <b>Comments:</b> {comments || 'None'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default WhatIfSimulation;
