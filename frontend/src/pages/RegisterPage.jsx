import { useState } from "react";
import { registerUser, saveToken, saveUser } from "../services/api";

const HeartbeatIcon = ({ size = 64, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 56s-24-14.4-24-28c0-8.8 7.2-16 16-16 4.4 0 8.4 1.8 11.2 4.6C37.6 13.8 41.6 12 46 12c8.8 0 16 7.2 16 16 0 13.6-24 28-24 28h-6z"
      fill={color} opacity="0.2"
    />
    <path
      d="M4 36h8l4-12 6 20 6-28 4 16 4-8h28"
      stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const UserIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckCircleIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C0182B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const passwordRules = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter",  test: (p) => /[A-Z]/.test(p) },
  { label: "One number",            test: (p) => /[0-9]/.test(p) },
];

export default function RegisterPage() {
  const [form, setForm]               = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused]         = useState("");
  const [agreed, setAgreed]           = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [submitted, setSubmitted]     = useState(false);
  const [userName, setUserName]       = useState("");

  const passwordMatch    = form.password && form.confirm && form.password === form.confirm;
  const passwordMismatch = form.confirm && form.password !== form.confirm;
  const allRulesPassed   = passwordRules.every(r => r.test(form.password));

  const isFormValid =
    form.name.trim() &&
    form.email.includes("@") &&
    allRulesPassed &&
    passwordMatch &&
    agreed;

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (error) setError("");
  };

 const handleSubmit = async () => {
  if (!isFormValid) return;

  setLoading(true);
  setError("");

  try {
    const data = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    console.log(data); // 🔍 DEBUG

    if (data.token) {
      saveToken(data.token);

      saveUser({
          name: data.name,
           email: data.email,
          id: data._id,
        });
      setUserName(data.name);
      setSubmitted(true);
    } else {
      setError(data.message || "Registration failed. Please try again.");
    }
  } catch {
    setError("Cannot connect to server. Make sure backend is running.");
  } finally {
    setLoading(false);
  }
};

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 14px 12px 42px",
    border: `1.5px solid ${focused === field ? "#C0182B" : "#E5E7EB"}`,
    borderRadius: 10,
    fontSize: 15,
    color: "#1F2937",
    outline: "none",
    background: focused === field ? "#FFFBFB" : "#F9FAFB",
    transition: "all 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(192,24,43,0.08)" : "none",
    fontFamily: "Inter, sans-serif",
    boxSizing: "border-box",
  });

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF5F5", fontFamily: "Inter, sans-serif" }}>
        <div style={{ textAlign: "center", padding: 48 }}>
          <div style={{ width: 80, height: 80, background: "#DCFCE7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", animation: "popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1F2937", margin: "0 0 10px" }}>Account Created!</h2>
          <p style={{ color: "#6B7280", marginBottom: 28, fontSize: 15 }}>
            Welcome to HeartGuard, {userName.split(" ")[0]}. Your heart health journey starts now.
          </p>
          <button
            onClick={() => window.location.href = "/dashboard"}
            style={{ background: "linear-gradient(135deg,#C0182B,#8B0000)", color: "white", border: "none", padding: "12px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "Inter, sans-serif", boxShadow: "0 4px 16px rgba(192,24,43,0.3)" }}>
            Go to Dashboard →
          </button>
        </div>
        <style>{`
          @keyframes popIn {
            0%   { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1);   opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "Inter, sans-serif", overflow: "hidden" }}>

      {/* ── LEFT PANEL ── */}
      <div style={{ width: "40%", minWidth: 340, background: "linear-gradient(160deg,#8B0000 0%,#C0182B 60%,#E53E3E 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", position: "relative", overflow: "hidden" }}>
        {[200, 320, 440, 560].map((size, i) => (
          <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.07)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        ))}

        <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, opacity: 0.1 }}>
          <svg viewBox="0 0 400 50" preserveAspectRatio="none" style={{ width: "100%", height: 50 }}>
            <polyline points="0,25 40,25 55,25 70,5 85,45 100,25 130,25 145,25 160,8 175,42 190,25 220,25 240,25 255,5 270,45 285,25 320,25 340,25 355,5 370,45 400,25" fill="none" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 0 40px rgba(255,255,255,0.1)", animation: "pulse 2.5s ease-in-out infinite" }}>
            <HeartbeatIcon size={52} color="white" />
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>Join HeartGuard</h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, maxWidth: 260, margin: "0 auto 36px" }}>
            Create your free account and start monitoring your cardiovascular health today.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            {["Instant AI risk assessment", "Track vitals over time", "Secure & private data", "100% free to use"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
          <HeartbeatIcon size={20} color="white" />
          <span style={{ fontWeight: 800, fontSize: 15, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.3px" }}>HeartGuard</span>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, background: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 60px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 460 }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, color: "#1F2937", margin: "0 0 8px", letterSpacing: "-0.8px" }}>Create your account</h2>
            <p style={{ fontSize: 15, color: "#6B7280", margin: 0 }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#C0182B", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.textDecoration = "underline"}
                onMouseLeave={e => e.target.style.textDecoration = "none"}>
                Sign in
              </a>
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Error banner */}
            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 10, padding: "11px 14px", animation: "shake 0.35s ease" }}>
                <AlertIcon />
                <span style={{ fontSize: 13, color: "#C0182B", fontWeight: 500 }}>{error}</span>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><UserIcon /></div>
                <input type="text" placeholder="John Doe" value={form.name} onChange={handleChange("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} style={inputStyle("name")} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><MailIcon /></div>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={handleChange("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} style={inputStyle("email")} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><LockIcon /></div>
                <input type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={form.password} onChange={handleChange("password")} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} style={{ ...inputStyle("password"), paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Password rules */}
              {form.password && (
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                  {passwordRules.map(rule => {
                    const passed = rule.test(form.password);
                    return (
                      <div key={rule.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {passed ? <CheckCircleIcon color="#16A34A" /> : <XCircleIcon color="#D1D5DB" />}
                        <span style={{ fontSize: 12, color: passed ? "#16A34A" : "#9CA3AF", fontWeight: 500 }}>{rule.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Strength bar */}
              {form.password && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3].map(level => {
                      const passedCount = passwordRules.filter(r => r.test(form.password)).length;
                      const colors = ["#EF4444", "#D97706", "#16A34A"];
                      return (
                        <div key={level} style={{ flex: 1, height: 4, borderRadius: 4, background: passedCount >= level ? colors[passedCount - 1] : "#E5E7EB", transition: "background 0.3s" }} />
                      );
                    })}
                  </div>
                  <span style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, display: "block" }}>
                    {["Weak", "Fair", "Good", "Strong"][passwordRules.filter(r => r.test(form.password)).length] || ""}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 7 }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><LockIcon /></div>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={handleChange("confirm")}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused("")}
                  style={{
                    ...inputStyle("confirm"),
                    paddingRight: 44,
                    border: `1.5px solid ${passwordMismatch ? "#EF4444" : passwordMatch ? "#16A34A" : focused === "confirm" ? "#C0182B" : "#E5E7EB"}`,
                    boxShadow: passwordMismatch ? "0 0 0 3px rgba(239,68,68,0.08)" : passwordMatch ? "0 0 0 3px rgba(22,163,74,0.08)" : focused === "confirm" ? "0 0 0 3px rgba(192,24,43,0.08)" : "none",
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {passwordMismatch && <p style={{ fontSize: 12, color: "#EF4444", margin: "6px 0 0", fontWeight: 500 }}>Passwords do not match</p>}
              {passwordMatch    && <p style={{ fontSize: 12, color: "#16A34A", margin: "6px 0 0", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}><CheckCircleIcon color="#16A34A" /> Passwords match</p>}
            </div>

            {/* Terms */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 2 }}>
              <div onClick={() => setAgreed(!agreed)}
                style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${agreed ? "#C0182B" : "#D1D5DB"}`, background: agreed ? "#C0182B" : "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.5 }}>
                I agree to HeartGuard's{" "}
                <a href="#" style={{ color: "#C0182B", fontWeight: 600, textDecoration: "none" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={{ color: "#C0182B", fontWeight: 600, textDecoration: "none" }}>Privacy Policy</a>.
                This tool is for educational purposes only.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              style={{ width: "100%", padding: "14px", background: isFormValid && !loading ? "linear-gradient(135deg,#C0182B 0%,#8B0000 100%)" : "#E5E7EB", color: isFormValid && !loading ? "white" : "#9CA3AF", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: isFormValid && !loading ? "pointer" : "not-allowed", transition: "all 0.25s", boxShadow: isFormValid && !loading ? "0 4px 16px rgba(192,24,43,0.3)" : "none", fontFamily: "Inter, sans-serif", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={e => { if (isFormValid && !loading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(192,24,43,0.4)"; }}}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isFormValid && !loading ? "0 4px 16px rgba(192,24,43,0.3)" : "none"; }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Creating Account…
                </>
              ) : "Create Account"}
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "2px 0" }}>
              <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
              <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>or sign up with</span>
              <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
            </div>

            {/* OAuth */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { name: "Google", icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )},
                { name: "GitHub", icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1F2937">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )},
              ].map(provider => (
                <button key={provider.name}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 16px", background: "white", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer", transition: "all 0.2s", fontFamily: "Inter, sans-serif" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#C0182B"; e.currentTarget.style.background = "#FFF5F5"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "white"; }}>
                  {provider.icon}{provider.name}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: 11.5, color: "#9CA3AF", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
            ⚕️ HeartGuard is for educational purposes only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #9CA3AF; }
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}