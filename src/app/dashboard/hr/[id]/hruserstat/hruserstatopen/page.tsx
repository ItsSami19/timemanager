'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Public as PublicIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon, 
} from '@mui/icons-material'; 

interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function UserStatisticsOpenedPage({ params }: Props) {
  const userId = params.id;  // Die ID wird aus den Parametern übernommen
  const [tabValue, setTabValue] = useState(4); // 4 = User Statistics
  const [employeeName] = useState('Max Mustermann'); // Beispielname des Mitarbeiters
  const [employeeId] = useState('12345'); // Beispielhafte ID des Mitarbeiters

  const timeAccountData = [
    { month: 'January', hours: 160 },
    { month: 'February', hours: 140 },
    { month: 'March', hours: 155 },
    { month: 'April', hours: 145 },
  ];

  const vacationData = [
    {
      year: '2025',
      requested: 20,
      approved: 18,
      taken: 15,
      quota: 25,
      vacation: 10,
      remaining: 10,
    },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#f7f7f7' }}>
      {/* AppBar ohne Kasten, nur das Logo und die Icons */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo: "TimeManager" in der Mitte */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', flexGrow: 1, textAlign: 'center' }}>
            TimeManager
          </Typography>

          {/* Icons rechts */}
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

      {/* Back Button als Symbol und rechts neben der Tabelle */}
      <IconButton
        color="primary"
        sx={{
          position: 'absolute',
          top: 180, 
          right: 30, 
        }}
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon sx={{ color: 'black' }} />
      </IconButton>

      {/* Employee Info */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
        Employee: {employeeName}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', color: '#555' }}>
        Employee ID: {employeeId} 
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        User Statistics for ID: {userId}
      </Typography>

      <Divider sx={{ mb: 4 }} /> {/* Divider zwischen Abschnitten */}

      {/* Tabellen nebeneinander mit flexbox */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        {/* Flex Time Account Table */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Flex Time Account
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Month</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333' }}>Hours Worked</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {timeAccountData.map((entry) => (
                  <TableRow key={entry.month}>
                    <TableCell>{entry.month}</TableCell>
                    <TableCell align="right">{entry.hours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Vacation Days Table */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Vacation Days 2025
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#333' }}>Field</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#333' }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vacationData.map((entry) => (
                  <React.Fragment key={entry.year}>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Year</strong></TableCell>
                      <TableCell align="right">{entry.year}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Requested</strong></TableCell>
                      <TableCell align="right">{entry.requested}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Approved</strong></TableCell>
                      <TableCell align="right">{entry.approved}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Taken</strong></TableCell>
                      <TableCell align="right">{entry.taken}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Quota</strong></TableCell>
                      <TableCell align="right">{entry.quota}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Vacation</strong></TableCell>
                      <TableCell align="right">{entry.vacation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: '#555' }}><strong>Remaining</strong></TableCell>
                      <TableCell align="right">{entry.remaining}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}