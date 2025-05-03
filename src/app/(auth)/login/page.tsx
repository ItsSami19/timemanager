"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Container,
  CssBaseline,
  useTheme,
  IconButton, // Importiere IconButton
} from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material"; // Importiere die Icons für Dark/Light Mode
import { useColorMode } from "../../theme/providers"; // Den Farbmodus-Hook importieren

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  // Zugriff auf das Theme und den Farbmodus-Hook
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!res?.error) {
      router.push(callbackUrl);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper, // Dynamische Hintergrundfarbe je nach Modus
        }}
      >
        <Typography component="h1" variant="h5" sx={{ color: theme.palette.text.primary }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-Mail Adresse"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
              '& .MuiInputBase-root': {
                color: theme.palette.text.primary,
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passwort"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
              '& .MuiInputBase-root': {
                color: theme.palette.text.primary,
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.paper,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Einloggen
          </Button>

          <Box textAlign="center">
            <Link href="/auth/forgot-password" variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Passwort vergessen?
            </Link>
          </Box>
        </Box>

        {/* Dark/Light Mode Toggle Button */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            zIndex: 2000,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "50%",
            boxShadow: 2,
          }}
        >
          <IconButton onClick={toggleColorMode} sx={{ color: theme.palette.text.primary }}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}
