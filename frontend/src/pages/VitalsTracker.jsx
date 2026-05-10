import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
// import { useNavigate } from "react-router-dom";
import { logVitals, getVitals, getUser } from "../services/api";
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
const PlusIcon     = ({ size = 16, color = "white" })   => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const CheckIcon    = ({ size = 16, color = "white" })   => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const XIcon        = ({ size = 16, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatFull = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ─── Input Field ──────────────────────────────────────────────────────────────

const InputField = ({ label, placeholder, value, onChange, unit }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ width: "100%", padding: unit ? "10px 48px 10px 14px" : "10px 14px", border: `1.5px solid ${focused ? "#C0182B" : "#E5E7EB"}`, borderRadius: 9, fontSize: 13, fontFamily: "Inter, sans-serif", color: "#1F2937", outline: "none", background: "#F9FAFB", boxSizing: "border-box", transition: "border-color 0.18s" }}
        />
        {unit && <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>{unit}</span>}
      </div>
    </div>
  );
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────

const MiniTooltip = ({ active, payload, label, color }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "white", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "8px 12px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
      <p style={{ margin: "0 0 2px", fontSize: 11, color: "#6B7280", fontWeight: 600 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color }}>{payload[0].value}</p>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function VitalsTracker() {
  // const navigate = useNavigate();

  const [vitals, setVitals]                 = useState([]);
  const [loading, setLoading]               = useState(true);
  const [showForm, setShowForm]             = useState(false);
  const [saving, setSaving]                 = useState(false);
  const [saved, setSaved]                   = useState(false);
  const [activeChart, setActiveChart]       = useState("heartRate");
  const [user, setUser]                     = useState(null);
  const [formError, setFormError]           = useState("");

  const [form, setForm] = useState({
    bloodPressure: "", heartRate: "", cholesterol: "",
    bloodSugar: "", weight: "", notes: "",
  });

  // useEffect(() => {
  //   const stored = getUser();
  //   if (!stored) { navigate("/login"); return; }
  //   setUser(stored);
  //   fetchVitals();
  // }, [navigate]);
  useEffect(() => {
  setUser(getUser());
  fetchVitals();
}, []);

  const fetchVitals = async () => {
    try {
      const data = await getVitals();
      if (Array.isArray(data)) setVitals(data);
    } catch (err) {
      console.error("Vitals fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.heartRate && !form.bloodPressure) {
      setFormError("Please enter at least heart rate or blood pressure.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const payload = {
        bloodPressure: form.bloodPressure || undefined,
        heartRate:     form.heartRate     ? Number(form.heartRate)     : undefined,
        cholesterol:   form.cholesterol   ? Number(form.cholesterol)   : undefined,
        bloodSugar:    form.bloodSugar    ? Number(form.bloodSugar)    : undefined,
        weight:        form.weight        ? Number(form.weight)        : undefined,
        notes:         form.notes         || undefined,
      };
      const data = await logVitals(payload);
      if (data._id) {
        setVitals(prev => [data, ...prev]);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          setShowForm(false);
          setForm({ bloodPressure: "", heartRate: "", cholesterol: "", bloodSugar: "", weight: "", notes: "" });
        }, 1500);
      } else {
        setFormError(data.message || "Failed to save vitals.");
      }
    } catch {
      setFormError("Cannot connect to server.");
    } finally {
      setSaving(false);
    }
  };

  // ── Derived data ────────────────────────────────────────────────────────────

  const latestVitals = vitals[0] || null;

  const chartData = [...vitals].reverse().slice(-7).map(v => ({
    date:         formatDate(v.createdAt),
    heartRate:    v.heartRate    || 0,
    systolic:     v.bloodPressure ? parseInt(v.bloodPressure.split("/")[0]) : 0,
    cholesterol:  v.cholesterol  || 0,
    bloodSugar:   v.bloodSugar   || 0,
  }));

  const vitalCards = [
    { key: "heartRate",   label: "Heart Rate",     value: latestVitals?.heartRate    ? `${latestVitals.heartRate} bpm`       : "N/A", color: "#C0182B", bg: "#FFF5F5",  normal: "60–100 bpm",   status: latestVitals?.heartRate ? (latestVitals.heartRate <= 100 ? "Normal" : "High") : "—", chartColor: "#C0182B" },
    { key: "systolic",    label: "Blood Pressure",  value: latestVitals?.bloodPressure || "N/A",                                color: "#7C3AED", bg: "#F5F3FF",  normal: "< 120/80",     status: "—",     chartColor: "#7C3AED" },
    { key: "cholesterol", label: "Cholesterol",     value: latestVitals?.cholesterol  ? `${latestVitals.cholesterol} mg/dL`  : "N/A", color: "#D97706", bg: "#FFFBEB",  normal: "< 200 mg/dL",  status: latestVitals?.cholesterol ? (latestVitals.cholesterol < 200 ? "Normal" : "High") : "—", chartColor: "#D97706" },
    { key: "bloodSugar",  label: "Blood Sugar",     value: latestVitals?.bloodSugar   ? `${latestVitals.bloodSugar} mg/dL`   : "N/A", color: "#2563EB", bg: "#EFF6FF",  normal: "70–100 mg/dL", status: latestVitals?.bloodSugar  ? (latestVitals.bloodSugar  <= 100 ? "Normal" : "High") : "—", chartColor: "#2563EB" },
  ];

  const activeCard = vitalCards.find(v => v.key === activeChart);
  const firstName  = user?.name?.split(" ")[0] || "User";
  const initials   = user?.name?.charAt(0).toUpperCase() || "U";

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "3px solid #F3F4F6", borderTop: "3px solid #C0182B", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}/>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Loading vitals…</p>
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
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.4px" }}>Vitals Tracker</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>
              {latestVitals ? `Last updated ${formatFull(latestVitals.createdAt)}` : "No vitals logged yet"}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setShowForm(true)}
              style={{ display: "flex", alignItems: "center", gap: 7, background: "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", padding: "9px 18px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 12px rgba(192,24,43,0.28)", transition: "all 0.2s", fontFamily: "Inter, sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(192,24,43,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(192,24,43,0.28)"; }}>
              <PlusIcon size={14}/>Log Vitals
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C0182B,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14 }}>{initials}</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{firstName}</span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>Patient</span>
              </div>
            </div>
          </div>
        </header>

        <main style={{ padding: "28px 32px", flex: 1 }}>

          {/* Vital Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 28 }}>
            {vitalCards.map((v, i) => (
              <div key={v.key} onClick={() => setActiveChart(v.key)}
                style={{ background: "white", borderRadius: 16, padding: "20px 22px", boxShadow: activeChart === v.key ? `0 4px 20px ${v.color}30` : "0 2px 12px rgba(0,0,0,0.06)", border: activeChart === v.key ? `2px solid ${v.color}` : "1px solid #F3F4F6", cursor: "pointer", transition: "all 0.2s", animation: `slideUp 0.5s ease ${i * 0.08}s both` }}
                onMouseEnter={e => { if (activeChart !== v.key) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)"; }}}
                onMouseLeave={e => { if (activeChart !== v.key) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <DropletIcon size={18} color={v.color}/>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: v.color, background: v.bg, border: `1px solid ${v.color}30`, borderRadius: 20, padding: "3px 9px" }}>{v.status}</span>
                </div>
                <p style={{ margin: "0 0 3px", fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{v.label}</p>
                <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#1F2937", letterSpacing: "-0.6px", lineHeight: 1.1 }}>{v.value}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9CA3AF" }}>Normal: {v.normal}</p>
              </div>
            ))}
          </div>

          {/* Chart + Latest panel */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 22, marginBottom: 22 }}>

            {/* Chart */}
            <div style={{ background: "white", borderRadius: 16, padding: "24px 24px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: "slideUp 0.5s ease 0.32s both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h3 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 800, color: "#1F2937" }}>{activeCard?.label} Trend</h3>
                  <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Last {chartData.length} entries</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {vitalCards.map(v => (
                    <button key={v.key} onClick={() => setActiveChart(v.key)}
                      style={{ padding: "5px 10px", borderRadius: 7, border: activeChart === v.key ? "none" : "1.5px solid #E5E7EB", background: activeChart === v.key ? v.color : "white", color: activeChart === v.key ? "white" : "#6B7280", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.18s" }}>
                      {v.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {chartData.length === 0 ? (
                <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                  <DropletIcon size={40} color="#E5E7EB"/>
                  <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>No vitals logged yet</p>
                  <button onClick={() => setShowForm(true)}
                    style={{ background: "#C0182B", color: "white", border: "none", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                    Log First Entry
                  </button>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="vitGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={activeCard?.chartColor} stopOpacity={0.15}/>
                        <stop offset="95%" stopColor={activeCard?.chartColor} stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false}/>
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 600 }} axisLine={false} tickLine={false}/>
                    <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false}/>
                    <Tooltip content={({ active, payload, label }) => <MiniTooltip active={active} payload={payload} label={label} color={activeCard?.chartColor}/>}/>
                    <Area type="monotone" dataKey={activeChart} stroke={activeCard?.chartColor} strokeWidth={2.5} fill="url(#vitGrad)"
                      dot={{ fill: activeCard?.chartColor, r: 4, strokeWidth: 2, stroke: "white" }}
                      activeDot={{ r: 6, fill: activeCard?.chartColor, stroke: "white", strokeWidth: 2 }}/>
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Latest entry panel */}
            <div style={{ background: "white", borderRadius: 16, padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: "slideUp 0.5s ease 0.38s both" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: "#1F2937" }}>
                {latestVitals ? `Latest Entry — ${formatDate(latestVitals.createdAt)}` : "No entries yet"}
              </h3>
              {!latestVitals ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <DropletIcon size={36} color="#E5E7EB"/>
                  <p style={{ color: "#9CA3AF", fontSize: 13, margin: "10px 0 0" }}>Log your first vitals entry</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Heart Rate",     value: latestVitals.heartRate    ? `${latestVitals.heartRate} bpm`      : "N/A", color: "#C0182B", pct: ((latestVitals.heartRate || 0) / 200) * 100 },
                    { label: "Blood Pressure", value: latestVitals.bloodPressure || "N/A",                               color: "#7C3AED", pct: ((parseInt(latestVitals.bloodPressure || "0") || 0) / 200) * 100 },
                    { label: "Cholesterol",    value: latestVitals.cholesterol  ? `${latestVitals.cholesterol} mg/dL` : "N/A", color: "#D97706", pct: ((latestVitals.cholesterol || 0) / 300) * 100 },
                    { label: "Blood Sugar",    value: latestVitals.bloodSugar   ? `${latestVitals.bloodSugar} mg/dL`  : "N/A", color: "#2563EB", pct: ((latestVitals.bloodSugar || 0) / 200) * 100 },
                    { label: "Weight",         value: latestVitals.weight       ? `${latestVitals.weight} kg`         : "N/A", color: "#16A34A", pct: ((latestVitals.weight || 0) / 120) * 100 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>{item.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: item.color }}>{item.value}</span>
                      </div>
                      <div style={{ background: "#F3F4F6", borderRadius: 99, height: 6, overflow: "hidden" }}>
                        <div style={{ width: `${Math.min(item.pct, 100)}%`, height: "100%", background: item.color, borderRadius: 99, transition: "width 0.8s ease" }}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* History Table */}
          <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", overflow: "hidden", animation: "slideUp 0.5s ease 0.44s both" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#1F2937" }}>Vitals History</h3>
              <span style={{ fontSize: 12, color: "#9CA3AF" }}>{vitals.length} entries</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", padding: "11px 22px", borderBottom: "1px solid #F3F4F6", background: "#F9FAFB" }}>
              {["Date", "Heart Rate", "Blood Pressure", "Cholesterol", "Blood Sugar", "Weight"].map((h, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</span>
              ))}
            </div>
            {vitals.length === 0 ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: 14 }}>No vitals logged yet</p>
              </div>
            ) : (
              vitals.map((v, i) => (
                <div key={v._id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", padding: "14px 22px", borderBottom: i < vitals.length - 1 ? "1px solid #F9FAFB" : "none", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                  onMouseLeave={e => e.currentTarget.style.background = "white"}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{formatDate(v.createdAt)}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{v.heartRate    ? `${v.heartRate} bpm`     : "—"}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{v.bloodPressure ? `${v.bloodPressure} mmHg` : "—"}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{v.cholesterol  ? `${v.cholesterol} mg/dL` : "—"}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{v.bloodSugar   ? `${v.bloodSugar} mg/dL`  : "—"}</span>
                  <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{v.weight       ? `${v.weight} kg`         : "—"}</span>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* ── LOG MODAL ── */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease both" }}>
          <div style={{ background: "white", borderRadius: 20, padding: "28px", width: 480, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", animation: "slideUp 0.25s ease both" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <div>
                <h2 style={{ margin: "0 0 3px", fontSize: 18, fontWeight: 900, color: "#1F2937" }}>Log Vitals</h2>
                <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Record today's health measurements</p>
              </div>
              <button onClick={() => { setShowForm(false); setFormError(""); }}
                style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <XIcon size={15}/>
              </button>
            </div>

            {formError && (
              <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#C0182B", fontWeight: 500 }}>
                {formError}
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <InputField label="Blood Pressure" placeholder="120/80"  value={form.bloodPressure} onChange={v => setForm(p => ({ ...p, bloodPressure: v }))}/>
              <InputField label="Heart Rate"     placeholder="72"      value={form.heartRate}     onChange={v => setForm(p => ({ ...p, heartRate: v }))}     unit="bpm"/>
              <InputField label="Cholesterol"    placeholder="200"     value={form.cholesterol}   onChange={v => setForm(p => ({ ...p, cholesterol: v }))}   unit="mg/dL"/>
              <InputField label="Blood Sugar"    placeholder="95"      value={form.bloodSugar}    onChange={v => setForm(p => ({ ...p, bloodSugar: v }))}    unit="mg/dL"/>
              <InputField label="Weight"         placeholder="75"      value={form.weight}        onChange={v => setForm(p => ({ ...p, weight: v }))}        unit="kg"/>
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Notes (optional)</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="Any symptoms or observations..." rows={2}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E5E7EB", borderRadius: 9, fontSize: 13, fontFamily: "Inter, sans-serif", color: "#1F2937", outline: "none", background: "#F9FAFB", resize: "none", boxSizing: "border-box" }}
                onFocus={e => e.target.style.borderColor = "#C0182B"}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"}/>
            </div>

            <button onClick={handleSave} disabled={saving}
              style={{ width: "100%", padding: "13px", background: saved ? "linear-gradient(135deg,#16A34A,#15803D)" : "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: saving ? 0.8 : 1 }}>
              {saved   ? <><CheckIcon size={16}/> Saved!</> :
               saving  ? "Saving…" : "Save Vitals"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes spin    { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #9CA3AF; }
      `}</style>
    </div>
  );
}