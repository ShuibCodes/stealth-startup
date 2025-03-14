import React, { useState, useEffect } from "react";
import EditorProjectTwo from "../EditorProjectTwo";
import AIChatSidebar2 from "./AIChatSidebar2";
import "../App.css";
import Modal from "./Modal";
import ModalTicTacToe from "./ModalTicTacToe";
import ModalPokemon from "./ModalPokemon";
import { getGameConfig } from "../games";
import { useLocation } from "react-router-dom";

const NewProjectApp = ({ gameType = "rock-paper-scissors" }) => {
  // Get the appropriate game configuration based on the gameType
  const gameConfig = getGameConfig(gameType);
  const location = useLocation();

  // Check if the URL indicates Python mode (e.g., /py/pokemon-battle)
  const isPython = location.pathname.includes("/py/");

  // For JS-based games we use the js state; for Python games, we use the python state.
  const [html, setHtml] = useState(gameConfig.getInitialHtml());
  const [css, setCss] = useState(gameConfig.getInitialCss());
  const [js, setJs] = useState(gameConfig.getInitialJs());
  const [python, setPython] = useState(
    isPython && gameConfig.getInitialPy ? gameConfig.getInitialPy() : ""
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  // For tab names, if we're in Python mode the third tab is "Python" instead of "JavaScript"
  const [activeTab, setActiveTab] = useState("html");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    let timeout;
    if (!isPython) {
      // JS mode: execute the code in an iframe
      timeout = setTimeout(() => {
        setSrcDoc(`
          <!doctype html>
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>
              ${html}
              <script>
                try {
                  ${js}
                } catch (err) {
                  console.log('JS Error:', err);
                }
              </script>
            </body>
          </html>
        `);
      }, 250);
    } else {
      timeout = setTimeout(() => {
        setSrcDoc(`
          <!doctype html>
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>
              ${html}
            </body>
          </html>
        `);
      }, 250);
    }
    return () => clearTimeout(timeout);
  }, [html, css, js, python, isPython]);

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
    console.log("Option received:", option);
    if (!option) return;

    // Use the game-specific handler from the config
    if (!isPython) {
      setJs((prevJs) => gameConfig.handleCodeSelect(option, prevJs));
    } else {
      setPython((prevPy) => gameConfig.handleCodeSelect(option, prevPy));
    }
    
    // In either case, switch to the code tab for editing
    setActiveTab(isPython ? "python" : "javascript");
    scrollToEditor();
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
