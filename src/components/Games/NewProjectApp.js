import React, { useState, useEffect } from "react";
import EditorProjectTwo from "./EditorProjectTwo";
import AIChatSidebar2 from "../AiChatbot/AIChatSidebar2";
import "../../App.css";
import Modal from "../Modals/Modal";
import ModalTicTacToe from "../Modals/ModalTicTacToe";
import ModalPokemon from "../Modals/ModalPokemon";
import ModalMemoryGame from "../Modals/ModalMemoryGame";
import { getGameConfig } from "../../games";
import { useLocation, useNavigate } from "react-router-dom";

const NewProjectApp = ({ gameType = "rock-paper-scissors" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we're in Python mode and get the correct path
  const isPython = location.pathname.includes("/py/");
  const isJavaScript = location.pathname.includes("/js/");
  
  // Get the appropriate game configuration
  const gameConfig = getGameConfig(gameType);
  
  // Initialize all hooks first with safeguards
  const [html, setHtml] = useState(() => {
    try {
      return gameConfig.getInitialHtml ? gameConfig.getInitialHtml() : '';
    } catch (err) {
      console.error("Error getting initial HTML:", err);
      return '';
    }
  });
  
  const [css, setCss] = useState(() => {
    try {
      return gameConfig.getInitialCss ? gameConfig.getInitialCss() : '';
    } catch (err) {
      console.error("Error getting initial CSS:", err);
      return '';
    }
  });
  
  const [js, setJs] = useState(() => {
    try {
      return gameConfig.getInitialJs ? gameConfig.getInitialJs() : '';
    } catch (err) {
      console.error("Error getting initial JS:", err);
      return '';
    }
  });
  
  const [python, setPython] = useState(() => {
    try {
      return isPython && gameConfig.getInitialPy ? gameConfig.getInitialPy() : '';
    } catch (err) {
      console.error("Error getting initial Python:", err);
      return '';
    }
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("html");
  const [srcDoc, setSrcDoc] = useState("");
  
  // Handle routing on mount
  useEffect(() => {
    const correctPath = isPython 
      ? `/new-project/py/${gameType}`
      : `/new-project/js/${gameType}`;
      
    if (location.pathname !== correctPath) {
      navigate(correctPath, { replace: true });
    }
  }, [location.pathname, gameType, isPython, navigate]);

  useEffect(() => {
    // Ensure the initial HTML and CSS are set
    if (!html && gameConfig.getInitialHtml) {
      setHtml(gameConfig.getInitialHtml());
    }
    
    if (!css && gameConfig.getInitialCss) {
      setCss(gameConfig.getInitialCss());
    }

    let timeout;
    
    if (!isPython) {
      // JS mode: execute the code in an iframe
      timeout = setTimeout(() => {
        try {
          setSrcDoc(`
            <!doctype html>
            <html>
              <head>
                <style>${css || ''}</style>
              </head>
              <body>
                ${html || ''}
                <script>
                  try {
                    ${js || ''}
                  } catch (err) {
                    console.error('JS Error:', err);
                    document.body.innerHTML += '<div style="color:red;padding:10px;background:#ffeeee;border:1px solid red;margin-top:10px;">JavaScript Error: ' + err.message + '</div>';
                  }
                </script>
              </body>
            </html>
          `);
        } catch (err) {
          console.error("Error setting srcDoc:", err);
        }
      }, 250);
    } else {
      timeout = setTimeout(() => {
        try {
          setSrcDoc(`
            <!doctype html>
            <html>
              <head>
                <style>${css || ''}</style>
              </head>
              <body>
                ${html || ''}
              </body>
            </html>
          `);
        } catch (err) {
          console.error("Error setting srcDoc:", err);
        }
      }, 250);
    }
    return () => clearTimeout(timeout);
  }, [html, css, js, python, isPython, gameConfig]);

  // Also add a useEffect to ensure the initial game state is loaded properly
  useEffect(() => {
    // Make sure the game is fully initialized when the gameType changes
    if (gameConfig) {
      if (gameConfig.getInitialHtml) {
        setHtml(gameConfig.getInitialHtml());
      }
      
      if (gameConfig.getInitialCss) {
        setCss(gameConfig.getInitialCss());
      }
      
      if (gameConfig.getInitialJs) {
        setJs(gameConfig.getInitialJs());
      }
      
      if (isPython && gameConfig.getInitialPy) {
        setPython(gameConfig.getInitialPy());
      }
    }
  }, [gameType, gameConfig, isPython]);

  const renderEditor = () => {
    if (activeTab === "html") {
      return (
        <EditorProjectTwo
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          currentStepIndex={currentStepIndex}
        />
      );
    } else if (activeTab === "css") {
      return (
        <EditorProjectTwo
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          currentStepIndex={currentStepIndex}
        />
      );
    } else if (activeTab === (isPython ? "python" : "javascript")) {
      if (isPython) {
        return (
          <EditorProjectTwo
            language="python"
            displayName="Python"
            value={python}
            onChange={setPython}
            currentStepIndex={currentStepIndex}
          />
        );
      } else {
        return (
          <EditorProjectTwo
            language="javascript"
            displayName="JavaScript"
            value={js}
            onChange={setJs}
            currentStepIndex={currentStepIndex}
          />
        );
      }
    }
    return null;
  };

  const scrollToEditor = () => {
    setTimeout(() => {
      const editorElement = document.querySelector(".editor");
      if (editorElement) {
        const editorHeight = editorElement.scrollHeight;
        editorElement.scrollTop = editorHeight;
      }
    }, 100);
  };

  const handleCodeSelect = (option) => {
    if (!option) return;

    try {
      // Ensure gameConfig and handleCodeSelect function exist
      if (gameConfig && typeof gameConfig.handleCodeSelect === 'function') {
        // Use the game-specific handler from the config
        if (!isPython) {
          setJs((prevJs) => {
            try {
              return gameConfig.handleCodeSelect(option, prevJs);
            } catch (err) {
              console.error("Error in JS handleCodeSelect:", err);
              return prevJs; // Return unchanged if there's an error
            }
          });
        } else {
          setPython((prevPy) => {
            try {
              return gameConfig.handleCodeSelect(option, prevPy);
            } catch (err) {
              console.error("Error in Python handleCodeSelect:", err);
              return prevPy; // Return unchanged if there's an error
            }
          });
        }
        
        // In either case, switch to the code tab for editing
        setActiveTab(isPython ? "python" : "javascript");
        scrollToEditor();
      } else {
        console.error("gameConfig or handleCodeSelect function is not available");
      }
    } catch (err) {
      console.error("Error in handleCodeSelect:", err);
    }
  };

  return (
    <div className="App">
      {(() => {
        switch (gameType) {
          case "pokemon-battle":
            return (
              <ModalPokemon
                onCodeSelect={handleCodeSelect}
                currentStepIndex={currentStepIndex}
              />
            );
          case "tic-tac-toe":
            return (
              <ModalTicTacToe
                onCodeSelect={handleCodeSelect}
                currentStepIndex={currentStepIndex}
              />
            );
          case "memory-game":
            return (
              <ModalMemoryGame
                onCodeSelect={handleCodeSelect}
                currentStepIndex={currentStepIndex}
              />
            );
          default:
            return (
              <Modal
                onCodeSelect={handleCodeSelect}
                currentStepIndex={currentStepIndex}
              />
            );
        }
      })()}
      <div className="chat-pane">
        <AIChatSidebar2
          html={html}
          css={css}
          js={js}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      </div>
      <div className="preview-pane">
        <div className="preview-title">Preview</div>
        <iframe
          srcDoc={srcDoc}
          title="preview"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      <div className="editor-section">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "html" ? "active" : ""}`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`tab-button ${activeTab === "css" ? "active" : ""}`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          <button
            className={`tab-button ${
              activeTab === (isPython ? "python" : "javascript") ? "active" : ""
            }`}
            onClick={() => setActiveTab(isPython ? "python" : "javascript")}
          >
            {isPython ? "Python" : "JavaScript"}
          </button>
        </div>
        <div
          className="editor-container"
          style={{
            height: "70vh",
            overflow: "auto",
            maxHeight: "800px",
          }}
        >
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};

export default NewProjectApp;
