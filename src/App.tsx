import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Avatar,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import cv from "./assets/cv-public.pdf";

function Portfolio() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const isDark = mode === "dark";

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        palette: {
          mode: isDark ? "dark" : "light",
          background: { default: isDark ? "#0f172a" : "#fafafa" },
          text: {
            primary: isDark ? "#e2e8f0" : "#0f172a",
            secondary: isDark ? "#94a3b8" : "#475569",
          },
          primary: { main: isDark ? "#5eead4" : "#0f766e" },
        },
      }),
    [isDark]
  );

  const [activeSection, setActiveSection] = useState("about");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const uxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "projects", ref: projectsRef },
        { id: "ux", ref: uxRef },
      ];

      const scrollPos = window.scrollY + 300;

      for (const section of sections) {
        if (
          section.ref.current &&
          section.ref.current.offsetTop <= scrollPos &&
          section.ref.current.offsetTop + section.ref.current.offsetHeight > scrollPos
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const chipBg = isDark ? "rgba(45, 212, 191, 0.1)" : "rgba(15, 118, 110, 0.08)";
  const chipText = isDark ? "#5eead4" : "#0f766e";
  const hoverBg = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
  const spotlightColor = isDark ? "rgba(45, 212, 191, 0.10)" : "rgba(15, 118, 110, 0.12)";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.03)";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <style>{`
        .hover-group:hover .hover-item { opacity: 0.4; }
        .hover-group .hover-item:hover {
          opacity: 1 !important;
          background: ${hoverBg};
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
          border-radius: 16px;
        }

        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .waving-hand {
          display: inline-block;
          transform-origin: 70% 70%;
          animation: wave 2.5s infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .text-link {
          color: ${isDark ? "#e2e8f0" : "#0f172a"};
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .text-link:hover {
          color: ${chipText};
        }
      `}</style>

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          position: "relative",
          "&::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundRepeat: "repeat",
            animation: "moveGrid 8s linear infinite",
            pointerEvents: "none",
            zIndex: 0,
          },
          "@keyframes moveGrid": {
            "0%": { backgroundPosition: "0 0, 0 0" },
            "100%": { backgroundPosition: "40px 40px, 40px 40px" },
          },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 0,
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />

        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 2.5, sm: 6, md: 10 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 }, // Reducido el gap general en móvil
            position: "relative",
            zIndex: 1,
            alignItems: "flex-start",
          }}
        >
          {/* ================= MITAD IZQUIERDA (FIJA / STICKY) ================= */}
          <Box
            component="header"
            className="animate-fade-up"
            sx={{
              position: { md: "sticky" },
              top: { md: 0 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: { md: "100vh" },
              width: { md: "45%" },
              pt: { xs: 5, md: 12 },
              pb: { xs: 1, md: 8 }, // Minimizado padding bottom en móvil
              boxSizing: "border-box",
            }}
          >
            <Box>
              <Avatar
                src="/me.jpg"
                alt="Ygnacio Martínez"
                sx={{
                  width: { xs: 80, sm: 96 },
                  height: { xs: 80, sm: 96 },
                  mb: { xs: 2, sm: 3 },
                  border: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" }
                }}
              />
              
              <Typography variant="h2" fontWeight={800} sx={{ letterSpacing: "-0.03em", fontSize: { xs: "2.2rem", sm: "3.5rem" }, lineHeight: 1.1 }}>
                Ygnacio Martínez
              </Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mt: 1, mb: 1.5, color: "text.primary", fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                Backend Developer at Métrica Móvil
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "340px", lineHeight: 1.6 }}>
                I build scalable architectures, robust APIs, and design systems with a strong foundation in UX/UI.
              </Typography>

              {/* CORE TECHNOLOGIES */}
              <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", gap: 0.8, maxWidth: "340px" }}>
                {["Node.js", "TypeScript", "RESTful APIs", "SQL / NoSQL", "AWS Cloud", "Docker"].map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: chipBg,
                      color: chipText,
                      fontWeight: 600,
                      fontSize: "0.72rem",
                      borderRadius: 99,
                      border: "none",
                    }}
                  />
                ))}
              </Box>

              {/* NAVEGACIÓN VERTICAL */}
              <Box sx={{ mt: 5, display: { xs: "none", md: "flex" }, flexDirection: "column", gap: 1.8 }}>
                {[
                  { id: "about", label: "ABOUT", ref: aboutRef },
                  { id: "experience", label: "EXPERIENCE", ref: experienceRef },
                  { id: "projects", label: "PROJECTS", ref: projectsRef },
                  { id: "ux", label: "UX & MOCKUPS", ref: uxRef },
                ].map((item) => (
                  <Box
                    key={item.id}
                    onClick={() => scrollToSection(item.ref)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                  >
                    <Box
                      sx={{
                        height: "1px",
                        width: activeSection === item.id ? "2.5rem" : "1.2rem",
                        bgcolor: activeSection === item.id ? "text.primary" : "text.secondary",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{
                        letterSpacing: "0.1em",
                        color: activeSection === item.id ? "text.primary" : "text.secondary",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* REDES SOCIALES & TEMA */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mt: { xs: 3, md: 0 } }}>
              <IconButton component="a" href="https://github.com/ygnaciomarts" target="_blank" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" }, p: 0 }}>
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton component="a" href="https://www.linkedin.com/in/ygnaciomarts/" target="_blank" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" }, p: 0 }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton component="a" href="mailto:ygnaciomarts@gmail.com" sx={{ color: "text.secondary", "&:hover": { color: "text.primary" }, p: 0 }}>
                <MailIcon fontSize="small" />
              </IconButton>
              
              <Box sx={{ width: "1px", height: "20px", bgcolor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }} />
              
              <IconButton onClick={toggleTheme} sx={{ color: "text.secondary", "&:hover": { color: "text.primary" }, p: 0 }}>
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
            </Box>
          </Box>

          {/* ================= MITAD DERECHA ================= */}
          <Box
            component="main"
            className="animate-fade-up"
            sx={{
              width: { md: "52%" },
              pt: { xs: 3, md: "216px" }, // Ajustado para móvil (3) y alineación matemática en escritorio (216px)
              pb: { xs: 6, md: 12 },
              animationDelay: "0.15s",
            }}
          >
            {/* ABOUT */}
            <Box ref={aboutRef} sx={{ mb: { xs: 8, md: 12 }, scrollMarginTop: "100px" }}>
              <Typography variant="h6" fontWeight={700} sx={{ display: { md: "none" }, mb: 2, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", color: chipText }}>
                About
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                Hello <span className="waving-hand">👋</span> My interest in software engineering started when I saw how code can solve complex behind-the-scenes problems. Today, my main focus is designing <strong>efficient databases, RESTful APIs, and cloud architectures</strong> that serve as the backbone of stable applications.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                I currently work as a Backend Developer at <a href="#" className="text-link">Métrica Móvil</a>, where I develop server-side logic for high-demand systems. Previously, I thoroughly explored the client side as an Intern at <a href="#" className="text-link">John Deere</a>, leading platform migrations toward <em>Fuel Design System v6</em>, which gave me an immensely valuable perspective on UX, UI, and Design Tokens.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Having this blend allows me to design backend architectures that frontend teams love consuming. Additionally, I am passionate about algorithmic efficiency and was a regional competitor in the <strong>ICPC</strong> for 3 consecutive years.
              </Typography>
            </Box>

            {/* EXPERIENCE */}
            <Box ref={experienceRef} sx={{ mb: { xs: 8, md: 12 }, scrollMarginTop: "100px" }} className="hover-group">
              <Typography variant="h6" fontWeight={700} sx={{ display: { md: "none" }, mb: 2, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", color: chipText }}>
                Experience
              </Typography>

              {/* Item Métrica Móvil */}
              <Box className="hover-item" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, mb: 2, transition: "all 0.3s ease", cursor: "default" }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ pt: 0.5, letterSpacing: 0.5 }}>
                  2026 — PRESENT
                </Typography>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    Backend Developer · Métrica Móvil
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Design and development of backend architectures for production environments. Creation of scalable APIs, database query optimization, and cloud service integration to support data flows for critical applications.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["Node.js", "APIs", "SQL", "Cloud Services"].map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ bgcolor: chipBg, color: chipText, fontWeight: 600, fontSize: "0.75rem", borderRadius: 99, border: "none" }} />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Item John Deere */}
              <Box className="hover-item" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, mb: 2, transition: "all 0.3s ease", cursor: "default" }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ pt: 0.5, letterSpacing: 0.5 }}>
                  2024 — 2025
                </Typography>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    Software Engineer Intern · John Deere
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Led the migration of manufacturing applications to <em>Fuel Design System v6</em>. Although my current role is backend, I acquired key skills here building enterprise components and documenting UI/UX guidelines consumed internationally.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["React", "TypeScript", "Design Tokens", "UX Research"].map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ bgcolor: chipBg, color: chipText, fontWeight: 600, fontSize: "0.75rem", borderRadius: 99, border: "none" }} />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Item ICPC */}
              <Box className="hover-item" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, transition: "all 0.3s ease", cursor: "default" }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ pt: 0.5, letterSpacing: 0.5 }}>
                  2022 — 2026
                </Typography>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    B.S. in Computer Systems Engineering
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Instituto Tecnológico de La Laguna (TecNM). 3 consecutive years participating in ICPC competitive programming contests.
                  </Typography>
                </Box>
              </Box>

              {/* BOTÓN DE CV */}
              <Box sx={{ mt: 4 }}>
                <Button
                  component="a"
                  href={cv}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  disableElevation
                  endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
                  sx={{ 
                    textTransform: "none", 
                    bgcolor: "text.primary", 
                    color: "background.default", 
                    borderRadius: 99, 
                    px: 3, 
                    py: 0.8, 
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    transition: "transform 0.2s ease",
                    "&:hover": { bgcolor: "text.primary", transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }
                  }}
                >
                  View Full Resume
                </Button>
              </Box>
            </Box>

            {/* PROJECTS DEV */}
            <Box ref={projectsRef} sx={{ mb: { xs: 8, md: 12 }, scrollMarginTop: "100px" }} className="hover-group">
              <Typography variant="h6" fontWeight={700} sx={{ display: { md: "none" }, mb: 2, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", color: chipText }}>
                Projects
              </Typography>

              {/* BandUp 2.0 */}
              <Box
                component="a"
                href="https://new-bandup.ygnaciomarts.com"
                target="_blank"
                className="hover-item"
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1.5, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, mb: 2, transition: "all 0.3s ease", textDecoration: "none" }}
              >
                <Box sx={{ pt: 0.5 }}>
                  <img src="/me.jpg" style={{ width: "100%", borderRadius: "6px", opacity: isDark ? 0.6 : 0.9, filter: "grayscale(50%)", border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }} alt="Project Thumbnail" />
                </Box>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.2, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      BandUp Shop 2.0
                    </Typography>
                    <OpenInNewIcon sx={{ fontSize: 14, color: "text.primary" }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Complete rewrite to a Single Page Application. Includes secure JSON Web Token authentication, global shopping cart management, a dynamic product catalog, and a real-time admin dashboard.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["React", "Vite", "Material-UI", "JWT Auth"].map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ bgcolor: chipBg, color: chipText, fontWeight: 600, fontSize: "0.75rem", borderRadius: 99, border: "none" }} />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* BandUp v1 */}
              <Box
                component="a"
                href="https://bandup.ygnaciomarts.com"
                target="_blank"
                className="hover-item"
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1.5, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, transition: "all 0.3s ease", textDecoration: "none" }}
              >
                <Box sx={{ pt: 0.5 }}>
                  <img src="/me.jpg" style={{ width: "100%", borderRadius: "6px", opacity: isDark ? 0.6 : 0.9, filter: "grayscale(50%)", border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }} alt="Project Thumbnail" />
                </Box>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.2, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                      BandUp Shop (v1.0)
                    </Typography>
                    <OpenInNewIcon sx={{ fontSize: 14, color: "text.primary" }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Legacy monolithic version built from scratch. MySQL relational database modeling, server-side processing with PHP, secure sessions, and custom responsive layout.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["PHP", "MySQL", "Vanilla CSS"].map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ bgcolor: chipBg, color: chipText, fontWeight: 600, fontSize: "0.75rem", borderRadius: 99, border: "none" }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* UX / MOCKUPS */}
            <Box ref={uxRef} sx={{ scrollMarginTop: "100px" }} className="hover-group">
              <Typography variant="h6" fontWeight={700} sx={{ display: { md: "none" }, mb: 2, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem", color: chipText }}>
                UX & Mockups
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>
                My background developing design systems gave me the tools to create prototypes and wireframes before writing code. Understanding design makes me a better Backend Developer.
              </Typography>

              {/* EduChime Mockup */}
              <Box
                className="hover-item"
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1.5, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, mb: 2, transition: "all 0.3s ease", cursor: "pointer" }}
              >
                <Box sx={{ pt: 0.5 }}>
                  <Box sx={{ width: "100%", aspectRatio: "16/9", bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <DesignServicesIcon sx={{ color: "text.secondary", opacity: 0.5 }} />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.2, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    EduChime - UI/UX Prototype
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Interface design and interactive wireframing for an educational platform. Conceptualization of user flows, information architecture, and high-fidelity prototyping.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["Figma", "Wireframing", "User Flows", "Prototyping"].map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ bgcolor: chipBg, color: chipText, fontWeight: 600, fontSize: "0.75rem", borderRadius: 99, border: "none" }} />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Fuel UI Mockup */}
              <Box
                className="hover-item"
                sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" }, gap: { xs: 1.5, sm: 2 }, p: { xs: 1.5, sm: 2.5 }, ml: { xs: 0, sm: -2.5 }, transition: "all 0.3s ease", cursor: "pointer" }}
              >
                <Box sx={{ pt: 0.5 }}>
                  <Box sx={{ width: "100%", aspectRatio: "16/9", bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <DesignServicesIcon sx={{ color: "text.secondary", opacity: 0.5 }} />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.2, mb: 1, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    Fuel UI - Token Architecture
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Structuring Design Tokens in Figma to maintain consistency between design and development teams. Documentation of usage guidelines for colors, spacing, and typography.
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {["Figma", "Design Tokens", "Design System"].map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ bgcolor: chipBg, color: chipText, fontWeight: 600, fontSize: "0.75rem", borderRadius: 99, border: "none" }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Root() {
  return <Portfolio />;
}