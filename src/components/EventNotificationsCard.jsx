import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

const EventNotificationsCard = () => {
  const { eventNotifications, channels } = useDashboard();
  const scrollRef = useRef(null);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return (
          <div className="w-8 h-8 bg-accent-red/10 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 bg-accent-amber/10 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-amber" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="w-8 h-8 bg-accent-green/10 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-accent-blue/10 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'Toolchain':
        return 'text-accent-blue';
      case 'Schematics':
        return 'text-accent-purple';
      case 'Feature Flags':
        return 'text-accent-green';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <motion.div
      id="react"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-surface border border-border rounded-card p-6 hover:border-accent-amber/50 transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-amber/10 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">React — Event Notifications</h3>
            <p className="text-sm text-text-secondary">
              {eventNotifications.filter(e => e.severity === 'error' || e.severity === 'warning').length} active alerts
            </p>
          </div>
        </div>

        {/* Channel Status */}
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded ${channels.slack ? 'bg-accent-green/10' : 'bg-border'}`}>
            <span className="text-xs font-medium">Slack</span>
            {channels.slack ? (
              <svg className="w-3 h-3 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded ${channels.email ? 'bg-accent-green/10' : 'bg-border'}`}>
            <span className="text-xs font-medium">Email</span>
            {channels.email ? (
              <svg className="w-3 h-3 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded ${channels.pagerduty ? 'bg-accent-green/10' : 'bg-accent-amber/10'}`}>
            <span className="text-xs font-medium">PagerDuty</span>
            {channels.pagerduty ? (
              <svg className="w-3 h-3 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-accent-amber" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Event Feed */}
      <div ref={scrollRef} className="space-y-3 mb-6 max-h-96 overflow-y-auto scrollbar-thin">
        <AnimatePresence>
          {eventNotifications.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.05 * index }}
              className="flex items-start space-x-3 p-3 bg-background rounded-lg hover:bg-background/80 transition-colors group"
            >
              {/* Severity Icon */}
              {getSeverityIcon(event.severity)}

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs font-semibold ${getSourceColor(event.source)}`}>
                    {event.source}
                  </span>
                  <span className="text-xs text-text-secondary">•</span>
                  <span className="text-xs text-text-secondary">{event.time}</span>
                </div>
                <p className="text-sm text-text-primary font-medium mb-1">
                  {event.event}
                </p>
                <p className="text-xs text-text-secondary">
                  {event.details}
                </p>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-text-secondary hover:text-accent-blue transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer CTAs */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-accent-amber hover:text-accent-amber/80 font-medium"
        >
          View All Events →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-accent-amber text-white rounded-lg text-sm font-medium hover:bg-accent-amber/90 transition-colors"
        >
          + Add Channel
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EventNotificationsCard;

// Made with Bob
