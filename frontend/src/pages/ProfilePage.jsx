import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile} from "../services/api";
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
const EditIcon     = ({ size = 16, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const ShieldIcon   = ({ size = 18, color = "#16A34A" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const BellIcon     = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>);
const LockIcon     = ({ size = 18, color = "#6B7280" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const CheckIcon    = ({ size = 15, color = "white" })   => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const CameraIcon   = ({ size = 16, color = "white" })   => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>);

// ─── Input Field ──────────────────────────────────────────────────────────────

const InputField = ({ label, value, onChange, type = "text", disabled = false, hint }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${disabled ? "#F3F4F6" : focused ? "#C0182B" : "#E5E7EB"}`, borderRadius: 9, fontSize: 13, fontFamily: "Inter, sans-serif", color: disabled ? "#9CA3AF" : "#1F2937", outline: "none", background: disabled ? "#F9FAFB" : "white", boxSizing: "border-box", transition: "border-color 0.18s", cursor: disabled ? "not-allowed" : "text" }}/>
      {hint && <p style={{ margin: "4px 0 0", fontSize: 11, color: "#9CA3AF" }}>{hint}</p>}
    </div>
  );
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

const Toggle = ({ on, onChange }) => (
  <div onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 99, background: on ? "#C0182B" : "#D1D5DB", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s" }}/>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  // const navigate = useNavigate();

  const [activeTab, setActiveTab]           = useState("personal");
  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState(false);
  const [saved, setSaved]                   = useState(false);
  const [error, setError]                   = useState("");

  const [profile, setProfile] = useState({
    name: "", email: "", age: "", gender: "male",
    phone: "", bloodType: "B+", height: "", weight: "",
    conditions: "", medications: "",
    emergencyName: "", emergencyPhone: "",
  });

  const [notifications, setNotifications] = useState({
    predictions: true, vitalsReminder: true,
    weeklyReport: false, deviceSync: true, highRiskAlert: true,
  });

  const [passwords, setPasswords] = useState({
    current: "", newPass: "", confirm: "",
  });

  const [pwError, setPwError] = useState("");

  // useEffect(() => {
  //   const stored = getUser();
  //   if (!stored) { navigate("/login"); return; }
  //   fetchProfile();
  // }, [navigate]);
  useEffect(() => {
  fetchProfile();
}, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      if (data._id) {
        setProfile(prev => ({
          ...prev,
          name:   data.name   || "",
          email:  data.email  || "",
          age:    data.age    ? String(data.age) : "",
          gender: data.gender || "male",
        }));
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const data = await updateUserProfile({
        name:   profile.name,
        email:  profile.email,
        age:    profile.age    ? Number(profile.age)  : undefined,
        gender: profile.gender || undefined,
      });
      if (data._id) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError(data.message || "Failed to save.");
      }
    } catch {
      setError("Cannot connect to server.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setPwError("");
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPwError("Please fill in all password fields."); return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPwError("New passwords do not match."); return;
    }
    if (passwords.newPass.length < 6) {
      setPwError("Password must be at least 6 characters."); return;
    }
    setSaving(true);
    try {
      const data = await updateUserProfile({ password: passwords.newPass });
      if (data._id) {
        setSaved(true);
        setPasswords({ current: "", newPass: "", confirm: "" });
        setTimeout(() => setSaved(false), 2000);
      } else {
        setPwError(data.message || "Failed to update password.");
      }
    } catch {
      setPwError("Cannot connect to server.");
    } finally {
      setSaving(false);
    }
  };

  const firstName = profile.name?.split(" ")[0] || "User";
  const initials  = profile.name?.charAt(0).toUpperCase() || "U";

  const tabs = [
    { id: "personal",      label: "Personal Info"      },
    { id: "medical",       label: "Medical Info"       },
    { id: "notifications", label: "Notifications"      },
    { id: "security",      label: "Security"           },
  ];

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F9FAFB", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "3px solid #F3F4F6", borderTop: "3px solid #C0182B", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}/>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Loading profile…</p>
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
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.4px" }}>Profile</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Manage your account and preferences</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#C0182B,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14 }}>{initials}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{firstName}</span>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Patient</span>
            </div>
          </div>
        </header>

        <main style={{ padding: "28px 32px", flex: 1 }}>

          {/* Hero */}
          <div style={{ background: "linear-gradient(135deg,#8B0000 0%,#C0182B 60%,#E53E3E 100%)", borderRadius: 16, padding: "26px 28px", marginBottom: 28, display: "flex", alignItems: "center", gap: 22, position: "relative", overflow: "hidden", animation: "slideUp 0.4s ease both" }}>
            <div style={{ position: "absolute", right: -20, top: -20, opacity: 0.07 }}><HeartbeatIcon size={180} color="white"/></div>
            <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "white" }}>{initials}</div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                <CameraIcon size={12} color="#C0182B"/>
              </div>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ margin: "0 0 3px", fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.4px" }}>{profile.name || "—"}</h2>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{profile.email}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  profile.age    ? `Age ${profile.age}` : null,
                  profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : null,
                  profile.bloodType || null,
                ].filter(Boolean).map((tag, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 700, color: "white", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "3px 10px" }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ marginLeft: "auto", position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldIcon size={16} color="rgba(255,255,255,0.8)"/>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Account Verified</span>
            </div>
          </div>

          {/* Tabs + Content */}
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 22 }}>

            {/* Tab list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, animation: "slideUp 0.5s ease 0.1s both" }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: activeTab === tab.id ? "#FFF5F5" : "transparent", color: activeTab === tab.id ? "#C0182B" : "#374151", fontWeight: activeTab === tab.id ? 700 : 500, fontSize: 13, transition: "all 0.18s", fontFamily: "Inter, sans-serif", textAlign: "left", borderLeft: activeTab === tab.id ? "3px solid #C0182B" : "3px solid transparent" }}
                  onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "#F9FAFB"; }}
                  onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "transparent"; }}>
                  {tab.id === "personal"      && <UserIcon size={15} color={activeTab === tab.id ? "#C0182B" : "#9CA3AF"}/>}
                  {tab.id === "medical"       && <HeartbeatIcon size={15} color={activeTab === tab.id ? "#C0182B" : "#9CA3AF"}/>}
                  {tab.id === "notifications" && <BellIcon size={15} color={activeTab === tab.id ? "#C0182B" : "#9CA3AF"}/>}
                  {tab.id === "security"      && <LockIcon size={15} color={activeTab === tab.id ? "#C0182B" : "#9CA3AF"}/>}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ background: "white", borderRadius: 16, padding: "26px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #F3F4F6", animation: "slideUp 0.5s ease 0.15s both" }}>

              {/* ── PERSONAL ── */}
              {activeTab === "personal" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                    <div>
                      <h3 style={{ margin: "0 0 3px", fontSize: 16, fontWeight: 800, color: "#1F2937" }}>Personal Information</h3>
                      <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Update your basic details</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 9, padding: "7px 14px" }}>
                      <EditIcon size={14} color="#6B7280"/><span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280" }}>Editing</span>
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 9, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#C0182B", fontWeight: 500 }}>{error}</div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <InputField label="Full Name"    value={profile.name}  onChange={v => setProfile(p => ({ ...p, name: v }))}/>
                    <InputField label="Email"        value={profile.email} onChange={v => setProfile(p => ({ ...p, email: v }))} type="email"/>
                    <InputField label="Age"          value={profile.age}   onChange={v => setProfile(p => ({ ...p, age: v }))}/>
                    <InputField label="Phone Number" value={profile.phone} onChange={v => setProfile(p => ({ ...p, phone: v }))}/>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Gender</label>
                      <select value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E5E7EB", borderRadius: 9, fontSize: 13, fontFamily: "Inter, sans-serif", color: "#1F2937", outline: "none", background: "white", boxSizing: "border-box" }}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <InputField label="Height (cm)" value={profile.height} onChange={v => setProfile(p => ({ ...p, height: v }))} hint="in centimeters"/>
                  </div>

                  <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 18, marginBottom: 18 }}>
                    <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Emergency Contact</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <InputField label="Contact Name"  value={profile.emergencyName}  onChange={v => setProfile(p => ({ ...p, emergencyName: v }))}/>
                      <InputField label="Contact Phone" value={profile.emergencyPhone} onChange={v => setProfile(p => ({ ...p, emergencyPhone: v }))}/>
                    </div>
                  </div>

                  <button onClick={handleSave} disabled={saving}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", background: saved ? "linear-gradient(135deg,#16A34A,#15803D)" : "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.3s", opacity: saving ? 0.8 : 1 }}>
                    {saved ? <><CheckIcon size={15}/> Saved!</> : saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              )}

              {/* ── MEDICAL ── */}
              {activeTab === "medical" && (
                <div>
                  <div style={{ marginBottom: 22 }}>
                    <h3 style={{ margin: "0 0 3px", fontSize: 16, fontWeight: 800, color: "#1F2937" }}>Medical Information</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Used to improve your prediction accuracy</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Blood Type</label>
                      <select value={profile.bloodType} onChange={e => setProfile(p => ({ ...p, bloodType: e.target.value }))}
                        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #E5E7EB", borderRadius: 9, fontSize: 13, fontFamily: "Inter, sans-serif", color: "#1F2937", outline: "none", background: "white", boxSizing: "border-box" }}>
                        {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <InputField label="Weight (kg)"           value={profile.weight}     onChange={v => setProfile(p => ({ ...p, weight: v }))}/>
                    <InputField label="Existing Conditions"   value={profile.conditions} onChange={v => setProfile(p => ({ ...p, conditions: v }))} hint="e.g. Hypertension, Diabetes"/>
                    <InputField label="Current Medications"   value={profile.medications}onChange={v => setProfile(p => ({ ...p, medications: v }))} hint="e.g. Aspirin 75mg"/>
                  </div>
                  <button onClick={handleSave} disabled={saving}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", background: saved ? "linear-gradient(135deg,#16A34A,#15803D)" : "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.3s" }}>
                    {saved ? <><CheckIcon size={15}/> Saved!</> : saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              )}

              {/* ── NOTIFICATIONS ── */}
              {activeTab === "notifications" && (
                <div>
                  <div style={{ marginBottom: 22 }}>
                    <h3 style={{ margin: "0 0 3px", fontSize: 16, fontWeight: 800, color: "#1F2937" }}>Notification Preferences</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Choose what alerts you receive</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { key: "highRiskAlert",  label: "High Risk Alerts",      sub: "Get notified when risk score exceeds 70%",       icon: <HeartbeatIcon size={18} color="#C0182B"/>, bg: "#FFF5F5" },
                      { key: "predictions",    label: "Prediction Results",    sub: "Receive results after each new prediction",       icon: <ActivityIcon size={18} color="#2563EB"/>,   bg: "#EFF6FF" },
                      { key: "vitalsReminder", label: "Vitals Reminder",       sub: "Daily reminder to log your health measurements",  icon: <DropletIcon size={18} color="#D97706"/>,    bg: "#FFFBEB" },
                      { key: "deviceSync",     label: "Device Sync Updates",   sub: "Alerts when your wearable completes a sync",      icon: <WatchIcon size={18} color="#7C3AED"/>,      bg: "#F5F3FF" },
                      { key: "weeklyReport",   label: "Weekly Health Report",  sub: "Summary of your health trends every Monday",     icon: <ClockIcon size={18} color="#16A34A"/>,      bg: "#F0FDF4" },
                    ].map((item, i) => (
                      <div key={item.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: i < 4 ? "1px solid #F3F4F6" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                          <div>
                            <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#1F2937" }}>{item.label}</p>
                            <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>{item.sub}</p>
                          </div>
                        </div>
                        <Toggle on={notifications[item.key]} onChange={v => setNotifications(p => ({ ...p, [item.key]: v }))}/>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SECURITY ── */}
              {activeTab === "security" && (
                <div>
                  <div style={{ marginBottom: 22 }}>
                    <h3 style={{ margin: "0 0 3px", fontSize: 16, fontWeight: 800, color: "#1F2937" }}>Security Settings</h3>
                    <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Keep your account safe</p>
                  </div>

                  <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Change Password</p>

                  {pwError && (
                    <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 9, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#C0182B", fontWeight: 500 }}>{pwError}</div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
                    <InputField label="Current Password" value={passwords.current} onChange={v => setPasswords(p => ({ ...p, current: v }))} type="password"/>
                    <InputField label="New Password"     value={passwords.newPass} onChange={v => setPasswords(p => ({ ...p, newPass: v }))} type="password" hint="Minimum 6 characters"/>
                    <InputField label="Confirm Password" value={passwords.confirm} onChange={v => setPasswords(p => ({ ...p, confirm: v }))} type="password"/>
                  </div>

                  <button onClick={handlePasswordUpdate} disabled={saving}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", background: saved ? "linear-gradient(135deg,#16A34A,#15803D)" : "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", borderRadius: 10, fontWeight: 800, fontSize: 13, cursor: saving ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.3s", marginBottom: 24 }}>
                    {saved ? <><CheckIcon size={15}/> Updated!</> : saving ? "Updating…" : "Update Password"}
                  </button>

                  <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 20 }}>
                    <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Active Session</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#F9FAFB", borderRadius: 11, border: "1px solid #F3F4F6", marginBottom: 20 }}>
                      <div>
                        <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Chrome on Windows</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>Pune, Maharashtra · Active now</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "4px 12px" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }}/>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A" }}>Current</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: 20 }}>
                    <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, color: "#C0182B", textTransform: "uppercase", letterSpacing: "0.07em" }}>Danger Zone</p>
                    <div style={{ padding: "16px 18px", borderRadius: 12, border: "1.5px solid #FECDD3", background: "#FFF5F5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Delete Account</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>Permanently delete your data. This cannot be undone.</p>
                      </div>
                      <button style={{ padding: "8px 16px", background: "white", border: "1.5px solid #FECDD3", borderRadius: 9, color: "#C0182B", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.18s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#C0182B"; e.currentTarget.style.color = "white"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#C0182B"; }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin    { to { transform: rotate(360deg); } }
        input::placeholder { color: #9CA3AF; }
        select { appearance: none; }
      `}</style>
    </div>
  );
}