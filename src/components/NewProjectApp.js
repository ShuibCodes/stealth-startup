import React, { useState, useEffect } from 'react';
import EditorProjectTwo from '../EditorProjectTwo';
import AIChatSidebar2 from './AIChatSidebar2';
import '../App.css';
import Modal from './Modal';

const NewProjectApp = () => {
  const [html, setHtml] = useState(`
 <body>

  <h1>Rock-Paper-Scissors</h1>
  <p>Click one of the buttons below to play!</p>
  
  <div id="buttons-container">
    <!-- Each button stores its choice in a data-attribute -->
    <button class="choice-btn" data-choice="Rock">Rock</button>
    <button class="choice-btn" data-choice="Paper">Paper</button>
    <button class="choice-btn" data-choice="Scissors">Scissors</button>
  </div>

  <!-- Area where the result will be shown -->
  <div id="result"></div>

  <!-- Link to our JavaScript file -->
  <script src="script.js"></script>
</body>
  `);


  
  const [css, setCss] = useState(`* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.title{
text-align: center;
padding: 4px;
}

.editor-container {
  height: 100%;
  overflow: auto;
  max-height: 500px;
}
.game {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 2px;
  background-color: #000;
}

.cell {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
  position: relative;
}

/* X styling */
.cell.x::before,
.cell.x::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 80px;
  background-color: #000;
}

.cell.x::before {
  transform: rotate(45deg);
}

.cell.x::after {
  transform: rotate(-45deg);
}

/* O styling */
.cell.o::before {
  content: '';
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 10px solid #000;
}`);
  
  const [js, setJs] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('html');
  const [srcDoc, setSrcDoc] = useState('');

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
    switch(activeTab) {
      case 'html':
        return (
          <EditorProjectTwo
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            currentStepIndex={currentStepIndex}
          />
        );
      case 'css':
        return (
          <EditorProjectTwo
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            currentStepIndex={currentStepIndex}
          />
        );
      case 'javascript':
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

  const handleCodeSelect = (option) => {
    if (!option) return; 
    
    setJs(prevJs => {
      // If it's the computer choice code (checking for the array of choices)
      if (option.includes('["Rock", "Paper", "Scissors"]')) {
        if (prevJs && prevJs.includes('function playGame(userChoice)')) {
          // Replace the function logic comment with the new code, maintaining indentation
          return prevJs.replace('  // function logic', '  ' + option.split('\n').join('\n  ')) + '\n\n\n';
        } else {
          // Create new function with the code
          const newCode = `function playGame(userChoice) {\n  ${option}\n}\n\n\n`;
          return prevJs ? `${prevJs}\n\n${newCode}` : newCode;
        }
      }
      
      // Otherwise, add code as normal
      const newJs = prevJs ? `${prevJs}\n\n${option}\n\n` : `${option}\n\n`;
      
      setTimeout(() => {
        const editorContainer = document.querySelector('.editor-container');
        if (editorContainer) {
          editorContainer.scrollTop = 99999;
        }
      }, 50);

      return newJs;
    });
    setActiveTab('javascript');
  };

  return (
    <div className="App">
         <Modal 
           onCodeSelect={handleCodeSelect}
           currentStepIndex={currentStepIndex}
         />
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
            className={`tab-button ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button 
            className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button 
            className={`tab-button ${activeTab === 'javascript' ? 'active' : ''}`}
            onClick={() => setActiveTab('javascript')}
          >
            JavaScript
          </button>
        </div>
        <div className="editor-container" style={{ 
          height: '70vh',
          overflow: 'auto',
          maxHeight: '800px'
        }}>
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};

export default NewProjectApp; 