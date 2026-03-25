import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const ToolchainsCard = () => {
  const { toolchains, channels } = useDashboard();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'failed':
        return (
          <svg className="w-5 h-5 text-accent-red" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'running':
        return (
          <motion.svg
            className="w-5 h-5 text-accent-blue"
            fill="currentColor"
            viewBox="0 0 20 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </motion.svg>
        );
      default:
        return null;
    }
  };

  const showNudgeBanner = !channels.pagerduty;

  return (
    <motion.div
      id="build"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-surface border border-border rounded-card p-6 hover:border-accent-blue/50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Build — Toolchains</h3>
            <p className="text-sm text-text-secondary">{toolchains.length} active pipelines</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            toolchains.some(t => t.status === 'failed') 
              ? 'bg-accent-red/10 text-accent-red' 
              : 'bg-accent-green/10 text-accent-green'
          }`}>
            {toolchains.some(t => t.status === 'failed') ? 'Issues' : 'Healthy'}
          </span>
        </div>
      </div>

      {/* Pipeline List */}
      <div className="space-y-4 mb-6">
        {toolchains.map((toolchain, index) => (
          <motion.div
            key={toolchain.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-background/80 transition-colors group"
          >
            <div className="flex items-center space-x-4 flex-1">
              {/* Status Icon */}
              <div>{getStatusIcon(toolchain.status)}</div>

              {/* Pipeline Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-text-primary truncate">
                    {toolchain.name}
                  </h4>
                  <span className="text-xs text-text-secondary">•</span>
                  <span className="text-xs text-text-secondary">{toolchain.branch}</span>
                </div>
                <p className="text-xs text-text-secondary truncate mt-1">
                  {toolchain.commit}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  Last run: {toolchain.lastRun}
                </p>
              </div>

              {/* Sparkline */}
              <div className="w-24 h-12 hidden md:block">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={toolchain.sparkline}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f8ef7"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 p-2 text-text-secondary hover:text-accent-blue transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Nudge Banner */}
      {showNudgeBanner && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-accent-amber/10 border border-accent-amber/30 rounded-lg"
        >
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-text-primary">
                Connect Event Notifications to get alerts on failures
              </p>
              <button className="text-xs text-accent-blue hover:underline mt-1">
                Set up now →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer CTAs */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-accent-blue hover:text-accent-blue/80 font-medium"
        >
          View Pipelines →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-medium hover:bg-accent-blue/90 transition-colors"
        >
          + New Toolchain
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ToolchainsCard;

// Made with Bob
