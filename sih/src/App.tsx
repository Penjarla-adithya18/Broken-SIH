import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TrainControlPanel from './components/TrainControlPanel';
import ConflictResolution from './components/ConflictResolution';
import WhatIfSimulation from './components/WhatIfSimulation';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import AdminPages from './components/AdminPages';
import AuditLogs from './components/AuditLogs';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#2c3e50' },
      secondary: { main: '#3498db' },
      background: {
        default: darkMode ? '#121212' : '#f5f7fa',
        paper: darkMode ? '#1e293b' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ✅ lowercase fix */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/train-control" element={<TrainControlPanel />} />
          <Route path="/conflict-resolution" element={<ConflictResolution />} />
          <Route path="/what-if" element={<WhatIfSimulation />} />
          <Route path="/analytics" element={<PerformanceAnalytics />} />
          <Route path="/admin" element={<AdminPages />} />
          <Route path="/audit" element={<AuditLogs />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
