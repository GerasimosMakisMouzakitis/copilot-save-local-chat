/**
 * Copilot Chat Saver - Popup Script
 * 
 * @author Gerasimos Makis Mouzakitis
 * @version 0.0.1
 * @created 2025-09-17
 * @updated 2025-09-17
 * 
 * Popup script for Copilot Chat Saver
 */

// Popup script for Copilot Chat Saver

class CopilotChatSaverPopup {
  constructor() {
    this.chatData = null;
    this.converter = new MarkdownConverter();
    this.initializeElements();
    this.attachEventListeners();
    this.checkForChat();
  }

  initializeElements() {
    // Status elements
    this.statusIndicator = document.getElementById('status-indicator');
    this.statusIcon = document.getElementById('status-icon');
    this.statusText = document.getElementById('status-text');

    // Option checkboxes
    this.includeTimestamps = document.getElementById('includeTimestamps');
    this.includeMetadata = document.getElementById('includeMetadata');
    this.formatCodeBlocks = document.getElementById('formatCodeBlocks');

    // Filename input
    this.filenameInput = document.getElementById('filename');

    // Action buttons
    this.extractBtn = document.getElementById('extractBtn');
    this.downloadBtn = document.getElementById('downloadBtn');

    // Info section
    this.chatInfo = document.getElementById('chatInfo');
    this.chatTitle = document.getElementById('chatTitle');
    this.messageCount = document.getElementById('messageCount');
    this.chatUrl = document.getElementById('chatUrl');

    // Overlays and notifications
    this.loadingOverlay = document.getElementById('loadingOverlay');
    this.successNotification = document.getElementById('successNotification');
    this.errorNotification = document.getElementById('errorNotification');
    this.errorText = document.getElementById('errorText');
  }

  attachEventListeners() {
    this.extractBtn.addEventListener('click', () => this.extractChat());
    this.downloadBtn.addEventListener('click', () => this.downloadMarkdown());
    
    // Help and settings links
    document.getElementById('helpLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showHelp();
    });

