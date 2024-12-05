import React, { useState } from 'react';
import Editor from './Editor';
import AIChatSidebar from './components/AIChatSidebar';
import './App.css';

function App() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Create srcDoc for the preview iframe
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

  return (
    <div className="App">
      <div className="pane editor-pane">
        <div className="editor-container">
          <Editor 
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            currentStepIndex={currentStepIndex}
          />
          <Editor 
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            currentStepIndex={currentStepIndex}
          />
          <Editor 
            language="javascript"
            displayName="JavaScript"
            value={js}
            onChange={setJs}
            currentStepIndex={currentStepIndex}
          />
        </div>
      </div>
      <div className="pane preview-pane">
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
      <div className="pane chat-pane">
        <AIChatSidebar 
          html={html}
          css={css}
          js={js}
          currentStepIndex={currentStepIndex}
          setCurrentStepIndex={setCurrentStepIndex}
        />
      </div>
    </div>
  );
}

export default App;
