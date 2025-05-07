"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, 
  useTheme
  
} from "@mui/material";

 export default function VacationPage() {
  const theme = useTheme();

  const [vacationData, setVacationData] = useState([]);

  useEffect(() => {
    // Fetch vacation data from API
    axios
      .get("/api/vacation")
      .then((response) => {
        setVacationData(response.data);  // Set the fetched data
      })
      .catch((error) => {
        console.error("Error fetching vacation data:", error);
      });
  }, []);


  
    return (
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <Paper elevation={3} sx={{ p: 4, width: 400, backgroundColor: theme.palette.background.paper, }}>
            <Typography variant="h4" gutterBottom>
              Vacation 2025
            </Typography>
    
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Available</strong></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Requested</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Approved</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Taken</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Quotas</strong></TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell>Vacation</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      );
}
