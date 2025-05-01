"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export default function hrsicknessrequest() {
  const [absenceType, setAbsenceType] = useState("Sick Leave");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [untilDate, setUntilDate] = useState<Date | null>(null);

  const dummyRequests = [
    { id: 1, worker: "Worker1", from: "19th April", to: "20th April" },
    { id: 2, worker: "Worker2", from: "16th April", to: "18th April" },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Timemanager
          </Typography>
          <Typography variant="h6">Logo</Typography>
        </Toolbar>
        <Tabs value={0} sx={{ backgroundColor: "#90caf9" }}>
          <Tab label="Times" />
          <Tab label="Absence" />
          <Tab label="Time Account" />
          <Tab label="Vacation" />
          <Tab label="User Statistics" />
          <Tab label="User Administration" />
        </Tabs>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Box display="flex" gap={4}>
          {/* Left Column */}
          <Box flex={1}>
            <Paper sx={{ p: 2, mb: 4 }}>
              <Typography variant="h6">Select a Date</Typography>
              <DatePicker
                label="Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{ textField: { fullWidth: true, sx: { mt: 2 } } }}
              />
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                New Absence
              </Typography>
              <TextField
                select
                label="Kind of Absence"
                value={absenceType}
                onChange={(e) => setAbsenceType(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                <MenuItem value="Vacation">Vacation</MenuItem>
              </TextField>
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
              <DatePicker
                label="Until"
                value={untilDate}
                onChange={(newValue) => setUntilDate(newValue)}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
              <Box display="flex" justifyContent="space-between">
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained" color="primary">
                  Send
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Right Column */}
          <Box flex={1}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Sick Leave Requests
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Worker</TableCell>
                    <TableCell>From/To</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>{req.worker}</TableCell>
                      <TableCell>
                        {req.from} - {req.to}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Accept
                        </Button>
                        <Button variant="contained" color="error" size="small">
                          Deny
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}