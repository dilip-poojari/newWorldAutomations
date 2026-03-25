import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const FeatureFlagsCard = () => {
  const { featureFlags, selectedEnvironment, setSelectedEnvironment, toggleFeatureFlag, updateFlagRollout } = useDashboard();

  const filteredFlags = featureFlags.filter(flag => flag.env === selectedEnvironment);

  return (
    <motion.div
      id="control"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-surface border border-border rounded-card p-6 hover:border-accent-green/50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Control — Feature Flags</h3>
            <p className="text-sm text-text-secondary">
              {filteredFlags.filter(f => f.status === 'on').length} active flags
            </p>
          </div>
        </div>
        
        {/* Environment Switcher */}
        <div className="flex items-center space-x-2 bg-background rounded-lg p-1">
          <button
            onClick={() => setSelectedEnvironment('production')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              selectedEnvironment === 'production'
                ? 'bg-accent-green text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Production
          </button>
          <button
            onClick={() => setSelectedEnvironment('staging')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              selectedEnvironment === 'staging'
                ? 'bg-accent-green text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Staging
          </button>
        </div>
      </div>

      {/* Flags List */}
      <div className="space-y-4 mb-6">
        {filteredFlags.map((flag, index) => (
          <motion.div
            key={flag.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-4 bg-background rounded-lg hover:bg-background/80 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-text-primary truncate">
                    {flag.name}
                  </h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    flag.status === 'on'
                      ? 'bg-accent-green/10 text-accent-green'
                      : 'bg-text-secondary/10 text-text-secondary'
                  }`}>
                    {flag.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">
                  {flag.description}
                </p>
              </div>

              {/* Toggle Switch */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFeatureFlag(flag.id)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  flag.status === 'on' ? 'bg-accent-green' : 'bg-border'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: flag.status === 'on' ? 28 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Rollout Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Rollout</span>
                <span className="text-text-primary font-medium">{flag.rollout}%</span>
              </div>
              <div className="relative h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-green to-accent-blue rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${flag.rollout}%` }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                />
              </div>

              {/* Evaluation Sparkline */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-text-secondary">Evaluations (7d)</span>
                <div className="w-32 h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={flag.evaluations}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#22c55e"
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nudge Banner */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="mb-4 p-3 bg-accent-blue/10 border border-accent-blue/30 rounded-lg"
      >
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-text-primary">
              Use Event Notifications to alert when flag evaluation spikes
            </p>
            <button className="text-xs text-accent-blue hover:underline mt-1">
              Configure alerts →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer CTAs */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-accent-green hover:text-accent-green/80 font-medium"
        >
          Manage Flags →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-accent-green/90 transition-colors"
        >
          + New Flag
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeatureFlagsCard;

// Made with Bob
