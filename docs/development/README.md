# Copilot Chat Saver - Development Documentation

## 🏗️ Project Architecture

This project follows a modular architecture with clear separation of concerns:

```
src/
├── browser-extension/    # Chrome/Edge extension
├── cli/                 # Command-line tool
├── web-ui/             # Web interface
├── browser-automation/ # Puppeteer-based automation
└── shared/             # Common utilities
```

## 📦 Components Overview

### Browser Extension (`src/browser-extension/`)
- **Purpose**: Direct integration with browser for real-time chat extraction
- **Technologies**: Vanilla JavaScript, Chrome Extension APIs
- **Key Files**:
  - `manifest.json` - Extension configuration
  - `content.js` - Chat extraction logic
  - `popup.js/html/css` - User interface
  - `background.js` - Service worker

### CLI Tool (`src/cli/`)
- **Purpose**: Command-line interface for batch processing
- **Technologies**: Node.js, Commander.js
- **Key Files**:
  - `index.js` - Main CLI application
  - `package.json` - Dependencies and scripts

### Web UI (`src/web-ui/`)
- **Purpose**: Web-based interface for chat conversion
- **Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Key Files**:
  - `index.html` - Main interface
  - `app.js` - Application logic
  - `styles.css` - Styling

### Browser Automation (`src/browser-automation/`)
- **Purpose**: Headless browser automation for chat extraction
- **Technologies**: Puppeteer, Node.js
- **Key Files**:
  - `index.js` - Automation engine
  - `package.json` - Dependencies

### Shared Utilities (`src/shared/`)
- **Purpose**: Common functionality across all components
- **Key Files**:
  - `markdown-converter.js` - Core conversion logic
  - `test.js` - Shared testing utilities

## 🔧 Development Setup

### Prerequisites
- Node.js 16+ (for CLI and automation components)
- Chrome/Edge browser (for extension development)
- Modern web browser (for web UI)

### Setting Up Each Component

#### Browser Extension
```bash
# Load the extension in developer mode
# 1. Open chrome://extensions/ or edge://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select src/browser-extension/ folder
```

#### CLI Tool
```bash
cd src/cli
npm install
npm start --help
```

#### Browser Automation
```bash
cd src/browser-automation
npm install
node index.js
```

#### Web UI
```bash
# Serve the web UI using any static server
cd src/web-ui
python -m http.server 8000
# Or use Live Server extension in VS Code
```

## 🧪 Testing Strategy

### Unit Tests
- Shared utilities have comprehensive test coverage
- Each component includes its own test suite

### Integration Tests
- Browser extension tested on actual Copilot pages
- CLI tool tested with various input formats
- Automation tested with different chat scenarios

### Manual Testing
- Cross-browser compatibility (Chrome, Edge, Firefox)
- Different Copilot interfaces (Web, Sidebar, Mobile)
- Various conversation types (text, code, mixed)

## 🔄 Development Workflow

### 1. Local Development
```bash
# Clone and setup
git clone https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat.git
cd copilot-save-local-chat

# Install dependencies for each component
cd src/cli && npm install && cd ../..
cd src/browser-automation && npm install && cd ../..

# Load browser extension in developer mode
# Serve web UI locally
```

### 2. Making Changes
- Follow the established code style and patterns
- Update tests when adding new functionality
- Test across all supported browsers and platforms
- Update documentation for user-facing changes

### 3. Testing
```bash
# Run tests for each component
cd src/cli && npm test
cd src/browser-automation && npm test

# Manual testing checklist:
# □ Browser extension works on copilot.microsoft.com
# □ CLI processes sample files correctly
# □ Web UI converts uploaded files
# □ Automation extracts from live URLs
```

### 4. Building for Release
```bash
# Package browser extension
cd src/browser-extension
zip -r copilot-chat-saver-extension.zip . -x "*.git*" "node_modules/*"

# Build CLI distribution
cd src/cli
npm pack

# Prepare web UI for deployment
cd src/web-ui
# Copy to web server directory
```

## 📊 Code Quality

### Style Guidelines
- Use meaningful variable and function names
- Include JSDoc comments for all functions
- Follow existing indentation and formatting
- Use modern JavaScript features appropriately

### Performance Considerations
- Minimize DOM queries in content scripts
- Use efficient selectors for chat extraction
- Implement proper error handling and timeouts
- Optimize markdown conversion for large chats

### Security Best Practices
- Validate all user inputs
- Use Content Security Policy in extension
- Sanitize extracted chat content
- Handle authentication securely

## 🐛 Debugging

### Browser Extension
```javascript
// Enable debugging in content script
console.log('Debug: Chat extraction started');

// Check extension errors in chrome://extensions/
```

### CLI Tool
```bash
# Enable verbose logging
DEBUG=* node index.js

# Use Node.js debugger
node --inspect index.js
```

### Web UI
```javascript
// Use browser developer tools
console.log('Debug: File processing', fileData);

// Add breakpoints in browser DevTools
```

### Browser Automation
```bash
# Run in non-headless mode for debugging
node index.js --headless=false

# Enable Puppeteer debugging
DEBUG=puppeteer:* node index.js
```

## 📈 Performance Monitoring

### Metrics to Track
- Chat extraction time
- Markdown conversion speed
- Extension memory usage
- Automation success rate

### Optimization Targets
- Extract 100+ message chats in <5 seconds
- Convert to markdown in <1 second
- Extension memory usage <10MB
- 95%+ automation success rate

## 🔮 Future Enhancements

### Planned Features
- [ ] Support for more chat platforms (ChatGPT, Claude, etc.)
- [ ] Advanced markdown formatting options
- [ ] Cloud storage integration
- [ ] Bulk export functionality
- [ ] Search and filter capabilities

### Technical Improvements
- [ ] TypeScript migration
- [ ] Automated testing pipeline
- [ ] Performance optimization
- [ ] Better error handling
- [ ] Internationalization support