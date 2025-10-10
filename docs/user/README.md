# User Guide - Copilot Chat Saver

## 🚀 Quick Start

Copilot Chat Saver helps you save your Microsoft Copilot conversations as markdown files. Choose the method that works best for you:

### 🎯 Which Tool Should I Use?

| Method | Best For | Difficulty | Requirements |
|--------|----------|------------|--------------|
| **Browser Extension** | Real-time saving while chatting | Easy | Chrome/Edge browser |
| **Web UI** | Converting exported files | Easy | Any modern browser |
| **CLI Tool** | Batch processing, automation | Medium | Node.js installed |
| **Browser Automation** | Automated extraction from URLs | Advanced | Node.js + technical setup |

---

## 🔧 Browser Extension (Recommended)

### Installation

1. **Download the Extension**:
   - Download the extension files from the repository
   - Or clone: `git clone https://github.com/GerasimosMakisMouzakitis/copilot-save-local-chat.git`

2. **Load in Browser**:
   - Open Chrome or Edge
   - Go to `chrome://extensions/` or `edge://extensions/`
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select the `src/browser-extension/` folder

3. **Verify Installation**:
   - Extension icon appears in browser toolbar
   - Extension shows in extensions list

### Using the Extension

1. **Start a Chat**:
   - Go to `https://copilot.microsoft.com`
   - Start or continue a conversation

2. **Save Your Chat**:
   - Click the extension icon in your toolbar
   - Click "Extract Chat" to analyze the conversation
   - Customize options if needed:
     - ✅ Include timestamps
     - ✅ Include metadata
     - ✅ Format code blocks
   - Click "Download Markdown"

3. **Find Your File**:
   - File saves to your default Downloads folder
   - Named like: `copilot-chat-title-2025-10-10.md`

### Supported Sites
- ✅ Microsoft Copilot (`copilot.microsoft.com`)
- ✅ Bing Chat (`bing.com/chat`)
- ✅ Edge Sidebar Copilot

---

## 🌐 Web UI

### Access the Web Interface

1. **Open the Web UI**:
   - Navigate to `src/web-ui/index.html` in your browser
   - Or serve it locally:
     ```bash
     cd src/web-ui
     python -m http.server 8000
     # Then open http://localhost:8000
     ```

### Using the Web UI

1. **Upload Files**:
   - Drag & drop chat files (JSON, HTML)
   - Or click to browse and select files

2. **Enter Chat URL** (requires automation setup):
   - Paste a Copilot chat URL
   - Click "Fetch Chat"

3. **Customize Export Options**:
   - ☑️ Include timestamps
   - ☑️ Include metadata  
   - ☑️ Format code blocks

4. **Download or Copy**:
   - Preview the converted markdown
   - Click "Download Markdown" to save
   - Or "Copy to Clipboard" to copy

---

## 💻 CLI Tool

### Installation

```bash
# Navigate to CLI directory
cd src/cli

# Install dependencies
npm install

# Make globally available (optional)
npm link
```

### Usage

```bash
# Basic usage
node index.js input.json output.md

# With options
node index.js --timestamps --metadata chat.json

# Show help
node index.js --help

# Show version
node index.js --version
```

### Command Options

- `-t, --timestamps` - Include message timestamps
- `-m, --metadata` - Include chat metadata
- `-c, --code-blocks` - Format code blocks
- `-f, --format <type>` - Output format (markdown, html, json)
- `-h, --help` - Show help
- `-v, --version` - Show version

### Examples

```bash
# Convert JSON to markdown with all options
node index.js --timestamps --metadata --code-blocks chat.json chat.md

# Convert multiple files
for file in *.json; do
  node index.js "$file" "${file%.json}.md"
done
```

---

## 🤖 Browser Automation

### Installation

```bash
# Navigate to automation directory
cd src/browser-automation

# Install dependencies (includes Puppeteer)
npm install
```

### Usage

```javascript
const CopilotChatAutomation = require('./index.js');

// Basic usage
const automation = new CopilotChatAutomation();
const result = await automation.processChatUrl(
  'https://copilot.microsoft.com/chats/your-chat-id'
);

if (result.success) {
  console.log('Chat saved to:', result.outputPath);
} else {
  console.error('Failed:', result.error);
}
```

### Options

```javascript
const automation = new CopilotChatAutomation({
  headless: false,    // Show browser window
  timeout: 60000,     // 60 second timeout
  outputDir: './my-chats'
});
```

### ⚠️ Important Notes

- **Authentication Required**: You must be logged into Microsoft account
- **Manual Login**: Browser will pause for you to log in manually
- **Rate Limiting**: Don't make too many requests quickly
- **Terms of Service**: Ensure compliance with Microsoft's terms

---

## 📋 Output Format

All tools generate clean markdown files with this structure:

```markdown
# Chat Title

## Chat Information
- **Date**: October 10, 2025, 8:30:00 PM
- **Source**: copilot.microsoft.com
- **Messages**: 12
- **Exported**: October 10, 2025, 8:45:22 PM

## 👤 You _(8:30:15 PM)_

Your question here...

---

## 🤖 Copilot _(8:30:18 PM)_

Copilot's response here...

### Code Block 1

```python
def hello_world():
    print("Hello, World!")
```

---
```

## 🔧 Troubleshooting

### Common Issues

**"No chat found"**
- Ensure you're on a supported Copilot site
- Wait for the page to fully load
- Try refreshing and re-extracting

**"Extension not working"**
- Check if developer mode is enabled
- Reload the extension
- Check browser console for errors

**"Download failed"**
- Check browser download permissions
- Try a different filename
- Ensure sufficient disk space

**"Automation login issues"**
- Use non-headless mode to see browser
- Clear browser cache and cookies
- Check Microsoft account status

### Getting Help

1. **Check Browser Console**: Press F12 → Console tab for errors
2. **Try Different Method**: If one tool doesn't work, try another
3. **Update Extension**: Make sure you have the latest version
4. **Report Issues**: Create an issue on GitHub with error details

### Performance Tips

- **Large Chats**: For 100+ message conversations, use CLI or automation
- **Multiple Chats**: Use CLI tool for batch processing
- **Regular Use**: Browser extension is fastest for daily use
- **Complex Formatting**: Web UI provides best preview capabilities

---

## 🔒 Privacy & Security

- **No Data Collection**: Your chats are processed locally only
- **No External Servers**: All conversion happens in your browser/computer
- **Microsoft Terms**: Ensure compliance with Microsoft's terms of service
- **Local Storage**: Files are saved to your local computer only

---

## 📞 Support

- **Documentation**: Check the development docs for technical details
- **Issues**: Report bugs on GitHub Issues
- **Questions**: Use GitHub Discussions
- **Updates**: Watch the repository for new releases