import { Box, Typography, Avatar, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useState, useRef, useEffect } from "react";
import cv from "./assets/cv-public.pdf";

import mockupHome from "./assets/mockups/bandup-music/bandupmusic_home.png";
import mockupS2 from "./assets/mockups/bandup-music/bandupmusic_s2.png";
import mockupS3 from "./assets/mockups/bandup-music/bandupmusic_s3.png";
import mockupS4 from "./assets/mockups/bandup-music/bandupmusic_s4.png";
import mockupS5 from "./assets/mockups/bandup-music/bandupmusic_s5.png";
import mockupS6 from "./assets/mockups/bandup-music/bandupmusic_s6.png";
import mockupS7 from "./assets/mockups/bandup-music/bandupmusic_s7.png";
import mockupWelcome from "./assets/mockups/bandup-music/bandupmusic_welcome.png";

import bandupGuide from "./assets/mockups/bandup-music/bandupmusic_guide.pdf";

import educhimeHome from "./assets/mockups/educhime/educhime_home.jpg";
import educhime1 from "./assets/mockups/educhime/educhime_1.png";
import educhime2 from "./assets/mockups/educhime/educhime_2.png";
import educhimeProfile from "./assets/mockups/educhime/educhime_profile.png";

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#000",
    },
    background: {
      default: "#fafafa",
    },
  },
});

