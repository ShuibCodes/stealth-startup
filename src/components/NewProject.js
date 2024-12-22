import React from 'react';
import CodeEditor from './CodeEditor';

import AIChatSidebar2 from './AIChatSidebar2';

const NewProject = () => {
  return (
    <div className="app">
      <div className="workspace">
        <CodeEditor />
        <AIChatSidebar2 />
      </div>
    </div>
  );
};

export default NewProject; 