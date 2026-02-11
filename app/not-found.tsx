import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          textAlign: "center",
          py: 8,
        }}
      >
        {/* Icon */}
        <SearchOffIcon
          sx={{
            fontSize: 120,
            color: "primary.main",
            opacity: 0.3,
            mb: 3,
          }}
        />

        {/* 404 Text */}
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { xs: "4rem", md: "6rem" },
            background: "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          404
        </Typography>

        {/* Message */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          paragraph
          sx={{ maxWidth: 500, mb: 4 }}
        >
          Sorry, we couldn't find the page you're looking for. The page might
          have been moved, deleted, or the URL might be incorrect.
        </Typography>

        {/* Back to Home Button */}
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          component={Link}
          href="/"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
