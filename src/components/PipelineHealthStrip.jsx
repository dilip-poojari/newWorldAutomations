import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

const PipelineHealthStrip = () => {
  const { toolchains, schematics, featureFlags, eventNotifications, getSystemHealth } = useDashboard();

  const systemHealth = getSystemHealth();
  
  const healthColors = {
    success: 'border-accent-green',
    warning: 'border-accent-amber',
    error: 'border-accent-red'
  };

  const statusItems = [
    {
      label: 'Toolchain',
      status: toolchains.some(t => t.status === 'failed') ? 'error' : 
              toolchains.some(t => t.status === 'running') ? 'warning' : 'success',
      detail: `Last run: ${toolchains[0]?.lastRun || 'N/A'}`,
      icon: '🔧',
      href: '#build'
    },
    {
      label: 'Schematics',
      status: schematics.some(s => s.status === 'drift') ? 'warning' : 'success',
      detail: schematics.some(s => s.status === 'drift') ? 'Drift detected' : 'Workspace synced',
      icon: '⚙️',
      href: '#provision'
    },
    {
      label: 'Feature Flags',
      status: featureFlags.filter(f => f.status === 'off').length > 0 ? 'warning' : 'success',
      detail: `${featureFlags.filter(f => f.status === 'off').length} flags inactive`,
      icon: '🚩',
      href: '#control'
    },
    {
      label: 'Event Notifications',
      status: eventNotifications.some(e => e.severity === 'error') ? 'error' : 
              eventNotifications.some(e => e.severity === 'warning') ? 'warning' : 'success',
      detail: `${eventNotifications.filter(e => e.severity === 'error' || e.severity === 'warning').length} alerts firing`,
      icon: '🔔',
      href: '#react'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-accent-green';
      case 'warning': return 'bg-accent-amber';
      case 'error': return 'bg-accent-red';
      default: return 'bg-text-secondary';
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`border-t-2 ${healthColors[systemHealth]} bg-surface/50 backdrop-blur-sm`}
    >
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {statusItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-surface transition-colors group"
            >
              {/* Status Indicator */}
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status === 'error' && (
                    <motion.div
                      className={`absolute inset-0 rounded-full ${getStatusColor(item.status)}`}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>

              {/* Icon */}
              <span className="text-xl">{item.icon}</span>

              {/* Label and Detail */}
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors">
                  {item.label}
                </span>
                <span className="text-xs text-text-secondary">
                  {item.detail}
                </span>
              </div>

              {/* Separator */}
              {index < statusItems.length - 1 && (
                <div className="hidden lg:block w-px h-8 bg-border ml-4" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineHealthStrip;

// Made with Bob
