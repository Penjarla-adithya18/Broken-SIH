import React from 'react';


import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Controller');

  const handleLogin = () => {
    // Add authentication logic here
    alert(`Logged in as ${email} (${role})`);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
  <Typography variant="h5" gutterBottom>Login & Access Control</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
  <Select value={role} label="Role" onChange={(e: SelectChangeEvent<string>) => setRole(e.target.value as string)}>
          <MenuItem value="Controller">Controller</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Auditor">Auditor</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
