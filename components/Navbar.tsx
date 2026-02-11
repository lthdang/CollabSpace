"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleClose();
    await signOut({ callbackUrl: "/" });
  };

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

          <Link
            href="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              CollabSpace
            </Typography>
          </Link>

          {/* Navigation Links - Only show when authenticated */}
          {status === "authenticated" && (
            <>
              <Button color="inherit" component={Link} href="/meetings">
                Meetings
              </Button>
              <Button color="inherit" component={Link} href="/organizations">
                Organizations
              </Button>
            </>
          )}

          {/* User Menu or Sign In/Up buttons */}
          {status === "loading" ? (
            <Box sx={{ width: 40, height: 40 }} />
          ) : status === "authenticated" && session?.user ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {session.user.image ? (
                  <Avatar
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    sx={{ width: 32, height: 32 }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">{session.user.email}</Typography>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button color="inherit" component={Link} href="/signin">
                Sign In
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                href="/signup"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