function App() {
  const [active, setActive] = useState("Home");
  const [openContact, setOpenContact] = useState(false);

  const [currentMockup, setCurrentMockup] = useState(0);
  const [openViewer, setOpenViewer] = useState(false);

  const bandupMockups = [
    mockupHome,
    mockupWelcome,
    mockupS2,
    mockupS3,
    mockupS4,
    mockupS5,
    mockupS6,
    mockupS7
  ];
  // Handlers for fullscreen mockup viewer
  const handleOpenViewer = (index: number) => {
    setCurrentMockup(index);
    setOpenViewer(true);
  };

  const handleNext = () => {
    setCurrentMockup((prev) => (prev + 1) % bandupMockups.length);
  };

  const handlePrev = () => {
    setCurrentMockup((prev) =>
      prev === 0 ? bandupMockups.length - 1 : prev - 1
    );
  };

  const educhimeMockups = [
    educhimeHome,
    educhime1,
    educhime2,
    educhimeProfile,
  ];

  const [currentEduchime, setCurrentEduchime] = useState(0);
  const handleNextEduchime = () => {
    setCurrentEduchime((prev) => (prev + 1) % educhimeMockups.length);
  };

  const handlePrevEduchime = () => {
    setCurrentEduchime((prev) =>
      prev === 0 ? educhimeMockups.length - 1 : prev - 1
    );
  };

  // Refs para las secciones
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const mockupsRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    Home: homeRef,
    About: aboutRef,
    Projects: projectsRef,
    Design: mockupsRef,
    CV: cvRef,
  };

  const isClickScrollingRef = useRef(false);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>('[data-scroll-container]');
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return; // ignorar scroll programático

      let newActive = active;
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top);
        if (distance < 50) { // margen pequeño para la sección más cercana
          newActive = key;
        }
      });

      if (newActive !== active) {
        setActive(newActive);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [active, sectionRefs]);

  const hasOpenedOnScrollRef = useRef(false);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>('[data-scroll-container]');
    if (!scrollContainer) return;

    const handleScrollEnd = () => {
      if (hasOpenedOnScrollRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        hasOpenedOnScrollRef.current = true;
        setOpenContact(true);
      }
    };

    scrollContainer.addEventListener("scroll", handleScrollEnd, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScrollEnd);
  }, []);

  return (
    <Box
      sx={{
        color: "text.primary",
        minHeight: "100vh",
        width: "100vw",
        display: {
          xs: "block",
          sm: "block",
          md: "grid"
        },
        gridTemplateColumns: {
          xs: undefined,
          sm: undefined,
          md: "auto 1fr"
        },
        backgroundColor: "#fafafa",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        backgroundRepeat: "repeat",
        overflowY: "auto",
        animation: "moveBackgroundContinuous 6s linear infinite",
        "@keyframes moveBackgroundContinuous": {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "40px 40px, 40px 40px" },
        },
      }}
    >
      {/* Branding y navbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // Animación del navbar cuando aparece el nombre
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          position: {
            xs: "fixed",
            sm: "fixed",
            md: "static"
          },
          left: { xs: "50%", sm: "50%", md: "auto" },
          bottom: { xs: 16, sm: 16, md: "auto" },
          top: { xs: "auto", sm: "auto", md: "auto" },
          zIndex: 1201,
          transformOrigin: { xs: "bottom center", sm: "bottom center", md: "none" },
          m: { xs: 0, sm: 0, md: 8 },
          mb: { xs: 2, sm: 2, md: 6 },
          overscrollBehavior: "contain",
          width: "auto",
          px: { xs: 2, sm: 2, md: 0 },
          maxWidth: { xs: "500px", sm: "500px", md: "none" },
          transform: {
            xs: "translateX(-50%)",
            sm: "translateX(-50%)",
            md: active !== "Home" ? "translateY(0)" : "translateY(-10px)"
          },
        }}
      >
        {/* Nombre arriba del navbar, animado al aparecer y desaparecer.
            Oculto en xs y sm, visible solo en md y mayores */}
        <Box
          sx={{
            overflow: "hidden",
            minHeight: "32px",
            display: { xs: "none", sm: "none", md: "flex" },
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              textTransform: "capitalize",
              mb: 1,
              fontSize: "1.1rem",
              alignSelf: "flex-start",
              opacity: active !== "Home" ? 1 : 0,
              transform: active !== "Home" ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Ygnacio Martínez Sánchez
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            width: "100%",
            mt: { xs: 1, sm: 1, md: 0 }
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "row", sm: "row", md: "column" },
              gap: 1,
              alignItems: { xs: "center", sm: "center", md: "flex-start" },
              width: { xs: "100%", sm: "100%", md: "auto" },
              justifyContent: { xs: "space-between", sm: "space-between", md: "flex-start" },
              overflowX: { xs: "auto", sm: "auto", md: "unset" },
              px: 3,
              py: 1,
            }}
          >
            {["Home", "About", "Projects", "Design", "CV"].map((item) => (
              <Button
                key={item}
                disableRipple
                disableFocusRipple
                onClick={() => {
                  setActive(item);
                  const ref = sectionRefs[item];
                  const scrollContainer = document.querySelector<HTMLElement>('[data-scroll-container]');
                  if (ref?.current && scrollContainer) {
                    isClickScrollingRef.current = true;
                    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    setTimeout(() => {
                      isClickScrollingRef.current = false;
                    }, 500);
                  }
                }}
                sx={{
                  color: active === item ? "#000" : "#444",
                  fontWeight: 600,
                  borderRadius: 2,
                  textAlign: { xs: "center", sm: "center", md: "left" },
                  position: "relative",
                  justifyContent: { xs: "center", sm: "center", md: "flex-start" },
                  transition: "all 0.2s ease",
                  "&:focus": {
                    outline: "none",
                  },
                  "&.Mui-focusVisible": {
                    outline: "none",
                    boxShadow: "none",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: { xs: 4, sm: 4, md: -10 },
                    top: { xs: "70%", sm: "70%", md: "auto" },
                    width: 3,
                    height: active === item ? "70%" : "0%",
                    background: "#000",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    display: { xs: "none", sm: "none", md: "block" },
                  },
                  "&:hover": {
                    background: "rgba(0,0,0,0.06)",
                  },
                  "&:active": {
                    transform: "scale(0.96)",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
        {/* Social icons: ocupan todo el ancho debajo del navbar en xs/sm */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 1,
            alignItems: "center",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            gap: 1.5,
            width: "100%",
            maxWidth: "unset",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              p: 0.5,
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              maxWidth: "unset",
            }}
          >
            <IconButton
              component="a"
              href="mailto:ygnaciomarts@gmail.com"
              aria-label="Email"
              sx={{
                flex: "0 1 auto",
                color: "#111",
                fontSize: 24,
              }}
            >
              <MailOutlineIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/ygnaciomarts/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{
                flex: "0 1 auto",
                color: "#0A66C2",
                fontSize: 24,
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/ygnaciomarts"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              sx={{
                flex: "0 1 auto",
                color: "#000",
                fontSize: 24,
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Contenido scrollable */}
      <Box
        data-scroll-container
        sx={{
          gridColumn: { xs: "auto", sm: "auto", md: 2 },
          height: { xs: "100vh", sm: "100vh", md: "100vh" },
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyContent: "center",
          // Permitir que el contenido pase por debajo del navbar sticky-bottom/fixed
          pb: {
            xs: "calc(120px + env(safe-area-inset-bottom, 0px))",
            sm: "calc(120px + env(safe-area-inset-bottom, 0px))",
            md: 0
          },
        }}
      >
        <Box>
          {/* Home/Hero section */}
          <Box ref={homeRef} sx={{ py: 10, px: 3 }}>
            {/* Hero: nombre y foto */}
            <Box
              sx={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                textAlign: "center",
              }}
            >
              {/* Nombre grande sobre la foto */}
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  textTransform: "uppercase",
                  mb: 2,
                  textAlign: "center",
                  letterSpacing: 2,
                }}
              >
                YGNACIO MARTÍNEZ SÁNCHEZ
              </Typography>
              {/* Foto */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src="/me.jpg"
                  variant="rounded"
                  sx={{
                    width: { xs: 280, sm: 320, md: 380 },
                    height: { xs: 380, sm: 450, md: 550 },
                    borderRadius: 4,
                    position: "relative",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03) rotate(0.5deg)",
                    },
                    objectFit: "contain",
                    border: "1.5px solid rgba(0,0,0,0.10)",
                    boxSizing: "border-box",
                    backgroundColor: "#fff",
                    display: "block",
                  }}
                />
              </Box>

              {/* Presentación adicional */}
              <Typography mt={2}>
                Software Engineer focused on building scalable, user-centered digital experiences for enterprise platforms.
              </Typography>
              <Typography mt={1} sx={{ opacity: 0.8 }}>
                Currently contributing to design systems, UI architecture, and front-end development at John Deere.
              </Typography>
            </Box>
          </Box>

          <Box ref={aboutRef} sx={{ py: 10, px: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ textTransform: "uppercase", letterSpacing: 2, fontSize: "1.2rem" }}
            >
              About
            </Typography>
            <Typography mt={2}>
              I am a Software Engineer with a strong focus on user experience, building digital solutions for enterprise manufacturing environments.
              <br /><br />
              I currently work at John Deere, where I collaborate with UX designers, product managers, and engineers to deliver scalable applications aligned with the Fuel Design System and manufacturing standards.
              <br /><br />
              My work focuses on design systems adoption, component-based architecture, and translating UX requirements into production-ready interfaces. I am particularly interested in creating consistent, accessible, and maintainable UI systems that improve usability at scale.
              <br /><br />
              I am motivated to continue growing at the intersection of product design and engineering, building systems that deliver real value to users.
            </Typography>
            <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>Focused on:</Typography>
              <Typography sx={{ opacity: 0.8 }}>• Design Systems</Typography>
              <Typography sx={{ opacity: 0.8 }}>• UX-driven Development</Typography>
              <Typography sx={{ opacity: 0.8 }}>• Scalable UI Architecture</Typography>
            </Box>
          </Box>

          <Box ref={projectsRef} sx={{ py: 10, px: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ textTransform: "uppercase", letterSpacing: 2, fontSize: "1.2rem" }}
            >
              Projects
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              BandUp Shop
            </Typography>

            <Typography mt={1}>
              BandUp Shop is a versatile and fully responsive e-commerce platform designed to support seamless product browsing and transactions across devices.
              <br /><br />
              The application was built with flexibility in mind, allowing it to support different types of products such as CDs, vinyl records, and other merchandise, while maintaining a consistent and intuitive shopping experience.
              <br /><br />
              It includes user-focused features such as account registration, session management, and a structured product catalog that improves navigation and discoverability.
              <br /><br />
              On the technical side, the platform integrates a secure database and backend logic to ensure reliable transactions, data consistency, and scalability, making it adaptable to different business needs.
              <br /><br />
              The overall design emphasizes clarity, responsiveness, and usability, ensuring that users can easily browse, select, and purchase products without friction.
            </Typography>
          </Box>


          <Box ref={mockupsRef} sx={{ py: 10, px: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ textTransform: "uppercase", letterSpacing: 2, fontSize: "1.2rem" }}
            >
              Design
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Box>
                <Typography variant="h4" fontWeight={600}>
                  BandUp Music
                </Typography>

                <Typography mt={1}>
                  BandUp Music is a user-centered music platform designed to deliver a seamless browsing experience across devices.
                  <br /><br />
                  The design focuses on clarity, hierarchy, and interaction patterns that allow users to easily explore music, artist profiles, and playlists.
                  Special attention was given to layout consistency, spacing systems, and reusable UI structures.
                  <br /><br />
                  The project also includes structured HTML and CSS guidelines that support scalability and maintainability,
                  ensuring that the interface can evolve without losing consistency.
                </Typography>

                {/* Slidecase */}
                <Box
                  sx={{
                    mt: 3,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                  }}
                >
                  {/* Image */}
                  <Box
                    onClick={() => handleOpenViewer(currentMockup)}
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      width: "100%",
                      // minHeight removed from outer container
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "100%",
                        display: "block"
                      }}
                    >
                      {/* Ghost image to stabilize container height and width */}
                      <Box
                        component="img"
                        src={bandupMockups[currentMockup]}
                        alt="sizer"
                        sx={{
                          width: "100%",
                          height: "auto",
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      />
                      {bandupMockups.map((src, idx) => (
                        <Box
                          component="img"
                          key={idx}
                          src={src}
                          alt="BandUp preview"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius: 2,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                            opacity: idx === currentMockup ? 1 : 0,
                            transition: "opacity 0.3s ease"
                          }}
                        />
                      ))}
                      <IconButton
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        sx={{
                          position: "absolute",
                          left: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.45)",
                          backdropFilter: "blur(12px)",
                          color: "#000",
                          width: 44,
                          height: 44,
                          border: "1px solid rgba(0,0,0,0.08)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            background: "rgba(255,255,255,0.7)",
                            transform: "translateY(-50%) scale(1.05)"
                          }
                        }}
                      >
                        <ArrowBackIosNewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        sx={{
                          position: "absolute",
                          right: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.45)",
                          backdropFilter: "blur(12px)",
                          color: "#000",
                          width: 44,
                          height: 44,
                          border: "1px solid rgba(0,0,0,0.08)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            background: "rgba(255,255,255,0.7)",
                            transform: "translateY(-50%) scale(1.05)"
                          }
                        }}
                      >
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>

                {/* BandUp Guide (CV-style layout) */}
                <Box
                  sx={{
                    mt: 4,
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                    gap: 3,
                    alignItems: "stretch"
                  }}
                >
                  {/* PDF */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "60vh", md: "80vh" },
                      display: "flex"
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: "#fff"
                      }}
                    >
                      <iframe
                        src={`${bandupGuide}#view=FitH`}
                        title="BandUp Guide"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                      />
                    </Box>
                  </Box>

                  {/* Text */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 2,
                      px: { md: 2 }
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      gutterBottom
                      sx={{ textTransform: "uppercase", letterSpacing: 2, fontSize: "1.2rem" }}
                    >
                      Guidelines
                    </Typography>

                    <Typography sx={{ opacity: 0.8 }}>
                      This document outlines the design principles, layout systems, and UI patterns used throughout BandUp Music.
                    </Typography>

                    <Typography sx={{ opacity: 0.8 }}>
                      It includes structured HTML and CSS guidelines, spacing systems, and reusable components designed to ensure consistency and scalability across the platform.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* EduChime */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h4" fontWeight={600}>
                  EduChime
                </Typography>

                <Typography sx={{ opacity: 0.85 }}>
                  EduChime is a platform designed to help users manage reminders and track important academic activities.
                  The goal was to provide a simple and reliable system that supports students in staying organized
                  throughout their semester.
                  <br /><br />
                  The interface was designed with clarity and usability in mind, focusing on reducing friction when
                  creating reminders, reviewing schedules, and receiving notifications. The experience prioritizes
                  accessibility and adaptability across devices.
                  <br /><br />
                  The overall design balances simplicity with functionality, ensuring that users can quickly understand
                  and interact with the platform without unnecessary complexity.
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        display: "block"
                      }}
                    >
                      {/* Ghost */}
                      <Box
                        component="img"
                        src={educhimeMockups[currentEduchime]}
                        sx={{
                          width: "100%",
                          height: "auto",
                          opacity: 0
                        }}
                      />

                      {educhimeMockups.map((src, idx) => (
                        <Box
                          component="img"
                          key={idx}
                          src={src}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius: 2,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                            opacity: idx === currentEduchime ? 1 : 0,
                            transition: "opacity 0.3s ease"
                          }}
                        />
                      ))}

                      <IconButton
                        onClick={handlePrevEduchime}
                        sx={{
                          position: "absolute",
                          left: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.45)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <ArrowBackIosNewIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        onClick={handleNextEduchime}
                        sx={{
                          position: "absolute",
                          right: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.45)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Box>
          </Box>

          <Box ref={cvRef} sx={{ py: 10, px: 3 }}>
            <Box
              sx={{
                mt: 3,
                width: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
                gap: 3,
                alignItems: "stretch"
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: { xs: "60vh", md: "80vh" },
                  display: "flex"
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "#fff"
                  }}
                >
                  <iframe
                    src={`${cv}#view=FitH`}
                    title="CV Preview"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 2,
                  px: { md: 2 }
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{ textTransform: "uppercase", letterSpacing: 2, fontSize: "1.2rem" }}
                >
                  Resume
                </Typography>
                <Typography sx={{ opacity: 0.8 }}>
                  This resume highlights my experience in front-end engineering, design systems, and UX-driven development within enterprise environments.
                </Typography>
                <Typography sx={{ opacity: 0.8 }}>
                  My work focuses on building scalable UI architectures, collaborating with cross-functional teams, and delivering consistent, user-centered experiences aligned with modern design systems.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Dialog
            open={false}
            onClose={() => setOpenContact(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              sx: {
                borderRadius: 4,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              }
            }}
          >
            <DialogTitle
              sx={{
                textTransform: "uppercase",
                letterSpacing: 2,
                fontWeight: 700,
                fontSize: "1.2rem"
              }}
            >
              Get in touch
            </DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
              <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="Your name"
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.6)",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.15)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#000",
                    },
                  }}
                />
                <TextField
                  label="Your email"
                  type="email"
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.6)",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.15)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#000",
                    },
                  }}
                />
                <TextField
                  label="Your message"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.6)",
                      "& fieldset": {
                        borderColor: "rgba(0,0,0,0.15)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#000",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#000",
                        borderWidth: "1px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#555",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#000",
                    },
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={() => setOpenContact(false)}
                sx={{
                  borderRadius: 3,
                  px: 2,
                  color: "#333"
                }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpenContact(false)}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  background: "#000",
                  "&:hover": {
                    background: "#222",
                  }
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>

          {/* Modal BandUp mockup viewer */}
          <Dialog
            open={openViewer}
            onClose={() => setOpenViewer(false)}
            maxWidth="lg"
            fullWidth
            PaperProps={{
              sx: {
                background: "transparent",
                boxShadow: "none",
                borderRadius: 0,
              }
            }}
          >
            <DialogContent
              sx={{
                p: { xs: 2, md: 4 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                minHeight: { xs: "50vh", md: "60vh" },
                maxHeight: "85vh",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={bandupMockups[currentMockup]}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />

              {/* Close button (top right) */}
              <IconButton
                onClick={() => setOpenViewer(false)}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "rgba(255,255,255,0.4)",
                  backdropFilter: "blur(10px)",
                  color: "#000",
                  border: "1px solid rgba(0,0,0,0.08)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.7)",
                  }
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Prev */}
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                  color: "#000",
                  width: 48,
                  height: 48,
                  transition: "transform 0.15s cubic-bezier(.4,2,.6,1)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.7)",
                    transform: "translateY(-50%) scale(1.05)"
                  }
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              {/* Next */}
              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                  color: "#000",
                  width: 48,
                  height: 48,
                  transition: "transform 0.15s cubic-bezier(.4,2,.6,1)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.7)",
                    transform: "translateY(-50%) scale(1.05)"
                  }
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>

              {/* Index indicator */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  color: "#000",
                  fontSize: "0.9rem",
                  opacity: 0.5,
                  fontWeight: 500
                }}
              >
                {currentMockup + 1} / {bandupMockups.length}
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
