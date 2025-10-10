# Copilot Chat Saver 💾

[![GitHub](https://img.shields.io/github/license/GerasimosMakisMouzakitis/copilot-save-local-chat)](https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/blob/main/LICENSE)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/GerasimosMakisMouzakitis/copilot-save-local-chat)](https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/releases)
[![GitHub issues](https://img.shields.io/github/issues/GerasimosMakisMouzakitis/copilot-save-local-chat)](https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/issues)

**Created by**: Gerasimos Makis Mouzakitis  
**Version**: 0.0.1 | **Created**: 2025-09-17 | **Updated**: 2025-10-10

A comprehensive toolkit for saving Microsoft Copilot chat conversations as markdown files. Choose from multiple interfaces: browser extension, web UI, CLI tool, or automated browser extraction.

## 🚀 Features

- **Multiple Interfaces**: Browser extension, web UI, CLI tool, and automation
- **Easy Export**: One-click extraction and download of conversations
- **Markdown Format**: Clean, readable output with proper formatting
- **Code Block Support**: Preserves syntax highlighting information
- **Timestamp Preservation**: Optional timestamps for each message
- **Platform Support**: Works with Microsoft Copilot, Bing Chat, and Edge Sidebar
- **Customizable Options**: Choose what to include in exports
- **Batch Processing**: CLI and automation tools for multiple chats
- **Open Source**: Full source code available for inspection and contribution

## 🎯 Choose Your Tool

| Tool | Best For | Difficulty | Installation |
|------|----------|------------|--------------|
| **[Browser Extension](docs/user/README.md#browser-extension-recommended)** | Real-time chat saving | ⭐ Easy | Load in Chrome/Edge |
| **[Web UI](docs/user/README.md#web-ui)** | Converting exported files | ⭐ Easy | Open in browser |
| **[CLI Tool](docs/user/README.md#cli-tool)** | Batch processing | ⭐⭐ Medium | Node.js required |
| **[Browser Automation](docs/user/README.md#browser-automation)** | Automated URL extraction | ⭐⭐⭐ Advanced | Technical setup |

## 🛠️ Project Structure

```
copilot-save-local-chat/
├── 📁 src/                          # Source code
│   ├── 🔌 browser-extension/        # Chrome/Edge extension
│   ├── 💻 cli/                      # Command-line tool
│   ├── 🌐 web-ui/                   # Web interface
│   ├── 🤖 browser-automation/       # Puppeteer automation
│   └── 🔧 shared/                   # Common utilities
├── 📁 docs/                         # Documentation
│   ├── 👥 user/                     # User guides
│   └── 🔨 development/              # Developer docs
├── 📁 downloads/                    # Sample downloads
├── 📄 README.md                     # This file
├── 📜 LICENSE                       # MIT License
└── 🤝 CONTRIBUTING.md               # Moved to docs/development/
```

## 🚀 Quick Start

### 1. Browser Extension (Recommended)
```bash
# Clone the repository
git clone https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat.git

# Load extension in Chrome/Edge
# 1. Go to chrome://extensions/ or edge://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the src/browser-extension/ folder
```

### 2. Web UI
```bash
# Serve the web interface
cd src/web-ui
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

### 3. CLI Tool
```bash
# Install dependencies and run
cd src/cli
npm install
node index.js --help
```

### 4. Browser Automation
```bash
# Install Puppeteer and dependencies
cd src/browser-automation
npm install
```

## 📖 Documentation

- **[📘 User Guide](docs/user/README.md)** - Complete user documentation
- **[🔧 Development Guide](docs/development/README.md)** - Developer documentation
- **[🚀 Quick Install](docs/user/INSTALL.md)** - Installation instructions

## 🛠️ Installation

### From Source (Development)

1. **Download or Clone the Repository**:
   ```bash
   git clone https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat.git
   cd copilot-save-local-chat
   ```

2. **Choose Your Component**:
   - **Browser Extension**: Load `src/browser-extension/` in browser
   - **CLI Tool**: `cd src/cli && npm install`
   - **Web UI**: Serve `src/web-ui/` with any web server
   - **Automation**: `cd src/browser-automation && npm install`

See the [detailed installation guide](docs/user/README.md) for step-by-step instructions.

## 📖 Usage

### Basic Usage

1. **Navigate to a Copilot Interface**:
   - Microsoft Copilot: `https://copilot.microsoft.com`
   - Bing Chat: `https://www.bing.com/chat`
   - Edge Sidebar Copilot

2. **Have a Conversation**:
   - Chat with Copilot as you normally would
   - The extension works with any length of conversation

3. **Save Your Chat**:
   - Click the Copilot Chat Saver extension icon in your toolbar
   - Click "Extract Chat" to analyze the conversation
   - Customize export options if desired
   - Click "Download Markdown" to save the file

### Export Options

- **Include Timestamps**: Add time information to each message
- **Include Metadata**: Add chat title, date, and summary information
- **Format Code Blocks**: Preserve code formatting with language detection

### Supported Sites

- ✅ Microsoft Copilot (`copilot.microsoft.com`)
- ✅ Bing Chat (`bing.com`, `www.bing.com`)
- ✅ Edge Sidebar Copilot

## 📝 Output Format

The extension generates clean markdown files with the following structure:

```markdown
# Chat Title

## Chat Information
- **Date**: December 15, 2024, 10:30:00 AM
- **Source**: copilot.microsoft.com
- **Messages**: 12
- **Exported**: December 15, 2024, 10:35:22 AM

## 👤 You _(10:30:15 AM)_

Your question or message here...

---

## 🤖 Copilot _(10:30:18 AM)_

Copilot's response here...

### Code Block 1

```python
def example_function():
    return "Hello, World!"
```

---
```

## 🔧 Technical Details

### File Structure

```
src/
├── browser-extension/           # Browser extension files
│   ├── manifest.json           # Extension configuration
│   ├── content.js             # Chat extraction logic
│   ├── popup.html/css/js      # User interface
│   ├── background.js          # Service worker
│   └── icons/                 # Extension icons
├── cli/                       # Command-line tool
│   ├── index.js              # CLI application
│   └── package.json          # Dependencies
├── web-ui/                    # Web interface
│   ├── index.html            # Main interface
│   ├── app.js                # Application logic
│   └── styles.css            # Styling
├── browser-automation/        # Puppeteer automation
│   ├── index.js              # Automation engine
│   └── package.json          # Dependencies
└── shared/                    # Common utilities
    ├── markdown-converter.js  # Core conversion logic
    └── test.js               # Testing utilities
```

### How It Works

1. **Detection**: Content scripts identify chat message elements on supported pages
2. **Extraction**: Parses message structure, roles, timestamps, and code blocks
3. **Conversion**: Transforms extracted data into well-formatted markdown
4. **Download**: Creates and downloads the markdown file via browser's download API

### Browser Permissions

The extension requires these permissions:
- `activeTab`: Access the current tab to extract chat content
- `downloads`: Save markdown files to your computer
- `storage`: Store user preferences
- Host permissions for Copilot sites

## 🐛 Troubleshooting

### Common Issues

**"No chat found on this page"**
- Ensure you're on a supported Copilot site
- Make sure you have an active chat conversation
- Try refreshing the page and re-opening the extension

**"Extraction failed"**
- The page might still be loading - wait a few seconds and try again
- Some chat interfaces might not be supported yet
- Check the browser console for error messages

**"Download failed"**
- Check your browser's download permissions
- Ensure you have write access to your default download folder
- Try using a different filename

### Getting Help

1. Check the browser console (F12) for error messages
2. Try refreshing the Copilot page and re-extracting
3. Ensure you're using the latest version of the extension
4. Test with different types of conversations (text-only, code blocks, etc.)
5. For issues and bug reports, please visit: `https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/issues`

## 🔒 Privacy & Security

- **No Data Collection**: This extension does not collect, store, or transmit any personal data
- **Local Processing**: All chat extraction and conversion happens locally in your browser
- **No External Servers**: No data is sent to external servers or services
- **Open Source**: Full source code is available for inspection

## 🚧 Development

### Contributing

1. Fork the repository on GitHub: `https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat`
2. Create a feature branch
3. Make your changes
4. Test thoroughly with different Copilot interfaces
5. Submit a pull request

### Building

No build process required - the extension runs directly from source files.

### Testing

Test the extension with:
- Different types of conversations (text, code, mixed content)
- Various Copilot interfaces (web, sidebar, mobile)
- Different browsers (Edge, Chrome)
- Various conversation lengths

## 📋 Roadmap

- [ ] Support for more chat platforms
- [ ] Advanced formatting options
- [ ] Bulk export of multiple conversations
- [ ] Cloud storage integration
- [ ] Custom template support
- [ ] Search and filter exported chats

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Microsoft for the Copilot platform
- The open-source community for browser extension development resources

---

**Version**: 0.0.1  
**Creator**: Gerasimos Makis Mouzakitis  
**Created**: 2025-09-17  
**Last Updated**: 2025-10-10  
**Compatibility**: Microsoft Edge 88+, Chrome 88+

## 📂 Repository Structure
See [PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md) for detailed project organization and architecture.