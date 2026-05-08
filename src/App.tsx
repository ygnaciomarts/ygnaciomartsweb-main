import { Box, Typography, Avatar, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import { useState, useRef, useEffect, useMemo } from "react";
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
  typography: {
    fontFamily: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
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

  const sectionRefs = useMemo<Record<string, React.RefObject<HTMLDivElement | null>>>(() => ({
    Home: homeRef,
    About: aboutRef,
    Projects: projectsRef,
    Design: mockupsRef,
    CV: cvRef,
  }), []);

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
        height: "100vh",
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
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundRepeat: "repeat",
          animation: "moveBackgroundContinuous 6s linear infinite",
          pointerEvents: "none",
          zIndex: 0,
        },
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
          alignSelf: { xs: "auto", sm: "auto", md: "center" },
          left: { xs: "50%", sm: "50%", md: "auto" },
          bottom: { xs: 16, sm: 16, md: "auto" },
          top: { xs: "auto", sm: "auto", md: "auto" },
          zIndex: 1201,
          transformOrigin: { xs: "bottom center", sm: "bottom center", md: "none" },
          m: { xs: 0, sm: 0, md: 4, lg: 6, xl: 8 },
          mb: { xs: 2, sm: 2, md: 4, lg: 5, xl: 6 },
          overscrollBehavior: "contain",
          width: { xs: "calc(100vw - 32px)", sm: "calc(100vw - 32px)", md: "auto" },
          px: { xs: 1, sm: 1, md: 0 },
          maxWidth: { xs: "400px", sm: "450px", md: "none" },
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
              justifyContent: { xs: "center", sm: "center", md: "flex-start" },
              overflowX: { xs: "hidden", sm: "hidden", md: "unset" },
              px: { xs: 1.5, sm: 2, md: 3 },
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
                  minWidth: { xs: "auto", sm: "auto", md: 64 },
                  width: { xs: "auto", sm: "auto", md: "100%" },
                  px: { xs: 1.2, sm: 1.5, md: 2 },
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
                {item === "Home" ? (
                  <>
                    <HomeIcon sx={{ fontSize: 18, display: { xs: "block", sm: "block", md: "none" } }} />
                    <Box component="span" sx={{ display: { xs: "none", sm: "none", md: "inline" } }}>Home</Box>
                  </>
                ) : item}
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
          px: { xs: 0, sm: 0, md: 1, lg: 3, xl: 5 },
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
              <Typography mt={2} sx={{ maxWidth: 600, textAlign: "center", lineHeight: 1.7 }}>
                Software Engineer Intern at John Deere, where I lead design system migrations and build the UI infrastructure behind manufacturing platforms serving factories worldwide.
              </Typography>
              <Typography mt={1} sx={{ opacity: 0.8, maxWidth: 600, textAlign: "center" }}>
                React · TypeScript · AWS · Fuel Design System · Node.js · Docker · CI/CD
              </Typography>
              <Typography mt={1} sx={{ opacity: 0.6, maxWidth: 600, textAlign: "center", fontSize: "0.85rem" }}>
                3× ICPC Competitor · B.S. Computer Systems Engineering · Graduating July 2026
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
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              I’m a Software Engineer Intern at John Deere since August 2024. I work directly with UX designers, product managers, and engineering teams to build and ship digital tools used in real manufacturing production lines.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              My main contribution has been leading the migration of large-scale manufacturing apps to Fuel Design System v6 — implementing a token-first architecture, replacing hard-coded UI values with semantic design tokens for spacing, color, and shape. I also authored 3 reusable components for the Manufacturing Component Library — purpose-built UI primitives tailored to manufacturing workflows that are now consumed by multiple teams across the organization.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              Beyond code, I run adoption sessions to help other teams apply design system best practices, and I work closely with UX to translate wireframes and specs into production-ready components. I’ve also improved document upload workflows in a globally used app — enabling reliable handling of large files that previously caused failures.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              I’m finishing my B.S. in Computer Systems Engineering at Instituto Tecnológico de La Laguna (graduating July 2026). Outside of work, I’ve competed in ICPC three years in a row and participated in a John Deere internal hackathon building a cloud-based assistant on Microsoft’s stack.
            </Typography>
            <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography sx={{ fontWeight: 600 }}>What I focus on:</Typography>
              <Typography sx={{ opacity: 0.8 }}>• Design system adoption & token-based theming</Typography>
              <Typography sx={{ opacity: 0.8 }}>• Reusable component architecture for enterprise teams</Typography>
              <Typography sx={{ opacity: 0.8 }}>• Translating UX specs into accessible, production-ready UI</Typography>
              <Typography sx={{ opacity: 0.8 }}>• Cloud services (AWS Lambda, S3, API Gateway) & CI/CD</Typography>
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

            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              A music-focused e-commerce site built with PHP, HTML, and CSS — my first full project where I handled everything from the visual design to the backend logic. Simple stack, but I owned the entire process: database schema, server-side rendering, layout, and styling.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              The store supports product browsing by category (vinyl, CDs, merch), a basic cart system with session handling in PHP, and user registration. The catalog pulls dynamically from a MySQL database, and the UI was hand-crafted with vanilla CSS — no frameworks.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              I also designed the entire visual identity and user interface from scratch: color palette, typography, page layouts, and product card styles. It was a foundational project that taught me how to think about both the user-facing experience and the server-side logic simultaneously.
            </Typography>

            <Box mt={3} sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {["PHP", "HTML", "CSS", "MySQL", "UI Design"].map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    background: "rgba(0,0,0,0.06)",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                mt: 3,
                width: "100%",
                height: { xs: "50vh", md: "70vh" },
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                position: "relative",
              }}
            >
              <Button
                component="a"
                href="https://bandup.ygnaciomarts.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  color: "#000",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                  py: 0.8,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Open in new tab ↗
              </Button>
              <iframe
                src="https://bandup.ygnaciomarts.com"
                title="BandUp Shop Live Preview"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            </Box>
            </Box>

            <Box ref={projectsRef} sx={{ py: 10, px: 3, pt: 0 }}>
            <Typography variant="h4" fontWeight={600}>
              BandUp Shop 2.0
            </Typography>

            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              A modern music e-commerce platform built with React, Vite, and Material-UI — a complete rewrite of my original PHP project, now featuring a responsive SPA architecture deployed on Vercel. This version showcases modern frontend development with component-based architecture, state management, and optimized performance.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              The store supports advanced product browsing with real-time search and filtering, a sophisticated cart system with React Context, user authentication with JWT tokens, and admin dashboard functionality. The catalog integrates with a REST API backend, featuring lazy loading, optimistic updates, and a polished UI built with Material-UI components.
            </Typography>
            <Typography mt={2} sx={{ lineHeight: 1.8 }}>
              I designed the entire user experience from scratch: modern color palette, typography system, responsive layouts, and interactive components. This project demonstrates full-stack JavaScript development, API integration, deployment automation, and modern web development best practices.
            </Typography>

            <Box
              sx={{
                mt: 3,
                width: "100%",
                height: { xs: "50vh", md: "70vh" },
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                position: "relative",
              }}
            >
              <Button
                component="a"
                href="https://new-bandup.ygnaciomarts.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  borderRadius: 2,
                  color: "#000",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                  py: 0.8,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Open in new tab ↗
              </Button>
              <iframe
                src="https://new-bandup.ygnaciomarts.com"
                title="BandUp Shop Live Preview"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            </Box>
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

                <Typography mt={2} sx={{ lineHeight: 1.8 }}>
                  Complete product design of a music streaming platform — covering information architecture, user flows, interaction design, and high-fidelity UI mockups delivered in Figma with a fully documented component system.
                </Typography>
                <Typography mt={2} sx={{ lineHeight: 1.8 }}>
                  I designed the full navigation hierarchy, artist and album detail cards, the persistent music player, queue management, and multi-step search flows with contextual results. Every screen follows a documented spacing scale, type ramp, and color system — engineered so any developer can implement pixel-perfect layouts without interpretation.
                </Typography>
                <Typography mt={2} sx={{ lineHeight: 1.8 }}>
                  The project includes a comprehensive style guide with production-ready HTML/CSS patterns, grid specifications, responsive breakpoints, and component anatomy diagrams. It's structured not just as a reference, but as a living document that explains the reasoning behind each design decision.
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
                    alignItems: "stretch",
                  }}
                >
                  {/* PDF */}
                  <Box
                    sx={{
                      width: "100%",
                      height: { xs: "60vh", md: "80vh" },
                      display: "flex",
                      borderRadius: 4,
                      overflow: "hidden",
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      p: 1.5,
                    }}
                  >
                    <Box sx={{ width: "100%", borderRadius: 2.5, overflow: "hidden", background: "#fff" }}>
                      <iframe
                        src={`${bandupGuide}#toolbar=0&view=FitH`}
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

                    <Typography sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                      A structured design reference covering the grid system, 8px spacing scale, color tokens, typography hierarchy, and reusable component patterns that govern BandUp Music's visual language.
                    </Typography>

                    <Typography sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                      Includes production-ready HTML/CSS code snippets, responsive layout recipes, interaction state definitions, and annotated rationale behind every pattern — built for handoff to engineering teams.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* EduChime */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h4" fontWeight={600}>
                  EduChime
                </Typography>

                <Typography sx={{ opacity: 0.85, lineHeight: 1.8 }}>
                  A mobile-first academic reminder app with a visual identity inspired by Just Dance 2019 — vibrant gradients, bold typography, and high-energy color pairings adapted into a functional productivity context. Built to the professor's requirements but with a distinct personality.
                </Typography>
                <Typography mt={2} sx={{ opacity: 0.85, lineHeight: 1.8 }}>
                  The core UX goal was speed: a 2-tap flow to create a new reminder, a semester-aware calendar view, push notifications timed to the student's schedule, and a profile with completion history. Every interaction was designed to minimize friction for someone checking their phone between classes.
                </Typography>
                <Typography mt={2} sx={{ opacity: 0.85, lineHeight: 1.8 }}>
                  The visual design balances the energetic Just Dance aesthetic with readability and clarity — bold enough to feel engaging, restrained enough that a stressed student can scan what's due in under 3 seconds without visual overload.
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
                alignItems: "stretch",
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: { xs: "60vh", md: "80vh" },
                  display: "flex",
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  p: 1.5,
                }}
              >
                <Box sx={{ width: "100%", borderRadius: 2.5, overflow: "hidden", background: "#fff" }}>
                  <iframe
                    src={`${cv}#toolbar=0&view=FitH`}
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
                <Typography sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                  Covers my professional experience leading design system migrations and building enterprise UI at John Deere, alongside independent full-stack and UX design projects that demonstrate end-to-end product thinking.
                </Typography>
                <Typography sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                  Also includes three years of ICPC competitive programming, a hackathon-winning cloud assistant project, and technical depth across React, TypeScript, AWS, Docker, Kubernetes, and CI/CD automation.
                </Typography>
              </Box>
            </Box>
          </Box>

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
