# IBM Cloud Automations - Mission Control Dashboard

A modern, dark-themed React dashboard for IBM Cloud Automations featuring real-time pipeline monitoring, interactive service cards, animated flow visualizations, and an AI-powered assistant.

## 🚀 Features

### Core Components
- **Top Navigation** - Sticky header with notification badges and quick access
- **Pipeline Health Strip** - Real-time system status with color-coded indicators
- **Service Cards** - Living widgets for each automation service:
  - 🔧 **Toolchains** - Build pipelines with sparklines and status tracking
  - ⚙️ **Schematics** - Infrastructure workspaces with drift detection
  - 🚩 **Feature Flags** - Toggle controls with rollout percentages
  - 🔔 **Event Notifications** - Live feed with channel status
- **Pipeline Flow Visualizer** - Animated SVG showing service connections
- **AI Assistant Panel** - Context-aware chatbot with suggested prompts

### Design Features
- Dark theme with IBM Carbon-inspired colors
- Framer Motion animations throughout
- Sparklines and data visualizations with Recharts
- Responsive layout with Tailwind CSS
- Glass morphism effects and gradient accents
- Micro-interactions on hover/click

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Recharts** - Chart components
- **Anthropic Claude API** - AI assistant (mock implementation included)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd ibm-cloud-automations
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will open at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🎨 Design Tokens

### Colors
```css
Background:     #0a0a0f  (near black)
Surface:        #12121a  (dark navy)
Border:         #1e1e2e  (subtle)
Accent Blue:    #4f8ef7  (primary actions)
Accent Purple:  #8b5cf6  (AI features)
Accent Green:   #22c55e  (success states)
Accent Amber:   #f59e0b  (warnings)
Accent Red:     #ef4444  (errors)
Text Primary:   #f1f5f9
Text Secondary: #94a3b8
```

### Typography
- Font: Inter or IBM Plex Sans
- Card radius: 12px
- Animation easing: cubic-bezier(0.16, 1, 0.3, 1)

## 🔧 Configuration

### Mock Data
All data is mocked in [`src/context/DashboardContext.jsx`](src/context/DashboardContext.jsx). The context includes:
- Toolchain pipeline runs with sparkline data
- Schematics workspaces with drift status
- Feature flags with rollout percentages
- Event notifications with severity levels

### AI Assistant
The AI assistant currently uses mock responses. To integrate with Claude API:

1. Install the Anthropic SDK (already in package.json)
2. Add your API key to environment variables:
```bash
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

3. Update [`src/components/AIAssistantPanel.jsx`](src/components/AIAssistantPanel.jsx) to call the real API:
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  system: getSystemContext(),
  messages: messages,
});
```

## 📁 Project Structure

```
ibm-cloud-automations/
├── src/
│   ├── components/
│   │   ├── TopNavigation.jsx
│   │   ├── PipelineHealthStrip.jsx
│   │   ├── ToolchainsCard.jsx
│   │   ├── SchematicsCard.jsx
│   │   ├── FeatureFlagsCard.jsx
│   │   ├── EventNotificationsCard.jsx
│   │   ├── PipelineFlowVisualizer.jsx
│   │   └── AIAssistantPanel.jsx
│   ├── context/
│   │   └── DashboardContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Key Interactions

### Pipeline Health Strip
- Click any status pill to scroll to that service section
- Pulsing animation on error states
- Color-coded top border reflects overall system health

### Service Cards
- Hover to reveal action buttons
- Conditional nudge banners based on configuration
- Sparklines show 7-day trends
- Feature flag toggles animate smoothly

### Pipeline Flow Visualizer
- Animated dots flow along connection paths
- Hover nodes for pulse effect
- Tooltips explain each connection
- Channel status indicators at bottom

### AI Assistant
- Collapsible right-rail panel
- Context chips show current system state
- Suggested prompts for common questions
- Streaming response animation
- Markdown formatting in responses

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- IBM Carbon Design System for design inspiration
- House of Pipeline (https://think-dbp.github.io/house-of-pipeline-dilippoojari/) for pipeline visualization concepts
- Anthropic Claude for AI capabilities

## 📧 Contact

For questions or feedback, please open an issue on GitHub.