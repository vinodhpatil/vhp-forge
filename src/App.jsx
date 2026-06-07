// VHP Forge — Personal Innovation Hub
// Built by Vinod H. Patil | Powered by Agentic AI

import { useState, useEffect, useRef } from "react";
import {
  Activity, Heart, Droplets, Moon, Brain, Building2,
  FlaskConical, Shield, Bell, ChevronLeft, ChevronRight,
  Plus, ExternalLink, Github, TrendingUp, Users, Cpu,
  Zap, CheckCircle, Clock, AlertTriangle, Thermometer,
  Eye, Settings, X, Target, Code, Server, Database,
  GitBranch, Layers, FileText, Award, MapPin, Battery,
  Wifi, Flame, MoreVertical, ArrowUp, ArrowDown,
  BarChart2, Gauge, Radio, Beaker
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── DESIGN TOKENS ───────────────────────────────────────────
const C = {
  bg: "#0D1117",
  surface: "rgba(22,27,34,0.9)",
  card: "rgba(255,255,255,0.04)",
  cardHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.08)",
  borderAccent: "rgba(37,99,235,0.45)",
  blue: "#2563EB",
  blueLight: "#3B82F6",
  teal: "#0D9488",
  tealLight: "#14B8A6",
  text: "#E6EDF3",
  textSub: "#8B949E",
  textMuted: "#6E7681",
  green: "#22C55E",
  amber: "#F59E0B",
  red: "#EF4444",
  purple: "#8B5CF6",
  pink: "#EC4899",
};

const mono = "\"SF Mono\", \"Fira Code\", Consolas, monospace";

// ─── MOCK DATA ────────────────────────────────────────────────
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const genWeekly = (base, spread) =>
  weekDays.map((day) => ({
    day,
    v: +(base + (Math.random() - 0.4) * spread).toFixed(1),
  }));

const healthWeekly = {
  steps: genWeekly(8200, 3000),
  sleep: genWeekly(7.1, 1.8),
  water: genWeekly(2100, 600),
  hr: genWeekly(68, 12),
};

const agenticProjects = [
  {
    id: 1, title: "DS EchoStudio",
    desc: "Real-Time AI Voice Agent Platform with multi-model routing, WebSocket streaming and sub-100ms latency.",
    status: "Active", stack: ["Claude API", "WebSocket", "Python", "React"], accent: C.teal,
  },
  {
    id: 2, title: "DataPartners InfoSec Automation",
    desc: "AI-assisted compliance questionnaire engine for ISMS vendor assessments with RAG-powered retrieval.",
    status: "Active", stack: ["RAG", "LangChain", "FastAPI", "PostgreSQL"], accent: C.blue,
  },
  {
    id: 3, title: "MOM Skill Builder",
    desc: "Multilingual meeting-notes AI with Devanagari support, DOCX export and MCP skill integration.",
    status: "Production", stack: ["Claude Sonnet", "Python", "DOCX", "MCP"], accent: C.green,
  },
  {
    id: 4, title: "Mastercard Interview Simulator",
    desc: "React-based STAR story coach with adaptive questioning, sentiment scoring and report export.",
    status: "PoC", stack: ["React", "Claude", "TypeScript", "Vite"], accent: C.purple,
  },
  {
    id: 5, title: "DPDP Act Compliance Analyzer",
    desc: "Regulatory gap scanner for DPDP Act 2023 with policy delta reports and board-ready summaries.",
    status: "Research", stack: ["NLP", "Python", "LangGraph", "PDF"], accent: C.amber,
  },
];

const orgClients = [
  { name: "Axis Bank", sector: "BFSI", status: "active" },
  { name: "HDFC Bank", sector: "BFSI", status: "active" },
  { name: "Kotak Mahindra", sector: "BFSI", status: "active" },
  { name: "HDBFS", sector: "NBFC", status: "active" },
  { name: "Poonawalla Fincorp", sector: "NBFC", status: "review" },
];

const teamComp = [
  { name: "Dev", value: 40, color: C.blue },
  { name: "DevOps", value: 25, color: C.teal },
  { name: "Cloud", value: 20, color: C.purple },
  { name: "Product", value: 15, color: C.amber },
];

const kanban = {
  "In Progress": [
    { id: 1, title: "InfoSec Vendor Assessments", tag: "Security" },
    { id: 2, title: "DPDP Compliance Review", tag: "Compliance" },
    { id: 3, title: "EchoStudio Architecture", tag: "AI" },
  ],
  "Review": [
    { id: 4, title: "Cloud Migration Plan", tag: "Infra" },
    { id: 5, title: "ISO 27001 Gap Analysis", tag: "Audit" },
  ],
  Done: [
    { id: 6, title: "Team Q1 OKRs", tag: "Planning" },
    { id: 7, title: "Axis Bank Integration", tag: "BFSI" },
  ],
};

const pocSeed = [
  {
    id: 1, title: "White-Label Amusement Park SaaS",
    desc: "Synergy SmartEntry, SmartPOS, SafeGuard — end-to-end park operations platform with IoT gating.",
    status: "Building", progress: 65,
    stack: ["React", "Node.js", "PostgreSQL", "IoT SDK"], date: "2024-11-01",
  },
  {
    id: 2, title: "Voter Roll OCR + Transliteration",
    desc: "Devanagari-to-English cross-match engine achieving 98%+ accuracy on scanned electoral rolls.",
    status: "Validated", progress: 90,
    stack: ["Tesseract", "Python", "FastAPI", "React"], date: "2024-09-15",
  },
  {
    id: 3, title: "HR Dashboard",
    desc: "Mumbai dispersed-team analytics with attendance, leave, and performance overlays.",
    status: "Validated", progress: 85,
    stack: ["React", "Recharts", "FastAPI", "PostgreSQL"], date: "2024-10-20",
  },
  {
    id: 4, title: "GenAI Compliance Chatbot",
    desc: "DPDP/RBI Q&A assistant powered by regulatory document RAG pipeline and Claude.",
    status: "Ideation", progress: 20,
    stack: ["Claude", "RAG", "LangChain", "React"], date: "2024-12-01",
  },
  {
    id: 5, title: "Multi-Agent Orchestrator",
    desc: "Claude Code + sub-agent pipeline for automated engineering workflows and code review.",
    status: "Building", progress: 40,
    stack: ["Claude Code", "MCP", "Python", "FastAPI"], date: "2024-11-15",
  },
];

