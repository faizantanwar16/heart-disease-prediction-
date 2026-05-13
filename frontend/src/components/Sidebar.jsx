import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../services/api";

const HeartbeatIcon = ({ size = 24, color = "#C0182B" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z" fill={color} opacity="0.15"/>
    <path d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const GridIcon     = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>);
const ActivityIcon = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>);
const ClockIcon    = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const DropletIcon  = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>);
const UserIcon     = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const WatchIcon    = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="7"/><polyline points="12 6 12 12 16 14"/></svg>);
const LogOutIcon   = ({ size = 18, color = "#9CA3AF" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>);
const ChevronRightIcon = ({ size = 14, color = "#9CA3AF" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>);

const navItems = [
  { id: "dashboard", label: "Dashboard",      path: "/dashboard" },
  { id: "predict",   label: "New Prediction", path: "/predict"   },
  { id: "history",   label: "History",        path: "/history"   },
  // { id: "vitals",    label: "Vitals Tracker", path: "/vitals"    },
  { id: "wearable",  label: "Wearable Sync",  path: "/wearable"  },
  { id: "profile",   label: "Profile",        path: "/profile"   },
];

const NavIcon = ({ id, size, color }) => {
  if (id === "dashboard") return <GridIcon size={size} color={color}/>;
  if (id === "predict")   return <ActivityIcon size={size} color={color}/>;
  if (id === "history")   return <ClockIcon size={size} color={color}/>;
  // if (id === "vitals")    return <DropletIcon size={size} color={color}/>;
  if (id === "wearable")  return <WatchIcon size={size} color={color}/>;
  if (id === "profile")   return <UserIcon size={size} color={color}/>;
};

export default function Sidebar({ latestRisk = null, riskLabel = null }) {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const activeId   = navItems.find(n => n.path === location.pathname)?.id || "dashboard";
  const riskColor  = riskLabel === "HIGH RISK" ? "#C0182B" : riskLabel === "MODERATE RISK" ? "#D97706" : "#16A34A";
  const riskBg     = riskLabel === "HIGH RISK" ? "#FFF5F5" : riskLabel === "MODERATE RISK" ? "#FFFBEB" : "#F0FDF4";
  const riskBorder = riskLabel === "HIGH RISK" ? "#FECDD3" : riskLabel === "MODERATE RISK" ? "#FDE68A" : "#BBF7D0";

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside style={{ width: 240, minHeight: "100vh", background: "white", borderRight: "1px solid #F3F4F6", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, boxShadow: "2px 0 12px rgba(0,0,0,0.04)", fontFamily: "Inter, sans-serif" }}>

      {/* Logo */}
      <div style={{ padding: "22px 20px 20px", borderBottom: "1px solid #F3F4F6" }}>
        <Link to="/dashboard" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <HeartbeatIcon size={32} color="#C0182B"/>
          <span style={{ fontWeight: 900, fontSize: 18, color: "#1F2937", letterSpacing: "-0.4px" }}>
            Heart<span style={{ color: "#C0182B" }}>Guard</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <p style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", margin: "0 0 8px" }}>Main Menu</p>
        {navItems.map(item => {
          const isActive  = activeId === item.id;
          const isHovered = hovered === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                background: isActive ? "#C0182B" : isHovered ? "#FFF5F5" : "transparent",
                color: isActive ? "white" : isHovered ? "#C0182B" : "#374151",
                fontWeight: isActive ? 700 : 500, fontSize: 14,
                transition: "all 0.18s", fontFamily: "Inter, sans-serif",
                width: "100%", textDecoration: "none",
              }}>
              <NavIcon id={item.id} size={18} color={isActive ? "white" : isHovered ? "#C0182B" : "#6B7280"}/>
              {item.label}
              {isActive && <span style={{ marginLeft: "auto" }}><ChevronRightIcon color="rgba(255,255,255,0.6)"/></span>}
            </Link>
          );
        })}
      </nav>

      {/* Risk pill */}
      <div style={{ padding: "0 12px 16px" }}>
        <div style={{ background: latestRisk !== null ? riskBg : "#F9FAFB", borderRadius: 12, padding: 14, border: `1px solid ${latestRisk !== null ? riskBorder : "#F3F4F6"}` }}>
          <p style={{ margin: "0 0 2px", fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Latest Risk</p>
          {latestRisk !== null
            ? <><p style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 900, color: riskColor, letterSpacing: "-0.5px" }}>{latestRisk}%</p><p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: riskColor }}>{riskLabel}</p></>
            : <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>No predictions yet</p>
          }
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: "12px", borderTop: "1px solid #F3F4F6" }}>
        <button onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", background: "transparent", color: "#9CA3AF", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.18s", fontFamily: "Inter, sans-serif" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#FFF5F5"; e.currentTarget.style.color = "#C0182B"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9CA3AF"; }}>
          <LogOutIcon size={18} color="currentColor"/>
          Sign Out
        </button>
      </div>
    </aside>
  );
}