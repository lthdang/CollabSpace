"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import GroupsIcon from "@mui/icons-material/Groups";
import SecurityIcon from "@mui/icons-material/Security";
import Link from "next/link";
import CreateMeetingForm from "@/components/meeting/CreateMeetingForm";

export default function HomePage() {
  const [openMeetingForm, setOpenMeetingForm] = React.useState(false);

  return (
    <>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #1976d2 30%, #9c27b0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Welcome to CollabSpace
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 600, mb: 4 }}
          >
            Your internal video conferencing platform for seamless collaboration
            and productive meetings.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<VideoCallIcon />}
              onClick={() => setOpenMeetingForm(true)}
            >
              Start a Meeting
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/meetings"
            >
              View Meetings
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <VideoCallIcon
                    sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    HD Video Conferencing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Crystal clear video and audio powered by LiveKit for
                    professional meetings.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <GroupsIcon
                    sx={{ fontSize: 60, color: "secondary.main", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Team Collaboration
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organize meetings by teams and organizations for better
                    workflow management.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <SecurityIcon
                    sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Secure & Private
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enterprise-grade security with authentication and encrypted
                    connections.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <CreateMeetingForm
        open={openMeetingForm}
        onClose={() => setOpenMeetingForm(false)}
      />
    </>
  );
}
