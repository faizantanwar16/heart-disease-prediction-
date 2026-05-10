import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getPredictionHistory, getVitals, getUser } from "../services/api";
import Sidebar from "../components/Sidebar";

// ─── Icons ────────────────────────────────────────────────────────────────────

const HeartbeatIcon = ({ size = 24, color = "#C0182B" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z" fill={color} opacity="0.15"/>
    <path d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const GridIcon     = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>);
const ActivityIcon = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
const ClockIcon    = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const DropletIcon  = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>);
const UserIcon     = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const BellIcon     = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>);
const PlusIcon     = ({ size = 16, color = "white" })   => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const WatchIcon    = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="7"/><polyline points="12 6 12 12 16 14"/></svg>);
const ChevronRightIcon = ({ size = 14, color = "#9CA3AF" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>);
const TrendUpIcon  = ({ size = 14, color = "#16A34A" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);

// ─── Nav ──────────────────────────────────────────────────────────────────────

// const navItems = [
//   { id: "dashboard", label: "Dashboard",      path: "/dashboard" },
//   { id: "predict",   label: "New Prediction", path: "/predict"   },
//   { id: "history",   label: "History",        path: "/history"   },
//   { id: "vitals",    label: "Vitals Tracker", path: "/vitals"    },
//   { id: "wearable",  label: "Wearable Sync",  path: "/wearable"  },
//   { id: "profile",   label: "Profile",        path: "/profile"   },
// ];

const NavIcon = ({ id, size, color }) => {
  if (id === "dashboard") return <GridIcon size={size} color={color}/>;
  if (id === "predict")   return <ActivityIcon size={size} color={color}/>;
  if (id === "history")   return <ClockIcon size={size} color={color}/>;
  if (id === "vitals")    return <DropletIcon size={size} color={color}/>;
  if (id === "wearable")  return <WatchIcon size={size} color={color}/>;
  if (id === "profile")   return <UserIcon size={size} color={color}/>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getRiskMeta = (score) => {
  if (score >= 70) return { label: "HIGH RISK",      color: "#C0182B", bg: "#FFF5F5", grad: "linear-gradient(135deg,#8B0000,#C0182B)" };
  if (score >= 40) return { label: "MODERATE RISK",  color: "#D97706", bg: "#FFFBEB", grad: "linear-gradient(135deg,#92400E,#D97706)" };
  return              { label: "LOW RISK",           color: "#16A34A", bg: "#F0FDF4", grad: "linear-gradient(135deg,#14532D,#16A34A)" };
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const { color, label: rl } = getRiskMeta(val);
  return (
    <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color }}>{val}%</p>
      <p style={{ margin: 0, fontSize: 11, color, fontWeight: 600 }}>{rl}</p>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();

  // const [sidebarHovered, setSidebarHovered] = useState(null);
  const [user, setUser]                     = useState(null);
  const [predictions, setPredictions]       = useState([]);
  const [vitals, setVitals]                 = useState([]);
  const [loading, setLoading]               = useState(true);

  // useEffect(() => {
  //   const stored = getUser();
  //   if (!stored) { navigate("/login"); return; }
  //   setUser(stored);
  //   fetchData();
  // }, [navigate]);
  useEffect(() => {
  setUser(getUser());
  fetchData();
}, []);

  const fetchData = async () => {
    try {
      const [predData, vitalsData] = await Promise.all([
        getPredictionHistory(),
        getVitals(),
      ]);
      if (Array.isArray(predData))   setPredictions(predData);
      if (Array.isArray(vitalsData)) setVitals(vitalsData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Derived data ────────────────────────────────────────────────────────────

  const latestPrediction = predictions[0] || null;
  const latestRisk       = latestPrediction ? Math.round(latestPrediction.probability * 100) : null;
  const latestVitals     = vitals[0] || null;

  const riskMeta = latestRisk !== null ? getRiskMeta(latestRisk) : getRiskMeta(0);

  // Build chart data from last 7 predictions
  const chartData = [...predictions].reverse().slice(-7).map(p => ({
    month: formatDate(p.createdAt).split(",")[0],
    risk:  Math.round(p.probability * 100),
  }));

  const recentPredictions = predictions.slice(0, 3).map(p => {
    const score = Math.round(p.probability * 100);
    const meta  = getRiskMeta(score);
    return { date: formatDate(p.createdAt), risk: score, label: meta.label.split(" ")[0], color: meta.color, bg: meta.bg };
  });

  const firstName = user?.name?.split(" ")[0] || "User";
  const initials  = user?.name?.charAt(0).toUpperCase() || "U";

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "3px solid #F3F4F6", borderTop: "3px solid #C0182B", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}/>
          <p style={{ color: "#9CA3AF", fontSize: 14 }}>Loading your dashboard…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>

      <Sidebar latestRisk={latestRisk} riskLabel={latestRisk !== null ? riskMeta.label : null} />

      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #F3F4F6", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.4px" }}>Dashboard</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>{today}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => navigate("/predict")}
              style={{ display: "flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", padding: "9px 18px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 12px rgba(192,24,43,0.28)", transition: "all 0.2s", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(192,24,43,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(192,24,43,0.28)"; }}>
              <PlusIcon size={14}/>New Prediction
            </button>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <BellIcon size={20} color="#6B7280"/>
              <span style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "#C0182B", borderRadius: "50%", border: "1.5px solid white" }}/>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C0182B,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14, boxShadow: "0 2px 8px rgba(192,24,43,0.3)" }}>{initials}</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{firstName}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>Patient</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: "28px 32px", flex: 1 }}>

          {/* Greeting banner */}
          <div style={{ background: "linear-gradient(135deg,#8B0000 0%,#C0182B 60%,#E53E3E 100%)", borderRadius: 16, padding: "22px 28px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden", animation: "slideUp 0.4s ease both" }}>
            <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.07 }}><HeartbeatIcon size={180} color="white"/></div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, opacity: 0.12 }}>
              <svg viewBox="0 0 600 30" preserveAspectRatio="none" style={{ width: "100%", height: 30 }}>
                <polyline points="0,15 60,15 80,15 100,3 120,27 140,15 190,15 210,5 230,25 250,15 300,15 320,15 340,3 360,27 380,15 430,15 450,5 470,25 490,15 540,15 560,15 580,3 600,15" fill="none" stroke="white" strokeWidth="1.2"/>
              </svg>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ margin: "0 0 3px", fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Good morning 👋</p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.4px" }}>Welcome back, {firstName}</h2>
            </div>
            <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
              <p style={{ margin: "0 0 2px", fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Total predictions</p>
              <p style={{ margin: 0, fontSize: 22, color: "white", fontWeight: 800 }}>{predictions.length}</p>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
            {[
              { icon: <HeartbeatIcon size={22} color="#C0182B"/>, bg: "#FFF5F5", label: "Latest Risk Score",   value: latestRisk !== null ? `${latestRisk}%` : "N/A", sub: latestRisk !== null ? riskMeta.label : "No predictions yet" },
              { icon: <ActivityIcon size={20} color="#2563EB"/>,  bg: "#EFF6FF", label: "Total Predictions",  value: predictions.length, sub: "All time" },
              { icon: <DropletIcon size={20} color="#D97706"/>,   bg: "#FFFBEB", label: "Vitals Logged",      value: vitals.length, sub: "All time" },
              { icon: <ClockIcon size={20} color="#7C3AED"/>,     bg: "#F5F3FF", label: "Heart Rate",         value: latestVitals ? `${latestVitals.heartRate} bpm` : "N/A", sub: latestVitals ? "Latest reading" : "No vitals logged" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: `slideUp 0.5s ease ${i * 0.08}s both`, transition: "transform 0.2s,box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,24,43,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{s.icon}</div>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6B7280", fontWeight: 500 }}>{s.label}</p>
                <p style={{ margin: "0 0 3px", fontSize: 28, fontWeight: 900, color: "#1F2937", letterSpacing: "-0.8px", lineHeight: 1 }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 22 }}>

            {/* Chart */}
            <div style={{ background: "white", borderRadius: 16, padding: "24px 24px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: "slideUp 0.5s ease 0.3s both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                <div>
                  <h3 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 800, color: "#1F2937" }}>Risk Trend Over Time</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>Your cardiovascular risk score (%)</p>
                </div>
              </div>
              {chartData.length === 0 ? (
                <div style={{ height: 230, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                  <ActivityIcon size={40} color="#E5E7EB"/>
                  <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>No predictions yet</p>
                  <button onClick={() => navigate("/predict")}
                    style={{ background: "#C0182B", color: "white", border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                    Run First Prediction
                  </button>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={230}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#C0182B" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#C0182B" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 600 }} axisLine={false} tickLine={false}/>
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <ReferenceLine y={70} stroke="#C0182B" strokeDasharray="4 3" strokeOpacity={0.4}/>
                    <ReferenceLine y={40} stroke="#D97706" strokeDasharray="4 3" strokeOpacity={0.4}/>
                    <Area type="monotone" dataKey="risk" stroke="#C0182B" strokeWidth={2.5} fill="url(#riskGrad)" dot={{ fill: "#C0182B", r: 4, strokeWidth: 2, stroke: "white" }} activeDot={{ r: 6, fill: "#C0182B", stroke: "white", strokeWidth: 2 }}/>
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Latest Result Card */}
              {latestPrediction ? (
                <div style={{ background: riskMeta.grad, borderRadius: 16, padding: "22px", boxShadow: "0 4px 20px rgba(192,24,43,0.25)", position: "relative", overflow: "hidden", animation: "slideUp 0.5s ease 0.35s both" }}>
                  <div style={{ position: "absolute", right: -16, bottom: -16, opacity: 0.1 }}><HeartbeatIcon size={120} color="white"/></div>
                  <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Latest — {formatDate(latestPrediction.createdAt)}
                  </p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, margin: "10px 0 6px" }}>
                    <span style={{ fontSize: 56, fontWeight: 900, color: "white", letterSpacing: "-2px", lineHeight: 1 }}>{latestRisk}</span>
                    <span style={{ fontSize: 24, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>%</span>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 12px", marginBottom: 16 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "white", display: "inline-block" }}/>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "white", letterSpacing: "0.05em" }}>{riskMeta.label}</span>
                  </div>
                  {latestVitals && (
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { label: "BP",   value: latestVitals.bloodPressure || "N/A" },
                        { label: "Chol", value: latestVitals.cholesterol   || "N/A" },
                        { label: "HR",   value: latestVitals.heartRate ? `${latestVitals.heartRate} bpm` : "N/A" },
                      ].map(v => (
                        <div key={v.label} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 10px" }}>
                          <p style={{ margin: "0 0 2px", fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>{v.label}</p>
                          <p style={{ margin: 0, fontSize: 13, color: "white", fontWeight: 800 }}>{v.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: "linear-gradient(135deg,#8B0000,#C0182B)", borderRadius: 16, padding: "28px 22px", textAlign: "center", animation: "slideUp 0.5s ease 0.35s both" }}>
                  <HeartbeatIcon size={48} color="rgba(255,255,255,0.4)"/>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "12px 0 16px" }}>No predictions yet</p>
                  <button onClick={() => navigate("/predict")}
                    style={{ background: "white", color: "#C0182B", border: "none", padding: "9px 20px", borderRadius: 9, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                    Run First Prediction →
                  </button>
                </div>
              )}

              {/* Recent Predictions */}
              <div style={{ background: "white", borderRadius: 16, padding: "18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", flex: 1, animation: "slideUp 0.5s ease 0.42s both" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#1F2937" }}>Recent Predictions</h3>
                  <button onClick={() => navigate("/history")}
                    style={{ fontSize: 12, color: "#C0182B", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                    View all →
                  </button>
                </div>
                {recentPredictions.length === 0 ? (
                  <p style={{ color: "#9CA3AF", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No predictions yet</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {recentPredictions.map((p, i) => (
                      <div key={i}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#F9FAFB", borderRadius: 10, border: "1px solid #F3F4F6", cursor: "pointer", transition: "all 0.18s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = p.bg; e.currentTarget.style.borderColor = p.color + "40"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#F9FAFB"; e.currentTarget.style.borderColor = "#F3F4F6"; }}>
                        <div>
                          <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{p.date}</p>
                          <span style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.color}30`, borderRadius: 20, padding: "2px 8px", letterSpacing: "0.05em" }}>{p.label}</span>
                        </div>
                        <span style={{ fontSize: 22, fontWeight: 900, color: p.color, letterSpacing: "-0.5px" }}>{p.risk}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}