/**
 * Copilot Chat Saver - Background Service Worker
 * 
 * @author Gerasimos Makis Mouzakitis
 * @version 0.0.1
 * @created 2025-09-17
 * @updated 2025-09-17
 * 
 * Background service worker for Copilot Chat Saver
 */

// Background service worker for Copilot Chat Saver

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Copilot Chat Saver installed successfully!');
    
    // Set default options
    chrome.storage.sync.set({
      includeTimestamps: true,
      includeMetadata: true,
      formatCodeBlocks: true,
      autoFilename: true
    });
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup, but we can also add logic here if needed
  console.log('Extension clicked on tab:', tab.url);
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  if (request.action === 'downloadFile') {
    // Handle file download from background script if needed
    const { content, filename, mimeType } = request;
    
    const blob = new Blob([content], { type: mimeType || 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true, downloadId: downloadId });
        URL.revokeObjectURL(url);
      }
    });
    
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'getSettings') {
    chrome.storage.sync.get([
      'includeTimestamps',
      'includeMetadata', 
      'formatCodeBlocks',
      'autoFilename'
    ], (result) => {
      sendResponse({ success: true, settings: result });
    });
    
    return true;
  }
  
  if (request.action === 'saveSettings') {
    chrome.storage.sync.set(request.settings, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true });
      }
    });
    
    return true;
  }
});

// Context menu for quick access (optional)
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'saveCopilotChat') {
    // Send message to content script to extract chat
    chrome.tabs.sendMessage(tab.id, { action: 'extractChat' }, (response) => {
      if (response && response.success) {
        console.log('Chat extracted via context menu:', response.data);
        // Could trigger automatic download here
      }
    });
  }
});

// Create context menu on startup
chrome.runtime.onStartup.addListener(() => {
  createContextMenus();
});

chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
});

function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'saveCopilotChat',
      title: 'Save Copilot Chat',
      contexts: ['page'],
      documentUrlPatterns: [
        'https://copilot.microsoft.com/*',
        'https://*.bing.com/*',
        'https://www.bing.com/*'
      ]
    });
  });
}

// Handle tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const supportedSites = [
      'copilot.microsoft.com',
      'bing.com',
      'www.bing.com'
    ];
    
    const isSupported = supportedSites.some(site => tab.url.includes(site));
    
    if (isSupported) {
      // Ensure content script is injected
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      }).catch(err => {
        // Script might already be injected, ignore error
        console.log('Content script injection skipped:', err.message);
      });
    }
  }
});

// Error handling
chrome.runtime.onSuspend.addListener(() => {
  console.log('Copilot Chat Saver background script suspending...');
});

chrome.runtime.onSuspendCanceled.addListener(() => {
  console.log('Copilot Chat Saver background script suspend canceled');
});