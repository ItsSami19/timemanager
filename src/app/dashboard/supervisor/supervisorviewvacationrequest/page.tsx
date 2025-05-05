"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

export default function VacationPage() {
  const [vacationRequests, setVacationRequests] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchVacationData = async () => {
      const res = await fetch("/api/supervisor/vacation");
      const data = await res.json();
      setVacationRequests(data.requests);

      const members = await fetch("/api/supervisor/team-members");
      const memberData = await members.json();
      setTeamMembers(memberData.members);
    };

    fetchVacationData();
  }, []);

  // calculate vacation stats for each team member (right table)
  const calculateVacationStats = (memberId: string) => {
    let requested = 0;
    let approved = 0;
    let taken = 0;

    const memberRequests = vacationRequests.filter((req) => req.workerId === memberId);

    memberRequests.forEach((req) => {
      const duration = (new Date(req.to).getTime() - new Date(req.from).getTime()) / (1000 * 3600 * 24) + 1;

      if (req.status === "PENDING") {
        requested += duration;
      } else if (req.status === "APPROVED") {
        approved += duration;
      } else if (req.status === "TAKEN") {
        taken += duration;
      }
    });

    return {
      requested,
      approved,
      taken,
      available: 30 - approved,
      quota: 30
    };
  };


  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* left table: vacation requests */}
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
                  <TableCell align="right"><b>Status</b></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {vacationRequests.length === 0 ? ( // if 0 vacation requests exist
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No vacation requests
                    </TableCell>
                  </TableRow>
                ) : ( // if vacation requests exist
                  vacationRequests.map((req) => (
                    <TableRow key={req.id} style={{ backgroundColor: req.status === "APPROVED" ? "lightgreen" : req.status === "REJECTED" ? "lightcoral" : "default" }}>
                      <TableCell>{req.worker}</TableCell>
                      <TableCell>{`${req.from} - ${req.to}`}</TableCell>
                      <TableCell align="right">{req.status}</TableCell>
                      <TableCell align="right">
                        {req.status === "PENDING" && (
                          <>
                            <Button // accept button
                              variant="contained"
                              color="success"
                              size="small"
                              sx={{ mr: 1 }}
                              onClick={async () => {
                                const res = await fetch(`/api/supervisor/vacation/${req.id}`, {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({ status: "APPROVED" })
                                });
                                if (res.ok) {
                                  const updated = await res.json();
                                  setVacationRequests((prev) =>
                                    prev.map((r) => (r.id === req.id ? updated.updated : r))
                                  );
                                }
                              }}
                            >
                              Accept
                            </Button>
                            <Button //reject button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={async () => {
                                const reason = prompt("Please give a reason for rejection:");
                                if (reason === null) {
                                  return;
                                }
                                const res = await fetch(`/api/supervisor/vacation/${req.id}`, {
                                  method: "PUT",
                                  headers: {
                                    "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify({
                                    status: "REJECTED",
                                    rejectionReason: reason
                                  })
                                });

                                if (res.ok) {
                                  const updated = await res.json();
                                  setVacationRequests((prev) =>
                                    prev.map((r) => (r.id === req.id ? updated.updated : r))
                                  );
                                }
                              }}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* right table: team member's vacation stats */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Team Vacation Stats
          </Typography>
          <TableContainer component={Paper}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell><b>Team Member</b></TableCell>
                  <TableCell><b>Available</b></TableCell>
                  <TableCell><b>Requested</b></TableCell>
                  <TableCell><b>Approved</b></TableCell>
                  <TableCell><b>Taken</b></TableCell>
                  <TableCell><b>Quota</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {teamMembers.length === 0 ? ( // if 0 team members exist
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No team members found
                    </TableCell>
                  </TableRow>
                ) : ( // if team members exist
                  teamMembers.map((member) => {
                    const stats = calculateVacationStats(member.id);

                    return (
                      <TableRow key={member.id}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{stats.available}</TableCell>
                        <TableCell>{stats.requested}</TableCell>
                        <TableCell>{stats.approved}</TableCell>
                        <TableCell>{stats.taken}</TableCell>
                        <TableCell>{stats.quota}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}




