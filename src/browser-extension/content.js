/**
 * Copilot Chat Saver - Content Script
 * 
 * @author Gerasimos Makis Mouzakitis
 * @version 0.0.1
 * @created 2025-09-17
 * @updated 2025-09-17
 * 
 * Content script for extracting Copilot chat conversations
 */

// Content script for extracting Copilot chat conversations

class CopilotChatExtractor {
  constructor() {
    this.chatData = {
      title: '',
      timestamp: new Date().toISOString(),
      messages: []
    };
  }

  // Extract chat messages from different Copilot interfaces
  extractChatMessages() {
    const messages = [];
    
    // Try multiple selectors for different Copilot interfaces
    const messageSelectors = [
      // Microsoft Copilot chat messages
      '.ac-textBlock',
      '.message-content',
      '[data-testid="message"]',
      '.chat-message',
      '.conversation-message',
      // Bing Chat selectors
      '.ac-container .ac-textBlock',
      '.b_sydConvCont .b_msgBlock',
      '.cib-serp-main .ac-textBlock',
      // Edge sidebar Copilot
      '.chat-turn',
      '.response-message-group'
    ];

    for (const selector of messageSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`Found ${elements.length} messages with selector: ${selector}`);
        elements.forEach((element, index) => {
          const messageData = this.parseMessageElement(element, index);
          if (messageData.content.trim()) {
            messages.push(messageData);
          }
        });
        break; // Use the first selector that finds messages
      }
    }

    // Fallback: try to find any text content that looks like chat messages
    if (messages.length === 0) {
      messages.push(...this.extractFallbackMessages());
    }

    return messages;
  }

  parseMessageElement(element, index) {
    // Determine if this is a user or assistant message
    const isUser = this.isUserMessage(element);
    
    // Extract text content, preserving structure
    let content = this.extractTextContent(element);
    
    // Extract code blocks separately
    const codeBlocks = this.extractCodeBlocks(element);
    
    // Get timestamp if available
    const timestamp = this.extractTimestamp(element);

    return {
      role: isUser ? 'user' : 'assistant',
      content: content,
      codeBlocks: codeBlocks,
      timestamp: timestamp || new Date().toISOString(),
      index: index
    };
  }

  isUserMessage(element) {
    // Check various indicators that this is a user message
    const userIndicators = [
      '.user-message',
      '.human-message',
      '[data-author="user"]',
      '.chat-input-message'
    ];

    for (const indicator of userIndicators) {
      if (element.closest(indicator) || element.matches(indicator)) {
        return true;
      }
    }

    // Check for visual cues (user messages often aligned right or have specific styling)
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.textAlign === 'right' || 
        element.classList.toString().includes('user') ||
        element.closest('[class*="user"]')) {
      return true;
    }

    // Default to assistant if unclear
    return false;
  }

  extractTextContent(element) {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove script and style elements
    clone.querySelectorAll('script, style').forEach(el => el.remove());
    
    // Handle code blocks specially
    clone.querySelectorAll('pre, code').forEach(codeEl => {
      codeEl.textContent = `\`\`\`\n${codeEl.textContent}\n\`\`\``;
    });

    // Handle lists
    clone.querySelectorAll('ul, ol').forEach(listEl => {
      const listItems = listEl.querySelectorAll('li');
      listItems.forEach((li, index) => {
        const marker = listEl.tagName === 'OL' ? `${index + 1}. ` : '- ';
        li.textContent = marker + li.textContent;
      });
    });

    // Handle headings
    clone.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      heading.textContent = '#'.repeat(level) + ' ' + heading.textContent;
    });

    return clone.textContent || clone.innerText || '';
  }

  extractCodeBlocks(element) {
    const codeBlocks = [];
    
    // Find code blocks
    element.querySelectorAll('pre, code').forEach(codeEl => {
      const language = this.detectCodeLanguage(codeEl);
      codeBlocks.push({
        language: language,
        code: codeEl.textContent || codeEl.innerText || ''
      });
    });

    return codeBlocks;
  }

  detectCodeLanguage(codeElement) {
    // Try to detect language from class names
    const classList = codeElement.className;
    const languageMatch = classList.match(/language-(\w+)|lang-(\w+)|(\w+)-code/);
    
    if (languageMatch) {
      return languageMatch[1] || languageMatch[2] || languageMatch[3];
    }

    // Try to detect from content
    const content = codeElement.textContent || '';
    
    if (content.includes('function ') || content.includes('const ') || content.includes('=>')) {
      return 'javascript';
    }
    if (content.includes('def ') || content.includes('import ') || content.includes('print(')) {
      return 'python';
    }
    if (content.includes('#include') || content.includes('int main')) {
      return 'cpp';
    }
    if (content.includes('<div') || content.includes('<html')) {
      return 'html';
    }
    if (content.includes('SELECT') || content.includes('FROM')) {
      return 'sql';
    }

    return '';
  }

  extractTimestamp(element) {
    // Look for timestamp elements
    const timestampSelectors = [
      '.timestamp',
      '.message-time',
      '.time-stamp',
      '[data-timestamp]'
    ];

    for (const selector of timestampSelectors) {
      const timestampEl = element.querySelector(selector) || element.closest(selector);
      if (timestampEl) {
        return timestampEl.textContent || timestampEl.getAttribute('data-timestamp');
      }
    }

    return null;
  }

  extractFallbackMessages() {
    // Fallback method to extract any text that might be chat messages
    console.log('Using fallback message extraction');
    
    const messages = [];
    const textNodes = this.getTextNodes(document.body);
    
    let currentMessage = '';
    textNodes.forEach(node => {
      const text = node.textContent.trim();
      if (text.length > 10) { // Only consider substantial text
        currentMessage += text + '\n';
      }
    });

    if (currentMessage.trim()) {
      messages.push({
        role: 'assistant',
        content: currentMessage.trim(),
        codeBlocks: [],
        timestamp: new Date().toISOString(),
        index: 0
      });
    }

    return messages;
  }

  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }

    return textNodes;
  }

  // Get the chat title
  getChatTitle() {
    const titleSelectors = [
      'h1',
      '.chat-title',
      '.conversation-title',
      '[data-testid="thread-title"]',
      'title'
    ];

    for (const selector of titleSelectors) {
      const titleEl = document.querySelector(selector);
      if (titleEl && titleEl.textContent.trim()) {
        return titleEl.textContent.trim();
      }
    }

    return `Copilot Chat - ${new Date().toLocaleDateString()}`;
  }

  // Main extraction method
  extractFullChat() {
    console.log('Starting chat extraction...');
    
    this.chatData.title = this.getChatTitle();
    this.chatData.messages = this.extractChatMessages();
    this.chatData.url = window.location.href;

    console.log(`Extracted ${this.chatData.messages.length} messages`);
    return this.chatData;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractChat') {
    const extractor = new CopilotChatExtractor();
    const chatData = extractor.extractFullChat();
    sendResponse({ success: true, data: chatData });
  }
  return true;
});

// Auto-extract when page loads (for testing)
window.addEventListener('load', () => {
  setTimeout(() => {
    console.log('Copilot Chat Saver: Content script loaded');
  }, 1000);
});