"use client";

import { useState } from "react";
import {
  Box,
  Avatar,
  Stack,
  Card,
  Grid,
  Link,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { useSession } from "next-auth/react";
export default function ProfilePage() {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [showContactInfo, setShowContactInfo] = useState(false);
  // Responsive dimensions
  const getCoverHeight = () => {
    if (isMobile) return 160;
    if (isTablet) return 210;
    return 350;
  };

  const getProfileSize = () => {
    if (isMobile) return 120;
    if (isTablet) return 180;
    return 269;
  };

  const getProfileOverlap = () => {
    if (isMobile) return -40;
    if (isTablet) return -65;
    return -100;
  };

  const getProfileLeft = () => {
    if (isMobile) return 16;
    if (isTablet) return 20;
    return 42;
  };

  const coverHeight = getCoverHeight();
  const profileSize = getProfileSize();
  const profileOverlap = getProfileOverlap();
  const profileLeft = getProfileLeft();

  const Contact = () => {
    return (
      <Stack spacing={1} sx={{ mt: 1 }}>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <LocalPhoneIcon />
          <Typography>+84 123 456 789</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <EmailIcon />
          <Typography>{session?.user.email}</Typography>
        </Stack>
      </Stack>
    );
  };
  return (
    <Box>
      <Stack spacing={2}>
        <Card>
          {/* Background */}
          <Box>
            {/* Cover Photo Section */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingBottom: `${(coverHeight / 1400) * 100}%`,
                maxHeight: `${coverHeight}px`,
                overflow: "hidden",
                backgroundColor: "#e8f4f8",
              }}
            >
              <img
                src="/images/background-image-personal.png"
                alt="Designer Cover"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Profile Section */}
            <Box
              sx={{
                position: "relative",
                paddingLeft: `${profileLeft}px`,
                paddingRight: { xs: "16px", sm: "20px", md: "0" },
              }}
            >
              {/* Profile Picture with Gradient Ring */}
              <Box
                sx={{
                  position: "relative",
                  width: `${profileSize}px`,
                  height: `${profileSize}px`,
                  marginTop: `${profileOverlap}px`,
                  flexShrink: 0,
                  top: -50,
                }}
              >
                {/* Gradient Ring SVG */}
                <svg
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                  }}
                  viewBox="0 0 269 269"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient
                      id="ringGradient"
                      x1="231.173"
                      y1="-12.8125"
                      x2="78.1689"
                      y2="174.773"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.748183"
                        stopColor="#DE01D5"
                        stopOpacity="0"
                      />
                      <stop offset="1" stopColor="#DE01D5" />
                    </linearGradient>
                    <clipPath id="clip0">
                      <rect width="268.69" height="268.69" fill="white" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#clip0)">
                    <path
                      d="M268.615 134.345C268.615 208.542 208.467 268.69 134.27 268.69C60.0737 268.69 -0.074585 208.542 -0.074585 134.345C-0.074585 60.1483 60.0737 0 134.27 0C208.467 0 268.615 60.1483 268.615 134.345ZM42.9158 134.345C42.9158 184.799 83.8167 225.7 134.27 225.7C184.724 225.7 225.625 184.799 225.625 134.345C225.625 83.8912 184.724 42.9904 134.27 42.9904C83.8167 42.9904 42.9158 83.8912 42.9158 134.345Z"
                      fill="url(#ringGradient)"
                    />
                    <path
                      d="M20.0972 174.783L39.1123 171.77L39.6955 173.532L20.6804 176.545L20.0972 174.783ZM22.3815 164.92L24.2361 164.618L28.6917 178.074L26.8371 178.376L22.3815 164.92ZM17.9977 168.443L37.0128 165.43L37.596 167.191L18.5809 170.204L17.9977 168.443ZM29.0015 163.9L30.8561 163.599L35.3117 177.055L33.4571 177.356L29.0015 163.9Z"
                      fill="white"
                    />
                    <path
                      d="M26.1373 189.035L23.4312 183.834L40.2845 175.065L43.1105 180.496C43.9612 182.131 44.3517 183.706 44.2821 185.22C44.2179 186.731 43.719 188.124 42.7853 189.397C41.857 190.668 40.5206 191.757 38.776 192.665C37.0204 193.578 35.3463 194.052 33.7536 194.086C32.1663 194.117 30.7214 193.712 29.4189 192.87C28.1218 192.025 27.0279 190.747 26.1373 189.035ZM26.3035 184.933L27.8792 187.961C28.6043 189.355 29.474 190.37 30.4883 191.006C31.5027 191.643 32.6234 191.927 33.8504 191.861C35.0775 191.794 36.3768 191.404 37.7483 190.69C39.1089 189.982 40.1646 189.15 40.9154 188.195C41.6716 187.237 42.0833 186.179 42.1504 185.022C42.223 183.862 41.9167 182.623 41.2316 181.307L39.536 178.048L26.3035 184.933Z"
                      fill="white"
                    />
                    <path
                      d="M33.7719 202.319L48.8884 190.811L55.8335 199.934L54.2096 201.17L48.658 193.878L43.5503 197.766L48.7423 204.586L47.1185 205.822L41.9265 199.002L36.7893 202.913L42.4308 210.324L40.8069 211.56L33.7719 202.319Z"
                      fill="white"
                    />
                    <path
                      d="M62.9756 213.865C63.5418 213.106 63.7165 212.266 63.4997 211.345C63.2829 210.423 62.7572 209.566 61.9227 208.775C61.3125 208.196 60.6849 207.788 60.04 207.551C59.3995 207.319 58.7876 207.254 58.2041 207.357C57.6251 207.464 57.1271 207.737 56.71 208.177C56.361 208.545 56.1484 208.944 56.0723 209.375C56.0049 209.806 56.0273 210.24 56.1395 210.679C56.256 211.114 56.4135 211.532 56.6122 211.933C56.8152 212.33 57.0126 212.684 57.2045 212.994L58.2469 214.698C58.5165 215.133 58.7924 215.642 59.0746 216.225C59.3613 216.813 59.5704 217.441 59.7018 218.111C59.842 218.781 59.8338 219.464 59.6771 220.159C59.5205 220.855 59.1357 221.525 58.5229 222.172C57.8163 222.916 56.9828 223.404 56.0221 223.635C55.0659 223.87 54.0473 223.812 52.9662 223.46C51.8897 223.112 50.822 222.436 49.7631 221.432C48.776 220.495 48.0723 219.525 47.6521 218.521C47.2364 217.522 47.0924 216.541 47.2202 215.58C47.3524 214.623 47.7491 213.742 48.4103 212.937L50.1332 214.571C49.6844 215.134 49.4508 215.731 49.4324 216.361C49.4228 216.992 49.5748 217.613 49.8885 218.226C50.2108 218.839 50.6457 219.405 51.1931 219.924C51.8302 220.528 52.5002 220.968 53.203 221.242C53.91 221.512 54.5883 221.602 55.2377 221.51C55.8913 221.414 56.4565 221.115 56.9331 220.612C57.3673 220.155 57.5927 219.661 57.6093 219.131C57.6259 218.602 57.5107 218.049 57.2637 217.474C57.0167 216.898 56.7147 216.314 56.3578 215.719L55.1215 213.626C54.3383 212.295 53.905 211.044 53.8217 209.874C53.7383 208.704 54.1371 207.655 55.0181 206.726C55.7502 205.954 56.5972 205.479 57.5593 205.3C58.5301 205.122 59.521 205.209 60.5321 205.563C61.552 205.917 62.5016 206.511 63.381 207.345C64.2694 208.188 64.908 209.096 65.2968 210.07C65.6898 211.04 65.8286 211.99 65.7132 212.92C65.6023 213.855 65.2282 214.68 64.5909 215.397L62.9756 213.865Z"
                      fill="white"
                    />
                    <path
                      d="M72.8717 215.612L61.537 230.859L59.6907 229.486L71.0254 214.24L72.8717 215.612Z"
                      fill="white"
                    />
                    <path
                      d="M84.9271 229.973C85.0523 229.328 85.0893 228.708 85.0379 228.114C84.9949 227.517 84.8591 226.953 84.6305 226.422C84.4073 225.895 84.0895 225.41 83.677 224.969C83.2646 224.527 82.7584 224.139 82.1585 223.806C81.1748 223.258 80.1391 223.015 79.0512 223.075C77.9633 223.135 76.9066 223.528 75.8809 224.252C74.8552 224.977 73.9426 226.058 73.143 227.495C72.3434 228.933 71.9091 230.28 71.84 231.537C71.771 232.793 72.0059 233.904 72.5449 234.869C73.0838 235.834 73.8668 236.602 74.8937 237.173C75.8449 237.702 76.7953 237.965 77.745 237.963C78.7031 237.958 79.5922 237.695 80.4124 237.175C81.2409 236.652 81.9378 235.883 82.5029 234.867L83.0469 235.339L78.053 232.561L79.0449 230.778L85.3684 234.295L84.3764 236.078C83.6159 237.446 82.6628 238.472 81.517 239.159C80.3766 239.848 79.1408 240.186 77.8097 240.175C76.4871 240.161 75.1663 239.787 73.8476 239.054C72.3775 238.236 71.2782 237.172 70.5496 235.861C69.8264 234.553 69.5087 233.088 69.5966 231.467C69.6898 229.849 70.2234 228.164 71.1973 226.413C71.9277 225.1 72.7602 224.017 73.6946 223.164C74.6375 222.308 75.6391 221.691 76.6995 221.311C77.7598 220.931 78.8429 220.79 79.9487 220.889C81.0545 220.987 82.1398 221.333 83.2045 221.925C84.0801 222.412 84.8225 222.998 85.4319 223.684C86.0497 224.367 86.5221 225.114 86.849 225.926C87.1844 226.735 87.3673 227.583 87.3975 228.471C87.4307 229.353 87.299 230.238 87.0025 231.128L84.9271 229.973Z"
                      fill="white"
                    />
                    <path
                      d="M106.842 231.897L100.781 249.902L98.6711 249.192L93.6181 231.752L93.4422 231.693L88.6836 245.83L86.5032 245.096L92.564 227.091L94.674 227.801L99.7503 245.288L99.9262 245.347L104.697 231.175L106.842 231.897Z"
                      fill="white"
                    />
                    <path
                      d="M106.772 251.242L109.682 232.468L121.013 234.225L120.7 236.241L111.643 234.837L110.66 241.181L119.13 242.494L118.818 244.511L110.347 243.198L109.358 249.578L118.562 251.005L118.249 253.021L106.772 251.242Z"
                      fill="white"
                    />
                    <path
                      d="M125.558 253.684L125.275 234.688L131.693 234.592C133.177 234.569 134.399 234.805 135.359 235.298C136.319 235.784 137.034 236.463 137.505 237.335C137.976 238.206 138.219 239.201 138.236 240.32C138.253 241.439 138.039 242.435 137.594 243.308C137.15 244.18 136.458 244.871 135.519 245.38C134.58 245.883 133.375 246.145 131.903 246.167L126.709 246.244L126.678 244.167L131.798 244.09C132.812 244.075 133.626 243.915 134.24 243.608C134.86 243.302 135.305 242.875 135.576 242.327C135.852 241.772 135.984 241.115 135.973 240.354C135.962 239.593 135.809 238.931 135.516 238.366C135.224 237.802 134.762 237.369 134.133 237.069C133.504 236.763 132.676 236.618 131.65 236.633L127.606 236.694L127.859 253.649L125.558 253.684ZM134.373 245.017L139.175 253.48L136.504 253.52L131.775 245.055L134.373 245.017Z"
                      fill="white"
                    />
                  </g>
                </svg>

                {/* Profile Image */}
                <Avatar
                  src="/images/profile-160.png"
                  alt="Designer Profile"
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: -10,
                    left: 0,
                    padding: {
                      xs: `${profileSize * 0.13}px`,
                      sm: `${profileSize * 0.12}px`,
                      md: `${profileSize * 0.12}px`,
                    },
                    "& .MuiAvatar-img": {
                      borderRadius: "50%",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* Detail */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Box>
              <Grid container spacing={2}>
                <Grid size={8}>
                  <Typography variant="h4" fontWeight={600}>
                    {session?.user?.name || "User Name"}
                  </Typography>
                  <Typography variant="h6" color="blue">
                    Developer
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    A developer is a professional who creates, designs, and
                    maintains software, applications, or systems by writing and
                    debugging code. They translate business needs into
                    functional digital products using programming languages like
                    Python, JavaScript, or Java.
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Typography>VietNam - </Typography>
                    <Button
                      component={Link}
                      title={
                        !showContactInfo
                          ? "Show Contact Info "
                          : "Hide Contact Info"
                      }
                      onClick={() => setShowContactInfo(!showContactInfo)}
                    >
                      Contact Info
                    </Button>
                  </Stack>
                  {showContactInfo && <Contact />}
                </Grid>
                <Grid size={4}>
                  <Stack>
                    <Stack direction={"row"} spacing={1}>
                      <FacebookIcon
                        sx={{
                          color: "blue",
                        }}
                      />
                      <Link href="www.facebook.com">www.facebook.com</Link>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <WhatsAppIcon
                        sx={{
                          color: "green",
                        }}
                      />
                      <Link href="https://www.whatsapp.com">
                        https://www.whatsapp.com
                      </Link>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <LinkedInIcon
                        sx={{
                          color: "blueviolet",
                        }}
                      />
                      <Link href="https://www.linkin.com">
                        https://www.linkin.com
                      </Link>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <TelegramIcon
                        sx={{
                          color: "#1976D2",
                        }}
                      />
                      <Link href="https://www.telegram.com">
                        https://www.telegram.com
                      </Link>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <Box>connection</Box>
            <Box>send message</Box>
            <Grid container spacing={4}>
              <Grid size={6}>
                <Card sx={{ backgroundColor: "#DDE7F1", p: 2 }}>
                  Experience
                </Card>
              </Grid>
              <Grid size={6}>
                <Card sx={{ backgroundColor: "#DDE7F1", p: 2 }}>
                  Licenses & certifications
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card sx={{ px: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              About
            </Typography>
            <Typography>
              The profile now scales beautifully from mobile phones through
              tablets to large desktop screens, with the profile picture always
              properly positioned and sized relative to the cover photo.
            </Typography>
            <Typography>
              The profile now scales beautifully from mobile phones through
              tablets to large desktop screens, with the profile picture always
              properly positioned and sized relative to the cover photo.
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
