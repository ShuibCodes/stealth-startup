import React, { useState, useEffect } from "react";
import EditorProjectTwo from "../EditorProjectTwo";
import AIChatSidebar2 from "./AIChatSidebar2";
import "../App.css";
import Modal from "./Modal";
import ModalTicTacToe from "./ModalTicTacToe";
import { getGameConfig } from "../games";
import VideoPopup from "./VideoPopup";

const NewProjectApp = ({ gameType = "rock-paper-scissors" }) => {
  // Get the appropriate game configuration based on the gameType
  const gameConfig = getGameConfig(gameType);

  const [html, setHtml] = useState(gameConfig.getInitialHtml());
  const [css, setCss] = useState(gameConfig.getInitialCss());
  const [js, setJs] = useState(gameConfig.getInitialJs());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("html");
  const [srcDoc, setSrcDoc] = useState("");
  const [videoOpen, setVideoOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
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

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const renderEditor = () => {
    switch (activeTab) {
      case "html":
        return (
          <EditorProjectTwo
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            currentStepIndex={currentStepIndex}
          />
        );
      case "css":
        return (
          <EditorProjectTwo
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            currentStepIndex={currentStepIndex}
          />
        );
      case "javascript":
        return (
          <EditorProjectTwo
            language="javascript"
            displayName="JavaScript"
            value={js}
            onChange={setJs}
            currentStepIndex={currentStepIndex}
          />
        );
      default:
        return null;
    }
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
    setJs((prevJs) => gameConfig.handleCodeSelect(option, prevJs));

    setActiveTab("javascript");
    scrollToEditor();
  };
  return (
    <div className="App">
      {videoOpen && (
        <VideoPopup
          onClose={() => {
            setVideoOpen(false);
          }}
        />
      )}
      {gameType === "tic-tac-toe" && !videoOpen && (
        <ModalTicTacToe
          onCodeSelect={handleCodeSelect}
          currentStepIndex={currentStepIndex}
        />
      )}
      {gameType === "rock-paper-scissors" && !videoOpen && (
        <Modal
          onCodeSelect={handleCodeSelect}
          currentStepIndex={currentStepIndex}
        />
      )}

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
              activeTab === "javascript" ? "active" : ""
            }`}
            onClick={() => setActiveTab("javascript")}
          >
            JavaScript
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
