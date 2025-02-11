import React, { useState, useEffect, useRef } from "react";
import todoAppRequirements from "../utils/todoAppRequirements";

const AIChatSidebar = ({
  html,
  css,
  js,
  currentStepIndex,
  setCurrentStepIndex,
}) => {
  //  // console.log('API Key:', process.env.REACT_APP_OPENAI_API_KEY);
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hello! I'm here to help you build your web app. I can see your HTML, CSS, and JavaScript code. What would you like help with?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGPT = async (userMessage, codeContext) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful programming assistant. You can see the user's HTML, CSS, and JavaScript code and provide guidance on web development.",
              },
              {
                role: "user",
                content: `Current code context:
                HTML: ${codeContext.html}
                CSS: ${codeContext.css}
                JavaScript: ${codeContext.js}
                
                User question: ${userMessage}`,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "API request failed");
      }

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Unexpected API response format");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling GPT:", error);
      return `Error: ${error.message}. Please check your API key and try again.`;
    }
  };

  const validateCurrentStep = () => {
    const currentStep = todoAppRequirements.steps[currentStepIndex];

    //  // console.log('Validation started');
    //  // console.log('HTML type:', typeof html);
    //  // console.log('HTML content:', html);
    //  // console.log('Current step:', currentStep);

    if (!currentStep) {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "All steps are completed!",
        },
      ]);
      return;
    }

    let validationPassed = false;

    // For HTML validation
    if (currentStep.requiredElements) {
      const parser = new DOMParser();
      //  // console.log('About to parse HTML:', html);
      const doc = parser.parseFromString(html, "text/html");
      //  // console.log('Parsed document:', doc.documentElement.innerHTML);

      const missingElements = currentStep.requiredElements.filter(
        (selector) => {
          const element = doc.querySelector(selector);
          //  // console.log(`Checking selector "${selector}"`, {
          //   found: !!element,
          //   elementDetails: element ? element.outerHTML : 'not found'
          // });
          return !element;
        }
      );

      if (missingElements.length === 0) {
        validationPassed = true;
      } else {
        //  // console.log('Missing elements:', missingElements);
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: `Almost there! Still missing: ${missingElements.join(
              ", "
            )}`,
          },
        ]);
      }
    }

    // For JavaScript validation
    if (currentStep.requiredFeatures) {
      const jsLower = js.toLowerCase();

      const missingFeatures = currentStep.requiredFeatures.filter((feature) => {
        const featureLower = feature.toLowerCase();
        return !jsLower.includes(featureLower);
      });

      if (missingFeatures.length === 0) {
        validationPassed = true;
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: `Almost there! Your code is missing: ${missingFeatures.join(
              ", "
            )}`,
          },
        ]);
      }
    }

    if (validationPassed) {
      handleStepCompletion();
    }
  };

  // Add this helper function
  const handleStepCompletion = () => {
    const congratsMessage = `🎉 Great job! You've completed step ${
      currentStepIndex + 1
    }!\n\n`;
    const nextStep = todoAppRequirements.steps[currentStepIndex + 1];
    const nextStepMessage = nextStep
      ? `Next step: ${nextStep.description}`
      : "Congratulations! You've completed all steps!";

    setMessages((prev) => [
      ...prev,
      { type: "ai", content: congratsMessage + nextStepMessage },
    ]);

    if (nextStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !e.target.hasAttribute("data-check-code"))
      return;

    if (
      e.target.hasAttribute("data-check-code") ||
      inputMessage.toLowerCase().includes("check my code")
    ) {
      validateCurrentStep();
      setInputMessage("");
      return;
    }

    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const newMessages = [...messages, { type: "user", content: inputMessage }];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const aiResponse = await callGPT(inputMessage, { html, css, js });
      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const todoAppContext = {
    description: `I'm here to help you build a Todo App. The requirements are:

1. HTML Structure:
   - Input field for new todos
   - Submit button
   - List to display todos
   - Delete and complete buttons for each todo

2. JavaScript Features:
   - Add new todos
   - Delete todos
   - Mark todos as complete
   - Save todos to localStorage
   - Load todos from localStorage

I can help you write the code and check if it meets these requirements.`,

    examples: {
      html: `
<div class="todo-container">
  <form class="todo-form">
    <input type="text" class="todo-input">
    <button type="submit">Add Todo</button>
  </form>
  <ul class="todo-list">
    <!-- Todo items will go here -->
  </ul>
</div>`,

      javascript: `
function addTodo(e) {
  e.preventDefault();if (currentStep.requiredFeatures) 
  // Create new todo
}

function deleteTodo(e) {
  const item = e.target.parentElement;
  item.remove();
  saveTodos();
}
`,
    },
  };

  // Define the existing context
  const existingContext = {
    currentCode: {
      html,
      css,
      js,
    },
    currentStep: todoAppRequirements.steps[currentStepIndex],
    progress: {
      currentStepIndex,
      totalSteps: todoAppRequirements.steps.length,
    },
  };

  const handleUserMessage = async (message) => {
    const aiContext = {
      ...existingContext,
      todoApp: todoAppContext,
    };

    try {
      const aiResponse = await callGPT(message, aiContext);
      setMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);
    } catch (error) {
      console.error("Error in AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };

  const getNextStep = () => {
    const step = todoAppRequirements.steps[currentStepIndex];
    return step ? step.description : null;
  };

  const handleHint = async () => {
    const step = todoAppRequirements.steps[currentStepIndex];
    if (!step) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", content: "Can I get a hint for this step?" },
      {
        type: "ai",
        content: `Here's a hint for ${step.name}:`,
        isCode: true,
        code: step.hint,
      },
    ]);
  };

  const moveToNextStep = () => {
    if (currentStepIndex < todoAppRequirements.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Update initial AI message to include first step
  useEffect(() => {
    setMessages([
      {
        type: "ai",
        content: `Welcome! Let's build a Todo App together. We'll go through it step by step.\n\nFirst step: ${todoAppRequirements.steps[0].description}\n\nNeed a hint? Click the "Give Me a Hint" button!`,
      },
    ]);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        color: "white",
        backgroundColor: "#1e1e1e",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              backgroundColor: message.type === "ai" ? "#2d2d2d" : "#3d3d3d",
              padding: "10px",
              borderRadius: "5px",
              maxWidth: "85%",
              alignSelf: message.type === "ai" ? "flex-start" : "flex-end",
            }}
          >
            <strong>{message.type === "ai" ? "AI Assistant:" : "You:"}</strong>
            {message.isCode ? (
              <>
                <p style={{ margin: "5px 0" }}>{message.content}</p>
                <div className="code-hint-container">
                  <div className="code-hint-header">
                    <span className="code-hint-dot"></span>
                    <span className="code-hint-dot"></span>
                    <span className="code-hint-dot"></span>
                  </div>
                  <pre className="code-hint">
                    <code>{message.code}</code>
                  </pre>
                </div>
              </>
            ) : (
              <p style={{ margin: "5px 0" }}>{message.content}</p>
            )}
          </div>
        ))}
        {isLoading && (
          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#2d2d2d",
              alignSelf: "flex-start",
            }}
          >
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          borderTop: "1px solid #444",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <strong>Current Step: </strong>
          {todoAppRequirements.steps[currentStepIndex]?.description ||
            "All steps completed!"}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            data-check-code
            onClick={handleSendMessage}
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Check My Code
          </button>

          <button
            onClick={handleHint}
            style={{
              padding: "10px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Give Me a Hint
          </button>
        </div>

        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Or type your message..."
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#2d2d2d",
              border: "1px solid #444",
              borderRadius: "4px",
              color: "white",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default AIChatSidebar;