const iotAlerts = [
  { id: 1, time: "09:14:32", sensor: "Gas / CO", value: "245 ppm", severity: "High" },
  { id: 2, time: "08:52:10", sensor: "Temperature", value: "48 °C", severity: "Medium" },
  { id: 3, time: "07:30:45", sensor: "Vibration", value: "3.2 g", severity: "Low" },
  { id: 4, time: "06:15:22", sensor: "Humidity", value: "89 %", severity: "Low" },
  { id: 5, time: "05:45:00", sensor: "Motion", value: "Detected", severity: "Medium" },
];

const iotDevices = [
  { id: "Node-01", loc: "Factory Floor", status: "online", battery: 87, ping: "2s ago" },
  { id: "Node-02", loc: "Server Room", status: "online", battery: 62, ping: "1s ago" },
  { id: "Node-03", loc: "Entry Gate", status: "offline", battery: 12, ping: "5m ago" },
];

const moodData = [
  { day: "Mon", v: 4 }, { day: "Tue", v: 3 }, { day: "Wed", v: 5 },
  { day: "Thu", v: 2 }, { day: "Fri", v: 4 }, { day: "Sat", v: 5 }, { day: "Sun", v: 3 },
];

const moods = ["😴", "😔", "😐", "😊", "🚀"];
const moodLabels = ["Exhausted", "Low", "Neutral", "Good", "Energized"];

// ─── SHARED UI COMPONENTS ─────────────────────────────────────

const Glass = ({ children, className = "", style = {}, onClick }) => (
  <div onClick={onClick} className={`rounded-2xl ${className}`}
    style={{ background: C.card, border: `1px solid ${C.border}`, backdropFilter: "blur(12px)", ...style }}>
    {children}
  </div>
);

const Badge = ({ status }) => {
  const map = {
    Active:      { bg: `${C.green}18`,  fg: C.green },
    Production:  { bg: `${C.blue}22`,   fg: "#60A5FA" },
    PoC:         { bg: `${C.purple}22`, fg: "#C4B5FD" },
    Research:    { bg: `${C.amber}18`,  fg: C.amber },
    Building:    { bg: `${C.teal}18`,   fg: C.tealLight },
    Validated:   { bg: `${C.green}18`,  fg: C.green },
    Ideation:    { bg: `${C.amber}18`,  fg: C.amber },
    Testing:     { bg: `${C.blue}18`,   fg: C.blueLight },
    Shelved:     { bg: "rgba(110,118,129,0.15)", fg: C.textMuted },
  };
  const s = map[status] || map.Research;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.fg }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.fg }} />
      {status}
    </span>
  );
};

const Tag = ({ label }) => (
  <span className="text-xs px-2 py-0.5 rounded-md"
    style={{ background: "rgba(255,255,255,0.06)", color: C.textSub }}>{label}</span>
);

