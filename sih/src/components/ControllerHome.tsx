import * as React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  Card, 
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import '../styles/ControllerHome.css'; // ✅ fixed import

interface HomeProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const ControllerHome: React.FC<HomeProps> = ({ toggleTheme, darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className={`home-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* ✅ Navigation Bar */}
      <Box className="navbar">
        <Typography variant="h6" className="navbar-logo">
          🚆 RailOps
        </Typography>
        <Stack direction="row" spacing={3} className="navbar-links">
          <Button component={Link} to="/" className="nav-link">
            Home
          </Button>
          <Button component={Link} to="/features" className="nav-link">
            Features
          </Button>
          <Button component={Link} to="/dashboard" className="nav-link">
            Dashboard
          </Button>
          <Button component={Link} to="/login" className="nav-link nav-login">
            Login
          </Button>
          <IconButton 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="toggle theme"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Stack>
      </Box>

      {/* ✅ Header */}
      <Box className="header-section">
        <Typography variant="h3" className="main-title">
          Railway Operations Management System
        </Typography>
        <Typography variant="subtitle1" className="subtitle">
          Advanced management platform for railway network operations and optimization
        </Typography>
      </Box>

      {/* ✅ Features */}
      <Box className="features-section">
        <Typography variant="h4" className="section-title">
          System Capabilities
        </Typography>

        <Box className="features-grid">
          <Card className="feature-card">
            <CardContent>
              <div className="card-icon">🚆</div>
              <Typography variant="h6" className="card-title">
                Train Management
              </Typography>
              <Typography variant="body2" className="card-description">
                Monitor and manage train schedules, status, and routing in real-time.
              </Typography>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardContent>
              <div className="card-icon">⚡</div>
              <Typography variant="h6" className="card-title">
                Conflict Resolution
              </Typography>
              <Typography variant="body2" className="card-description">
                Identify and resolve scheduling conflicts with advanced algorithms.
              </Typography>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardContent>
              <div className="card-icon">📊</div>
              <Typography variant="h6" className="card-title">
                Performance Analytics
              </Typography>
              <Typography variant="body2" className="card-description">
                Comprehensive analytics for operational efficiency and performance metrics.
              </Typography>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardContent>
              <div className="card-icon">🔍</div>
              <Typography variant="h6" className="card-title">
                Simulation Tools
              </Typography>
              <Typography variant="body2" className="card-description">
                Run detailed simulations to optimize scheduling and resource allocation.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* ✅ Action Section */}
      <Box className="action-section">
        <Typography variant="h5" className="action-title">
          Access System Dashboard
        </Typography>
        <Typography variant="body1" className="action-subtitle">
          Authorized personnel only. Please authenticate to continue.
        </Typography>

        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={3} 
          justifyContent="center" 
          className="button-group"
        >
          <Button 
            component={Link} 
            to="/login" 
            variant="contained" 
            className="login-button"
            size="large"
          >
            Secure Login
          </Button>
          <Button 
            component={Link} 
            to="/dashboard" 
            variant="outlined"
            className="dashboard-button"
            size="large"
          >
            View Dashboard
          </Button>
        </Stack>
      </Box>

      {/* ✅ Footer */}
      <Box className="footer">
        <Typography variant="caption" className="footer-text">
          © 2025 Railway Operations Management System. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ControllerHome;
