import React from "react";
import CodeEditor from "./CodeEditor";
import AIChatSidebar from "./AIChatSidebar2";

const TodoApp = () => {
  // // console.log('TodoApp rendering');
  return (
    <div className="app">
      <div className="workspace">
        <CodeEditor />
        <AIChatSidebar />
      </div>
    </div>
  );
};

export default TodoApp;
