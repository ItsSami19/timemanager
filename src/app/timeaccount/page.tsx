// app/userstat/page.tsx (kein [id] nötig, wenn User aus Session kommt)
import { auth } from "@/lib/auth"; // oder getServerSession
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

export default async function UserStatisticsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <Container>
        <Typography variant="h6">Nicht eingeloggt</Typography>
      </Container>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      timesheets: {
        orderBy: { date: "asc" },
      },
      vacationRequests: {
        orderBy: { startDate: "asc" },
      },
    },
  });

  if (!user) {
    return (
      <Container>
        <Typography variant="h6">Benutzer nicht gefunden</Typography>
      </Container>
    );
  }

  const flexByMonth = user.timesheets.reduce((acc, ts) => {
    const month = format(ts.date, "yyyy-MM");
    const hours = (ts.end.getTime() - ts.start.getTime()) / 1000 / 3600;
    acc[month] = (acc[month] || 0) + hours;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Statistiken für {user.name}
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Flex Time Account
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Monat</TableCell>
              <TableCell>Stunden</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(flexByMonth).map(([month, hours]) => (
              <TableRow key={month} hover>
                <TableCell>{month}</TableCell>
                <TableCell>{hours.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Urlaubsanträge
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start</TableCell>
              <TableCell>Ende</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.vacationRequests.map((vr) => (
              <TableRow key={vr.id} hover>
                <TableCell>{format(vr.startDate, "yyyy-MM-dd")}</TableCell>
                <TableCell>{format(vr.endDate, "yyyy-MM-dd")}</TableCell>
                <TableCell>{vr.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
