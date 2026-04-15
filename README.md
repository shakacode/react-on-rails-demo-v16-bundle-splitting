# React on Rails Demo: SSR, Auto-Registration & Bundle Splitting with v16 and Rails 8

A fully working demo of React on Rails v16 on Rails 8, showcasing server-side rendering, auto-registration, and bundle splitting capabilities. This demo also demonstrates the **corrected installation sequence** that fixes the infamous "package.json not found" error.

![React on Rails](https://img.shields.io/badge/React%20on%20Rails-16.1.1-blue)
![Rails](https://img.shields.io/badge/Rails-8.0.1-red)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB)
![Shakapacker](https://img.shields.io/badge/Shakapacker-8.3.0-green)
![Auto-Registration](https://img.shields.io/badge/Auto--Registration-✅-brightgreen)

✅ **Includes:**
- **Server-Side Rendering (SSR)** - React components render on the server for faster initial page loads
- **Auto-Registration** - Components in file system are automatically discovered and registered
- **Bundle Splitting** - Automatic code splitting for optimized loading performance (12.5KB vs 1.1MB+ bundles)
- **CSS Modules** - Scoped CSS with automatic class name generation
- **Multiple Dev Modes** - HMR, static, and production-like development servers
- **Rails 8 Integration** - Latest Rails version with modern asset pipeline
- **Installation Fix** - Corrected Shakapacker → React on Rails sequence

📂 **Repo name:** `react_on_rails-demo-v16-ssr-auto-registration-bundle-splitting`

📚 **Part of the** [React on Rails Demo Series](https://github.com/shakacode?tab=repositories&q=react_on_rails-demo)

## 📦 Production Build Note

Production builds now generate the auto-registration entry files on demand.
The checked-in [`Dockerfile`](./Dockerfile) runs [`bin/build-production`](./bin/build-production)
before `assets:precompile`, which:

- regenerates `app/javascript/packs/generated/*`
- regenerates `app/javascript/generated/server-bundle-generated.js`
- compiles the client bundles and `public/packs/server-bundle.js`
- leaves Node.js available in the final image so ExecJS can evaluate the SSR bundle at runtime

That keeps local development, Docker builds, and Control Plane deploys aligned on the same production bundle path.

## 🎯 What This Demo Solves

This sample application demonstrates the **critical fix** for the React on Rails installation issue where generators would fail with:

```bash
ERROR: package.json not found
```

**The Solution:** Install Shakapacker BEFORE React on Rails, not after.

## 📚 Documentation Guide

This demo includes comprehensive documentation for both developers and AI coding agents:

### 🚀 Quick Start & Setup
- **[REACT_ON_RAILS_QUICKSTART.md](./REACT_ON_RAILS_QUICKSTART.md)** - Step-by-step installation guide with corrected sequence
- **[docs/INSTALLATION_TROUBLESHOOTING.md](./docs/INSTALLATION_TROUBLESHOOTING.md)** - Fix common setup issues and errors
- **[docs/README.md](./docs/README.md)** - Quick reference for running this demo

### 🏗️ Technical Deep Dives
- **[docs/ARCHITECTURE_OVERVIEW.md](./docs/ARCHITECTURE_OVERVIEW.md)** - System design, bundle splitting, and component patterns
- **[docs/SSR_DYNAMIC_IMPORTS_GUIDE.md](./docs/SSR_DYNAMIC_IMPORTS_GUIDE.md)** - SSR implementation with skeleton loaders
- **[docs/PRODUCTION_TESTING.md](./docs/PRODUCTION_TESTING.md)** - Development modes and testing strategies

## ✨ Features Demonstrated

- ✅ **Auto-Registration** - Zero manual `ReactOnRails.register()` and `append_javascript_pack_tag` calls needed due to **File-System Based Detection** - Components auto-discovered from directory structure
- ✅ **Bundle Splitting** - Lightweight (12.5KB) vs Heavy (1.1MB+) component demos
- ✅ **Server-Side Rendering** - Both components work with SSR enabled
- ✅ **Modern Development Tools** - Enhanced `bin/dev` script with 3 modes
- ✅ **Production-Ready Patterns** - Dynamic imports, skeleton loaders, CSS modules

## 🚀 Quick Start

```bash
# Clone the demo repository
git clone https://github.com/shakacode/react_on_rails-demo-v16-ssr-auto-registration-bundle-splitting.git
cd react_on_rails-demo-v16-ssr-auto-registration-bundle-splitting

# Install dependencies
bundle install && npm install

# Start development server
./bin/dev

# Visit the demo
open http://localhost:3000
```

### 🌐 Demo Components

- **[HelloWorld](http://localhost:3000)** - Lightweight component (12.5KB bundle)
- **[HeavyMarkdownEditor](http://localhost:3000/heavy_markdown_editor)** - Heavy component (1.1MB+ bundle with live markdown editing)

## 🔧 Development Commands

- **`./bin/dev`** - Start development server (3 modes available)
  - `./bin/dev` - HMR mode (default, may have FOUC)
  - `./bin/dev static` - Static mode (no FOUC, no HMR)
  - `./bin/dev prod` - Production-optimized mode (port 3001)
- **`bundle exec rake react_on_rails:generate_packs`** - Regenerate webpack entries (now with enhanced error display)
- **`./bin/dev help`** - Show all available modes

## 🔄 Upgrading React on Rails

After upgrading to a new major version, run the generator to get latest defaults:

```bash
rails generate react_on_rails:install
```

**Important**: Review changes carefully before applying to avoid overwriting custom configurations. The generator updates:
- `bin/dev` (improved development workflow)
- webpack configurations
- shakapacker.yml settings
- other configuration files

## 🎯 Key Architectural Concepts

This demo showcases React on Rails v16's **file-system-based auto-registration**:

- **Magic Directory**: Components in `app/javascript/src/ComponentName/ror_components/` are automatically discovered
- **Auto-Generated Entries**: `rake react_on_rails:generate_packs` creates webpack bundles
- **Zero Manual Registration**: No `ReactOnRails.register()` calls needed
- **Bundle Splitting**: Each component gets its own optimized bundle

## 🔗 Related Resources

- **[React on Rails Documentation](https://shakacode.gitbook.io/react-on-rails/)** - Official docs
- **[Shakapacker Documentation](https://github.com/shakacode/shakapacker)** - Webpack integration
- **[React on Rails Pro](https://www.shakacode.com/react-on-rails-pro)** - Advanced features
- **[Demo Repository](https://github.com/shakacode/react_on_rails-demo-v16-ssr-auto-registration-bundle-splitting)** - This complete working example

## 🚢 Control Plane Flow

This repo now includes the shared `cpflow` GitHub Actions flow for review apps,
automatic staging deploys, and manual promotion to production.

See **[.controlplane/readme.md](./.controlplane/readme.md)** for:

- required GitHub Actions secrets and variables
- the app names used for staging, review, and production
- the runtime `SECRET_KEY_BASE` secret requirement
- local `cpflow` commands for setup, deploy, and troubleshooting

## 📊 Performance Metrics

| Component | Bundle Size | Dependencies | Load Time | Use Case |
|-----------|-------------|--------------|-----------|----------|
| **HelloWorld** | 12.5KB | React basics | Instant | Lightweight UI |
| **HeavyMarkdownEditor** | 1.1MB+ | 58+ libraries | ~200ms | Rich features |

**Bundle Splitting Benefit**: HelloWorld loads 50% faster by avoiding heavy markdown dependencies!

## ⭐ Why This Demo Matters

This sample application **fixes a critical bug** in the official React on Rails installation documentation and demonstrates production-ready patterns:

- **🐛 Fixes Installation Bug**: Corrects the "package.json not found" error with proper Shakapacker → React on Rails sequence
- **🚀 Modern Architecture**: File-system-based auto-registration eliminates manual configuration
- **📦 Performance**: Intelligent bundle splitting for optimal loading
- **🔧 Developer Experience**: Enhanced development tools with multiple testing modes

**Perfect for**: Learning React on Rails v16, understanding bundle splitting, or using as a reference implementation.

## 🔧 Troubleshooting

### Socket Path Too Long Error

If you see this error:
```
error connecting to /private/tmp/tmux-501/overmind-react-on-rails-demo-v16... (File name too long)
```

**Solution**: The project directory name is too long for tmux socket paths. We've included a `.overmind.env` file with shorter paths, but if you still encounter issues:

1. The `.overmind.env` file sets: `OVERMIND_SOCKET=/tmp/ror-demo.sock` and `OVERMIND_TITLE=ror-demo`
2. Alternative: Set environment variables manually: `export OVERMIND_SOCKET=/tmp/ror.sock`
3. Or use foreman instead: `gem install foreman && foreman start -f Procfile.dev`

---

**⭐ Star this project if it helped you!**
