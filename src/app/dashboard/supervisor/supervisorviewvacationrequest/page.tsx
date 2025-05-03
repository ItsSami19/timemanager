"use client";

import React from "react";
import { Box, Grid, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const vacationRequests = [
    { worker: "Worker1", from: "18th April", to: "20th April" },
    { worker: "Worker2", from: "16th April", to: "18th April" },
];

const vacationStats = {
    available: "22/30",
    requested: 0,
    approved: 10,
    taken: 8,
    quota: 30,
};

export default function VacationPage() {
    return (
        <Box p={4}>
            <Grid container spacing={4}>
                {/* Left: Vacation Requests */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Vacation Requests
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Worker</b></TableCell>
                                    <TableCell><b>From/To</b></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vacationRequests.map((req, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{req.worker}</TableCell>
                                        <TableCell>{`${req.from} - ${req.to}`}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" color="success" size="small" sx={{ mr: 1 }}>
                                                Accept
                                            </Button>
                                            <Button variant="contained" color="error" size="small">
                                                Deny
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* Leere Zeilen */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={`empty-${i}`}>
                                        <TableCell colSpan={3}>&nbsp;</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Right: Vacation 2025 Stats */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Vacation 2025
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>Available</b></TableCell>
                                    <TableCell align="right">{vacationStats.available}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Requested</TableCell>
                                    <TableCell align="right">{vacationStats.requested}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Approved</TableCell>
                                    <TableCell align="right">{vacationStats.approved}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Taken</TableCell>
                                    <TableCell align="right">{vacationStats.taken}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Quotas</b></TableCell>
                                    <TableCell align="right"><b>Vacation</b></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="right">{vacationStats.quota}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}
