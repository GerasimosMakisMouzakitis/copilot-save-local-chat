// Test script for Copilot Chat Saver
// Run this in the browser console to test the markdown converter

// Sample chat data for testing
const testChatData = {
  title: "Test Copilot Conversation",
  timestamp: new Date().toISOString(),
  url: "https://copilot.microsoft.com/test",
  messages: [
    {
      role: "user",
      content: "Hello, can you help me write a Python function?",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      index: 0,
      codeBlocks: []
    },
    {
      role: "assistant", 
      content: "Of course! I'd be happy to help you write a Python function. Here's a simple example:",
      timestamp: new Date(Date.now() - 100000).toISOString(),
      index: 1,
      codeBlocks: [
        {
          language: "python",
          code: `def greet(name):
    """
    A simple greeting function
    """
    return f"Hello, {name}!"

# Example usage
print(greet("World"))`
        }
      ]
    },
    {
      role: "user",
      content: "That's great! Can you also show me how to create a class?",
      timestamp: new Date(Date.now() - 80000).toISOString(),
      index: 2,
      codeBlocks: []
    },
    {
      role: "assistant",
      content: "Absolutely! Here's an example of a Python class with some common methods:",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      index: 3,
      codeBlocks: [
        {
          language: "python",
          code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    def have_birthday(self):
        self.age += 1
        return f"Happy birthday! I'm now {self.age}."

# Example usage
person = Person("Alice", 25)
print(person.introduce())
print(person.have_birthday())`
        }
      ]
    }
  ]
};

// Test the markdown converter
console.log("Testing Copilot Chat Saver...");

try {
  // Test markdown conversion
  if (typeof MarkdownConverter !== 'undefined') {
    const converter = new MarkdownConverter();
    const markdown = converter.convertToMarkdown(testChatData);
    
    console.log("✅ Markdown conversion successful!");
    console.log("Generated markdown length:", markdown.length);
    console.log("\n--- SAMPLE OUTPUT ---");
    console.log(markdown.substring(0, 500) + "...");
    
    // Test filename generation
    const filename = converter.generateFilename(testChatData);
    console.log("✅ Filename generation successful:", filename);
    
    // Test language detection
    const testCode = `function hello() { console.log("Hello!"); }`;
    const language = converter.detectLanguage(testCode);
    console.log("✅ Language detection test:", language);
    
  } else {
    console.error("❌ MarkdownConverter not found. Make sure the script is loaded.");
  }
  
  // Test chat extraction (if on a Copilot page)
  if (typeof CopilotChatExtractor !== 'undefined') {
    const extractor = new CopilotChatExtractor();
    const extractedData = extractor.extractFullChat();
    
    console.log("✅ Chat extraction test completed");
    console.log("Extracted messages:", extractedData.messages.length);
    console.log("Chat title:", extractedData.title);
    
  } else {
    console.log("ℹ️ CopilotChatExtractor not available (only works on content script context)");
  }
  
  console.log("\n🎉 All tests completed!");
  
} catch (error) {
  console.error("❌ Test failed:", error);
}

// Export test data for manual testing
window.testChatData = testChatData;
console.log("Test data available as window.testChatData");