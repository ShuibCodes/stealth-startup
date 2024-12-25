import React, { useRef, useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import CodeMirror from 'codemirror';

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