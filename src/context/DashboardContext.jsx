import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

// Mock data generator
const generateSparklineData = (days = 7) => {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 50) + 10
  }));
};

const initialMockState = {
  toolchains: [
    { 
      id: 1,
      name: "my-app-cd", 
      status: "success", 
      branch: "main", 
      lastRun: "14m ago",
      commit: "feat: add new checkout flow",
      sparkline: generateSparklineData()
    },
    { 
      id: 2,
      name: "infra-deploy", 
      status: "failed", 
      branch: "feat/vpc-update", 
      lastRun: "2h ago",
      commit: "fix: update VPC configuration",
      sparkline: generateSparklineData()
    },
    { 
      id: 3,
      name: "api-gateway-pipeline", 
      status: "running", 
      branch: "develop", 
      lastRun: "5m ago",
      commit: "chore: update dependencies",
      sparkline: generateSparklineData()
    },
  ],
  schematics: [
    { 
      id: 1,
      name: "prod-vpc-workspace", 
      status: "drift", 
      lastApplied: "3h ago", 
      type: "terraform",
      resources: 24,
      costDelta: "+$12"
    },
    { 
      id: 2,
      name: "app-config-ansible", 
      status: "synced", 
      lastApplied: "1d ago", 
      type: "ansible",
      resources: 8,
      costDelta: "$0"
    },
    { 
      id: 3,
      name: "staging-infrastructure", 
      status: "synced", 
      lastApplied: "6h ago", 
      type: "terraform",
      resources: 15,
      costDelta: "-$3"
    },
  ],
  featureFlags: [
    { 
      id: 1,
      name: "new-checkout-flow", 
      status: "on", 
      rollout: 25, 
      env: "production",
      evaluations: generateSparklineData(),
      description: "New streamlined checkout experience"
    },
    { 
      id: 2,
      name: "dark-mode-v2", 
      status: "off", 
      rollout: 0, 
      env: "production",
      evaluations: generateSparklineData(),
      description: "Enhanced dark mode with custom themes"
    },
    { 
      id: 3,
      name: "ai-recommendations", 
      status: "on", 
      rollout: 100, 
      env: "staging",
      evaluations: generateSparklineData(),
      description: "AI-powered product recommendations"
    },
    { 
      id: 4,
      name: "advanced-analytics", 
      status: "on", 
      rollout: 50, 
      env: "production",
      evaluations: generateSparklineData(),
      description: "Advanced analytics dashboard"
    },
    { 
      id: 5,
      name: "beta-features", 
      status: "off", 
      rollout: 0, 
      env: "production",
      evaluations: generateSparklineData(),
      description: "Beta feature access for early adopters"
    },
  ],
  eventNotifications: [
    { 
      id: 1,
      source: "Schematics", 
      event: "Drift detected in prod-vpc-workspace", 
      severity: "warning", 
      time: "5m ago",
      details: "3 resources have drifted from expected state"
    },
    { 
      id: 2,
      source: "Toolchain", 
      event: "Pipeline failed: infra-deploy", 
      severity: "error", 
      time: "2h ago",
      details: "Build step failed with exit code 1"
    },
    { 
      id: 3,
      source: "Feature Flags", 
      event: "Flag evaluation spike detected", 
      severity: "info", 
      time: "4h ago",
      details: "new-checkout-flow evaluations increased 300%"
    },
    { 
      id: 4,
      source: "Toolchain", 
      event: "Deployment successful: my-app-cd", 
      severity: "success", 
      time: "14m ago",
      details: "Deployed to production environment"
    },
    { 
      id: 5,
      source: "Schematics", 
      event: "Workspace applied successfully", 
      severity: "success", 
      time: "6h ago",
      details: "staging-infrastructure updated with 2 changes"
    },
  ],
  channels: {
    slack: true,
    email: true,
    pagerduty: false
  }
};

export const DashboardProvider = ({ children }) => {
  const [state, setState] = useState(initialMockState);
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');
  const [aiPanelOpen, setAiPanelOpen] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        eventNotifications: [
          ...prev.eventNotifications.slice(0, 4),
          {
            id: Date.now(),
            source: ['Toolchain', 'Schematics', 'Feature Flags'][Math.floor(Math.random() * 3)],
            event: 'System update',
            severity: ['info', 'success'][Math.floor(Math.random() * 2)],
            time: 'Just now',
            details: 'Automated system check completed'
          }
        ].slice(0, 5)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleFeatureFlag = (flagId) => {
    setState(prev => ({
      ...prev,
      featureFlags: prev.featureFlags.map(flag =>
        flag.id === flagId
          ? { ...flag, status: flag.status === 'on' ? 'off' : 'on' }
          : flag
      )
    }));
  };

  const updateFlagRollout = (flagId, rollout) => {
    setState(prev => ({
      ...prev,
      featureFlags: prev.featureFlags.map(flag =>
        flag.id === flagId
          ? { ...flag, rollout }
          : flag
      )
    }));
  };

  const getSystemHealth = () => {
    const hasErrors = state.toolchains.some(t => t.status === 'failed') ||
                      state.eventNotifications.some(e => e.severity === 'error');
    const hasWarnings = state.schematics.some(s => s.status === 'drift') ||
                        state.eventNotifications.some(e => e.severity === 'warning');
    
    if (hasErrors) return 'error';
    if (hasWarnings) return 'warning';
    return 'success';
  };

  const value = {
    ...state,
    selectedEnvironment,
    setSelectedEnvironment,
    aiPanelOpen,
    setAiPanelOpen,
    toggleFeatureFlag,
    updateFlagRollout,
    getSystemHealth,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// Made with Bob
