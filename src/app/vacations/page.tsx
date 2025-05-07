"use client";
import React from "react";
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
