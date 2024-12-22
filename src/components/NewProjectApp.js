import React, { useState } from 'react';
import CodeEditor from '../Editor';
import AIChatSidebar2 from './AIChatSidebar2';

const NewProjectApp = () => {
  const [code, setCode] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const srcDoc = `
    <!doctype html>
    <html>
      <head></head>
      <body>
        <script>${code}</script>
      </body>
    </html>
  `;

  return (
    <div className="App">
      <div className="chat-pane">
        <AIChatSidebar2 
          html={code}
          js={code}
          css=""
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
        <div className="editor-container">
          <CodeEditor 
            language="javascript"
            displayName="JavaScript"
            value={code}
            onChange={setCode}
            currentStepIndex={currentStepIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default NewProjectApp; 