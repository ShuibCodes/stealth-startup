import React, { useState } from 'react';
import Editor from '../Editor';
import AIChatSidebar from './AIChatSidebar';

function CodepenApp() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('html');

  const srcDoc = `
    <!doctype html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  const renderEditor = () => {
    switch(activeTab) {
      case 'html':
        return (
          <Editor 
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            currentStepIndex={currentStepIndex}
          />
        );
      case 'css':
        return (
          <Editor 
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            currentStepIndex={currentStepIndex}
          />
        );
      case 'javascript':
        return (
          <Editor 
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

  return (
    <div className="App">
      <div className="chat-pane">
        <AIChatSidebar 
          html={html}
          css={css}
          js={js}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
          steps={[]}
          requiredElements={{}}
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
        <div className="editor-container">
          {renderEditor()}
        </div>
      </div>
    </div>
  );
}

export default CodepenApp;
// ... rest of the code 