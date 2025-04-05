import React, { useState, useEffect, useRef } from "react";
import newProjectRequirements from "../../utils/newProjectRequirements";
import supabase from "../../database/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { GAME_STEPS } from '../../config/gameSteps';
import { sendMessageToDeepseek } from '../../api/deepseekService';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const AIChatSidebar2 = ({
  html,
  css,
  js,
  currentStepIndex,
  setCurrentStepIndex,
}) => {
  const { user, sessionId } = useAuth();
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
            Authorization: `Bearer ${API_KEY}`,
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
    const currentStep = newProjectRequirements.steps[currentStepIndex];

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

    if (!html) {
      console.error("HTML content is undefined or empty");
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "Error: No HTML content found to validate. Please make sure you have entered some HTML code.",
        },
      ]);
      return;
    }

    // For HTML validation
    if (currentStep.requiredElements) {
      try {
        const parser = new DOMParser();
        const htmlString = html.toString();
        const doc = parser.parseFromString(htmlString, "text/html");

        const missingElements = currentStep.requiredElements.filter(
          (selector) => {
            try {
              const element = doc.querySelector(selector);
              return !element;
            } catch (error) {
              console.error("Error checking for element:", error);
              return true;
            }
          }
        );

        if (missingElements.length === 0) {
          handleStepCompletion();
        } else {
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
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content:
              "Error parsing HTML. Please check your code and try again.",
          },
        ]);
      }
    }

    // For JavaScript validation
    if (currentStep.requiredFeatures) {
      const jsLower = js.toLowerCase();
      const missingFeatures = currentStep.requiredFeatures.filter((feature) => {
        const featureLower = feature.toLowerCase();

        if (featureLower.includes("getelementbyid")) {
          return !(
            jsLower.includes(featureLower) ||
            (jsLower.includes("const todoinput") &&
              jsLower.includes("getelementbyid") &&
              jsLower.includes("todo-input"))
          );
        }

        return !jsLower.includes(featureLower);
      });

      if (missingFeatures.length === 0) {
        handleStepCompletion();
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
  };

  const handleStepCompletion = () => {
    const congratsMessage = `🎉 Great job! You've completed step ${
      currentStepIndex + 1
    }!\n\n`;
    const nextStep = newProjectRequirements.steps[currentStepIndex + 1];
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
  e.preventDefault();
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

  const existingContext = {
    currentCode: {
      html,
      css,
      js,
    },
    currentStep: newProjectRequirements.steps[currentStepIndex],
    progress: {
      currentStepIndex,
      totalSteps: newProjectRequirements.steps.length,
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
    const step = newProjectRequirements.steps[currentStepIndex];
    return step ? step.description : null;
  };

  const handleHint = async () => {
    const step = newProjectRequirements.steps[currentStepIndex];
    if (!step) return;

    if (!user) {
      console.log("No authenticated user - skipping stats update");
      return;
    }
  
    try {
      // Insert a NEW row each time
      const { error: insertError } = await supabase
        .from("hintbuttonusage")
        .insert({
          user_id: user.id,
          session_id: sessionId, 
          hints: [
            {
              stepIndex: currentStepIndex,
              stepName: step.name,
              timestamp: new Date(),
            },
          ],
          created_at: new Date(),
        });
  
      if (insertError) {
        console.error("Supabase insert error:", insertError);
      } else {
        console.log("Hint recorded successfully in Supabase");
      }
  
      // Show the hint in the chat
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
    } catch (error) {
      console.error("Error in handleHint:", error);
      // Even if DB insert fails, still display the hint
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
    }
  };

  const moveToNextStep = () => {
    if (currentStepIndex < newProjectRequirements.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  useEffect(() => {
    setMessages([
      {
        type: "ai",
        content: `Welcome! Let's build a Todo App together. We'll go through it step by step.\n\nFirst step: ${newProjectRequirements.steps[0].description}\n\nNeed a hint? Click the "Give Me a Hint" button!`,
      },
    ]);
  }, []);

  const getCurrentGame = () => {
    const path = window.location.pathname;
    const gameMatch = path.match(/\/new-project\/(js|py)\/([^/]+)/);
    return gameMatch ? gameMatch[2] : null;
  };

  const handleGameHelp = async () => {
    const currentGame = getCurrentGame();
    if (!currentGame || !GAME_STEPS[currentGame]) return;

    const prompt = `You are a teacher with the steps of the game ${currentGame.replace(/-/g, ' ')}: 
    ${GAME_STEPS[currentGame].join(', ')}. 
    The student is stuck at step ${currentStepIndex + 1}: "${GAME_STEPS[currentGame][currentStepIndex]}". 
    Give a helpful hint to help them progress.`;

    setMessages((prev) => [...prev, { type: "user", content: "Can I get help with this step?" }]);
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToDeepseek(prompt);
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
              backgroundColor:
                message.type === "ai" ? "#2d2d2d" : "#3d3d3d",
              padding: "10px",
              borderRadius: "5px",
              maxWidth: "85%",
              alignSelf: message.type === "ai" ? "flex-start" : "flex-end",
            }}
          >
            <strong>
              {message.type === "ai" ? "AI Assistant:" : "You:"}
            </strong>
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
          {newProjectRequirements.steps[currentStepIndex]?.description ||
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

          <button
            onClick={handleGameHelp}
            style={{
              padding: "10px",
              backgroundColor: "#9C27B0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Get Game Help
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

export default AIChatSidebar2;
