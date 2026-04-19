import { useState } from "react";

// ─── Icons ─────────────────────────────────────────────────────────────────────

const HeartbeatIcon = ({ size = 24, color = "#C0182B" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z" fill={color} opacity="0.15" />
    <path d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const GridIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ActivityIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ClockIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const DropletIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const UserIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = ({ size = 20, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ChevronRightIcon = ({ size = 14, color = "#9CA3AF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const LogOutIcon = ({ size = 18, color = "#9CA3AF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const InfoIcon = ({ size = 14, color = "#9CA3AF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// ─── Sidebar nav ───────────────────────────────────────────────────────────────

const navItems = [
  { id: "dashboard", label: "Dashboard",      icon: (c) => <GridIcon     color={c} /> },
  { id: "predict",   label: "New Prediction", icon: (c) => <ActivityIcon color={c} /> },
  { id: "history",   label: "History",        icon: (c) => <ClockIcon    color={c} /> },
  { id: "vitals",    label: "Vitals Tracker", icon: (c) => <DropletIcon  color={c} /> },
  { id: "profile",   label: "Profile",        icon: (c) => <UserIcon     color={c} /> },
];

// ─── Risk Gauge SVG ────────────────────────────────────────────────────────────

const RiskGauge = ({ score }) => {
  // Semicircle: 0% = left end, 100% = right end
  // Arc spans 180° (from 180° to 0° in SVG terms)
  const R = 90;
  const cx = 110, cy = 105;

  // Needle angle: 180° at score=0, 0° at score=100
  const angleDeg = 180 - (score / 100) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const needleLen = 72;
  const nx = cx + needleLen * Math.cos(angleRad);
  const ny = cy - needleLen * Math.sin(angleRad);

  const isHigh = score >= 70;
  const isMod  = score >= 40 && score < 70;
  const riskColor = isHigh ? "#C0182B" : isMod ? "#D97706" : "#16A34A";
  const riskLabel = isHigh ? "HIGH RISK" : isMod ? "MODERATE RISK" : "LOW RISK";
  const riskBg    = isHigh ? "#FFF5F5" : isMod ? "#FFFBEB" : "#F0FDF4";

  // Arc path helper
  const arcPath = (startAngle, endAngle, r, color) => {
    const s = (startAngle * Math.PI) / 180;
    const e = (endAngle   * Math.PI) / 180;
    const x1 = cx + r * Math.cos(Math.PI - s);
    const y1 = cy - r * Math.sin(Math.PI - s);
    const x2 = cx + r * Math.cos(Math.PI - e);
    const y2 = cy - r * Math.sin(Math.PI - e);
    return (
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="round"
      />
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="220" height="130" viewBox="0 0 220 130">
        {/* Track */}
        <path
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none" stroke="#F3F4F6" strokeWidth="16" strokeLinecap="round"
        />
        {/* Green zone 0–40 */}
        {arcPath(0, 72, R, "#DCFCE7")}
        {/* Amber zone 40–70 */}
        {arcPath(72, 126, R, "#FEF9C3")}
        {/* Red zone 70–100 */}
        {arcPath(126, 180, R, "#FEE2E2")}

        {/* Colored fill arc up to score */}
        {score > 0 && arcPath(0, (score / 100) * 180, R, riskColor)}

        {/* Zone labels */}
        <text x="20"  y={cy + 22} fontSize="9" fill="#16A34A" fontWeight="700" fontFamily="Inter">LOW</text>
        <text x="96"  y="28"      fontSize="9" fill="#D97706" fontWeight="700" fontFamily="Inter" textAnchor="middle">MOD</text>
        <text x="188" y={cy + 22} fontSize="9" fill="#C0182B" fontWeight="700" fontFamily="Inter" textAnchor="end">HIGH</text>

        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={nx}  y2={ny}
          stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round"
        />
        {/* Needle pivot */}
        <circle cx={cx} cy={cy} r="6" fill="#1F2937" />
        <circle cx={cx} cy={cy} r="3" fill="white" />
      </svg>

      {/* Score number */}
      <div style={{ textAlign: "center", marginTop: -8 }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: riskColor, letterSpacing: "-2px", lineHeight: 1 }}>
          {score}<span style={{ fontSize: 24, fontWeight: 700, color: riskColor + "99" }}>%</span>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: riskBg,
            border: `1.5px solid ${riskColor}40`,
            borderRadius: 20,
            padding: "5px 14px",
            marginTop: 8,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: riskColor, display: "inline-block", boxShadow: `0 0 6px ${riskColor}` }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: riskColor, letterSpacing: "0.06em" }}>{riskLabel}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Field components ──────────────────────────────────────────────────────────

const inputBase = (focused) => ({
  width: "100%",
  padding: "10px 13px",
  border: `1.5px solid ${focused ? "#C0182B" : "#E5E7EB"}`,
  borderRadius: 9,
  fontSize: 14,
  color: "#1F2937",
  outline: "none",
  background: focused ? "#FFFBFB" : "#F9FAFB",
  transition: "all 0.18s",
  boxShadow: focused ? "0 0 0 3px rgba(192,24,43,0.07)" : "none",
  fontFamily: "Inter, sans-serif",
  boxSizing: "border-box",
});

const labelStyle = {
  fontSize: 12,
  fontWeight: 700,
  color: "#374151",
  display: "block",
  marginBottom: 5,
  letterSpacing: "0.01em",
};

const descStyle = {
  fontSize: 11,
  color: "#9CA3AF",
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  gap: 4,
};

// Binary Yes/No toggle
const BinaryToggle = ({ value, onChange, yesLabel = "Yes", noLabel = "No" }) => (
  <div style={{ display: "flex", gap: 8 }}>
    {[{ val: "1", label: yesLabel }, { val: "0", label: noLabel }].map(({ val, label }) => {
      const active = value === val;
      return (
        <button
          key={val}
          type="button"
          onClick={() => onChange(val)}
          style={{
            flex: 1,
            padding: "9px 0",
            borderRadius: 9,
            border: `1.5px solid ${active ? "#C0182B" : "#E5E7EB"}`,
            background: active ? "#FFF5F5" : "white",
            color: active ? "#C0182B" : "#6B7280",
            fontWeight: active ? 700 : 500,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.18s",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {label}
        </button>
      );
    })}
  </div>
);

// Select dropdown
const SelectField = ({ value, onChange, options, placeholder, focused, onFocus, onBlur }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onFocus={onFocus}
    onBlur={onBlur}
    style={{ ...inputBase(focused), appearance: "none", cursor: "pointer" }}
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
    ))}
  </select>
);

// Number input
const NumberInput = ({ value, onChange, min, max, step = 1, placeholder, focused, onFocus, onBlur, unit }) => (
  <div style={{ position: "relative" }}>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      min={min} max={max} step={step}
      placeholder={placeholder}
      style={{ ...inputBase(focused), paddingRight: unit ? 48 : 13 }}
    />
    {unit && (
      <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>
        {unit}
      </span>
    )}
  </div>
);

// Section header
const SectionHeader = ({ number, title, subtitle, icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #FFF5F5, #FFE4E6)", border: "1.5px solid #FECDD3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: 14, fontWeight: 900, color: "#C0182B" }}>{number}</span>
    </div>
    <div>
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.2px" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>{subtitle}</p>
    </div>
  </div>
);

const FieldWrapper = ({ label, desc, children }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    {children}
    {desc && (
      <p style={descStyle}>
        <InfoIcon />{desc}
      </p>
    )}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const initialForm = {
  height: "", weight: "",                          // for BMI
  smoking: "", alcoholDrinking: "", stroke: "",
  physicalHealth: "", mentalHealth: "", diffWalking: "",
  sex: "", ageCategory: "", race: "", diabetic: "",
  physicalActivity: "", genHealth: "", sleepTime: "",
  asthma: "", kidneyDisease: "", skinCancer: "",
};

export default function PredictionForm() {
  const [form, setForm]         = useState(initialForm);
  const [focused, setFocused]   = useState("");
  const [activePage, setActivePage] = useState("predict");
  const [sidebarHov, setSidebarHov] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null); // null = not yet predicted

  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));
  const setE = (field) => (e)   => setForm((f) => ({ ...f, [field]: e.target.value }));
  const foc  = (field) => () => setFocused(field);
  const blur = ()      => setFocused("");

  // BMI auto-calc
  const bmi = form.height && form.weight
    ? (parseFloat(form.weight) / Math.pow(parseFloat(form.height) / 100, 2)).toFixed(1)
    : null;

  // Count filled fields (BMI counts as 1 if height+weight set)
  const filledCount = [
    bmi ? "bmi" : null,
    form.smoking, form.alcoholDrinking, form.stroke,
    form.physicalHealth, form.mentalHealth, form.diffWalking,
    form.sex, form.ageCategory, form.race, form.diabetic,
    form.physicalActivity, form.genHealth, form.sleepTime,
    form.asthma, form.kidneyDisease, form.skinCancer,
  ].filter(Boolean).length;

  const total = 17;
  const pct   = Math.round((filledCount / total) * 100);

  const handlePredict = () => {
    if (filledCount < total) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      // Mock ML score — weighted pseudo-random based on risk factors
      let score = 20;
      if (form.smoking === "1")          score += 12;
      if (form.alcoholDrinking === "1")  score += 6;
      if (form.stroke === "1")           score += 18;
      if (parseInt(form.physicalHealth) > 15) score += 8;
      if (parseInt(form.mentalHealth)   > 15) score += 5;
      if (form.diffWalking === "1")      score += 7;
      if (form.diabetic === "Yes")       score += 10;
      if (form.diabetic === "Borderline diabetes") score += 6;
      if (form.physicalActivity === "0") score += 5;
      if (form.genHealth === "Poor")     score += 10;
      if (form.genHealth === "Fair")     score += 6;
      if (form.asthma === "1")           score += 4;
      if (form.kidneyDisease === "1")    score += 8;
      if (bmi && parseFloat(bmi) > 30)   score += 7;
      if (parseInt(form.sleepTime) < 6)  score += 4;
      score = Math.min(95, Math.max(8, score));
      setResult(score);
      setLoading(false);
    }, 1800);
  };

  const handleReset = () => { setForm(initialForm); setResult(null); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 240, minHeight: "100vh", background: "white", borderRight: "1px solid #F3F4F6", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, boxShadow: "2px 0 12px rgba(0,0,0,0.04)" }}>
        <div style={{ padding: "22px 20px 20px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <HeartbeatIcon size={30} color="#C0182B" />
            <span style={{ fontWeight: 900, fontSize: 17, color: "#1F2937", letterSpacing: "-0.4px" }}>
              Heart<span style={{ color: "#C0182B" }}>Guard</span>
            </span>
          </div>
        </div>
        <nav style={{ padding: "16px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", margin: "0 0 8px" }}>Main Menu</p>
          {navItems.map((item) => {
            const active = activePage === item.id;
            const hov    = sidebarHov === item.id;
            const ic     = active ? "white" : hov ? "#C0182B" : "#6B7280";
            return (
              <button key={item.id} onClick={() => setActivePage(item.id)} onMouseEnter={() => setSidebarHov(item.id)} onMouseLeave={() => setSidebarHov(null)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? "#C0182B" : hov ? "#FFF5F5" : "transparent", color: active ? "white" : hov ? "#C0182B" : "#374151", fontWeight: active ? 700 : 500, fontSize: 14, transition: "all 0.18s", fontFamily: "Inter, sans-serif", width: "100%", textAlign: "left" }}>
                {item.icon(ic)}
                {item.label}
                {active && <span style={{ marginLeft: "auto" }}><ChevronRightIcon color="rgba(255,255,255,0.6)" /></span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "12px", borderTop: "1px solid #F3F4F6" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", background: "transparent", color: "#9CA3AF", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.18s", fontFamily: "Inter, sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#FFF5F5"; e.currentTarget.style.color = "#C0182B"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9CA3AF"; }}>
            <LogOutIcon size={17} color="currentColor" />Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #F3F4F6", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: "#1F2937", letterSpacing: "-0.3px" }}>New Prediction</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>Fill all 17 features to get your AI risk score</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 120, height: 6, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16A34A" : "linear-gradient(90deg,#C0182B,#E53E3E)", borderRadius: 99, transition: "width 0.3s" }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? "#16A34A" : "#C0182B" }}>{filledCount}/{total}</span>
            </div>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <BellIcon size={20} color="#6B7280" />
              <span style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: "#C0182B", borderRadius: "50%", border: "1.5px solid white" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#C0182B,#8B0000)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 13 }}>F</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Faizan</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "24px 28px", flex: 1, display: "flex", gap: 24, alignItems: "flex-start" }}>

          {/* ── LEFT: FORM ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>

            {/* ── SECTION 1: Body Metrics ── */}
            <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
              <SectionHeader number="1" title="Body Metrics" subtitle="Height, weight and physical vitals" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* Height */}
                <FieldWrapper label="Height" desc="Used to auto-calculate BMI">
                  <NumberInput value={form.height} onChange={set("height")} min={100} max={250} placeholder="170" unit="cm"
                    focused={focused === "height"} onFocus={foc("height")} onBlur={blur} />
                </FieldWrapper>

                {/* Weight */}
                <FieldWrapper label="Weight" desc="Used to auto-calculate BMI">
                  <NumberInput value={form.weight} onChange={set("weight")} min={30} max={300} placeholder="70" unit="kg"
                    focused={focused === "weight"} onFocus={foc("weight")} onBlur={blur} />
                </FieldWrapper>

                {/* BMI (auto-calc, full width) */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>
                    BMI <span style={{ fontSize: 10, fontWeight: 600, color: "#16A34A", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "1px 8px", marginLeft: 6 }}>Feature #1 — Auto-calculated</span>
                  </label>
                  <div style={{ padding: "11px 14px", borderRadius: 9, border: "1.5px solid #E5E7EB", background: bmi ? "#F0FDF4" : "#F9FAFB", display: "flex", alignItems: "center", gap: 10 }}>
                    {bmi ? (
                      <>
                        <span style={{ fontSize: 22, fontWeight: 900, color: "#16A34A", letterSpacing: "-0.5px" }}>{bmi}</span>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>
                          kg/m² —{" "}
                          <span style={{ fontWeight: 600, color: parseFloat(bmi) >= 30 ? "#C0182B" : parseFloat(bmi) >= 25 ? "#D97706" : "#16A34A" }}>
                            {parseFloat(bmi) >= 30 ? "Obese" : parseFloat(bmi) >= 25 ? "Overweight" : parseFloat(bmi) >= 18.5 ? "Normal" : "Underweight"}
                          </span>
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: 13, color: "#9CA3AF" }}>Enter height & weight above to calculate</span>
                    )}
                  </div>
                </div>

                {/* Sleep Time */}
                <FieldWrapper label="#14 — Sleep Time" desc="Average hours of sleep per day (1–24)">
                  <NumberInput value={form.sleepTime} onChange={set("sleepTime")} min={1} max={24} placeholder="7" unit="hrs"
                    focused={focused === "sleepTime"} onFocus={foc("sleepTime")} onBlur={blur} />
                </FieldWrapper>

                {/* Physical Health */}
                <FieldWrapper label="#5 — Physical Health" desc="Days of poor physical health in last 30 days">
                  <NumberInput value={form.physicalHealth} onChange={set("physicalHealth")} min={0} max={30} placeholder="0" unit="days"
                    focused={focused === "physicalHealth"} onFocus={foc("physicalHealth")} onBlur={blur} />
                </FieldWrapper>

                {/* Mental Health */}
                <FieldWrapper label="#6 — Mental Health" desc="Days of poor mental health in last 30 days">
                  <NumberInput value={form.mentalHealth} onChange={set("mentalHealth")} min={0} max={30} placeholder="0" unit="days"
                    focused={focused === "mentalHealth"} onFocus={foc("mentalHealth")} onBlur={blur} />
                </FieldWrapper>
              </div>
            </div>

            {/* ── SECTION 2: Lifestyle & Conditions ── */}
            <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
              <SectionHeader number="2" title="Lifestyle & Conditions" subtitle="Habits and diagnosed medical conditions" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* Smoking */}
                <FieldWrapper label="#2 — Smoking" desc="Smoked 100+ cigarettes in lifetime?">
                  <BinaryToggle value={form.smoking} onChange={set("smoking")} />
                </FieldWrapper>

                {/* Alcohol Drinking */}
                <FieldWrapper label="#3 — Alcohol Drinking" desc="Heavy alcohol consumption?">
                  <BinaryToggle value={form.alcoholDrinking} onChange={set("alcoholDrinking")} />
                </FieldWrapper>

                {/* Stroke */}
                <FieldWrapper label="#4 — Stroke" desc="Have you ever had a stroke?">
                  <BinaryToggle value={form.stroke} onChange={set("stroke")} />
                </FieldWrapper>

                {/* Diff Walking */}
                <FieldWrapper label="#7 — Difficulty Walking" desc="Serious difficulty walking or climbing stairs?">
                  <BinaryToggle value={form.diffWalking} onChange={set("diffWalking")} />
                </FieldWrapper>

                {/* Physical Activity */}
                <FieldWrapper label="#12 — Physical Activity" desc="Physical activity outside work in last 30 days?">
                  <BinaryToggle value={form.physicalActivity} onChange={set("physicalActivity")} yesLabel="Active" noLabel="Inactive" />
                </FieldWrapper>

                {/* Asthma */}
                <FieldWrapper label="#15 — Asthma" desc="Ever told you have asthma?">
                  <BinaryToggle value={form.asthma} onChange={set("asthma")} />
                </FieldWrapper>

                {/* Kidney Disease */}
                <FieldWrapper label="#16 — Kidney Disease" desc="Ever told you have kidney disease?">
                  <BinaryToggle value={form.kidneyDisease} onChange={set("kidneyDisease")} />
                </FieldWrapper>

                {/* Skin Cancer */}
                <FieldWrapper label="#17 — Skin Cancer" desc="Ever told you have skin cancer?">
                  <BinaryToggle value={form.skinCancer} onChange={set("skinCancer")} />
                </FieldWrapper>

                {/* Diabetic */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <FieldWrapper label="#11 — Diabetic Status" desc="Diabetic status (4 categories)">
                    <SelectField
                      value={form.diabetic} onChange={set("diabetic")}
                      placeholder="Select diabetic status…"
                      options={["Yes", "No", "Borderline diabetes", "Yes (during pregnancy)"]}
                      focused={focused === "diabetic"} onFocus={foc("diabetic")} onBlur={blur}
                    />
                  </FieldWrapper>
                </div>
              </div>
            </div>

            {/* ── SECTION 3: Demographics ── */}
            <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
              <SectionHeader number="3" title="Demographics & Health Rating" subtitle="Personal information and self-reported health" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* Sex */}
                <FieldWrapper label="#8 — Sex" desc="Biological sex">
                  <BinaryToggle value={form.sex} onChange={set("sex")} yesLabel="Male" noLabel="Female" />
                </FieldWrapper>

                {/* Age Category */}
                <FieldWrapper label="#9 — Age Category" desc="Age group in 5-year bands">
                  <SelectField
                    value={form.ageCategory} onChange={set("ageCategory")}
                    placeholder="Select age group…"
                    options={["18-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80 or older"]}
                    focused={focused === "ageCategory"} onFocus={foc("ageCategory")} onBlur={blur}
                  />
                </FieldWrapper>

                {/* Race */}
                <FieldWrapper label="#10 — Race" desc="Racial/ethnic background">
                  <SelectField
                    value={form.race} onChange={set("race")}
                    placeholder="Select race…"
                    options={["White","Black","Asian","American Indian/Alaskan Native","Hispanic","Other"]}
                    focused={focused === "race"} onFocus={foc("race")} onBlur={blur}
                  />
                </FieldWrapper>

                {/* Gen Health */}
                <FieldWrapper label="#13 — General Health" desc="Self-rated general health">
                  <SelectField
                    value={form.genHealth} onChange={set("genHealth")}
                    placeholder="Rate your health…"
                    options={["Excellent","Very good","Good","Fair","Poor"]}
                    focused={focused === "genHealth"} onFocus={foc("genHealth")} onBlur={blur}
                  />
                </FieldWrapper>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handlePredict}
              disabled={filledCount < total || loading}
              style={{
                width: "100%",
                padding: "15px",
                background: filledCount === total && !loading
                  ? "linear-gradient(135deg, #C0182B 0%, #8B0000 100%)"
                  : "#E5E7EB",
                color: filledCount === total && !loading ? "white" : "#9CA3AF",
                border: "none",
                borderRadius: 12,
                fontWeight: 800,
                fontSize: 16,
                cursor: filledCount === total && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                boxShadow: filledCount === total && !loading ? "0 4px 20px rgba(192,24,43,0.3)" : "none",
                transition: "all 0.25s",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => { if (filledCount === total && !loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,24,43,0.4)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = filledCount === total && !loading ? "0 4px 20px rgba(192,24,43,0.3)" : "none"; }}
            >
              {loading ? <><SpinnerIcon /> Analyzing your data…</> : filledCount < total ? `Complete ${total - filledCount} more field${total - filledCount > 1 ? "s" : ""} to predict` : "🔬 Predict My Heart Disease Risk"}
            </button>

            {result !== null && (
              <button onClick={handleReset} style={{ width: "100%", padding: "11px", background: "transparent", border: "1.5px solid #E5E7EB", borderRadius: 12, fontWeight: 600, fontSize: 14, color: "#6B7280", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C0182B"; e.currentTarget.style.color = "#C0182B"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#6B7280"; }}>
                ↺ Reset & Start New Prediction
              </button>
            )}
          </div>

          {/* ── RIGHT: GAUGE + SUMMARY ── */}
          <div style={{ width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 18, position: "sticky", top: 88 }}>

            {/* Gauge card */}
            <div style={{ background: "white", borderRadius: 16, padding: "24px 20px 20px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #F3F4F6", textAlign: "center" }}>
              <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Risk Score Gauge</p>

              {result !== null ? (
                <div style={{ animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
                  <RiskGauge score={result} />
                </div>
              ) : loading ? (
                <div style={{ padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid #FEE2E2", borderTop: "3px solid #C0182B", animation: "spin 0.8s linear infinite" }} />
                  <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>Running ML model…</p>
                </div>
              ) : (
                <div style={{ padding: "32px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FFF5F5", border: "2px dashed #FECDD3", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <HeartbeatIcon size={30} color="#C0182B" />
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF", lineHeight: 1.6 }}>
                    Complete all {total} fields and click <strong style={{ color: "#C0182B" }}>Predict</strong> to see your risk score here.
                  </p>
                </div>
              )}
            </div>

            {/* Progress card */}
            <div style={{ background: "white", borderRadius: 16, padding: "18px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1F2937" }}>Form Progress</p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: pct === 100 ? "#16A34A" : "#C0182B" }}>{pct}%</p>
              </div>
              <div style={{ width: "100%", height: 8, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", marginBottom: 10 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16A34A" : "linear-gradient(90deg,#C0182B,#E53E3E)", borderRadius: 99, transition: "width 0.35s ease" }} />
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>
                {filledCount} of {total} features entered
                {pct === 100 && " ✓ Ready to predict!"}
              </p>
            </div>

            {/* Feature summary card */}
            {result !== null && (
              <div style={{ background: "white", borderRadius: 16, padding: "18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6", animation: "slideUp 0.4s ease" }}>
                <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 800, color: "#1F2937" }}>Key Risk Factors</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "BMI",              value: bmi ? `${bmi} kg/m²` : "—",       risk: bmi && parseFloat(bmi) >= 30 },
                    { label: "Smoking",           value: form.smoking === "1" ? "Yes" : "No",     risk: form.smoking === "1" },
                    { label: "Stroke History",    value: form.stroke  === "1" ? "Yes" : "No",     risk: form.stroke  === "1" },
                    { label: "Diabetic",          value: form.diabetic || "—",              risk: form.diabetic === "Yes" || form.diabetic === "Borderline diabetes" },
                    { label: "General Health",    value: form.genHealth || "—",             risk: form.genHealth === "Poor" || form.genHealth === "Fair" },
                    { label: "Physical Activity", value: form.physicalActivity === "1" ? "Active" : "Inactive", risk: form.physicalActivity === "0" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", borderRadius: 8, background: item.risk ? "#FFF5F5" : "#F9FAFB", border: `1px solid ${item.risk ? "#FECDD3" : "#F3F4F6"}` }}>
                      <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: item.risk ? "#C0182B" : "#16A34A" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", lineHeight: 1.6, margin: 0 }}>
              ⚕️ For educational purposes only. Not a substitute for medical advice. Consult a doctor for clinical assessment.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        select { appearance: none; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { opacity: 1; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes popIn   { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}