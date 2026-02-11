"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  useConnectionState,
} from "@livekit/components-react";
import "@livekit/components-styles";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  ExitToApp as ExitIcon,
  VideoCall as VideoCallIcon,
} from "@mui/icons-material";
import { ConnectionState } from "livekit-client";

interface MeetingRoomProps {
  token: string;
  serverUrl: string;
  roomName: string;
  meetingTitle: string;
  meetingId: string;
  userName: string;
  isHost: boolean;
}

/**
 * LiveKit video conference room component
 * Handles video/audio streaming, participant management, and room controls
 */
export default function MeetingRoom({
  token,
  serverUrl,
  roomName,
  meetingTitle,
  meetingId,
  userName,
  isHost,
}: MeetingRoomProps) {
  const router = useRouter();
  const [connectionError, setConnectionError] = React.useState<string | null>(
    null,
  );
  const [showError, setShowError] = React.useState(false);

  const handleDisconnected = () => {
    router.push("/");
  };

  const handleError = (error: Error) => {
    console.error("LiveKit connection error:", error);
    setConnectionError(error.message || "Failed to connect to meeting");
    setShowError(true);
  };

  const handleLeaveRoom = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#000",
        overflow: "hidden",
      }}
    >
      {/* Meeting Header */}
      <AppBar
        position="static"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <VideoCallIcon sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {meetingTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Room: {roomName} • Meeting ID: {meetingId.substring(0, 8)}...
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            onClick={handleLeaveRoom}
            sx={{
              bgcolor: "error.main",
              "&:hover": { bgcolor: "error.dark" },
            }}
          >
            <ExitIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* LiveKit Room */}
      <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <LiveKitRoom
          token={token}
          serverUrl={serverUrl}
          connect={true}
          video={true}
          audio={true}
          onDisconnected={handleDisconnected}
          onError={handleError}
          style={{ height: "100%" }}
          data-lk-theme="default"
        >
          <VideoConference />
          <RoomAudioRenderer />
          <ConnectionStateIndicator />
        </LiveKitRoom>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          variant="filled"
        >
          {connectionError}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/**
 * Connection state indicator component
 * Shows loading state while connecting to the room
 */
function ConnectionStateIndicator() {
  const connectionState = useConnectionState();

  if (
    connectionState === ConnectionState.Connected ||
    connectionState === ConnectionState.Reconnecting
  ) {
    return null;
  }

  if (connectionState === ConnectionState.Connecting) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.8)",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="white">
          Connecting to meeting...
        </Typography>
      </Box>
    );
  }

  return null;
}
