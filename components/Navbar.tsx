'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    {/* Logo */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="logo"
                        sx={{ mr: 2 }}
                    >
                        <VideoCallIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            flexGrow: 1,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 700
                        }}
                    >
                        CollabSpace
                    </Typography>

                    {/* Navigation Links */}
                    <Button color="inherit" component={Link} href="/meetings">
                        Meetings
                    </Button>
                    <Button color="inherit" component={Link} href="/organizations">
                        Organizations
                    </Button>

                    {/* User Menu */}
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
