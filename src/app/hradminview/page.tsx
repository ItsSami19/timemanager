"use client";

import { useEffect, useState } from "react";
import {
  Button, Table, TableBody, TableCell, TableHead, TableRow,
  TextField, MenuItem, Select, Dialog, DialogTitle, DialogContent,
  DialogActions
} from "@mui/material";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  team: string;
  role: string;
};

const roleHierarchy = ['EMPLOYEE', 'SUPERVISOR', 'HR'];

export default function HRAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", team: "", role: "EMPLOYEE", password: "" });

  const fetchUsers = async () => {
    const res = await axios.get("/api/hradmin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    await axios.post("/api/hradmin/create", form);
    setOpen(false);
    fetchUsers();
  };

  const updateRole = (currentRole: string, action: 'promote' | 'demote') => {
    const currentIndex = roleHierarchy.indexOf(currentRole);
    if (action === 'promote') {
      return roleHierarchy[Math.min(currentIndex + 1, roleHierarchy.length - 1)];
    }
    return roleHierarchy[Math.max(currentIndex - 1, 0)];
  };

  const handleRoleChange = async (id: string, action: 'promote' | 'demote') => {
    const user = users.find(u => u.id === id);
    if (!user) return;

    const newRole = updateRole(user.role, action);
    await axios.post("/api/hradmin/update", { id, role: newRole });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await axios.post("/api/hradmin/delete", { id });
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Administration</h1>
      <Button variant="contained" onClick={() => setOpen(true)}>+ Create User</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <TextField label="Email" fullWidth margin="dense" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <TextField label="Name" fullWidth margin="dense" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField label="Team" fullWidth margin="dense" value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} />
          <TextField label="Password" fullWidth margin="dense" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <Select fullWidth value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ marginTop: 16 }}>
            <MenuItem value="EMPLOYEE">Employee</MenuItem>
            <MenuItem value="SUPERVISOR">Supervisor</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>

      <Table style={{ marginTop: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.team}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={() => handleRoleChange(u.id, "promote")}
                  disabled={u.role === 'HR'}
                >
                  Promote
                </Button>
                <Button 
                  variant="contained" 
                  color="warning" 
                  onClick={() => handleRoleChange(u.id, "demote")} 
                  style={{ marginLeft: 8 }}
                  disabled={u.role === 'EMPLOYEE'}
                >
                  Demote
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDelete(u.id)} 
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
