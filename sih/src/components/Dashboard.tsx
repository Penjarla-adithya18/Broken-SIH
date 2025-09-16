
import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Alert, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import "../styles/Dashboard.css";

const trainsData = [
  { id: 101, name: "Express A", status: "Delayed", location: "Section 3", schedule: "10:30" },
  { id: 102, name: "Local B", status: "On Time", location: "Section 1", schedule: "10:45" },
  { id: 103, name: "Express C", status: "On Time", location: "Section 2", schedule: "11:00" },
];

const timetableData = [
  { train: "Express A", arrival: "10:30", departure: "10:35" },
  { train: "Local B", arrival: "10:45", departure: "10:50" },
  { train: "Express C", arrival: "11:00", departure: "11:05" },
];

const conflictsData = [
  { type: "Delay", trains: "101, 102", status: "Unresolved" },
  { type: "Track Block", trains: "103", status: "Resolved" },
];

const userInfo = { username: "admin", role: "Operator" };

const Dashboard = () => {
  const [search, setSearch] = useState("");

  // Placeholder for chart rendering
  React.useEffect(() => {
    Chart.register(BarElement, CategoryScale, LinearScale);
    const canvas = document.getElementById("analyticsChart") as HTMLCanvasElement | null;
    let chartInstance: Chart | null = null;
    if (canvas) {
      if (Chart.getChart(canvas)) {
        Chart.getChart(canvas)?.destroy();
      }
      chartInstance = new Chart(canvas, {
        type: "bar",
        data: {
          labels: ["On-time", "Delayed", "Throughput"],
          datasets: [{
            label: "KPIs",
            data: [92, 3, 18],
            backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);
  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Dashboard
      </Typography>
      {/* User Info */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">User: {userInfo.username} ({userInfo.role})</Typography>
      </Box>
      {/* Controls */}
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField label="Search Trains" value={search} onChange={e => setSearch(e.target.value)} size="small" />
        <Button variant="contained">Refresh</Button>
        <Button variant="outlined">Export Data</Button>
      </Box>

      <Grid container spacing={2}>
        {/* Live Map Section */}
  <Grid item xs={12} md={8}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Live Map of Trains
              </Typography>
              <Box className="map-placeholder">
                <Typography align="center" sx={{ pt: 8 }}>
                  Map goes here
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Train List */}
          <Card className="dashboard-card" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" className="card-title">Train List</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Schedule</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainsData.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).map(train => (
                      <TableRow key={train.id}>
                        <TableCell>{train.id}</TableCell>
                        <TableCell>{train.name}</TableCell>
                        <TableCell>{train.status}</TableCell>
                        <TableCell>{train.location}</TableCell>
                        <TableCell>{train.schedule}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Timetable */}
          <Card className="dashboard-card" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" className="card-title">Timetable</Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Train</TableCell>
                      <TableCell>Arrival</TableCell>
                      <TableCell>Departure</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timetableData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.train}</TableCell>
                        <TableCell>{row.arrival}</TableCell>
                        <TableCell>{row.departure}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

    {/* Right Panel */}
  <Grid item xs={12} md={4}>
          {/* Section Occupancy */}
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                Section Occupancy
              </Typography>
              <Typography className="occupancy-text">Occupied: 5</Typography>
              <Typography className="occupancy-text">Free: 12</Typography>
            </CardContent>
          </Card>

          {/* Conflict Alerts */}
          <Card className="dashboard-card" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" className="card-title">Conflict Alerts</Typography>
              {conflictsData.map((conf, idx) => (
                <Alert key={idx} severity={conf.status === "Unresolved" ? "warning" : "info"} className="dashboard-alert" sx={{ mb: 1 }}>
                  {conf.type} - Trains: {conf.trains} ({conf.status})
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* KPIs Snapshot */}
          <Card className="dashboard-card kpi-card" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" className="card-title">KPIs Snapshot</Typography>
              <Typography className="kpi-text">On-time: 92%</Typography>
              <Typography className="kpi-text">Delays: 3</Typography>
              <Typography className="kpi-text">Throughput: 18 trains/hr</Typography>
            </CardContent>
          </Card>

          {/* Analytics Chart */}
          <Card className="dashboard-card" sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" className="card-title">Analytics</Typography>
              <canvas id="analyticsChart" height="120"></canvas>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
