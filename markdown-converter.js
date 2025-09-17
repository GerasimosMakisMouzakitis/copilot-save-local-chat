/**
 * Copilot Chat Saver - Markdown Converter
 * 
 * @author Gerasimos Makis Mouzakitis
 * @version 0.0.1
 * @created 2025-09-17
 * @updated 2025-09-17
 * 
 * Utility functions for converting chat data to markdown
 */

// Utility functions for converting chat data to markdown

class MarkdownConverter {
  constructor() {
    this.options = {
      includeTimestamps: true,
      includeMetadata: true,
      codeBlockLanguageDetection: true,
      formatUserMessages: true
    };
  }

  // Convert chat data to markdown format
  convertToMarkdown(chatData, options = {}) {
    this.options = { ...this.options, ...options };
    
    let markdown = '';

    // Add header with title and metadata
    if (this.options.includeMetadata) {
      markdown += this.generateHeader(chatData);
    }

    // Add each message
    chatData.messages.forEach((message, index) => {
      markdown += this.convertMessage(message, index);
      markdown += '\n---\n\n'; // Separator between messages
    });

    // Remove the last separator
    markdown = markdown.replace(/\n---\n\n$/, '\n');

    return markdown;
  }

  generateHeader(chatData) {
    let header = `# ${chatData.title}\n\n`;
    
    if (this.options.includeMetadata) {
      header += '## Chat Information\n\n';
      header += `- **Date**: ${new Date(chatData.timestamp).toLocaleString()}\n`;
      header += `- **Source**: ${chatData.url || 'Microsoft Copilot'}\n`;
      header += `- **Messages**: ${chatData.messages.length}\n`;
      header += `- **Exported**: ${new Date().toLocaleString()}\n\n`;
    }

    return header;
  }

  convertMessage(message, index) {
    let messageMarkdown = '';

    // Add message header
    const roleIcon = message.role === 'user' ? '👤' : '🤖';
    const roleName = message.role === 'user' ? 'You' : 'Copilot';
    
    messageMarkdown += `## ${roleIcon} ${roleName}`;
    
    if (this.options.includeTimestamps && message.timestamp) {
      const timestamp = new Date(message.timestamp).toLocaleTimeString();
      messageMarkdown += ` _(${timestamp})_`;
    }
    
    messageMarkdown += '\n\n';

    // Process and add message content
    const processedContent = this.processMessageContent(message.content);
    messageMarkdown += processedContent;

    // Add code blocks if any
    if (message.codeBlocks && message.codeBlocks.length > 0) {
      messageMarkdown += this.convertCodeBlocks(message.codeBlocks);
    }

    return messageMarkdown;
  }

  processMessageContent(content) {
    if (!content) return '';

    // Clean up the content
    let processed = content.trim();

    // Handle multiple line breaks
    processed = processed.replace(/\n{3,}/g, '\n\n');

    // Ensure proper spacing around headers
    processed = processed.replace(/^(#{1,6}\s)/gm, '\n$1');
    processed = processed.replace(/\n{2,}(#{1,6}\s)/g, '\n\n$1');

    // Handle lists - ensure proper spacing
    processed = processed.replace(/\n([*\-+]|\d+\.)\s/g, '\n\n$1 ');

    // Handle inline code that might have been extracted
    processed = processed.replace(/```\n([^`]+)\n```/g, (match, code) => {
      // If it's a small code snippet, make it inline
      if (code.length < 50 && !code.includes('\n')) {
        return `\`${code.trim()}\``;
      }
      return match;
    });

    // Ensure content ends with proper spacing
    processed = processed.trim() + '\n\n';

    return processed;
  }

  convertCodeBlocks(codeBlocks) {
    let codeMarkdown = '';

    codeBlocks.forEach((block, index) => {
      if (block.code.trim()) {
        codeMarkdown += '\n';
        
        // Add a label if there are multiple code blocks
        if (codeBlocks.length > 1) {
          codeMarkdown += `### Code Block ${index + 1}\n\n`;
        }

        // Format the code block
        const language = block.language || this.detectLanguage(block.code);
        codeMarkdown += `\`\`\`${language}\n${block.code.trim()}\n\`\`\`\n\n`;
      }
    });

    return codeMarkdown;
  }

  detectLanguage(code) {
    // Basic language detection based on content
    const content = code.toLowerCase().trim();

    const patterns = [
      { pattern: /^import\s|^from\s.*import|def\s+\w+\(|print\(|if\s+__name__\s*==/, lang: 'python' },
      { pattern: /function\s+\w+\(|const\s+\w+\s*=|let\s+\w+\s*=|var\s+\w+\s*=|=>/, lang: 'javascript' },
      { pattern: /class\s+\w+\s*{|interface\s+\w+|type\s+\w+\s*=/, lang: 'typescript' },
      { pattern: /#include|int\s+main\(|std::|cout\s*<</, lang: 'cpp' },
      { pattern: /public\s+class|import\s+java\.|System\.out\.print/, lang: 'java' },
      { pattern: /<div|<html|<head|<body|<script/, lang: 'html' },
      { pattern: /\.container\s*{|@media|display:\s*flex/, lang: 'css' },
      { pattern: /SELECT\s+.*FROM|INSERT\s+INTO|UPDATE\s+.*SET/, lang: 'sql' },
      { pattern: /^#!\/bin\/bash|^#!\/bin\/sh|\$\(.*\)|sudo\s+/, lang: 'bash' },
      { pattern: /\{[\s\n]*".*":|"[^"]*":\s*[{\[]/, lang: 'json' }
    ];

    for (const { pattern, lang } of patterns) {
      if (pattern.test(content)) {
        return lang;
      }
    }

    return '';
  }

  // Generate filename for the markdown file
  generateFilename(chatData) {
    const title = chatData.title
      .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .toLowerCase()
      .substring(0, 50); // Limit length

    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    return `copilot-chat-${title}-${date}.md`;
  }

  // Sanitize filename for download
  sanitizeFilename(filename) {
    return filename
      .replace(/[<>:"/\\|?*]/g, '-') // Replace invalid characters
      .replace(/-+/g, '-') // Collapse multiple dashes
      .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarkdownConverter;
} else {
  window.MarkdownConverter = MarkdownConverter;
}