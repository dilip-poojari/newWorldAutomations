import React from 'react';
import { motion } from 'framer-motion';

const PipelineFlowVisualizer = () => {
  const nodes = [
    { id: 'toolchains', label: 'Toolchains', icon: '🔧', color: 'accent-blue', x: 50, y: 50 },
    { id: 'schematics', label: 'Schematics', icon: '⚙️', color: 'accent-purple', x: 300, y: 50 },
    { id: 'flags', label: 'Feature Flags', icon: '🚩', color: 'accent-green', x: 550, y: 50 },
    { id: 'events', label: 'Event Notifications', icon: '🔔', color: 'accent-amber', x: 300, y: 200 },
  ];

  const connections = [
    { from: 'toolchains', to: 'schematics', label: 'deploy', path: 'M 150 50 L 250 50' },
    { from: 'schematics', to: 'flags', label: 'provisions', path: 'M 400 50 L 500 50' },
    { from: 'flags', to: 'events', label: 'signals', path: 'M 600 100 Q 600 150, 400 200' },
    { from: 'schematics', to: 'events', label: 'alerts', path: 'M 350 100 L 350 150' },
    { from: 'toolchains', to: 'events', label: 'notifies', path: 'M 100 100 Q 100 200, 250 200' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-surface border border-border rounded-card p-8 mt-8"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Pipeline Flow
        </h3>
        <p className="text-sm text-text-secondary">
          How your automation services connect and communicate
        </p>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-80 bg-background rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 700 300">
          <defs>
            {/* Gradient for connections */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>

            {/* Arrow marker */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="url(#connectionGradient)" />
            </marker>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines */}
          {connections.map((conn, index) => (
            <g key={`${conn.from}-${conn.to}`}>
              {/* Base line */}
              <motion.path
                d={conn.path}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              />

              {/* Animated flow dot */}
              <motion.circle
                r="4"
                fill="#4f8ef7"
                filter="url(#glow)"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ 
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: 1 + index * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{ offsetPath: `path('${conn.path}')` }}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${1 + index * 0.3}s`}
                >
                  <mpath href={`#path-${index}`} />
                </animateMotion>
              </motion.circle>

              {/* Hidden path for animation */}
              <path id={`path-${index}`} d={conn.path} fill="none" stroke="none" />

              {/* Connection label */}
              <motion.text
                x={conn.path.includes('Q') ? 400 : (parseInt(conn.path.split(' ')[1]) + parseInt(conn.path.split(' ')[4])) / 2}
                y={conn.path.includes('Q') ? 125 : parseInt(conn.path.split(' ')[2]) - 10}
                fill="#94a3b8"
                fontSize="11"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.2 }}
              >
                {conn.label}
              </motion.text>
            </g>
          ))}

          {/* Service Nodes */}
          {nodes.map((node, index) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
            >
              {/* Node background */}
              <motion.rect
                x={node.x}
                y={node.y}
                width="100"
                height="60"
                rx="8"
                fill="#12121a"
                stroke={`var(--${node.color})`}
                strokeWidth="2"
                whileHover={{ scale: 1.05 }}
                style={{ cursor: 'pointer' }}
              />

              {/* Icon */}
              <text
                x={node.x + 50}
                y={node.y + 25}
                fontSize="20"
                textAnchor="middle"
              >
                {node.icon}
              </text>

              {/* Label */}
              <text
                x={node.x + 50}
                y={node.y + 45}
                fill="#f1f5f9"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
              >
                {node.label}
              </text>

              {/* Pulse effect on hover */}
              <motion.circle
                cx={node.x + 50}
                cy={node.y + 30}
                r="35"
                fill="none"
                stroke={`var(--${node.color})`}
                strokeWidth="1"
                opacity="0"
                whileHover={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.g>
          ))}
        </svg>

        {/* Channel indicators at bottom */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
          <span className="text-xs text-text-secondary">Sends to:</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent-green rounded-full"></div>
              <span className="text-xs text-text-primary">Slack</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent-green rounded-full"></div>
              <span className="text-xs text-text-primary">Email</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent-amber rounded-full"></div>
              <span className="text-xs text-text-primary">PagerDuty</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-accent-blue to-accent-purple text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          Start your first connected automation →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PipelineFlowVisualizer;

// Made with Bob