const MetricCard = ({ icon: Icon, label, value, unit, color, trend }) => (
  <Glass className="p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18` }}>
        <Icon size={15} style={{ color }} />
      </div>
      {trend != null && (
        <div className="flex items-center gap-0.5 text-xs"
          style={{ color: trend >= 0 ? C.green : C.red }}>
          {trend >= 0 ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="mt-1">
      <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: C.text }}>{value}</span>
      {unit && <span className="text-xs ml-1" style={{ color: C.textMuted }}>{unit}</span>}
    </div>
    <div className="text-xs" style={{ color: C.textMuted }}>{label}</div>
  </Glass>
);

// SVG arc gauge
const ArcGauge = ({ value, min, max, unit, danger }) => {
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const angle = pct * 180;
  const r = 48, cx = 65, cy = 65;
  const toXY = (a, rad) => ({
    x: cx + rad * Math.cos(((a - 180) * Math.PI) / 180),
    y: cy + rad * Math.sin(((a - 180) * Math.PI) / 180),
  });
  const s = toXY(0, r), e = toXY(angle, r);
  const large = angle > 90 ? 1 : 0;
  const fill = danger && value >= danger ? C.red : pct > 0.75 ? C.amber : C.teal;
  return (
    <svg width="130" height="78" viewBox="0 0 130 78">
      <path d={`M ${toXY(0,r).x} ${toXY(0,r).y} A ${r} ${r} 0 0 1 ${toXY(180,r).x} ${toXY(180,r).y}`}
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={10} strokeLinecap="round" />
      {pct > 0.02 && (
        <path d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`}
          fill="none" stroke={fill} strokeWidth={10} strokeLinecap="round" />
      )}
      <text x={cx} y={cy - 4} textAnchor="middle" fill={C.text}
        fontFamily={mono} fontSize={17} fontWeight={700}>{value}</text>
      <text x={cx} y={cx + 9} textAnchor="middle" fill={C.textMuted} fontSize={9}>{unit}</text>
    </svg>
  );
};

const Sparkline = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={38}>
    <LineChart data={data}>
      <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} isAnimationActive={false} />
    </LineChart>
  </ResponsiveContainer>
);

const chartTooltipStyle = {
  background: "#161B22", border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 12,
};

// ─── INPUT HELPER ─────────────────────────────────────────────
const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input type={type} placeholder={placeholder} value={value} onChange={onChange}
    className="w-full rounded-xl px-3 py-2 text-sm outline-none"
    style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.text }} />
);

// ─── TYPING EFFECT ────────────────────────────────────────────
const TypingEffect = ({ phrases }) => {
  const [text, setText] = useState("");
  const [pi, setPi] = useState(0);
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    const phrase = phrases[pi];
    let t;
    if (typing) {
      if (text.length < phrase.length) t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 70);
      else t = setTimeout(() => setTyping(false), 2000);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 35);
      else { setPi((pi + 1) % phrases.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [text, typing, pi]);
  return (
    <span style={{ color: C.teal }}>
      {text}<span style={{ animation: "blink 1s infinite" }}>│</span>
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════
// MODULE 1 — HEALTH TRACKER
// ═══════════════════════════════════════════════════════════════
const HealthModule = ({ welcome }) => {
  const [entries, setEntries] = useState(() => {
    try { const s = localStorage.getItem("vhpforge_health"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [mood, setMood] = useState(3);
  const [form, setForm] = useState({ weight: "", sys: "", dia: "", glucose: "", sleep: "", steps: "" });
  const [showForm, setShowForm] = useState(false);
  const [bmi, setBmi] = useState({ h: "", w: "", result: null });
  const [activeChart, setActiveChart] = useState("steps");

  const latest = entries[entries.length - 1];
  const score = latest
    ? Math.min(100, Math.round(
        ((latest.steps > 8000 ? 25 : latest.steps > 5000 ? 15 : 5) +
         (latest.sleep > 7 ? 25 : latest.sleep > 6 ? 15 : 5) +
         (latest.sys < 130 ? 25 : latest.sys < 140 ? 15 : 5) +
         (latest.glucose < 100 ? 25 : latest.glucose < 126 ? 15 : 5)) * 1
      ))
    : 72;
  const scoreCol = score >= 75 ? C.green : score >= 50 ? C.amber : C.red;
  const scoreLabel = score >= 75 ? "Good" : score >= 50 ? "Fair" : "Needs Attention";

  const saveEntry = () => {
    const e = { ...form, id: Date.now(), date: new Date().toLocaleDateString("en-IN") };
    const upd = [...entries, e];
    setEntries(upd);
    try { localStorage.setItem("vhpforge_health", JSON.stringify(upd)); } catch {}
    setForm({ weight: "", sys: "", dia: "", glucose: "", sleep: "", steps: "" });
    setShowForm(false);
  };

  const calcBMI = () => {
    const h = parseFloat(bmi.h) / 100, w = parseFloat(bmi.w);
    if (h && w) setBmi(b => ({ ...b, result: +(w / (h * h)).toFixed(1) }));
  };

  const chartKeys = [
    { key: "steps", label: "Steps", color: C.blue },
    { key: "sleep", label: "Sleep", color: C.purple },
    { key: "water", label: "Water", color: C.teal },
    { key: "hr", label: "Heart Rate", color: C.red },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Welcome */}
      {welcome && (
        <Glass className="p-5" style={{ background: "linear-gradient(135deg,rgba(37,99,235,.15) 0%,rgba(13,148,136,.1) 100%)" }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs mb-1" style={{ color: C.textSub }}>Welcome back</p>
              <h2 className="text-2xl font-bold" style={{ color: C.text }}>Good morning, Vinod 👋</h2>
              <p className="text-sm mt-1" style={{ color: C.textMuted }}>Here's your personal health command centre — VHP Forge.</p>
            </div>
            <div className="text-center">
              <div style={{ fontFamily: mono, fontSize: 42, fontWeight: 800, color: scoreCol, lineHeight: 1 }}>{score}</div>
              <div className="text-xs px-3 py-1 rounded-full mt-1 inline-block" style={{ background: `${scoreCol}20`, color: scoreCol }}>{scoreLabel}</div>
              <div className="text-xs mt-1" style={{ color: C.textMuted }}>Health Score</div>
            </div>
          </div>
        </Glass>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricCard icon={Activity} label="Steps Today" value={(latest?.steps || 8432).toLocaleString()} color={C.blue} trend={12} />
        <MetricCard icon={Heart} label="Resting HR" value={latest?.hr || 68} unit="bpm" color={C.red} trend={-3} />
        <MetricCard icon={Moon} label="Sleep" value={latest?.sleep || 7.2} unit="hrs" color={C.purple} trend={5} />
        <MetricCard icon={Droplets} label="Water" value="2,100" unit="ml" color={C.teal} trend={8} />
        <MetricCard icon={Flame} label="Calories" value="1,840" unit="kcal" color={C.amber} trend={-2} />
      </div>

      {/* Chart + Mood */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Glass className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: C.text }}>Weekly Trend</h3>
            <div className="flex gap-1">
              {chartKeys.map(ck => (
                <button key={ck.key} onClick={() => setActiveChart(ck.key)}
                  className="text-xs px-2 py-0.5 rounded-md transition-all"
                  style={{ background: activeChart === ck.key ? `${ck.color}25` : "transparent", color: activeChart === ck.key ? ck.color : C.textMuted }}>
                  {ck.label}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={155}>
            <AreaChart data={healthWeekly[activeChart]}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartKeys.find(c => c.key === activeChart)?.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartKeys.find(c => c.key === activeChart)?.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="v" stroke={chartKeys.find(c => c.key === activeChart)?.color}
                fill="url(#aGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Glass>

        <Glass className="p-5">
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Mood Log</h3>
          <div className="flex justify-around mb-5">
            {moods.map((em, i) => (
              <button key={i} onClick={() => setMood(i)}
                className="flex flex-col items-center gap-1 transition-all duration-200"
                style={{ opacity: mood === i ? 1 : 0.3, transform: mood === i ? "scale(1.35)" : "scale(1)" }}>
                <span style={{ fontSize: 22 }}>{em}</span>
                <span style={{ fontSize: 9, color: C.textMuted }}>{moodLabels[i]}</span>
              </button>
            ))}
          </div>
          <div className="text-xs mb-2" style={{ color: C.textMuted }}>7-Day Mood History</div>
          <div className="flex items-end gap-1.5" style={{ height: 60 }}>
            {moodData.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-sm"
                  style={{ height: `${m.v * 18}px`, background: `linear-gradient(to top, ${C.teal}, ${C.blue})`, opacity: 0.6 + (i === 6 ? 0.4 : 0) }} />
                <span style={{ fontSize: 9, color: C.textMuted }}>{m.day[0]}</span>
              </div>
            ))}
          </div>
        </Glass>
      </div>

      {/* BMI + Entry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Glass className="p-5">
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>BMI Calculator</h3>
          <div className="flex gap-3 mb-3">
            <Input placeholder="Height (cm)" value={bmi.h} onChange={e => setBmi(b => ({ ...b, h: e.target.value }))} />
            <Input placeholder="Weight (kg)" value={bmi.w} onChange={e => setBmi(b => ({ ...b, w: e.target.value }))} />
          </div>
          <button onClick={calcBMI} className="w-full py-2 rounded-xl text-sm font-semibold"
            style={{ background: C.blue, color: "#fff" }}>Calculate BMI</button>
          {bmi.result && (
            <div className="text-center mt-4">
              <div style={{ fontFamily: mono, fontSize: 38, fontWeight: 800, color: bmi.result < 18.5 ? C.amber : bmi.result < 25 ? C.green : C.red }}>{bmi.result}</div>
              <div className="text-sm" style={{ color: C.textSub }}>
                {bmi.result < 18.5 ? "Underweight" : bmi.result < 25 ? "Normal weight ✓" : bmi.result < 30 ? "Overweight" : "Obese"}
              </div>
            </div>
          )}
        </Glass>

        <Glass className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: C.text }}>Today's Entry</h3>
            <button onClick={() => setShowForm(!showForm)}
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: `${C.blue}20`, color: C.blueLight }}>
              {showForm ? "Cancel" : "+ Log Today"}
            </button>
          </div>
          {showForm ? (
            <div className="space-y-2">
              {[["weight","Weight (kg)"],["sys","BP Systolic"],["dia","BP Diastolic"],["glucose","Glucose mg/dL"],["sleep","Sleep Hours"],["steps","Steps"]].map(([k,ph]) => (
                <Input key={k} placeholder={ph} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              ))}
              <button onClick={saveEntry} className="w-full py-2 rounded-xl text-sm font-semibold mt-1"
                style={{ background: C.teal, color: "#fff" }}>Save Entry</button>
            </div>
          ) : (
            <div className="space-y-2">
              {entries.slice(-4).reverse().map(e => (
                <div key={e.id} className="flex justify-between text-xs py-1.5 px-3 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <span style={{ color: C.textSub }}>{e.date}</span>
                  <span style={{ color: C.textMuted }}>Steps {e.steps} · Sleep {e.sleep}h</span>
                </div>
              ))}
              {entries.length === 0 && (
                <p className="text-xs text-center py-6" style={{ color: C.textMuted }}>
                  No entries yet — start logging to unlock your health score!
                </p>
              )}
            </div>
          )}
        </Glass>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MODULE 2 — AGENTIC AI WORK
// ═══════════════════════════════════════════════════════════════
const AgenticModule = () => {
  const [showModal, setShowModal] = useState(false);
  const [newP, setNewP] = useState({ title: "", desc: "", stack: "", status: "Active" });

  const phrases = ["Multi-Agent Orchestration", "Claude Code Pipelines", "RAG Architectures", "Voice Agent Systems"];

  const metrics = [
    { label: "Total Projects", value: "5", icon: Layers, color: C.blue },
    { label: "Active Pipelines", value: "3", icon: GitBranch, color: C.green },
    { label: "Models Used", value: "4", icon: Brain, color: C.purple },
    { label: "Tokens Saved", value: "2.4M", icon: Zap, color: C.amber },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Hero */}
      <Glass className="p-7 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,rgba(37,99,235,.12) 0%,rgba(13,148,136,.08) 100%)" }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 50%)",
        }} />
        <div className="flex items-center gap-2 mb-2">
          <Brain size={16} style={{ color: C.blue }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.blue }}>AI-Powered Engineering</span>
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: C.text }}>
          Building with{" "}<TypingEffect phrases={phrases} />
        </h1>
        <p className="text-sm" style={{ color: C.textSub }}>
          Personal R&D projects at the intersection of agentic AI, enterprise systems, and real-world deployment.
        </p>
      </Glass>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <Glass key={i} className="p-4 flex flex-col gap-2">
            <m.icon size={18} style={{ color: m.color }} />
            <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 800, color: C.text }}>{m.value}</div>
            <div className="text-xs" style={{ color: C.textMuted }}>{m.label}</div>
          </Glass>
        ))}
      </div>

      {/* Projects */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold" style={{ color: C.text }}>Projects</h2>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-semibold"
          style={{ background: C.blue, color: "#fff" }}>
          <Plus size={14} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agenticProjects.map(p => (
          <Glass key={p.id} className="p-5 flex flex-col gap-3 group cursor-pointer transition-all duration-200"
            style={{ borderColor: "transparent" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${p.accent}45`}
            onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
            <div className="flex items-center justify-between">
              <div className="w-1.5 h-10 rounded-full" style={{ background: `linear-gradient(to bottom, ${p.accent}, ${p.accent}44)` }} />
              <Badge status={p.status} />
            </div>
            <h3 className="text-sm font-bold" style={{ color: C.text }}>{p.title}</h3>
            <p className="text-xs leading-relaxed flex-1" style={{ color: C.textSub }}>{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map(t => <Tag key={t} label={t} />)}
            </div>
            <div className="flex items-center gap-3 pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
              <button className="text-xs flex items-center gap-1 transition-colors"
                style={{ color: C.blue }}>
                View Details <ExternalLink size={10} />
              </button>
              <button className="ml-auto text-xs flex items-center gap-1" style={{ color: C.textMuted }}>
                <Github size={12} /> Repo
              </button>
            </div>
          </Glass>
        ))}
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}>
          <Glass className="p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold" style={{ color: C.text }}>New AI Project</h3>
              <button onClick={() => setShowModal(false)}><X size={18} style={{ color: C.textMuted }} /></button>
            </div>
            <div className="space-y-3">
              <Input placeholder="Project Title" value={newP.title} onChange={e => setNewP(p => ({ ...p, title: e.target.value }))} />
              <textarea placeholder="Description" value={newP.desc} onChange={e => setNewP(p => ({ ...p, desc: e.target.value }))}
                rows={3} className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.text }} />
              <Input placeholder="Tech Stack (comma-separated)" value={newP.stack} onChange={e => setNewP(p => ({ ...p, stack: e.target.value }))} />
              <select value={newP.status} onChange={e => setNewP(p => ({ ...p, status: e.target.value }))}
                className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background: "#161B22", border: `1px solid ${C.border}`, color: C.text }}>
                <option>Active</option><option>Research</option><option>PoC</option><option>Production</option>
              </select>
              <button onClick={() => setShowModal(false)} className="w-full py-2.5 rounded-xl text-sm font-bold"
                style={{ background: C.blue, color: "#fff" }}>Create Project</button>
            </div>
          </Glass>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MODULE 3 — ORGANISATION SUMMARY
