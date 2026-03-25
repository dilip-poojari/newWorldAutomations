import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

const SchematicsCard = () => {
  const { schematics } = useDashboard();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'synced':
        return (
          <span className="px-2 py-1 bg-accent-green/10 text-accent-green text-xs font-medium rounded">
            Synced
          </span>
        );
      case 'drift':
        return (
          <span className="px-2 py-1 bg-accent-amber/10 text-accent-amber text-xs font-medium rounded flex items-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>Drift</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    if (type === 'terraform') {
      return (
        <div className="w-8 h-8 bg-accent-purple/10 rounded flex items-center justify-center">
          <span className="text-accent-purple font-bold text-xs">TF</span>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 bg-accent-red/10 rounded flex items-center justify-center">
        <span className="text-accent-red font-bold text-xs">AN</span>
      </div>
    );
  };

  return (
    <motion.div
      id="provision"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-surface border border-border rounded-card p-6 hover:border-accent-purple/50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Provision — Schematics</h3>
            <p className="text-sm text-text-secondary">{schematics.length} workspaces</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-xs font-medium text-accent-purple border border-accent-purple/30 rounded hover:bg-accent-purple/10 transition-colors">
            Terraform
          </button>
          <button className="px-3 py-1 text-xs font-medium text-text-secondary border border-border rounded hover:bg-surface transition-colors">
            Ansible
          </button>
        </div>
      </div>

      {/* Workspace List */}
      <div className="space-y-4 mb-6">
        {schematics.map((workspace, index) => (
          <motion.div
            key={workspace.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-background/80 transition-colors group"
          >
            <div className="flex items-center space-x-4 flex-1">
              {/* Type Icon */}
              {getTypeIcon(workspace.type)}

              {/* Workspace Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-text-primary truncate">
                    {workspace.name}
                  </h4>
                  {getStatusBadge(workspace.status)}
                </div>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>Last applied: {workspace.lastApplied}</span>
                  <span>•</span>
                  <span>{workspace.resources} resources</span>
                  {workspace.costDelta !== '$0' && (
                    <>
                      <span>•</span>
                      <span className={workspace.costDelta.startsWith('+') ? 'text-accent-amber' : 'text-accent-green'}>
                        {workspace.costDelta}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-text-secondary hover:text-accent-purple transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nudge Banner */}
      {schematics.some(s => s.status === 'drift') && (
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
                Automate infra deploys by linking a Toolchain
              </p>
              <button className="text-xs text-accent-blue hover:underline mt-1">
                Connect now →
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
          className="text-sm text-accent-purple hover:text-accent-purple/80 font-medium"
        >
          View Workspaces →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-accent-purple text-white rounded-lg text-sm font-medium hover:bg-accent-purple/90 transition-colors"
        >
          + New Workspace
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SchematicsCard;

// Made with Bob
