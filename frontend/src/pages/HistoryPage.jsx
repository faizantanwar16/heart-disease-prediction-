import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPredictionHistory, getUser } from "../services/api";
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
const WatchIcon    = ({ size = 20, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="7"/><polyline points="12 6 12 12 16 14"/></svg>);
const ChevronRightIcon = ({ size = 14, color = "#9CA3AF" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>);
const ChevronDownIcon  = ({ size = 14, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>);
const SearchIcon   = ({ size = 16, color = "#9CA3AF" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const FilterIcon   = ({ size = 16, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getRiskMeta = (score) => {
  if (score >= 70) return { label: "HIGH",     color: "#C0182B", bg: "#FFF5F5" };
  if (score >= 40) return { label: "MODERATE", color: "#D97706", bg: "#FFFBEB" };
  return              { label: "LOW",      color: "#16A34A", bg: "#F0FDF4" };
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HistoryPage() {
  const navigate = useNavigate();

  // const [sidebarHovered, setSidebarHovered] = useState(null);
  const [predictions, setPredictions]       = useState([]);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState("");
  const [filter, setFilter]                 = useState("All");
  const [expanded, setExpanded]             = useState(null);
  const [sortDesc, setSortDesc]             = useState(true);
  const [user, setUser]                     = useState(null);

  // useEffect(() => {
  //   const stored = getUser();
  //   if (!stored) { navigate("/login"); return; }
  //   setUser(stored);
  //   fetchPredictions();
  // }, [navigate]);
  useEffect(() => {
  setUser(getUser());
  fetchPredictions();
}, []);

  const fetchPredictions = async () => {
    try {
      const data = await getPredictionHistory();
      if (Array.isArray(data)) setPredictions(data);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const mapped = predictions.map(p => {
    const score = Math.round(p.probability * 100);
    const meta  = getRiskMeta(score);
    return {
      id:       p._id,
      date:     formatDate(p.createdAt),
      time:     formatTime(p.createdAt),
      risk:     score,
      label:    meta.label,
      color:    meta.color,
      bg:       meta.bg,
      input:    p.inputData || {},
      result:   p.result,
    };
  });

  const filtered = mapped
    .filter(p => filter === "All" || p.label === filter)
    .filter(p => p.date.toLowerCase().includes(search.toLowerCase()))
    .sort(() => sortDesc ? 0 : -1);

  const counts = {
    total:    mapped.length,
    high:     mapped.filter(p => p.label === "HIGH").length,
    moderate: mapped.filter(p => p.label === "MODERATE").length,
    low:      mapped.filter(p => p.label === "LOW").length,
  };

  const firstName = user?.name?.split(" ")[0] || "User";
  const initials  = user?.name?.charAt(0).toUpperCase() || "U";

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "3px solid #F3F4F6", borderTop: "3px solid #C0182B", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}/>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Loading history…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
      <Sidebar latestRisk={null} riskLabel={null} />

      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #F3F4F6", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.4px" }}>Prediction History</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>{counts.total} total predictions</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C0182B,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14 }}>{initials}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{firstName}</span>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Patient</span>
            </div>
          </div>
        </header>

        <main style={{ padding: "28px 32px", flex: 1 }}>

          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
            {[
              { label: "Total Predictions", value: counts.total,    sub: "All time",         color: "#2563EB", bg: "#EFF6FF" },
              { label: "High Risk",         value: counts.high,     sub: "Needs attention",  color: "#C0182B", bg: "#FFF5F5" },
              { label: "Moderate Risk",     value: counts.moderate, sub: "Monitor closely",  color: "#D97706", bg: "#FFFBEB" },
              { label: "Low Risk",          value: counts.low,      sub: "Keep it up!",      color: "#16A34A", bg: "#F0FDF4" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: `slideUp 0.5s ease ${i * 0.08}s both` }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <ClockIcon size={18} color={s.color}/>
                </div>
                <p style={{ margin: "0 0 3px", fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{s.label}</p>
                <p style={{ margin: "0 0 2px", fontSize: 28, fontWeight: 900, color: "#1F2937", letterSpacing: "-0.8px", lineHeight: 1 }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 11, color: s.color, fontWeight: 600 }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Filter + Search */}
          <div style={{ background: "white", borderRadius: 16, padding: "18px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", animation: "slideUp 0.5s ease 0.32s both" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><SearchIcon size={15}/></span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by date..."
                style={{ width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9, border: "1.5px solid #E5E7EB", borderRadius: 9, fontSize: 13, fontFamily: "Inter, sans-serif", color: "#1F2937", outline: "none", background: "#F9FAFB", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = "#C0182B"}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}/>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <FilterIcon size={15} color="#9CA3AF"/>
              {["All", "LOW", "MODERATE", "HIGH"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  style={{ padding: "7px 14px", borderRadius: 20, border: filter === f ? "none" : "1.5px solid #E5E7EB", background: filter === f ? "#C0182B" : "white", color: filter === f ? "white" : "#6B7280", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.18s" }}>
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => setSortDesc(p => !p)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, border: "1.5px solid #E5E7EB", background: "white", fontSize: 12, color: "#6B7280", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
              {sortDesc ? "Newest First" : "Oldest First"}<ChevronDownIcon/>
            </button>
          </div>

          {/* Table */}
          <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", overflow: "hidden", animation: "slideUp 0.5s ease 0.4s both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 100px 48px", padding: "12px 22px", borderBottom: "1px solid #F3F4F6", background: "#F9FAFB" }}>
              {["Date", "Time", "Risk Score", "Result", ""].map((h, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: "56px 0", textAlign: "center" }}>
                <ClockIcon size={40} color="#E5E7EB"/>
                <p style={{ color: "#9CA3AF", fontSize: 14, margin: "12px 0 16px" }}>
                  {counts.total === 0 ? "No predictions yet" : "No predictions match your filter"}
                </p>
                {counts.total === 0 && (
                  <button onClick={() => navigate("/predict")}
                    style={{ background: "#C0182B", color: "white", border: "none", padding: "9px 20px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                    Run First Prediction →
                  </button>
                )}
              </div>
            ) : (
              filtered.map((p, i) => (
                <div key={p.id}>
                  <div onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 100px 48px", padding: "16px 22px", borderBottom: expanded === p.id ? "none" : "1px solid #F9FAFB", cursor: "pointer", transition: "background 0.15s", background: expanded === p.id ? "#FAFAFA" : "white", alignItems: "center", animation: `slideUp 0.4s ease ${i * 0.05}s both` }}
                    onMouseEnter={e => { if (expanded !== p.id) e.currentTarget.style.background = "#F9FAFB"; }}
                    onMouseLeave={e => { if (expanded !== p.id) e.currentTarget.style.background = "white"; }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{p.date}</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#6B7280" }}>{p.time}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18, fontWeight: 900, color: p.color, letterSpacing: "-0.5px" }}>{p.risk}%</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: p.color, background: p.bg, border: `1px solid ${p.color}30`, borderRadius: 20, padding: "2px 8px" }}>{p.label}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: p.color }}>{p.result}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <span style={{ transform: expanded === p.id ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", display: "flex" }}>
                        <ChevronDownIcon size={16} color="#9CA3AF"/>
                      </span>
                    </div>
                  </div>

                  {/* Expanded */}
                  {expanded === p.id && (
                    <div style={{ padding: "16px 22px 20px", borderBottom: "1px solid #F3F4F6", background: "#FAFAFA", animation: "slideUp 0.2s ease both" }}>
                      <p style={{ margin: "0 0 12px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Input Data</p>
                      {Object.keys(p.input).length === 0 ? (
                        <p style={{ color: "#9CA3AF", fontSize: 13 }}>No input data recorded</p>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 14 }}>
                          {Object.entries(p.input).map(([key, val]) => (
                            <div key={key} style={{ background: "white", borderRadius: 10, padding: "10px 12px", border: "1px solid #F3F4F6" }}>
                              <p style={{ margin: "0 0 3px", fontSize: 10, color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{key}</p>
                              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: "#1F2937" }}>{String(val)}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>Risk Score</span>
                          <span style={{ fontSize: 12, fontWeight: 800, color: p.color }}>{p.risk}%</span>
                        </div>
                        <div style={{ background: "#F3F4F6", borderRadius: 99, height: 8, overflow: "hidden" }}>
                          <div style={{ width: `${p.risk}%`, height: "100%", background: p.color, borderRadius: 99, transition: "width 0.6s ease" }}/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
        input::placeholder { color: #9CA3AF; }
      `}</style>
    </div>
  );
}