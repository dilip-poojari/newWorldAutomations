import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import TopNavigation from './components/TopNavigation';
import PipelineHealthStrip from './components/PipelineHealthStrip';
import ToolchainsCard from './components/ToolchainsCard';
import SchematicsCard from './components/SchematicsCard';
import FeatureFlagsCard from './components/FeatureFlagsCard';
import EventNotificationsCard from './components/EventNotificationsCard';
import PipelineFlowVisualizer from './components/PipelineFlowVisualizer';
import AIAssistantPanel from './components/AIAssistantPanel';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Pipeline Health Strip */}
        <PipelineHealthStrip />

        {/* Main Content */}
        <div className="max-w-[1920px] mx-auto px-6 py-8">
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Build Card */}
            <ToolchainsCard />

            {/* Provision Card */}
            <SchematicsCard />

            {/* Control Card */}
            <FeatureFlagsCard />
          </div>

          {/* React Card - Full Width */}
          <div className="mb-8">
            <EventNotificationsCard />
          </div>

          {/* Pipeline Flow Visualizer */}
          <PipelineFlowVisualizer />
        </div>

        {/* AI Assistant Panel */}
        <AIAssistantPanel />
      </div>
    </DashboardProvider>
  );
}

export default App;

// Made with Bob
