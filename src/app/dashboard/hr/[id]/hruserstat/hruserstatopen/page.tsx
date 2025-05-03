'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon, 
} from '@mui/icons-material'; 

interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function UserStatisticsOpenedPage({ params }: Props) {
  const userId = params.id;  // Die ID wird aus den Parametern übernommen
  const [employeeName] = useState('Max Mustermann'); // Beispielname des Mitarbeiters

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

  const theme = useTheme(); // Zugriff auf aktives Theme

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default }}>
      {/* Entferne das AppBar und das Wort "TimeManager" */}
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
        <ArrowBackIcon sx={{ color: theme.palette.text.primary }} />
      </IconButton>

      {/* Employee Info */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
        Employee: {employeeName}
      </Typography>

      {/* Entferne die Employee ID Anzeige */}
      {/* <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', color: theme.palette.text.secondary }}>
        Employee ID: {employeeId} 
      </Typography> */}

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
        User Statistics for ID: {userId}
      </Typography>

      <Divider sx={{ mb: 4 }} /> {/* Divider zwischen Abschnitten */}

      {/* Tabellen nebeneinander mit flexbox */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        {/* Flex Time Account Table */}
        <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
            Flex Time Account
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, bgcolor: theme.palette.background.paper }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>Month</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>Hours Worked</TableCell>
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
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
            Vacation Days 2025
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3, bgcolor: theme.palette.background.paper }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                  <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>Field</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vacationData.map((entry) => (
                  <React.Fragment key={entry.year}>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Year</strong></TableCell>
                      <TableCell align="right">{entry.year}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Requested</strong></TableCell>
                      <TableCell align="right">{entry.requested}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Approved</strong></TableCell>
                      <TableCell align="right">{entry.approved}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Taken</strong></TableCell>
                      <TableCell align="right">{entry.taken}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Quota</strong></TableCell>
                      <TableCell align="right">{entry.quota}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Vacation</strong></TableCell>
                      <TableCell align="right">{entry.vacation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: theme.palette.text.secondary }}><strong>Remaining</strong></TableCell>
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


/*http://localhost:3000/dashboard/hr/[id]/hruserstat/hruserstatopen*/
