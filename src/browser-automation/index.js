/**
 * Copilot Chat Saver - Browser Automation
 * 
 * @author Gerasimos Makis Mouzakitis
 * @version 0.0.1
 * @created 2025-10-10
 * @updated 2025-10-10
 * 
 * Automated browser-based chat extraction using Puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Import shared utilities
const MarkdownConverter = require('../shared/markdown-converter');

class CopilotChatAutomation {
  constructor(options = {}) {
    this.options = {
      headless: options.headless !== false, // Default to headless
      timeout: options.timeout || 30000,
      outputDir: options.outputDir || './downloads',
      ...options
    };
    this.converter = new MarkdownConverter();
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    console.log('Initializing browser automation...');
    
    this.browser = await puppeteer.launch({
      headless: this.options.headless,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    this.page = await this.browser.newPage();
    
    // Set user agent to appear as a regular browser
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Set viewport
    await this.page.setViewport({ width: 1920, height: 1080 });

    console.log('Browser automation initialized successfully');
  }

  async navigateToChat(chatUrl) {
    if (!this.page) {
      throw new Error('Browser not initialized. Call initialize() first.');
    }

    console.log(`Navigating to: ${chatUrl}`);
    
    try {
      await this.page.goto(chatUrl, { 
        waitUntil: 'networkidle0', 
        timeout: this.options.timeout 
      });

      // Wait for the page to load and check if login is required
      await this.page.waitForTimeout(3000);

      const title = await this.page.title();
      console.log(`Page title: ${title}`);

      // Check if we're on a login page
      const isLoginPage = await this.page.evaluate(() => {
        return document.URL.includes('login') || 
               document.querySelector('input[type="email"]') !== null ||
               document.querySelector('input[type="password"]') !== null;
      });

      if (isLoginPage) {
        console.log('Login required. Please log in manually...');
        console.log('Waiting for navigation to complete...');
        
        // Wait for navigation away from login page
        await this.page.waitForNavigation({ 
          waitUntil: 'networkidle0',
          timeout: 120000 // 2 minutes for manual login
        });
      }

      return true;
    } catch (error) {
      console.error('Navigation failed:', error.message);
      return false;
    }
  }

  async extractChatData() {
    if (!this.page) {
      throw new Error('Browser not initialized. Call initialize() first.');
    }

    console.log('Extracting chat data...');

    try {
      // Wait for chat content to load
      await this.page.waitForTimeout(5000);

      // Extract chat data using the same logic as the content script
      const chatData = await this.page.evaluate(() => {
        // Copy the extraction logic from content.js
        class CopilotChatExtractor {
          constructor() {
            this.chatData = {
              title: '',
              timestamp: new Date().toISOString(),
              messages: []
            };
          }

          extractChatMessages() {
            const messages = [];
            
            // Try multiple selectors for different Copilot interfaces
            const messageSelectors = [
              '.ac-textBlock',
              '.message-content',
              '[data-testid="message"]',
              '.chat-message',
              '.conversation-message',
              '.ac-container .ac-textBlock',
              '.b_sydConvCont .b_msgBlock',
              '.cib-serp-main .ac-textBlock',
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
                break;
              }
            }

            return messages;
          }

          parseMessageElement(element, index) {
            const isUser = this.isUserMessage(element);
            const content = this.extractTextContent(element);
            const codeBlocks = this.extractCodeBlocks(element);
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
            // Simplified user detection
            return element.closest('[class*="user"]') !== null ||
                   element.classList.toString().includes('user');
          }

          extractTextContent(element) {
            return element.textContent || element.innerText || '';
          }

          extractCodeBlocks(element) {
            const codeBlocks = [];
            element.querySelectorAll('pre, code').forEach(codeEl => {
              codeBlocks.push({
                language: '',
                code: codeEl.textContent || ''
              });
            });
            return codeBlocks;
          }

          extractTimestamp(element) {
            const timestampEl = element.querySelector('.timestamp, .message-time');
            return timestampEl ? timestampEl.textContent : null;
          }

          getChatTitle() {
            const titleSelectors = ['h1', '.chat-title', '.conversation-title', 'title'];
            for (const selector of titleSelectors) {
              const titleEl = document.querySelector(selector);
              if (titleEl && titleEl.textContent.trim()) {
                return titleEl.textContent.trim();
              }
            }
            return `Copilot Chat - ${new Date().toLocaleDateString()}`;
          }

          extractFullChat() {
            this.chatData.title = this.getChatTitle();
            this.chatData.messages = this.extractChatMessages();
            this.chatData.url = window.location.href;
            return this.chatData;
          }
        }

        const extractor = new CopilotChatExtractor();
        return extractor.extractFullChat();
      });

      console.log(`Extracted ${chatData.messages.length} messages`);
      return chatData;

    } catch (error) {
      console.error('Chat extraction failed:', error.message);
      throw error;
    }
  }

  async saveChat(chatData, outputPath = null) {
    if (!outputPath) {
      // Generate default output path
      const filename = this.converter.generateFilename(chatData);
      outputPath = path.join(this.options.outputDir, filename);
    }

    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Convert to markdown
    const markdown = this.converter.convertToMarkdown(chatData);

    // Save to file
    await fs.writeFile(outputPath, markdown, 'utf8');
    
    console.log(`Chat saved to: ${outputPath}`);
    return outputPath;
  }

  async cleanup() {
    if (this.browser) {
      console.log('Closing browser...');
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  async processChatUrl(chatUrl, outputPath = null) {
    try {
      await this.initialize();
      
      const navigated = await this.navigateToChat(chatUrl);
      if (!navigated) {
        throw new Error('Failed to navigate to chat URL');
      }

      const chatData = await this.extractChatData();
      if (!chatData.messages || chatData.messages.length === 0) {
        throw new Error('No chat messages found');
      }

      const savedPath = await this.saveChat(chatData, outputPath);
      
      return {
        success: true,
        chatData: chatData,
        outputPath: savedPath
      };

    } catch (error) {
      console.error('Process failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      await this.cleanup();
    }
  }
}

module.exports = CopilotChatAutomation;