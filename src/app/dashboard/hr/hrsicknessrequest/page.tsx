"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Box,
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
  const [sicknesses, setSicknesses] = useState<
    { id: string; worker: string; from: string; to: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("/api/hr/sickness")
      .then((res) => setSicknesses(res.data.sicknesses))
      .catch((err) => console.error("Error loading sicknesses:", err));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                  {sicknesses.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.worker}</TableCell>
                      <TableCell>
                        {entry.from.slice(0, 10)} – {entry.to.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">
                        {/* Placeholder for future actions */}
                        <Button size="small" disabled>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sicknesses.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>No entries found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

