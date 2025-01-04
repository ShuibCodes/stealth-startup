import React, { useRef, useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import CodeMirror from 'codemirror';

const defaultHTML = `<div class="game">
  <div class="board">
    <div class="cell x"></div>
    <div class="cell o"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell x"></div>
    <div class="cell"></div>
    <div class="cell o"></div>
    <div class="cell"></div>
    <div class="cell x"></div>
  </div>
</div>`;

const defaultCSS = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
}
`;

export default function Editor({ language, displayName, value, onChange }) {
  const editorRef = useRef(null);
  const wrapperRef = useRef(null);

  // Initialize editor
  useEffect(() => {
    if (wrapperRef.current) {
      // Clean up any existing instance
      if (editorRef.current && wrapperRef.current) {
        wrapperRef.current.innerHTML = '';
      }

      // Create new instance
      editorRef.current = CodeMirror(wrapperRef.current, {
        value: value || '',
        mode: language,
        lineNumbers: true
      });

      editorRef.current.on('change', (instance) => {
        onChange(instance.getValue());
      });

      // Cleanup function
      return () => {
        if (editorRef.current && wrapperRef.current) {
          editorRef.current.off('change');
          wrapperRef.current.innerHTML = '';
          editorRef.current = null;
        }
      };
    }
  }, [language]); // Reinitialize when language changes

  // Handle value updates
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px", backgroundColor: "#1f1f1f", color: "white" }}>
        {displayName}
      </div>
      <div ref={wrapperRef} style={{ flex: 1 }} />
    </div>
  );
}