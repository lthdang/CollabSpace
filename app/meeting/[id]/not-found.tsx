import * as React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";

/**
 * 404 page for meeting not found
 */
export default function MeetingNotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            width: "100%",
          }}
        >
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: "error.main",
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Meeting Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The meeting you're looking for doesn't exist or has been deleted.
          </Typography>
          <Button variant="contained" component={Link} href="/" sx={{ mt: 2 }}>
            Back to Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
