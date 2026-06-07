# ⚒ VHP Forge — Personal Innovation Hub

> **Built by Vinod H. Patil** | Forged with Agentic AI

Your personal weekend innovation engine. Raw ideas go in. Forged products come out.

**POC → MVP → Production** — one weekend at a time.

---

## 5 Live Modules

| Module | Description |
|--------|-------------|
| 🫀 Health Tracker | Metrics, BMI, mood, weekly trends |
| 🧠 Agentic AI Work | AI project tracker with status pipeline |
| 🏢 Organisation | Organization 1 — team, clients, workstreams |
| ⚗️ PoC Lab | Idea-to-production forge with progress tracking |
| 🛡️ IoT Safety | Live industrial sensor dashboard |

---

## ⚡ Run Locally

### Prerequisites
- Node.js 18+ → https://nodejs.org

```bash
npm install
npm run dev
```
→ http://localhost:3000

---

## 🚀 Deploy to Vercel (Free — ~10 minutes)

### Step 1 — Create a GitHub repo
→ https://github.com/new
- Name: `vhp-forge`
- Visibility: **Private**
- Click **Create repository**

### Step 2 — Push this code
Open terminal in this folder:

```bash
git init
git add .
git commit -m "⚒ VHP Forge v1.0 — ignition"
git branch -M main
git remote add origin https://github.com/vinodhpatil/vhp-forge.git
git push -u origin main
```


### Step 3 — Deploy on Vercel
1. Go to → https://vercel.com/signup
2. **Continue with GitHub** → authorise
3. **Add New → Project** → Import `vhp-forge`
4. Vite is auto-detected — click **Deploy** (no settings to change)

### Step 4 — Claim your URL 🎉
Project Settings → Domains → try:
```
vhpforge.vercel.app
```

---

## 🔄 Ship Updates Instantly

```bash
git add .
git commit -m "forge: your update description"
git push
```
Vercel auto-redeploys in ~30 seconds. Zero ops.

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS + Inline styles |
| Charts | Recharts |
| Icons | Lucide React |
| State | localStorage |
| Hosting | Vercel (free forever) |

---

## 📁 Structure

```
vhp-forge/
├── index.html              # Entry point
├── vite.config.js
├── tailwind.config.js
├── vercel.json             # SPA routing
├── package.json
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # All 5 modules
    └── index.css           # Global styles
```

---

*⚒ VHP Forge v1.0 — Where raw ideas become real products.*
