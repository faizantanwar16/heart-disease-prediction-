import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// ─── Icons ────────────────────────────────────────────────────────────────────

const HeartbeatIcon = ({ size = 24, color = "#C0182B" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z" fill={color} opacity="0.15" />
    <path d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const BluetoothIcon = ({ size = 24, color = "#2563EB" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
  </svg>
);

const RefreshIcon = ({ size = 16, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const CheckCircleIcon = ({ size = 20, color = "#16A34A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WifiOffIcon = ({ size = 20, color = "#9CA3AF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
    <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const BatteryIcon = ({ size = 16, color = "#16A34A" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" /><line x1="23" y1="13" x2="23" y2="11" />
  </svg>
);

const ZapIcon = ({ size = 18, color = "#D97706" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const FootprintsIcon = ({ size = 18, color = "#7C3AED" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5c0 1.93-.7 3.23-2 4.5C6.81 10.69 6 11.93 6 13.5V16c0 .55.45 1 1 1h5.5c.28 0 .5.22.5.5s-.22.5-.5.5H7a2 2 0 0 1-2-2z" />
    <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9c0 1.93.7 3.23 2 4.5 1.19 1.19 2 2.43 2 4V20c0 .55-.45 1-1 1H11.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5H17a2 2 0 0 0 2-2z" />
  </svg>
);

const MoonIcon = ({ size = 18, color = "#7C3AED" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const WatchIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="7" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─── Device Data ──────────────────────────────────────────────────────────────

const devices = [
  { id: "fitbit",  name: "Fitbit Sense 2",   type: "Smartwatch",   battery: 82, connected: true,  lastSync: "2 mins ago",  color: "#2563EB", bg: "#EFF6FF" },
  { id: "apple",   name: "Apple Watch S9",   type: "Smartwatch",   battery: 64, connected: false, lastSync: "3 hours ago", color: "#6B7280", bg: "#F9FAFB" },
  { id: "garmin",  name: "Garmin Venu 3",    type: "GPS Watch",    battery: 91, connected: false, lastSync: "Yesterday",   color: "#6B7280", bg: "#F9FAFB" },
];

const syncHistory = [
  { time: "10:32 AM", date: "Today",     device: "Fitbit Sense 2", metrics: ["Heart Rate", "SpO2", "Steps"], status: "success" },
  { time: "7:15 AM",  date: "Today",     device: "Fitbit Sense 2", metrics: ["Sleep", "Heart Rate"],         status: "success" },
  { time: "11:00 PM", date: "Yesterday", device: "Fitbit Sense 2", metrics: ["Steps", "Calories"],           status: "success" },
  { time: "6:00 AM",  date: "Yesterday", device: "Apple Watch S9", metrics: ["Heart Rate", "ECG"],           status: "failed" },
];

const liveMetrics = [
  { label: "Heart Rate",  value: "74",   unit: "bpm",   color: "#C0182B", bg: "#FFF5F5",  icon: <HeartbeatIcon size={20} color="#C0182B" />,  trend: "↓ 2 from yesterday" },
  { label: "Steps Today", value: "6,842",unit: "steps", color: "#7C3AED", bg: "#F5F3FF",  icon: <FootprintsIcon size={18} color="#7C3AED" />, trend: "68% of daily goal" },
  { label: "Calories",    value: "1,840",unit: "kcal",  color: "#D97706", bg: "#FFFBEB",  icon: <ZapIcon size={18} color="#D97706" />,       trend: "↑ 120 from yesterday" },
  { label: "Sleep",       value: "6.8",  unit: "hrs",   color: "#2563EB", bg: "#EFF6FF",  icon: <MoonIcon size={18} color="#2563EB" />,      trend: "Below 7hr goal" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WearableSync() {
  // const navigate = useNavigate();

  const [syncing, setSyncing]           = useState(false);
  const [synced, setSynced]             = useState(false);
  const [connectingId, setConnectingId] = useState(null);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setSynced(true); }, 2200);
    setTimeout(() => setSynced(false), 4000);
  };

  const handleConnect = (id) => {
    setConnectingId(id);
    setTimeout(() => setConnectingId(null), 2000);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>

      <Sidebar latestRisk={null} riskLabel={null} />

      {/* ── MAIN ── */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #F3F4F6", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.4px" }}>Wearable Sync</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>1 device connected • Last sync 2 mins ago</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={handleSync}
              disabled={syncing}
              style={{ display: "flex", alignItems: "center", gap: 7, background: synced ? "linear-gradient(135deg,#16A34A,#15803D)" : "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", padding: "9px 18px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: syncing ? "not-allowed" : "pointer", boxShadow: "0 2px 12px rgba(192,24,43,0.28)", transition: "all 0.3s", fontFamily: "Inter, sans-serif", opacity: syncing ? 0.85 : 1 }}
            >
              <span style={{ display: "flex", animation: syncing ? "spin 1s linear infinite" : "none" }}>
                <RefreshIcon size={14} color="white" />
              </span>
              {syncing ? "Syncing..." : synced ? "Synced ✓" : "Sync Now"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C0182B,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14, boxShadow: "0 2px 8px rgba(192,24,43,0.3)" }}>F</div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Faizan</span>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>Patient</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ padding: "28px 32px", flex: 1 }}>

          {/* Live Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
            {liveMetrics.map((m, i) => (
              <div key={i} style={{ background: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: `slideUp 0.5s ease ${i * 0.08}s both`, transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  {m.icon}
                </div>
                <p style={{ margin: "0 0 2px", fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{m.label}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: "#1F2937", letterSpacing: "-0.8px", lineHeight: 1 }}>{m.value}</span>
                  <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>{m.unit}</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: m.color, fontWeight: 600 }}>{m.trend}</p>
              </div>
            ))}
          </div>

          {/* Devices + Sync History */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 22 }}>

            {/* Devices */}
            <div style={{ background: "white", borderRadius: 16, padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: "slideUp 0.5s ease 0.32s both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#1F2937" }}>My Devices</h3>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "3px 10px" }}>1 Active</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {devices.map((d, i) => (
                  <div key={d.id} style={{ padding: "16px", borderRadius: 12, border: d.connected ? "2px solid #2563EB" : "1.5px solid #E5E7EB", background: d.connected ? "#F0F7FF" : "white", transition: "all 0.2s", animation: `slideUp 0.4s ease ${i * 0.08}s both` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 11, background: d.connected ? "#EFF6FF" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <WatchIcon size={20} color={d.connected ? "#2563EB" : "#9CA3AF"} />
                        </div>
                        <div>
                          <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 800, color: "#1F2937" }}>{d.name}</p>
                          <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>{d.type}</p>
                        </div>
                      </div>
                      {d.connected ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 20, padding: "4px 10px" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB", display: "inline-block" }} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB" }}>Connected</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConnect(d.id)}
                          style={{ fontSize: 11, fontWeight: 700, color: connectingId === d.id ? "#9CA3AF" : "#C0182B", background: "white", border: "1.5px solid #E5E7EB", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.18s" }}>
                          {connectingId === d.id ? "Connecting..." : "Connect"}
                        </button>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <BatteryIcon size={14} color={d.battery > 50 ? "#16A34A" : "#D97706"} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: d.battery > 50 ? "#16A34A" : "#D97706" }}>{d.battery}%</span>
                      </div>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>•</span>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>Last sync: {d.lastSync}</span>
                    </div>

                    {d.connected && (
                      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {["Heart Rate", "SpO2", "Steps", "Sleep", "ECG"].map(tag => (
                          <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: "#2563EB", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 20, padding: "2px 8px" }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sync History */}
            <div style={{ background: "white", borderRadius: 16, padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: "slideUp 0.5s ease 0.38s both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#1F2937" }}>Sync History</h3>
                <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{syncHistory.length} syncs</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {syncHistory.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 14px", borderRadius: 11, background: "#F9FAFB", border: "1px solid #F3F4F6", animation: `slideUp 0.4s ease ${i * 0.07}s both` }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: s.status === "success" ? "#F0FDF4" : "#FFF5F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {s.status === "success"
                        ? <CheckCircleIcon size={18} color="#16A34A" />
                        : <WifiOffIcon size={16} color="#C0182B" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{s.device}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>{s.date} · {s.time}</span>
                      </div>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {s.metrics.map(m => (
                          <span key={m} style={{ fontSize: 10, fontWeight: 600, color: s.status === "success" ? "#16A34A" : "#C0182B", background: s.status === "success" ? "#F0FDF4" : "#FFF5F5", borderRadius: 20, padding: "2px 8px", border: `1px solid ${s.status === "success" ? "#BBF7D0" : "#FECDD3"}` }}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bluetooth Scan Banner */}
          <div style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)", borderRadius: 16, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "slideUp 0.5s ease 0.44s both", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.07 }}>
              <BluetoothIcon size={160} color="white" />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ margin: "0 0 3px", fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Looking for new devices?</p>
              <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 900, color: "white", letterSpacing: "-0.3px" }}>Scan for Bluetooth Devices</h3>
              <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Supports Apple Watch, Fitbit, Garmin, Samsung Galaxy Watch & more</p>
            </div>
            <button
              style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: "#2563EB", border: "none", padding: "11px 22px", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s", flexShrink: 0, position: "relative", zIndex: 1 }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <BluetoothIcon size={16} color="#2563EB" />
              Start Scan
            </button>
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}