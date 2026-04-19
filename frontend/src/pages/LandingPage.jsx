import { useState, useEffect } from "react";

const HeartbeatIcon = ({ size = 64, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z"
      fill={color}
      opacity="0.2"
    />
    <path
      d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const BrainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.96-4.22A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.96-4.22A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const stats = [
  { value: "94.2%", label: "Prediction Accuracy" },
  { value: "50K+", label: "Patients Screened" },
  { value: "13", label: "Clinical Risk Factors" },
];

const steps = [
  {
    number: "01",
    title: "Enter Your Health Data",
    desc: "Fill in 13 key health parameters including age, cholesterol, blood pressure, and more.",
  },
  {
    number: "02",
    title: "AI Analyzes Your Profile",
    desc: "Our machine learning model trained on thousands of clinical records processes your data instantly.",
  },
  {
    number: "03",
    title: "Get Your Risk Score",
    desc: "Receive a clear risk percentage, visual gauge, and personalized recommendations.",
  },
];

const features = [
  { icon: <BrainIcon />, title: "ML-Powered Analysis", desc: "Trained on real clinical datasets using logistic regression and ensemble models." },
  { icon: <ShieldIcon />, title: "13 Risk Parameters", desc: "Age, cholesterol, BP, ECG, angina, and more — all validated clinical factors." },
  { icon: <ChartIcon />, title: "Risk Trend Tracking", desc: "Monitor your heart health over time with detailed history and visual trends." },
  { icon: <ClockIcon />, title: "Instant Results", desc: "Get your full risk assessment in under 3 seconds, no waiting required." },
  { icon: <LockIcon />, title: "Private & Secure", desc: "Your health data is encrypted and never shared with third parties." },
  { icon: <UserIcon />, title: "Personal Dashboard", desc: "Track vitals, view history, and manage all your assessments in one place." },
];

const CountUp = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const isDecimal = target.includes(".");
  const numericTarget = parseFloat(target);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [numericTarget]);

  const display = target.includes("K+")
    ? `${Math.floor(count)}K+`
    : target.includes("%")
    ? `${isDecimal ? count.toFixed(1) : Math.floor(count)}%`
    : Math.floor(count).toString() + suffix;

  return <span>{display}</span>;
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#1F2937", overflowX: "hidden" }}>
      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "none",
          transition: "all 0.3s ease",
          padding: "0 48px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <HeartbeatIcon size={32} color={scrolled ? "#C0182B" : "white"} />
          <span style={{ fontWeight: 800, fontSize: 20, color: scrolled ? "#1F2937" : "white", letterSpacing: "-0.5px" }}>
            Heart<span style={{ color: scrolled ? "#C0182B" : "rgba(255,255,255,0.8)" }}>Guard</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/login">
            <button
              style={{
                background: "transparent",
                border: `2px solid ${scrolled ? "#C0182B" : "white"}`,
                color: scrolled ? "#C0182B" : "white",
                padding: "8px 22px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={e => { e.target.style.background = scrolled ? "#C0182B" : "white"; e.target.style.color = scrolled ? "white" : "#C0182B"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = scrolled ? "#C0182B" : "white"; }}
            >
              Sign In
            </button>
          </a>
          <a href="/register">
            <button
              style={{
                background: scrolled ? "#C0182B" : "white",
                border: "2px solid transparent",
                color: scrolled ? "white" : "#C0182B",
                padding: "8px 22px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Get Started
            </button>
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #8B0000 0%, #C0182B 45%, #E53E3E 100%)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                borderRadius: "50%",
                border: "1px solid white",
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        {/* Animated ECG line */}
        <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, opacity: 0.12 }}>
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ width: "100%", height: 80 }}>
            <polyline
              points="0,40 100,40 130,40 160,10 190,70 220,40 270,40 300,40 330,40 360,5 390,75 420,40 470,40 500,40 530,40 560,10 590,70 620,40 670,40 700,40 730,40 760,5 790,75 820,40 870,40 900,40 930,40 960,10 990,70 1020,40 1070,40 1100,40 1130,40 1160,10 1200,40"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Hero content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "120px 80px 60px",
            gap: 80,
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Left — Heart Icon */}
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              animation: "pulse 2.5s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "2px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 60px rgba(255,255,255,0.15), 0 0 120px rgba(192,24,43,0.4)",
              }}
            >
              <HeartbeatIcon size={100} color="white" />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.5)",
                    animation: `blink 1.5s ease-in-out ${i * 0.3}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right — Text content */}
          <div style={{ flex: 1, color: "white" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 100,
                padding: "6px 16px",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 24,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: 8, height: 8, background: "#4ADE80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #4ADE80" }} />
              AI-Powered Cardiac Risk Assessment
            </div>

            <h1
              style={{
                fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                margin: "0 0 20px",
                letterSpacing: "-1.5px",
              }}
            >
              Know Your Heart Risk.
              <br />
              <span style={{ color: "rgba(255,255,255,0.75)" }}>Instantly.</span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 0 36px",
                fontWeight: 400,
              }}
            >
              Enter your health parameters and get an instant AI-generated cardiovascular risk score — 
              powered by clinical-grade machine learning.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="/register">
                <button
                  style={{
                    background: "white",
                    color: "#C0182B",
                    border: "none",
                    padding: "14px 32px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)"; }}
                >
                  Check Your Risk Free <ArrowIcon />
                </button>
              </a>
              <a href="#how-it-works">
                <button
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.5)",
                    padding: "14px 32px",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                >
                  See How It Works
                </button>
              </a>
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["No credit card required", "Results in 3 seconds", "Clinically validated"].map((text) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                  <CheckIcon />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS BAR */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "28px 80px",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: "12px 0",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none",
                }}
              >
                <div style={{ fontSize: 42, fontWeight: 900, color: "white", letterSpacing: "-1px", lineHeight: 1 }}>
                  <CountUp target={stat.value} />
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 6, fontWeight: 500, letterSpacing: "0.02em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "96px 80px", background: "white" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#C0182B", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Simple Process
            </span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#1F2937", margin: "12px 0 16px", letterSpacing: "-1px" }}>
              How HeartGuard Works
            </h2>
            <p style={{ color: "#6B7280", fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Get your cardiovascular risk assessment in three simple steps
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(192,24,43,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; }}
              >
                <div style={{ height: 4, background: "linear-gradient(90deg, #C0182B, #E53E3E)" }} />
                <div style={{ padding: "36px 32px" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      background: "#FFF5F5",
                      border: "2px solid #FECDD3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <span style={{ fontSize: 22, fontWeight: 900, color: "#C0182B" }}>{step.number}</span>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1F2937", margin: "0 0 12px", letterSpacing: "-0.3px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: "96px 80px", background: "#FFF5F5" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#C0182B", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Why HeartGuard
            </span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#1F2937", margin: "12px 0 16px", letterSpacing: "-1px" }}>
              Everything You Need for Heart Health
            </h2>
            <p style={{ color: "#6B7280", fontSize: 17, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              A comprehensive platform designed around clinical accuracy and ease of use
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "32px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "default",
                  border: "1px solid #E5E7EB",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(192,24,43,0.12)"; e.currentTarget.style.borderColor = "#FECDD3"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#E5E7EB"; }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "#FFF5F5",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1F2937", margin: "0 0 10px", letterSpacing: "-0.2px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          padding: "96px 80px",
          background: "linear-gradient(135deg, #8B0000 0%, #C0182B 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", right: -60, top: -60, opacity: 0.06 }}>
          <HeartbeatIcon size={400} color="white" />
        </div>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            Start Monitoring Your Heart Health Today
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", margin: "0 0 40px", lineHeight: 1.7 }}>
            Join thousands of users who trust HeartGuard for their cardiovascular risk monitoring. Free to get started.
          </p>
          <a href="/register">
            <button
              style={{
                background: "white",
                color: "#C0182B",
                border: "none",
                padding: "16px 40px",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 17,
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                transition: "transform 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Create Free Account →
            </button>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#8B0000", color: "white", padding: "48px 80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <HeartbeatIcon size={28} color="white" />
                <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>HeartGuard</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
                AI-powered heart disease risk prediction for proactive cardiovascular health management.
              </p>
            </div>
            {[
              { heading: "Platform", links: ["Dashboard", "Predict Risk", "History", "Vitals Tracker"] },
              { heading: "Support", links: ["Documentation", "FAQ", "Contact Us", "Privacy Policy"] },
              { heading: "Medical", links: ["Disclaimer", "Data Sources", "Clinical Info", "Research"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  {col.heading}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "white"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                      >{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              © 2025 HeartGuard. For educational purposes only. Not a substitute for medical advice.
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Mini Project — Computer Engineering
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        a { text-decoration: none; }
      `}</style>
    </div>
  );
}