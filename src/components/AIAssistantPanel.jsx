import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';

const AIAssistantPanel = () => {
  const { 
    aiPanelOpen, 
    setAiPanelOpen, 
    toolchains, 
    schematics, 
    featureFlags, 
    eventNotifications 
  } = useDashboard();

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your IBM Cloud Automations AI assistant. I can help you understand your pipeline, troubleshoot issues, and optimize your automation workflows. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate system context from dashboard state
  const getSystemContext = () => {
    const failedToolchains = toolchains.filter(t => t.status === 'failed');
    const driftWorkspaces = schematics.filter(s => s.status === 'drift');
    const inactiveFlags = featureFlags.filter(f => f.status === 'off');
    const activeAlerts = eventNotifications.filter(e => e.severity === 'error' || e.severity === 'warning');

    return `You are an IBM Cloud Automations AI assistant. 
The user's current pipeline context is:
- Toolchains: ${toolchains.length} active, last run ${toolchains[0]?.lastRun || 'N/A'}, ${failedToolchains.length > 0 ? `${failedToolchains.length} failed` : 'all successful'}
- Schematics: ${schematics.length} workspaces, ${driftWorkspaces.length > 0 ? `${driftWorkspaces.length} showing drift warning` : 'all synced'}
- Feature Flags: ${featureFlags.length} total, ${inactiveFlags.length} inactive, production environment
- Event Notifications: ${activeAlerts.length} alert${activeAlerts.length !== 1 ? 's' : ''} firing

Answer questions about their automation pipeline. 
Suggest next actions. Be concise, specific, and proactive.
Surface connections between services the user may not have noticed.`;
  };

  const suggestedPrompts = [
    "Why is my Schematics workspace showing drift?",
    "Which feature flags should I clean up?",
    "Set up an alert for my next Toolchain failure",
    "Walk me through connecting Schematics to my Toolchain"
  ];

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate API call to Claude
      // In production, this would call the Anthropic API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response based on context
      let response = '';
      const lowerMessage = messageText.toLowerCase();

      if (lowerMessage.includes('drift')) {
        response = `The drift in your **prod-vpc-workspace** indicates that 3 resources have changed outside of Terraform. This commonly happens when:\n\n1. Manual changes were made in the IBM Cloud console\n2. Another automation tool modified the resources\n3. Resources were updated by a different Terraform workspace\n\nTo resolve:\n- Run \`terraform plan\` to see the differences\n- Either apply the changes to sync, or update your Terraform code to match the current state\n- Consider enabling drift detection alerts in Event Notifications`;
      } else if (lowerMessage.includes('flag')) {
        response = `Based on your current flags, I recommend:\n\n**Safe to archive:**\n- **dark-mode-v2** (0% rollout, inactive for production)\n- **beta-features** (0% rollout, no recent evaluations)\n\n**Keep active:**\n- **new-checkout-flow** (25% rollout, showing good engagement)\n- **ai-recommendations** (100% in staging, ready for prod promotion)\n\nWould you like me to help you create a cleanup plan?`;
      } else if (lowerMessage.includes('alert') || lowerMessage.includes('failure')) {
        response = `To set up failure alerts for your Toolchains:\n\n1. Go to Event Notifications → Add Channel\n2. Select **PagerDuty** (currently not connected)\n3. Configure the rule:\n   - Source: Toolchain\n   - Event: Pipeline Failed\n   - Severity: Error\n4. Test the integration\n\nThis will ensure you're notified immediately when builds fail, reducing MTTR by ~40% on average.`;
      } else if (lowerMessage.includes('connect') || lowerMessage.includes('schematics')) {
        response = `Here's how to connect your Toolchain to Schematics for automated infrastructure deployment:\n\n1. In your Toolchain (**my-app-cd**), add a new stage\n2. Select "Schematics" as the stage type\n3. Choose workspace: **prod-vpc-workspace**\n4. Set trigger: "On successful build"\n5. Configure apply settings (auto-approve or manual)\n\nThis creates a full CI/CD pipeline: Code → Build → Deploy Infrastructure → Deploy Application`;
      } else {
        response = `I can help you with:\n\n- **Pipeline troubleshooting** - Diagnose failed builds and deployments\n- **Drift management** - Understand and resolve infrastructure drift\n- **Flag optimization** - Identify unused flags and rollout strategies\n- **Alert configuration** - Set up proactive monitoring\n- **Workflow automation** - Connect services for end-to-end automation\n\nWhat specific area would you like to explore?`;
      }

      const assistantMessage = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  if (!aiPanelOpen) {
    return (
      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onClick={() => setAiPanelOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-accent-purple to-accent-blue text-white p-4 rounded-l-lg shadow-lg hover:shadow-xl transition-shadow z-50"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed right-0 top-0 h-screen w-96 bg-surface border-l border-border shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-accent-purple/10 to-accent-blue/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-purple to-accent-blue rounded-lg flex items-center justify-center shimmer-effect">
              <span className="text-white text-lg">✦</span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              Automation Assistant
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAiPanelOpen(false)}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Context Chips */}
        <div className="flex flex-wrap gap-2">
          {toolchains.some(t => t.status === 'failed') && (
            <span className="px-2 py-1 bg-accent-red/10 text-accent-red text-xs rounded-full">
              Toolchain: {toolchains.find(t => t.status === 'failed')?.name}
            </span>
          )}
          {featureFlags.filter(f => f.status === 'off').length > 0 && (
            <span className="px-2 py-1 bg-accent-amber/10 text-accent-amber text-xs rounded-full">
              Flags: {featureFlags.filter(f => f.status === 'off').length} inactive
            </span>
          )}
          {eventNotifications.some(e => e.severity === 'error' || e.severity === 'warning') && (
            <span className="px-2 py-1 bg-accent-red/10 text-accent-red text-xs rounded-full">
              Alert: {eventNotifications.filter(e => e.severity === 'error' || e.severity === 'warning').length} firing
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-accent-blue text-white'
                    : 'bg-background text-text-primary border border-border'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-background border border-border p-3 rounded-lg">
              <div className="flex space-x-2">
                <motion.div
                  className="w-2 h-2 bg-accent-purple rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-accent-blue rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-accent-purple rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-border bg-background/50">
          <p className="text-xs text-text-secondary mb-2">Suggested prompts:</p>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSuggestedPrompt(prompt)}
                className="w-full text-left p-2 text-xs text-text-primary bg-surface hover:bg-surface/80 rounded border border-border transition-colors"
              >
                • {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-background/50">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything..."
            className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-colors"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantPanel;

// Made with Bob
