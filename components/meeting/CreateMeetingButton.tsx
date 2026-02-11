"use client";

import * as React from "react";
import { Fab, Tooltip } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CreateMeetingForm from "./CreateMeetingForm";

/**
 * Floating Action Button to create a new meeting
 * Can be placed in any page or layout
 */
export default function CreateMeetingButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Tooltip title="Start New Meeting" placement="left">
        <Fab
          color="primary"
          aria-label="create meeting"
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <VideoCallIcon />
        </Fab>
      </Tooltip>

      <CreateMeetingForm open={open} onClose={() => setOpen(false)} />
    </>
  );
}
