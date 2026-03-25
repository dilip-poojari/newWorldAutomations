# 🚀 Quick Start Guide

Get the IBM Cloud Automations Mission Control dashboard running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

## Installation Steps

### 1. Navigate to the project directory
```bash
cd ibm-cloud-automations
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The dashboard will open automatically at `http://localhost:3000`

## What You'll See

### 🎯 Main Dashboard
- **Top Navigation** - IBM Cloud Automations branding with notification bell
- **Pipeline Health Strip** - Real-time status of all services (click to jump to sections)
- **Service Cards** - Four interactive widgets:
  - 🔧 Toolchains (Build)
  - ⚙️ Schematics (Provision)
  - 🚩 Feature Flags (Control)
  - 🔔 Event Notifications (React)
- **Pipeline Flow Visualizer** - Animated diagram showing service connections
- **AI Assistant** - Right-side panel (click the purple icon if collapsed)

### 🎨 Interactive Features

**Try these interactions:**
1. Click status pills in the health strip to scroll to sections
2. Toggle feature flags on/off
3. Hover over pipeline cards to see action buttons
4. Watch the animated flow diagram
5. Ask the AI assistant questions like:
   - "Why is my Schematics workspace showing drift?"
   - "Which feature flags should I clean up?"
   - "Set up an alert for my next Toolchain failure"

## Mock Data

All data is simulated - no backend required! The dashboard includes:
- 3 toolchain pipelines with different statuses
- 3 Schematics workspaces (one with drift)
- 5 feature flags with various rollout percentages
- 5 recent event notifications
- Auto-updating event feed (every 30 seconds)

## Customization

### Change Mock Data
Edit [`src/context/DashboardContext.jsx`](src/context/DashboardContext.jsx) to modify:
- Pipeline names and statuses
- Workspace configurations
- Feature flag settings
- Event notifications

### Adjust Colors
Edit [`tailwind.config.js`](tailwind.config.js) to customize the color scheme:
```javascript
colors: {
  'accent-blue': '#4f8ef7',    // Change primary color
  'accent-purple': '#8b5cf6',  // Change AI panel color
  // ... more colors
}
```

### Enable Real Claude API
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your Anthropic API key:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

3. Update [`src/components/AIAssistantPanel.jsx`](src/components/AIAssistantPanel.jsx) to use the real API (see README for details)

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready to deploy to any static hosting service.

## Troubleshooting

### Port 3000 already in use?
Edit [`vite.config.js`](vite.config.js) and change the port:
```javascript
server: {
  port: 3001,  // Use a different port
}
```

### Dependencies not installing?
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Animations not smooth?
Ensure hardware acceleration is enabled in your browser settings.

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the component structure in `src/components/`
- Customize the mock data to match your use case
- Deploy to Vercel, Netlify, or your preferred hosting

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review component code in `src/components/`
- Open an issue on GitHub

---

**Enjoy your Mission Control dashboard! 🎉**