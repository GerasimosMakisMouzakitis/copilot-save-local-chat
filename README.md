# Copilot Chat Saver 💾

[![GitHub](https://img.shields.io/github/license/GerasimosMakisMouzakitis/copilot-save-local-chat)](https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/blob/main/LICENSE)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/GerasimosMakisMouzakitis/copilot-save-local-chat)](https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/releases)
[![GitHub issues](https://img.shields.io/github/issues/GerasimosMakisMouzakitis/copilot-save-local-chat)](https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat/issues)

**Created by**: Gerasimos Makis Mouzakitis  
**Version**: 0.0.1 | **Created**: 2025-09-17 | **Updated**: 2025-09-17

A browser extension for Microsoft Edge and Chrome that allows you to save your Microsoft Copilot chat conversations as markdown files.

## 🚀 Features

- **Easy Export**: One-click extraction and download of your Copilot conversations
- **Markdown Format**: Clean, readable markdown output with proper formatting
- **Code Block Support**: Preserves code blocks with syntax highlighting information
- **Timestamp Preservation**: Optional timestamps for each message
- **Multiple Platforms**: Works with Microsoft Copilot, Bing Chat, and Edge Sidebar Copilot
- **Customizable Options**: Choose what to include in your exports
- **Auto-filename Generation**: Smart filename generation based on chat content

## 🛠️ Installation

### From Source (Development)

1. **Download or Clone the Repository**:
   ```bash
   git clone https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat.git
   cd copilot-save-local-chat
   ```

2. **Load the Extension in Edge/Chrome**:
   - Open Microsoft Edge or Chrome
   - Navigate to `edge://extensions/` (Edge) or `chrome://extensions/` (Chrome)
   - Enable "Developer mode" (toggle in the top-right corner)
   - Click "Load unpacked"
   - Select the `copilot-save-local-chat` folder

3. **Verify Installation**:
   - You should see the "Copilot Chat Saver" extension in your extensions list
   - The extension icon will appear in your browser toolbar

### Create Extension Icons (Optional)

The extension includes placeholder icons. To create proper icons:

1. Create PNG files in the `icons/` directory:
   - `icon-16.png` (16x16 pixels)
   - `icon-32.png` (32x32 pixels)
   - `icon-48.png` (48x48 pixels)
   - `icon-128.png` (128x128 pixels)

2. Reload the extension to see the new icons

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
copilot-save-local-chat/
├── manifest.json           # Extension manifest
├── content.js             # Content script for chat extraction
├── popup.html            # Extension popup interface
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── background.js         # Service worker
├── markdown-converter.js # Chat-to-markdown conversion
├── icons/               # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md           # This file
```

### How It Works

1. **Detection**: Content script identifies chat message elements on supported pages
2. **Extraction**: Parses message structure, roles, timestamps, and code blocks
3. **Conversion**: Transforms extracted data into well-formatted markdown
4. **Download**: Creates and downloads the markdown file via the browser's download API

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
**Last Updated**: 2025-09-17  
**Compatibility**: Microsoft Edge 88+, Chrome 88+