// ═══════════════════════════════════════════════════════════════
const OrgModule = () => {
  const RAD = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RAD);
    const y = cy + r * Math.sin(-midAngle * RAD);
    return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>{value}%</text>;
  };

  return (
    <div className="p-6 space-y-5">
      {/* Company + Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Glass className="p-6" style={{ background: "linear-gradient(135deg,rgba(37,99,235,.12) 0%,transparent 100%)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${C.blue}, #1D4ED8)` }}>
              <Building2 size={22} color="#fff" />
            </div>
            <div>
              <div className="font-bold text-base" style={{ color: C.text }}>DataSutram</div>
              <div className="text-xs" style={{ color: C.textSub }}>Pune, Maharashtra · Data & AI Platform</div>
            </div>
          </div>
          {[["Sector", "Enterprise SaaS"], ["Focus", "BFSI / Compliance / Analytics"], ["Scale", "Series-stage Product Company"]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 text-sm" style={{ borderBottom: `1px solid ${C.border}` }}>
              <span style={{ color: C.textMuted }}>{k}</span>
              <span style={{ color: C.text }}>{v}</span>
            </div>
          ))}
        </Glass>

        <Glass className="p-6" style={{ background: "linear-gradient(135deg,rgba(13,148,136,.12) 0%,transparent 100%)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${C.teal}, #0F766E)` }}>
              <Users size={22} color="#fff" />
            </div>
            <div>
              <div className="font-bold text-base" style={{ color: C.text }}>Senior Engineering Manager</div>
              <div className="text-xs" style={{ color: C.textSub }}>Team of 12 · Dev · DevOps · Cloud · Product</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Engineering", "Architecture", "Agentic AI", "BFSI Compliance", "Cloud"].map(sk => (
              <span key={sk} className="text-xs px-2.5 py-1 rounded-lg"
                style={{ background: "rgba(255,255,255,0.06)", color: C.textSub }}>{sk}</span>
            ))}
          </div>
        </Glass>
      </div>

      {/* Clients + Team Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Glass className="p-5">
          <h3 className="text-sm font-semibold mb-4" style={{ color: C.text }}>Client Portfolio</h3>
          <div className="space-y-2">
            {orgClients.map(c => (
              <div key={c.name} className="flex items-center justify-between py-2 px-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: c.status === "active" ? C.green : C.amber }} />
                  <span className="text-sm font-medium" style={{ color: C.text }}>{c.name}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${C.blue}15`, color: C.blueLight }}>{c.sector}</span>
              </div>
            ))}
          </div>
        </Glass>

        <Glass className="p-5">
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Team Composition</h3>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width="55%" height={175}>
              <PieChart>
                <Pie data={teamComp} cx="50%" cy="50%" innerRadius={42} outerRadius={72}
                  dataKey="value" labelLine={false} label={renderLabel}>
                  {teamComp.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {teamComp.map(t => (
                <div key={t.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                    <span style={{ color: C.textSub }}>{t.name}</span>
                  </div>
                  <span style={{ fontFamily: mono, color: C.text }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Glass>
      </div>

      {/* Kanban */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Active Workstreams</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(kanban).map(([col, items]) => {
            const colColor = col === "In Progress" ? C.blue : col === "Review" ? C.amber : C.green;
            return (
              <div key={col}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: colColor }} />
                  <span className="text-xs font-semibold" style={{ color: colColor }}>{col}</span>
                  <span className="text-xs px-1.5 rounded"
                    style={{ background: "rgba(255,255,255,0.06)", color: C.textMuted }}>{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map(item => (
                    <Glass key={item.id} className="p-3">
                      <div className="text-xs font-medium mb-1.5" style={{ color: C.text }}>{item.title}</div>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${C.blue}15`, color: C.blueLight }}>{item.tag}</span>
                    </Glass>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance */}
      <Glass className="p-5">
        <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Compliance Frameworks</h3>
        <div className="flex flex-wrap gap-3">
          {["DPDP Act 2023", "RBI Guidelines", "ISO 27001", "TRAI"].map(f => (
            <div key={f} className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: `${C.teal}12`, border: `1px solid ${C.teal}30` }}>
              <Award size={14} style={{ color: C.teal }} />
              <span className="text-xs font-semibold" style={{ color: C.tealLight }}>{f}</span>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MODULE 4 — PoC LAB
// ═══════════════════════════════════════════════════════════════
const PoCModule = () => {
  const [pocs, setPocs] = useState(() => {
    try { const s = localStorage.getItem("vhpforge_pocs"); return s ? JSON.parse(s) : pocSeed; } catch { return pocSeed; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [np, setNp] = useState({ title: "", desc: "", status: "Ideation", stack: "", progress: 10 });

  const addPoc = () => {
    const poc = { ...np, id: Date.now(), stack: np.stack.split(",").map(s => s.trim()).filter(Boolean), date: new Date().toISOString().split("T")[0] };
    const upd = [...pocs, poc];
    setPocs(upd);
    try { localStorage.setItem("vhpforge_pocs", JSON.stringify(upd)); } catch {}
    setShowAdd(false);
    setNp({ title: "", desc: "", status: "Ideation", stack: "", progress: 10 });
  };

  const statusColor = { Ideation: C.amber, Building: C.teal, Testing: C.blue, Validated: C.green, Shelved: C.textMuted };
  const summary = {
    total: pocs.length,
    validated: pocs.filter(p => p.status === "Validated").length,
    building: pocs.filter(p => ["Building", "Testing"].includes(p.status)).length,
    ideas: pocs.filter(p => p.status === "Ideation").length,
  };

  return (
    <div className="p-6 space-y-5 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${C.teal}, #0F766E)` }}>
          <FlaskConical size={20} color="#fff" />
        </div>
        <div>
          <h2 className="font-bold text-lg" style={{ color: C.text }}>Proof of Concept Workshop</h2>
          <p className="text-xs" style={{ color: C.textSub }}>Where raw ideas get forged into production-ready products</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total PoCs", value: summary.total, color: C.blue },
          { label: "Validated", value: summary.validated, color: C.green },
          { label: "In Progress", value: summary.building, color: C.teal },
          { label: "Ideas", value: summary.ideas, color: C.amber },
        ].map((s, i) => (
          <Glass key={i} className="p-4 text-center">
            <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: C.textMuted }}>{s.label}</div>
          </Glass>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pocs.map(poc => {
          const sc = statusColor[poc.status] || C.blue;
          const stack = Array.isArray(poc.stack) ? poc.stack : [poc.stack];
          return (
            <Glass key={poc.id} className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Badge status={poc.status} />
                <span className="text-xs" style={{ color: C.textMuted, fontFamily: mono }}>{poc.date}</span>
              </div>
              <h3 className="text-sm font-bold leading-snug" style={{ color: C.text }}>{poc.title}</h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: C.textSub }}>{poc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {stack.map(t => <Tag key={t} label={t} />)}
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: C.textMuted }}>Progress</span>
                  <span style={{ fontFamily: mono, color: sc }}>{poc.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${poc.progress}%`, background: `linear-gradient(to right, ${sc}99, ${sc})` }} />
                </div>
              </div>
              <div className="flex gap-4 pt-2" style={{ borderTop: `1px solid ${C.border}` }}>
                <button className="text-xs flex items-center gap-1" style={{ color: C.textMuted }}>
                  <Github size={11} /> GitHub
                </button>
                <button className="text-xs flex items-center gap-1" style={{ color: C.textMuted }}>
                  <ExternalLink size={11} /> Demo
                </button>
              </div>
            </Glass>
          );
        })}
      </div>

      {/* FAB */}
      <button onClick={() => setShowAdd(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-40"
        style={{ background: `linear-gradient(135deg, ${C.blue}, #1D4ED8)`, boxShadow: `0 8px 32px ${C.blue}55` }}>
        <Plus size={24} color="#fff" />
      </button>

      {/* Add PoC Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}>
          <Glass className="p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold" style={{ color: C.text }}>Add New PoC</h3>
              <button onClick={() => setShowAdd(false)}><X size={18} style={{ color: C.textMuted }} /></button>
            </div>
            <div className="space-y-3">
              <Input placeholder="Title" value={np.title} onChange={e => setNp(p => ({ ...p, title: e.target.value }))} />
              <textarea placeholder="Description" value={np.desc} onChange={e => setNp(p => ({ ...p, desc: e.target.value }))}
                rows={3} className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.text }} />
              <Input placeholder="Tech Stack (comma-separated)" value={np.stack} onChange={e => setNp(p => ({ ...p, stack: e.target.value }))} />
              <select value={np.status} onChange={e => setNp(p => ({ ...p, status: e.target.value }))}
                className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background: "#161B22", border: `1px solid ${C.border}`, color: C.text }}>
                <option>Ideation</option><option>Building</option><option>Testing</option><option>Validated</option>
              </select>
              <div>
                <div className="flex justify-between text-xs mb-1" style={{ color: C.textMuted }}>
                  <span>Progress</span><span style={{ fontFamily: mono }}>{np.progress}%</span>
                </div>
                <input type="range" min={0} max={100} value={np.progress}
                  onChange={e => setNp(p => ({ ...p, progress: +e.target.value }))} className="w-full" />
              </div>
              <button onClick={addPoc} className="w-full py-2.5 rounded-xl text-sm font-bold"
                style={{ background: C.teal, color: "#fff" }}>Add PoC</button>
            </div>
          </Glass>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MODULE 5 — IoT SAFETY TRACKER
// ═══════════════════════════════════════════════════════════════
const IoTModule = () => {
  const [sensors, setSensors] = useState({ temp: 38, humidity: 65, gas: 180, vib: 0.8, motion: false });
  const [thresh, setThresh] = useState({ temp: 45, humidity: 80, gas: 200, vib: 2.5 });
  const [vibHist, setVibHist] = useState(
    Array.from({ length: 12 }, (_, i) => ({ t: i, v: +(0.4 + Math.random() * 1.1).toFixed(2) }))
  );

  useEffect(() => {
    const iv = setInterval(() => {
      setSensors(s => ({
        temp: +(Math.max(15, Math.min(75, s.temp + (Math.random() - 0.45) * 2))).toFixed(1),
        humidity: +(Math.max(30, Math.min(98, s.humidity + (Math.random() - 0.45) * 3))).toFixed(1),
        gas: Math.max(30, Math.min(490, Math.round(s.gas + (Math.random() - 0.45) * 22))),
        vib: +(Math.max(0.1, s.vib + (Math.random() - 0.45) * 0.35)).toFixed(2),
        motion: Math.random() > 0.72,
      }));
      setVibHist(h => [...h.slice(1), { t: h[h.length - 1].t + 1, v: +(0.2 + Math.random() * 1.8).toFixed(2) }]);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const alert = (k) => {
    if (k === "temp") return sensors.temp >= thresh.temp;
    if (k === "humidity") return sensors.humidity >= thresh.humidity;
    if (k === "gas") return sensors.gas >= thresh.gas;
    if (k === "vib") return sensors.vib >= thresh.vib;
    return false;
  };

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${C.blue}, #1E40AF)` }}>
          <Shield size={20} color="#fff" />
        </div>
        <div>
          <h2 className="font-bold text-lg" style={{ color: C.text }}>Industrial Safety Intelligence</h2>
          <div className="flex items-center gap-2 text-xs" style={{ color: C.textSub }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.green }} />
            Live • Auto-refreshes every 3 seconds
          </div>
        </div>
      </div>

      {/* Sensor Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: "temp",     label: "Temperature", val: sensors.temp, min: 0, max: 80, unit: "°C" },
          { key: "humidity", label: "Humidity",    val: sensors.humidity, min: 0, max: 100, unit: "%" },
          { key: "gas",      label: "Gas / CO",    val: sensors.gas, min: 0, max: 500, unit: "ppm" },
        ].map(g => {
          const isAlert = alert(g.key);
          return (
            <Glass key={g.key} className="p-4 flex flex-col items-center"
              style={{ borderColor: isAlert ? `${C.red}55` : C.border }}>
              <div className="text-xs mb-1 font-semibold"
                style={{ color: isAlert ? C.red : C.textMuted }}>
                {isAlert ? "⚠ ALERT — " : ""}{g.label}
              </div>
              <ArcGauge value={g.val} min={g.min} max={g.max} unit={g.unit} danger={thresh[g.key]} />
            </Glass>
          );
        })}

        <Glass className="p-4 flex flex-col">
          <div className="text-xs font-semibold mb-1" style={{ color: alert("vib") ? C.red : C.textMuted }}>Vibration</div>
          <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 800, color: alert("vib") ? C.red : C.text }}>
            {sensors.vib}<span style={{ fontSize: 13, color: C.textMuted }}>g</span>
          </div>
          <div className="flex-1 mt-1">
            <Sparkline data={vibHist} color={alert("vib") ? C.red : C.teal} />
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: sensors.motion ? `${C.amber}20` : `${C.green}20`, color: sensors.motion ? C.amber : C.green }}>
              Motion: {sensors.motion ? "Detected" : "Clear"}
            </span>
          </div>
        </Glass>
      </div>

      {/* Alert Log + Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Glass className="p-5">
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Alert Log</h3>
          <div className="space-y-2">
            {iotAlerts.map(a => {
              const col = a.severity === "High" ? C.red : a.severity === "Medium" ? C.amber : C.textMuted;
              return (
                <div key={a.id} className="flex items-center justify-between py-2 px-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={14} style={{ color: col }} />
                    <div>
                      <div className="text-xs font-medium" style={{ color: C.text }}>{a.sensor}</div>
                      <div className="text-xs" style={{ color: C.textMuted, fontFamily: mono }}>{a.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{ fontFamily: mono, color: C.text }}>{a.value}</div>
                    <div className="text-xs font-semibold" style={{ color: col }}>{a.severity}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Glass>

        <Glass className="p-5">
          <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Device Registry</h3>
          <div className="space-y-3">
            {iotDevices.map(d => (
              <div key={d.id} className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.status === "online" ? C.green : C.red }} />
                <div className="flex-1">
                  <div className="text-xs font-semibold" style={{ color: C.text }}>{d.id} — {d.loc}</div>
                  <div className="text-xs" style={{ color: C.textMuted, fontFamily: mono }}>Last ping: {d.ping}</div>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: d.battery < 20 ? C.red : C.textMuted }}>
                  <Battery size={12} /> {d.battery}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl p-5 text-center"
            style={{ background: "rgba(255,255,255,0.025)", border: `1px dashed ${C.border}` }}>
            <MapPin size={22} style={{ color: C.textMuted, margin: "0 auto 6px" }} />
            <div className="text-sm font-medium" style={{ color: C.textSub }}>Deploy Location Map</div>
            <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>Virar Industrial Zone · Maharashtra</div>
          </div>
        </Glass>
      </div>

      {/* Threshold Config */}
      <Glass className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={16} style={{ color: C.textSub }} />
          <h3 className="text-sm font-semibold" style={{ color: C.text }}>Alert Threshold Configuration</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { key: "temp",     label: "Temperature",  unit: "°C",  max: 80 },
            { key: "humidity", label: "Humidity",     unit: "%",   max: 100 },
            { key: "gas",      label: "Gas / CO",     unit: "ppm", max: 500 },
            { key: "vib",      label: "Vibration",    unit: "g",   max: 5, step: 0.1 },
          ].map(({ key, label, unit, max, step }) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-2">
                <span style={{ color: C.textMuted }}>{label}</span>
                <span style={{ fontFamily: mono, color: C.text }}>{thresh[key]} {unit}</span>
              </div>
              <input type="range" min={0} max={max} step={step || 1} value={thresh[key]}
                onChange={e => setThresh(t => ({ ...t, [key]: parseFloat(e.target.value) }))}
                className="w-full" style={{ accentColor: C.blue }} />
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// NAV CONFIG
// ═══════════════════════════════════════════════════════════════
const navItems = [
  { id: "health",      label: "Health Tracker",    icon: Heart },
  { id: "agentic-ai",  label: "Agentic AI Work",   icon: Brain },
  { id: "org-summary", label: "Organisation",       icon: Building2 },
  { id: "poc-lab",     label: "PoC Lab",            icon: FlaskConical },
  { id: "iot-safety",  label: "IoT Safety",         icon: Shield },
];

// ─── SIDEBAR ──────────────────────────────────────────────────
const Sidebar = ({ active, setActive, collapsed, setCollapsed }) => (
  <div className="flex flex-col h-full transition-all duration-300 flex-shrink-0"
    style={{ width: collapsed ? 64 : 220, background: "rgba(13,17,23,0.95)", borderRight: `1px solid ${C.border}` }}>
    {/* Logo */}
    <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: `1px solid ${C.border}` }}>
      {!collapsed && (
        <div className="flex-1">
          <div className="font-black text-base tracking-tight" style={{ color: C.text }}>
            <span style={{ color: C.blue }}>VHP</span> Forge
          </div>
          <div className="text-xs" style={{ color: C.textMuted }}>Innovation Hub</div>
        </div>
      )}
      <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg"
        style={{ color: C.textMuted, background: "rgba(255,255,255,0.04)" }}>
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
    {/* Nav */}
    <nav className="flex-1 py-4 px-2 space-y-1">
      {navItems.map(item => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => setActive(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
            style={{
              background: isActive ? `${C.blue}18` : "transparent",
              color: isActive ? C.blueLight : C.textMuted,
              borderLeft: isActive ? `2px solid ${C.blue}` : "2px solid transparent",
            }}>
            <item.icon size={17} />
            {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
          </button>
        );
      })}
    </nav>
    {/* Footer */}
    {!collapsed && (
      <div className="px-4 py-4" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="text-xs font-medium" style={{ color: C.textMuted }}>Vinod H. Patil</div>
        <div className="text-xs mt-0.5" style={{ color: `${C.teal}99` }}>Forged with Agentic AI ⚒</div>
      </div>
    )}
  </div>
);

// ─── TOPBAR ───────────────────────────────────────────────────
const TopBar = ({ active }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const label = navItems.find(n => n.id === active)?.label || "";
  const NavIcon = navItems.find(n => n.id === active)?.icon;

  return (
    <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
      style={{ borderBottom: `1px solid ${C.border}`, background: "rgba(13,17,23,0.8)", backdropFilter: "blur(8px)" }}>
      <div className="flex items-center gap-2">
        {NavIcon && <NavIcon size={16} style={{ color: C.blue }} />}
        <div>
          <div className="font-semibold text-sm" style={{ color: C.text }}>{label}</div>
          <div className="text-xs" style={{ color: C.textMuted, fontFamily: mono }}>
            {time.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
            {" · "}
            {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <Bell size={18} style={{ color: C.textMuted }} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-center"
            style={{ background: C.red, color: "#fff", fontSize: 9, lineHeight: "16px" }}>3</span>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
          style={{ background: `linear-gradient(135deg, ${C.blue}, #7C3AED)`, color: "#fff" }}>
          VP
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [active, setActive] = useState("health");
  const [collapsed, setCollapsed] = useState(false);
  const [welcomed, setWelcomed] = useState(true);

  const modules = {
    "health":      <HealthModule welcome={welcomed} />,
    "agentic-ai":  <AgenticModule />,
    "org-summary": <OrgModule />,
    "poc-lab":     <PoCModule />,
    "iot-safety":  <IoTModule />,
  };

  const handleNav = (id) => { setActive(id); if (id !== "health") setWelcomed(false); };

  return (
    <div className="flex h-screen overflow-hidden"
      style={{ background: C.bg, color: C.text, fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        input, textarea, select { outline: none; }
        input::placeholder, textarea::placeholder { color: rgba(110,118,129,0.6); }
        input[type=range] { accent-color: #2563EB; cursor: pointer; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .animate-pulse { animation: pulse 2s infinite; }
        @media (max-width:768px) {
          .sidebar-wrap { display: none !important; }
          .mobile-nav { display: flex !important; }
          .main-content { padding-bottom: 60px; }
        }
        @media (min-width:769px) {
          .sidebar-wrap { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>

      {/* Sidebar — desktop */}
      <div className="sidebar-wrap flex-shrink-0" style={{ display: "flex" }}>
        <Sidebar active={active} setActive={handleNav} collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar active={active} />
        <div className="flex-1 overflow-y-auto main-content">
          {modules[active]}
        </div>
        <div className="text-xs py-2 text-center flex-shrink-0"
          style={{ borderTop: `1px solid ${C.border}`, color: C.textMuted }}>
          VHP Forge &nbsp;·&nbsp; Built by Vinod H. Patil &nbsp;·&nbsp; Forged with Agentic AI ⚒
        </div>
      </div>

      {/* Bottom nav — mobile */}
      <div className="mobile-nav fixed bottom-0 left-0 right-0 z-50"
        style={{ display: "none", background: "rgba(13,17,23,0.97)", borderTop: `1px solid ${C.border}` }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => handleNav(item.id)}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors"
            style={{ color: active === item.id ? C.blue : C.textMuted }}>
            <item.icon size={17} />
            <span style={{ fontSize: 9, fontWeight: active === item.id ? 700 : 400 }}>
              {item.label.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
