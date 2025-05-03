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
  useTheme
} from '@mui/material';

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

  useEffect(() => {
    // Placeholder for fetching user data
    // You can make an Axios request here as per your original code
  }, []);

  // Filtered users based on search input
  const filteredUsers = users.filter((user) =>
    (user.name?.toLowerCase().includes(search.toLowerCase()) ?? false) || (user.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  // Get theme for dark/light mode
  const theme = useTheme();

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default }}>
      {/* Heading */}
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        User Statistics
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        placeholder="🔍 E-mail / Name"
        variant="outlined"
        sx={{
          mb: 3,
          input: {
            color: theme.palette.text.primary,  // Ensures input text color matches theme
          },
          fieldset: {
            borderColor: theme.palette.text.primary, // Ensures border color is visible in dark mode
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}><strong>ID</strong></TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}><strong>User</strong></TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}><strong>Role</strong></TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}><strong>See Statistics</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.filter(user => user.role !== 'HR').map((user) => ( // Filter out HR role
              <TableRow key={user.id}>
                <TableCell sx={{ color: theme.palette.text.primary }}>{user.id}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{user.name}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>{user.role}</TableCell>
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
                <TableCell colSpan={4} align="center" sx={{ color: theme.palette.text.secondary }}>
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

/*http://localhost:3000/dashboard/hr/[id]/hruserstat*/
