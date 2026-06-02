const path = require('path');

const { reactOnRailsProNodeRenderer } = require('@shakacode-tools/react-on-rails-pro-node-renderer');

const { env } = process;

const config = {
  // Bundle path where webpack outputs the bundles
  bundlePath: path.resolve(__dirname, '../ssr-generated'),

  // Listen at RENDERER_PORT env value or default port 3800
  port: env.RENDERER_PORT || 3800,

  // Log level
  logLevel: env.RENDERER_LOG_LEVEL || 'info',

  // Password should match the one in config/initializers/react_on_rails_pro.rb
  // In production, use ENV variable
  password: env.RENDERER_PASSWORD || 'devPassword',

  // Enable support for NodeJS modules in server bundle
  // Required for React Server Components
  supportModules: true,

  // Additional context for VM
  additionalContext: { URL, AbortController },

  // Required to use setTimeout, setInterval, & clearTimeout during server rendering
  stubTimers: false,

  // Replay console logs from async server operations
  replayServerAsyncOperationLogs: true,
};

reactOnRailsProNodeRenderer(config);
