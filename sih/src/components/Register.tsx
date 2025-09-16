import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, SelectChangeEvent } from '@mui/material';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [role, setRole] = useState('Controller');

  const handleRegister = () => {
    if (password !== rePassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add registration logic here
    alert(`Registered as ${name} (${role}), Email: ${email}, Mobile: ${mobile}`);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Register New User</Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <TextField
        label="Mobile Number"
        fullWidth
        margin="normal"
        value={mobile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobile(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <TextField
        label="Re-enter Password"
        type="password"
        fullWidth
        margin="normal"
        value={rePassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRePassword(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select value={role} label="Role" onChange={(e: SelectChangeEvent<string>) => setRole(e.target.value as string)}>
          <MenuItem value="Controller">Controller</MenuItem>
          <MenuItem value="Auditor">Auditor</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister} sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
