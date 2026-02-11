'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useRouter } from 'next/navigation';
import { createMeeting } from '@/app/actions/meeting';

interface CreateMeetingFormProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Form dialog for creating a new video meeting
 */
export default function CreateMeetingForm({ open, onClose }: CreateMeetingFormProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await createMeeting({
        title: title.trim() || undefined,
      });

      if (result.success) {
        // Store the token in sessionStorage for the meeting page to use
        sessionStorage.setItem(`meeting-token-${result.meetingId}`, result.token);
        
        // Close dialog and redirect
        onClose();
        setTitle('');
        router.push(result.redirectUrl);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTitle('');
      setError(null);
      onClose();
    }
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VideoCallIcon color="primary" />
            Create New Meeting
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Meeting Title (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            placeholder="e.g., Team Standup, Client Call"
            helperText="Leave empty for a default title"
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleClose} 
            disabled={loading}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <VideoCallIcon />}
          >
            {loading ? 'Creating...' : 'Create Meeting'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError(null)} 
          severity="error"
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
