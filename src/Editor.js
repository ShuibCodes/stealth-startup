import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import todoAppRequirements from './utils/todoAppRequirements';

export default function Editor({ language, displayName, value, onChange, currentStepIndex }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [validationMessages, setValidationMessages] = useState([]);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  const checkCode = () => {
    const currentStep = todoAppRequirements.steps[currentStepIndex];
    const results = validateStep(currentStep, value);
    
    if (results.length === 0) {
      setCompletedSteps(prev => new Set(prev).add(currentStep.id));
      displayValidationResults([`✅ Great job! You've completed step ${currentStep.id}!`]);
    } else {
      displayValidationResults([
        "Your code is valid HTML, but doesn't yet meet the todo app requirements:",
        ...results
      ]);
    }
  };

  const validateStep = (step, code) => {
    const results = [];
    
    if (language === 'xml' && step.requiredElements) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      
      step.requiredElements.forEach(selector => {
        if (!doc.querySelector(selector)) {
          results.push(`Missing required element: ${selector}`);
        }
      });
    }

    if (language === 'javascript' && step.requiredFeatures) {
      step.requiredFeatures.forEach(feature => {
        if (!code.includes(feature)) {
          results.push(`Missing required feature: ${feature}`);
        }
      });
    }

    return results;
  };

  const displayValidationResults = (results) => {
    setValidationMessages(results);
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-title">
        {displayName}
        {language === 'xml' && 
          <span className="editor-subtitle">
            Write any HTML here. Click "Check My Code" to validate against todo requirements.
          </span>
        }
      </div>
      <div className="editor-container">
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: "material",
            lineNumbers: true,
          }}
        />
      </div>
      {validationMessages.length > 0 && (
        <div className="validation-messages">
          {validationMessages.map((msg, index) => (
            <div key={index} className="validation-message">
              {msg}
            </div>
          ))}
        </div>
      )}
      <button 
        className="check-code-btn"
        onClick={checkCode}
      >
        Check My Code
      </button>
    </div>
  );
}
