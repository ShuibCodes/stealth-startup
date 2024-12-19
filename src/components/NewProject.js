import React from 'react';
import CodeEditor from './CodeEditor';
import AIChatSidebar from './AIChatSidebar';

const NewProject = () => {
  return (
    <div className="app">
      <div className="workspace">
        <CodeEditor />
        <AIChatSidebar />
      </div>
    </div>
  );
};

export default NewProject; 