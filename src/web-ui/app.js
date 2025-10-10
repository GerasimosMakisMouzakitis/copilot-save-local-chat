/**
 * Copilot Chat Saver - Web UI Application
 * 
 * @author Gerasimos Makis Mouzakitis
 * @version 0.0.1
 * @created 2025-10-10
 * @updated 2025-10-10
 * 
 * Web interface for converting and downloading Copilot chats
 */

class CopilotChatSaverWebUI {
  constructor() {
    this.converter = new MarkdownConverter();
    this.currentChatData = null;
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.uploadArea = document.getElementById('uploadArea');
    this.fileInput = document.getElementById('fileInput');
    this.chatUrlInput = document.getElementById('chatUrl');
    this.fetchBtn = document.getElementById('fetchBtn');
    this.previewSection = document.getElementById('previewSection');
    this.previewContent = document.getElementById('previewContent');
    this.downloadBtn = document.getElementById('downloadBtn');
    this.copyBtn = document.getElementById('copyBtn');
    this.notification = document.getElementById('notification');

    // Option checkboxes
    this.includeTimestamps = document.getElementById('includeTimestamps');
    this.includeMetadata = document.getElementById('includeMetadata');
    this.formatCodeBlocks = document.getElementById('formatCodeBlocks');
  }

  attachEventListeners() {
    // File upload
    this.uploadArea.addEventListener('click', () => this.fileInput.click());
    this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
    this.uploadArea.addEventListener('drop', this.handleFileDrop.bind(this));
    this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));

    // URL fetch
    this.fetchBtn.addEventListener('click', this.handleUrlFetch.bind(this));

    // Download and copy
    this.downloadBtn.addEventListener('click', this.downloadMarkdown.bind(this));
    this.copyBtn.addEventListener('click', this.copyToClipboard.bind(this));

    // Option changes
    this.includeTimestamps.addEventListener('change', this.updatePreview.bind(this));
    this.includeMetadata.addEventListener('change', this.updatePreview.bind(this));
    this.formatCodeBlocks.addEventListener('change', this.updatePreview.bind(this));
  }

  handleDragOver(e) {
    e.preventDefault();
    this.uploadArea.classList.add('drag-over');
  }

  handleFileDrop(e) {
    e.preventDefault();
    this.uploadArea.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    this.processFiles(files);
  }

  handleFileSelect(e) {
    const files = Array.from(e.target.files);
    this.processFiles(files);
  }

  async processFiles(files) {
    for (const file of files) {
      try {
        const content = await this.readFile(file);
        
        if (file.name.endsWith('.json')) {
          this.currentChatData = JSON.parse(content);
        } else if (file.name.endsWith('.html')) {
          // Extract chat data from HTML (simplified)
          this.currentChatData = this.extractChatFromHTML(content);
        }
        
        this.updatePreview();
        this.showNotification('File loaded successfully!', 'success');
        break; // Process only the first valid file
      } catch (error) {
        this.showNotification(`Error processing ${file.name}: ${error.message}`, 'error');
      }
    }
  }

  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  extractChatFromHTML(htmlContent) {
    // Simplified HTML parsing - in a real implementation,
    // this would be more sophisticated
    return {
      title: 'Extracted Chat',
      timestamp: new Date().toISOString(),
      url: 'file-upload',
      messages: [
        {
          role: 'user',
          content: 'This is a sample extracted message from HTML',
          timestamp: new Date().toISOString(),
          index: 0,
          codeBlocks: []
        }
      ]
    };
  }

  async handleUrlFetch() {
    const url = this.chatUrlInput.value.trim();
    
    if (!url) {
      this.showNotification('Please enter a valid URL', 'error');
      return;
    }

    this.showNotification('URL fetching requires browser automation setup...', 'info');
    
    // TODO: Implement browser automation integration
    // This would require server-side components or browser automation
  }

  updatePreview() {
    if (!this.currentChatData) return;

    const options = {
      includeTimestamps: this.includeTimestamps.checked,
      includeMetadata: this.includeMetadata.checked,
      formatCodeBlocks: this.formatCodeBlocks.checked
    };

    const markdown = this.converter.convertToMarkdown(this.currentChatData, options);
    
    // Convert markdown to HTML for preview
    const htmlPreview = this.markdownToHtml(markdown);
    this.previewContent.innerHTML = htmlPreview;
    
    this.previewSection.style.display = 'block';
  }

  markdownToHtml(markdown) {
    // Simple markdown to HTML conversion for preview
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/```([\\s\\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/\n/g, '<br>');
  }

  downloadMarkdown() {
    if (!this.currentChatData) return;

    const options = {
      includeTimestamps: this.includeTimestamps.checked,
      includeMetadata: this.includeMetadata.checked,
      formatCodeBlocks: this.formatCodeBlocks.checked
    };

    const markdown = this.converter.convertToMarkdown(this.currentChatData, options);
    const filename = this.converter.generateFilename(this.currentChatData);
    
    this.downloadFile(markdown, filename, 'text/markdown');
    this.showNotification('Download started!', 'success');
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async copyToClipboard() {
    if (!this.currentChatData) return;

    const options = {
      includeTimestamps: this.includeTimestamps.checked,
      includeMetadata: this.includeMetadata.checked,
      formatCodeBlocks: this.formatCodeBlocks.checked
    };

    const markdown = this.converter.convertToMarkdown(this.currentChatData, options);
    
    try {
      await navigator.clipboard.writeText(markdown);
      this.showNotification('Copied to clipboard!', 'success');
    } catch (error) {
      this.showNotification('Failed to copy to clipboard', 'error');
    }
  }

  showNotification(message, type = 'info') {
    const notification = this.notification;
    const text = notification.querySelector('.notification-text');
    
    text.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
}

// Initialize the web UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new CopilotChatSaverWebUI();
});