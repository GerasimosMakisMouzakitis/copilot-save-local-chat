# Project Overview

## 📋 File and Folder Organization

### `/src/` - Source Code
All application source code is organized by component:

#### `browser-extension/` - Chrome/Edge Extension
- **manifest.json** - Extension configuration and permissions
- **content.js** - Script that runs on Copilot pages to extract chat data
- **popup.html/css/js** - Extension popup interface
- **background.js** - Service worker for extension functionality
- **icons/** - Extension icon files (16px, 32px, 48px, 128px)

#### `cli/` - Command Line Interface
- **index.js** - Main CLI application with argument parsing
- **package.json** - Node.js dependencies and scripts
- Supports batch processing and automation workflows

#### `web-ui/` - Web Interface
- **index.html** - Main web application interface
- **app.js** - Frontend application logic
- **styles.css** - Complete styling and responsive design
- Works entirely in the browser, no server required

#### `browser-automation/` - Puppeteer Automation
- **index.js** - Automated browser control for chat extraction
- **package.json** - Puppeteer and automation dependencies
- Handles authentication and dynamic content loading

#### `shared/` - Common Utilities
- **markdown-converter.js** - Core conversion logic used by all components
- **test.js** - Shared testing utilities and sample data
- Ensures consistency across all tools

### `/docs/` - Documentation
Comprehensive documentation for users and developers:

#### `user/` - User Documentation
- **README.md** - Complete user guide for all tools
- **INSTALL.md** - Quick installation instructions
- Step-by-step guides for each component

#### `development/` - Developer Documentation
- **README.md** - Architecture, setup, and contribution guide
- **CONTRIBUTING.md** - Detailed contribution guidelines
- Technical specifications and development workflows

### `/downloads/` - Sample Downloads
- Example chat files and extracted content
- Test data for development and demonstration

### Root Files
- **README.md** - Main project documentation
- **LICENSE** - MIT license
- **.gitignore** - Git ignore rules for the project

## 🔄 Component Interactions

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Browser Ext.   │    │     Web UI      │    │   CLI Tool      │
│                 │    │                 │    │                 │
│  Real-time      │    │  File Upload    │    │  Batch Process  │
│  Extraction     │    │  Conversion     │    │  Automation     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Shared Utils    │
                    │                 │
                    │ • Markdown      │
                    │   Converter     │
                    │ • Test Utils    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Browser Auto.   │
                    │                 │
                    │ URL Extraction  │
                    │ Authentication  │
                    └─────────────────┘
```

## 🎯 Use Cases by Component

### Browser Extension
- **Daily Users**: Save conversations while chatting
- **Researchers**: Archive important AI interactions
- **Students**: Export study sessions with AI
- **Professionals**: Document AI-assisted work

### Web UI
- **File Conversion**: Convert exported chat files
- **Previewing**: See markdown output before downloading
- **Accessibility**: Works on any device with a browser
- **Sharing**: Easy to deploy and share with others

### CLI Tool
- **Developers**: Integrate into build scripts and workflows
- **System Administrators**: Batch process multiple files
- **Power Users**: Automate repetitive conversion tasks
- **CI/CD**: Include in automated documentation pipelines

### Browser Automation
- **Research Teams**: Extract specific conversations by URL
- **Data Scientists**: Collect training data (with permission)
- **Archival Services**: Systematic backup of conversations
- **Quality Assurance**: Automated testing of chat extraction

## 🔧 Technical Architecture

### Data Flow
1. **Extraction**: Chat content identified and parsed from DOM
2. **Processing**: Content cleaned and structured into JSON format
3. **Conversion**: JSON transformed to markdown using shared converter
4. **Output**: Markdown saved to file or displayed in UI

### Shared Components
- **MarkdownConverter**: Core conversion logic with options
- **Chat Extraction**: Common selectors and parsing methods
- **Error Handling**: Consistent error reporting across tools
- **File Management**: Standardized filename generation

### Extension Points
- **Custom Selectors**: Add support for new chat platforms
- **Output Formats**: Extend beyond markdown (HTML, PDF, etc.)
- **Storage Options**: Add cloud storage integration
- **Processing Pipeline**: Custom filters and transformations

## 🚀 Getting Started Guide

### For End Users
1. **Start Simple**: Use the browser extension for immediate results
2. **Explore Options**: Try the web UI for more control
3. **Scale Up**: Use CLI for batch processing needs
4. **Advanced**: Set up automation for systematic extraction

### For Developers
1. **Review Architecture**: Understand the modular design
2. **Set Up Environment**: Install dependencies for each component
3. **Run Tests**: Verify functionality with included test suites
4. **Make Changes**: Follow the contribution guidelines
5. **Submit PR**: Share improvements with the community

### For Organizations
1. **Evaluate Tools**: Test each component with your use cases
2. **Deploy Selectively**: Choose components that fit your workflow
3. **Customize**: Modify for specific organizational needs
4. **Scale**: Use automation for enterprise-level processing

## 📊 Project Metrics

### Current Status
- **Version**: 0.0.1 (Initial Release)
- **Components**: 4 main tools + shared utilities
- **Documentation**: Comprehensive user and developer guides
- **Testing**: Manual testing across all components
- **License**: MIT (open source)

### Development Metrics
- **Languages**: JavaScript (ES6+), HTML5, CSS3
- **Dependencies**: Minimal, focused on core functionality
- **Browser Support**: Chrome 88+, Edge 88+, Firefox (web UI)
- **Node.js**: 16+ required for CLI and automation

### Community
- **Repository**: GitHub with issues and discussions
- **Documentation**: Multi-level guides for different audiences
- **Contribution**: Clear guidelines and development setup
- **Support**: Multiple channels for help and feedback