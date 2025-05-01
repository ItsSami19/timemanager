'use client';

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserDashboard = () => {
  const [tabValue, setTabValue] = useState(4); // Default: "User Statistics"

  // Beispiel-Mitarbeiterdaten
  const employee = {
    name: 'Max Mustermann',
    email: 'max.mustermann@example.com',
    createdAt: '2022-01-15T12:00:00Z',
    projectsCompleted: 12,
    avgHoursPerWeek: 38,
    lastActive: '2025-04-28T09:30:00Z',
  };

  const joinDate = new Date(employee.createdAt);
  const daysAtCompany = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
  const lastActiveDate = new Date(employee.lastActive).toLocaleString();

  return (
    <Box>
      {/* Topbar mit "TimeManager" als Logo */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
          <Box sx={{ flex: 1 }} />

          {/* Logo: "TimeManager" in der Mitte */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            TimeManager
          </Typography>

          {/* Icons rechts */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton color="inherit" aria-label="Sprache/Welt">
              <PublicIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Benutzerprofil">
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Benachrichtigungen">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="Abmelden">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hauptinhalt */}
      <Box sx={{ p: 4 }}>
        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ mb: 4 }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Times" />
          <Tab label="Absence" />
          <Tab label="Time Account" />
          <Tab label="Vacation" />
          <Tab label="User Statistics" />
        </Tabs>

        {/* Inhalt je Tab */}
        {tabValue === 0 && <Typography>Zeiten werden hier angezeigt.</Typography>}
        {tabValue === 1 && <Typography>Abwesenheiten werden hier angezeigt.</Typography>}
        {tabValue === 2 && <Typography>Zeitsaldo wird hier angezeigt.</Typography>}
        {tabValue === 3 && <Typography>Urlaubsübersicht wird hier angezeigt.</Typography>}

        {tabValue === 4 && (
          <Box
            sx={{
              maxWidth: 700,
              margin: 'auto',
              mt: 4,
              p: 3,
              borderRadius: 3,
              boxShadow: 4,
              bgcolor: '#f9f9f9',
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              👤 Benutzerstatistik: {employee.name}
            </Typography>

            {/* Statt Grid jetzt Box mit Flexbox */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {/* Paper-Komponenten für die verschiedenen Informationen */}
              <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Zugehörigkeit
                  </Typography>
                  <Typography variant="h6">{daysAtCompany} Tage</Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Projekte abgeschlossen
                  </Typography>
                  <Typography variant="h6">{employee.projectsCompleted}</Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ø Stunden pro Woche
                  </Typography>
                  <Typography variant="h6">{employee.avgHoursPerWeek}</Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 calc(50% - 16px)' }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Letzte Aktivität
                  </Typography>
                  <Typography variant="h6">{lastActiveDate}</Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserDashboard;