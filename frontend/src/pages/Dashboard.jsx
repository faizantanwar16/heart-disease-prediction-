import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

// ─── Icons ────────────────────────────────────────────────────────────────────

const HeartbeatIcon = ({ size = 24, color = "#C0182B" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z" fill={color} opacity="0.15" />
    <path d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const Icon = ({ d, size = 20, color = "#6B7280", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const GridIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ActivityIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ClockIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const DropletIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const UserIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PlusIcon = ({ size = 16, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrendUpIcon = ({ size = 14, color = "#16A34A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = ({ size = 14, color = "#C0182B" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
  </svg>
);

const LogOutIcon = ({ size = 18, color = "#9CA3AF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronRightIcon = ({ size = 14, color = "#9CA3AF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const riskTrendData = [
  { month: "Oct", risk: 62 },
  { month: "Nov", risk: 58 },
  { month: "Dec", risk: 71 },
  { month: "Jan", risk: 65 },
  { month: "Feb", risk: 55 },
  { month: "Mar", risk: 48 },
  { month: "Apr", risk: 52 },
];

const recentPredictions = [
  { date: "Apr 14, 2025", risk: 52, label: "MODERATE", color: "#D97706", bg: "#FFFBEB" },
  { date: "Mar 28, 2025", risk: 48, label: "LOW",      color: "#16A34A", bg: "#F0FDF4" },
  { date: "Mar 10, 2025", risk: 71, label: "HIGH",     color: "#C0182B", bg: "#FFF5F5" },
];

const navItems = [
  { id: "dashboard",   label: "Dashboard",       icon: <GridIcon /> },
  { id: "predict",     label: "New Prediction",  icon: <ActivityIcon /> },
  { id: "history",     label: "History",         icon: <ClockIcon /> },
  { id: "vitals",      label: "Vitals Tracker",  icon: <DropletIcon /> },
  { id: "profile",     label: "Profile",         icon: <UserIcon /> },
];

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const color = val >= 70 ? "#C0182B" : val >= 40 ? "#D97706" : "#16A34A";
  return (
    <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color }}>{val}%</p>
      <p style={{ margin: 0, fontSize: 11, color, fontWeight: 600 }}>
        {val >= 70 ? "HIGH RISK" : val >= 40 ? "MODERATE" : "LOW RISK"}
      </p>
    </div>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ icon, iconBg, label, value, sub, trend, trendUp, delay = 0 }) => (
  <div
    style={{
      background: "white",
      borderRadius: 16,
      padding: "22px 24px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      border: "1px solid #F3F4F6",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      animation: `slideUp 0.5s ease ${delay}s both`,
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "default",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,24,43,0.1)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: trendUp ? "#F0FDF4" : "#FFF5F5", borderRadius: 20, padding: "4px 9px" }}>
          {trendUp ? <TrendUpIcon /> : <TrendDownIcon />}
          <span style={{ fontSize: 12, fontWeight: 700, color: trendUp ? "#16A34A" : "#C0182B" }}>{trend}</span>
        </div>
      )}
    </div>
    <div>
      <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{label}</p>
      <p style={{ margin: "0 0 3px", fontSize: 28, fontWeight: 900, color: "#1F2937", letterSpacing: "-0.8px", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>{sub}</p>}
    </div>
  </div>
);

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarHovered, setSidebarHovered] = useState(null);
  const latestRisk = riskTrendData[riskTrendData.length - 1].risk;
  const isHighRisk = latestRisk >= 70;
  const isMod = latestRisk >= 40 && latestRisk < 70;

  const riskColor  = isHighRisk ? "#C0182B" : isMod ? "#D97706" : "#16A34A";
  const riskLabel  = isHighRisk ? "HIGH RISK" : isMod ? "MODERATE RISK" : "LOW RISK";
  const riskBg     = isHighRisk
    ? "linear-gradient(135deg, #8B0000 0%, #C0182B 100%)"
    : isMod
    ? "linear-gradient(135deg, #92400E 0%, #D97706 100%)"
    : "linear-gradient(135deg, #14532D 0%, #16A34A 100%)";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: 240,
          minHeight: "100vh",
          background: "white",
          borderRight: "1px solid #F3F4F6",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          boxShadow: "2px 0 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "22px 20px 20px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <HeartbeatIcon size={32} color="#C0182B" />
            <span style={{ fontWeight: 900, fontSize: 18, color: "#1F2937", letterSpacing: "-0.4px" }}>
              Heart<span style={{ color: "#C0182B" }}>Guard</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", margin: "0 0 8px" }}>
            Main Menu
          </p>
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                onMouseEnter={() => setSidebarHovered(item.id)}
                onMouseLeave={() => setSidebarHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: active ? "#C0182B" : sidebarHovered === item.id ? "#FFF5F5" : "transparent",
                  color: active ? "white" : sidebarHovered === item.id ? "#C0182B" : "#374151",
                  fontWeight: active ? 700 : 500,
                  fontSize: 14,
                  transition: "all 0.18s",
                  fontFamily: "Inter, sans-serif",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {/* Re-color icon */}
                <span style={{ opacity: active ? 1 : 0.7, display: "flex" }}>
                  {item.id === "dashboard"  && <GridIcon     size={18} color={active ? "white" : sidebarHovered === item.id ? "#C0182B" : "#6B7280"} />}
                  {item.id === "predict"    && <ActivityIcon size={18} color={active ? "white" : sidebarHovered === item.id ? "#C0182B" : "#6B7280"} />}
                  {item.id === "history"    && <ClockIcon    size={18} color={active ? "white" : sidebarHovered === item.id ? "#C0182B" : "#6B7280"} />}
                  {item.id === "vitals"     && <DropletIcon  size={18} color={active ? "white" : sidebarHovered === item.id ? "#C0182B" : "#6B7280"} />}
                  {item.id === "profile"    && <UserIcon     size={18} color={active ? "white" : sidebarHovered === item.id ? "#C0182B" : "#6B7280"} />}
                </span>
                {item.label}
                {active && (
                  <span style={{ marginLeft: "auto" }}>
                    <ChevronRightIcon color="rgba(255,255,255,0.6)" />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Risk summary pill in sidebar */}
        <div style={{ padding: "0 12px 16px" }}>
          <div style={{ background: isHighRisk ? "#FFF5F5" : isMod ? "#FFFBEB" : "#F0FDF4", borderRadius: 12, padding: "14px", border: `1px solid ${isHighRisk ? "#FECDD3" : isMod ? "#FDE68A" : "#BBF7D0"}` }}>
            <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Latest Risk</p>
            <p style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 900, color: riskColor, letterSpacing: "-0.5px" }}>{latestRisk}%</p>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: riskColor }}>{riskLabel}</p>
          </div>
        </div>

        {/* Logout */}
        <div style={{ padding: "12px", borderTop: "1px solid #F3F4F6" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "none",
              background: "transparent",
              color: "#9CA3AF",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "Inter, sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#FFF5F5"; e.currentTarget.style.color = "#C0182B"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9CA3AF"; }}
          >
            <LogOutIcon size={18} color="currentColor" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* ── TOPBAR ── */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #F3F4F6",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.4px" }}>
              Dashboard
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>
              Sunday, April 19, 2025
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* New Prediction CTA */}
            <button
              onClick={() => setActivePage("predict")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "linear-gradient(135deg, #C0182B, #8B0000)",
                color: "white",
                border: "none",
                padding: "9px 18px",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                boxShadow: "0 2px 12px rgba(192,24,43,0.28)",
                transition: "all 0.2s",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(192,24,43,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(192,24,43,0.28)"; }}
            >
              <PlusIcon size={14} />
              New Prediction
            </button>

            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <BellIcon size={20} color="#6B7280" />
              <span style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "#C0182B", borderRadius: "50%", border: "1.5px solid white" }} />
            </div>

            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #C0182B, #8B0000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 800,
                  fontSize: 14,
                  boxShadow: "0 2px 8px rgba(192,24,43,0.3)",
                }}
              >
                F
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Faizan</span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>Patient</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main style={{ padding: "28px 32px", flex: 1 }}>

          {/* Greeting banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #8B0000 0%, #C0182B 60%, #E53E3E 100%)",
              borderRadius: 16,
              padding: "22px 28px",
              marginBottom: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
              animation: "slideUp 0.4s ease both",
            }}
          >
            <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.07 }}>
              <HeartbeatIcon size={180} color="white" />
            </div>
            {/* ECG line */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.12 }}>
              <svg viewBox="0 0 600 30" preserveAspectRatio="none" style={{ width: "100%", height: 30 }}>
                <polyline points="0,15 60,15 80,15 100,3 120,27 140,15 190,15 210,5 230,25 250,15 300,15 320,15 340,3 360,27 380,15 430,15 450,5 470,25 490,15 540,15 560,15 580,3 600,15" fill="none" stroke="white" strokeWidth="1.2" />
              </svg>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ margin: "0 0 3px", fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Good morning 👋</p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.4px" }}>
                Welcome back, Faizan
              </h2>
            </div>
            <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
              <p style={{ margin: "0 0 2px", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Your last check was</p>
              <p style={{ margin: 0, fontSize: 15, color: "white", fontWeight: 700 }}>5 days ago</p>
            </div>
          </div>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
            <StatCard
              icon={<HeartbeatIcon size={22} color="#C0182B" />}
              iconBg="#FFF5F5"
              label="Latest Risk Score"
              value={`${latestRisk}%`}
              sub={riskLabel}
              trend="-8% vs last"
              trendUp={true}
              delay={0}
            />
            <StatCard
              icon={<ActivityIcon size={20} color="#2563EB" />}
              iconBg="#EFF6FF"
              label="Total Predictions"
              value="7"
              sub="Since Oct 2024"
              trend="+2 this month"
              trendUp={true}
              delay={0.08}
            />
            <StatCard
              icon={<DropletIcon size={20} color="#D97706" />}
              iconBg="#FFFBEB"
              label="Avg Cholesterol"
              value="218"
              sub="mg/dL — Borderline"
              trend="-4 mg/dL"
              trendUp={true}
              delay={0.16}
            />
            <StatCard
              icon={<ClockIcon size={20} color="#7C3AED" />}
              iconBg="#F5F3FF"
              label="Resting Heart Rate"
              value="74"
              sub="bpm — Normal"
              trend="Stable"
              trendUp={true}
              delay={0.24}
            />
          </div>

          {/* ── BOTTOM ROW ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 22 }}>

            {/* Line Chart */}
            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: "24px 24px 16px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #F3F4F6",
                animation: "slideUp 0.5s ease 0.3s both",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                <div>
                  <h3 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 800, color: "#1F2937" }}>Risk Trend Over Time</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>Monthly cardiovascular risk score (%)</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { color: "#16A34A", label: "Low (<40%)" },
                    { color: "#D97706", label: "Moderate" },
                    { color: "#C0182B", label: "High (>70%)" },
                  ].map(l => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
                      <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={230}>
                <AreaChart data={riskTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#C0182B" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#C0182B" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={70} stroke="#C0182B" strokeDasharray="4 3" strokeOpacity={0.4} label={{ value: "High", position: "insideTopRight", fontSize: 10, fill: "#C0182B" }} />
                  <ReferenceLine y={40} stroke="#D97706" strokeDasharray="4 3" strokeOpacity={0.4} label={{ value: "Moderate", position: "insideTopRight", fontSize: 10, fill: "#D97706" }} />
                  <Area type="monotone" dataKey="risk" stroke="#C0182B" strokeWidth={2.5} fill="url(#riskGrad)" dot={{ fill: "#C0182B", r: 4, strokeWidth: 2, stroke: "white" }} activeDot={{ r: 6, fill: "#C0182B", stroke: "white", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Latest Result Card */}
              <div
                style={{
                  background: riskBg,
                  borderRadius: 16,
                  padding: "22px 22px",
                  boxShadow: "0 4px 20px rgba(192,24,43,0.25)",
                  position: "relative",
                  overflow: "hidden",
                  animation: "slideUp 0.5s ease 0.35s both",
                }}
              >
                {/* BG watermark */}
                <div style={{ position: "absolute", right: -16, bottom: -16, opacity: 0.1 }}>
                  <HeartbeatIcon size={120} color="white" />
                </div>
                <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Latest Prediction — Apr 14
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, margin: "10px 0 6px" }}>
                  <span style={{ fontSize: 56, fontWeight: 900, color: "white", letterSpacing: "-2px", lineHeight: 1 }}>{latestRisk}</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>%</span>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 20,
                    padding: "5px 12px",
                    marginBottom: 16,
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "white", display: "inline-block" }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "white", letterSpacing: "0.05em" }}>{riskLabel}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { label: "BP", value: "132/84" },
                    { label: "Chol", value: "218" },
                    { label: "HR", value: "74 bpm" },
                  ].map(v => (
                    <div key={v.label} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 10px" }}>
                      <p style={{ margin: "0 0 2px", fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{v.label}</p>
                      <p style={{ margin: 0, fontSize: 13, color: "white", fontWeight: 800 }}>{v.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent History */}
              <div
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "18px 18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid #F3F4F6",
                  flex: 1,
                  animation: "slideUp 0.5s ease 0.42s both",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#1F2937" }}>Recent Predictions</h3>
                  <button
                    style={{ fontSize: 12, color: "#C0182B", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                    onClick={() => setActivePage("history")}
                  >
                    View all →
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {recentPredictions.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        background: "#F9FAFB",
                        borderRadius: 10,
                        border: "1px solid #F3F4F6",
                        cursor: "pointer",
                        transition: "all 0.18s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = p.bg; e.currentTarget.style.borderColor = p.color + "40"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#F3F4F6"; }}
                    >
                      <div>
                        <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{p.date}</p>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: p.color,
                            background: p.bg,
                            border: `1px solid ${p.color}30`,
                            borderRadius: 20,
                            padding: "2px 8px",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {p.label}
                        </span>
                      </div>
                      <span style={{ fontSize: 22, fontWeight: 900, color: p.color, letterSpacing: "-0.5px" }}>{p.risk}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}