    document.getElementById('settingsLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showSettings();
    });

    // Auto-generate filename based on chat title
    this.includeTimestamps.addEventListener('change', () => this.updateFilename());
    this.includeMetadata.addEventListener('change', () => this.updateFilename());
  }

  async checkForChat() {
    this.updateStatus('🔍', 'Checking for chat...', 'checking');
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        throw new Error('No active tab found');
      }

      // Check if we're on a supported site
      const url = tab.url;
      const supportedSites = [
        'copilot.microsoft.com',
        'bing.com',
        'www.bing.com'
      ];

      const isSupported = supportedSites.some(site => url.includes(site));
      
      if (!isSupported) {
        this.updateStatus('⚠️', 'Please navigate to Microsoft Copilot', 'error');
        return;
      }

      // Try to extract chat immediately to check if chat exists
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractChat' });
      
      if (response && response.success && response.data.messages.length > 0) {
        this.chatData = response.data;
        this.updateStatus('✅', 'Chat detected!', 'success');
        this.extractBtn.disabled = false;
        this.showChatInfo();
        this.generateDefaultFilename();
      } else {
        this.updateStatus('❌', 'No chat found on this page', 'error');
      }
    } catch (error) {
      console.error('Error checking for chat:', error);
      this.updateStatus('❌', 'Error detecting chat', 'error');
    }
  }

  async extractChat() {
    this.showLoading(true);
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractChat' });
      
      if (response && response.success) {
        this.chatData = response.data;
        this.updateStatus('✅', `Extracted ${this.chatData.messages.length} messages`, 'success');
        this.downloadBtn.disabled = false;
        this.showChatInfo();
        this.generateDefaultFilename();
        this.showSuccessNotification('Chat extracted successfully!');
      } else {
        throw new Error('Failed to extract chat');
      }
    } catch (error) {
      console.error('Error extracting chat:', error);
      this.showErrorNotification('Failed to extract chat. Please try refreshing the page.');
      this.updateStatus('❌', 'Extraction failed', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  downloadMarkdown() {
    if (!this.chatData) {
      this.showErrorNotification('No chat data available');
      return;
    }

    try {
      // Get conversion options
      const options = {
        includeTimestamps: this.includeTimestamps.checked,
        includeMetadata: this.includeMetadata.checked,
        formatCodeBlocks: this.formatCodeBlocks.checked
      };

      // Convert to markdown
      const markdown = this.converter.convertToMarkdown(this.chatData, options);
      
      // Generate filename
      const filename = this.getFilename();
      
      // Create and download the file
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error('Download error:', chrome.runtime.lastError);
          this.showErrorNotification('Download failed: ' + chrome.runtime.lastError.message);
        } else {
          this.showSuccessNotification(`Saved as ${filename}`);
          URL.revokeObjectURL(url);
        }
      });

    } catch (error) {
      console.error('Error downloading markdown:', error);
      this.showErrorNotification('Failed to create markdown file');
    }
  }

  updateStatus(icon, text, type = 'checking') {
    this.statusIcon.textContent = icon;
    this.statusText.textContent = text;
    
    // Update styling
    this.statusIndicator.className = 'status-indicator';
    if (type === 'success') {
      this.statusIndicator.classList.add('success');
    } else if (type === 'error') {
      this.statusIndicator.classList.add('error');
    }
  }

  showChatInfo() {
    if (!this.chatData) return;

    this.chatTitle.textContent = this.chatData.title || 'Untitled Chat';
    this.messageCount.textContent = this.chatData.messages.length;
    this.chatUrl.textContent = new URL(this.chatData.url || window.location.href).hostname;
    
    this.chatInfo.style.display = 'block';
  }

  generateDefaultFilename() {
    if (!this.chatData) return;

    const filename = this.converter.generateFilename(this.chatData);
    this.filenameInput.value = filename.replace('.md', ''); // Remove extension since we add it automatically
  }

  updateFilename() {
    // Regenerate filename when options change
    if (this.chatData) {
      this.generateDefaultFilename();
    }
  }

  getFilename() {
    let filename = this.filenameInput.value.trim();
    
    if (!filename) {
      filename = 'copilot-chat-export';
    }

    // Sanitize filename
    filename = this.converter.sanitizeFilename(filename);
    
    // Ensure .md extension
    if (!filename.endsWith('.md')) {
      filename += '.md';
    }

    return filename;
  }

  showLoading(show) {
    this.loadingOverlay.style.display = show ? 'flex' : 'none';
  }

  showSuccessNotification(message) {
    document.querySelector('.notification.success .notification-text').textContent = message;
    this.successNotification.style.display = 'flex';
    
    setTimeout(() => {
      this.successNotification.style.display = 'none';
    }, 3000);
  }

  showErrorNotification(message) {
    this.errorText.textContent = message;
    this.errorNotification.style.display = 'flex';
    
    setTimeout(() => {
      this.errorNotification.style.display = 'none';
    }, 5000);
  }

  showHelp() {
    const helpText = `
Copilot Chat Saver Help

This extension helps you save your Microsoft Copilot chat conversations as markdown files.

How to use:
1. Navigate to Microsoft Copilot or Bing Chat
2. Have a conversation with the AI
3. Click the extension icon
4. Click "Extract Chat" to analyze the conversation
5. Customize export options if needed
6. Click "Download Markdown" to save the file

Supported sites:
- Microsoft Copilot (copilot.microsoft.com)
- Bing Chat (bing.com)

The extension will automatically detect chat messages and format them properly in markdown, including code blocks, timestamps, and metadata.
    `;
    
    alert(helpText.trim());
  }

  showSettings() {
    alert('Settings functionality coming in a future update!');
  }
}

// Initialize the popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CopilotChatSaverPopup();
});