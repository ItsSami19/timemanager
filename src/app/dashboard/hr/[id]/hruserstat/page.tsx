'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserStatisticsPage() {
  // Beispielhafte Benutzer mit unterschiedlichen Rollen (HR, Supervisor, Employee)
  const users = [
    { id: 1, name: 'Max Mustermann', email: 'max.mustermann@example.com', role: 'Employee' },
    { id: 2, name: 'Erika Mustermann', email: 'erika.mustermann@example.com', role: 'Employee' },
    { id: 3, name: 'John Doe', email: 'john.doe@example.com', role: 'Supervisor' },
    { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Employee' },
    { id: 5, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Supervisor' }, // Supervisor
  ];

  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(3); // 3 = User Statistics tab

  useEffect(() => {
    // Placeholder for fetching user data
    // You can make an Axios request here as per your original code
  }, []);

  // Filtered users based on search input
  const filteredUsers = users.filter((user) =>
    (user.name?.toLowerCase().includes(search.toLowerCase()) ?? false) || (user.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <Box sx={{ p: 4, bgcolor: 'white' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo: "TimeManager" in the center */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', flexGrow: 1, textAlign: 'center' }}>
            TimeManager
          </Typography>

          {/* Icons on the right */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
            <IconButton color="inherit" aria-label="Sprache/Welt">
              <PublicIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton color="inherit" aria-label="Benutzerprofil">
              <AccountCircleIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton color="inherit" aria-label="Benachrichtigungen">
              <NotificationsIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton color="inherit" aria-label="Abmelden">
              <LogoutIcon sx={{ color: 'black' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 4 }}>
        <Tab label="Times" />
        <Tab label="Absence" />
        <Tab label="Time Account" />
        <Tab label="Vacation" />
        <Tab label="User Statistics" />
      </Tabs>

      {/* Heading */}
      <Typography variant="h4" gutterBottom>
        User Statistics
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        placeholder="🔍 E-mail / Name"
        variant="outlined"
        sx={{ mb: 3 }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell align="right"><strong>See Statistics</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.filter(user => user.role !== 'HR').map((user) => ( // Filter out HR role
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => window.location.href = `/user/${user.id}`} // Changed the URL to reflect the user page
                  >
                    Open Statistics
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.filter(user => user.role !== 'HR').length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}