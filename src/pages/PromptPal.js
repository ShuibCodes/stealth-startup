import React, { useState, useEffect, useRef } from "react";

const PromptPal = () => {
  const [promptText, setPromptText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Create refs for the elements we want to highlight
  const promptEditorRef = useRef(null);
  const analyzeButtonRef = useRef(null);
  const analysisRef = useRef(null);

  const handleAnalyzePrompt = () => {
    // This would connect to an AI service in a real implementation
    if (promptText.trim().length > 0) {
      setAnalysis({
        message: "This is where the analysis would appear",
        // Add more analysis data as needed
      });
    }
  };

  // Move to the next tutorial step
  const nextTutorialStep = () => {
    if (tutorialStep < 3) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  // Skip the tutorial entirely
  const skipTutorial = () => {
    setShowTutorial(false);
  };

  // Reset the tutorial
  const resetTutorial = () => {
    setTutorialStep(1);
    setShowTutorial(true);
  };

  // Define avatar positions for each step
  const avatarPositions = {
    1: { bottom: "20%", left: "25%" },
    2: { bottom: "20%", left: "30%" },
    3: { bottom: "20%", left: "75%" }
  };

  // Define content for each step
  const tutorialContent = {
    1: "👋 Hi there! I'm your Prompt Pal guide. This is the prompt editor where you write your AI prompts.",
    2: "When you're done writing your prompt, click the 'Analyze Prompt' button to evaluate it.",
    3: "Your prompt analysis will appear in this section, showing you insights and opportunities for improvement."
  };

  // Get current spotlight dimensions
  const getSpotlightDimensions = () => {
    let targetEl = null;
    
    switch(tutorialStep) {
      case 1:
        targetEl = promptEditorRef.current;
        break;
      case 2:
        targetEl = analyzeButtonRef.current;
        break;
      case 3:
        targetEl = analysisRef.current;
        break;
      default:
        return null;
    }
    
    if (!targetEl) {
      return null;
    }
    
    // Get the element's position and dimensions
    const rect = targetEl.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height
    };
  };

  // Render the tutorial overlay with spotlight effect
  const renderTutorial = () => {
    if (!showTutorial) return null;

    const spotlightDim = getSpotlightDimensions();
    const avatarPos = avatarPositions[tutorialStep];

    if (!spotlightDim) return null;

    return (
      <>
        {/* Create the dark overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" style={{ pointerEvents: "none" }}>
          {/* Cutout for the highlighted element */}
          <div 
            className="absolute border-2 border-blue-400"
            style={{
              top: `${spotlightDim.top}px`,
              left: `${spotlightDim.left}px`,
              width: `${spotlightDim.width}px`,
              height: `${spotlightDim.height}px`,
              boxShadow: "0 0 0 1000px rgba(0, 0, 0, 0.5)",
              backdropFilter: "brightness(180%)",
              background: "rgba(255, 255, 255, 0.15)"
            }}
          ></div>
        </div>

        {/* Avatar and speech bubble */}
        <div 
          className="fixed z-50 transition-all duration-300"
          style={{ 
            bottom: avatarPos.bottom, 
            left: avatarPos.left 
          }}
        >
          <div className="flex items-start">
            {/* Avatar Circle */}
            <div className="w-16 h-16 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center p-2 shadow-lg">
              <span className="text-2xl">🤖</span>
            </div>
            
            {/* Speech Bubble */}
            <div className="ml-4 mt-2 bg-white rounded-lg shadow-xl p-4 w-64">
              <p className="text-gray-800 mb-3">{tutorialContent[tutorialStep]}</p>
              <div className="flex justify-between">
                <button 
                  onClick={skipTutorial}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Skip
                </button>
                <button 
                  onClick={nextTutorialStep}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  {tutorialStep === 3 ? "Got it!" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Use useEffect to re-render the tutorial when the step changes
  useEffect(() => {
    // Force a re-render to update spotlight position
    const timer = setTimeout(() => {
      setShowTutorial(s => s);
    }, 50);
    return () => clearTimeout(timer);
  }, [tutorialStep]);

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      {/* Help button */}
      {!showTutorial && (
        <button 
          onClick={resetTutorial} 
          className="fixed bottom-5 right-5 z-30 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-600"
        >
          <span className="text-xl">?</span>
        </button>
      )}

      {/* Tutorial overlay */}
      {renderTutorial()}

      <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
      <p className="text-gray-600 mt-1 mb-8">Write, analyze, and improve your AI prompts</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prompt Editor Section - this is the div we need to highlight exactly for step 1 */}
        <div ref={promptEditorRef} className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Prompt Editor</h2>
          <p className="text-gray-600 mb-4">Write your prompt below and analyze its effectiveness</p>
          
          <div className="mt-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your AI prompt here... (e.g., 'Create a detailed marketing plan for a new eco-friendly product launch targeting millennials...')"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-gray-500 text-sm">{promptText.length} characters</span>
            <button
              ref={analyzeButtonRef}
              onClick={handleAnalyzePrompt}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center hover:bg-blue-200 transition-colors"
              disabled={promptText.trim().length === 0}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Analyze Prompt
            </button>
          </div>
        </div>
        
        {/* Analysis Section */}
        <div ref={analysisRef} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
          {!analysis ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-gray-300 mb-4">
                <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
              <p className="text-gray-500 max-w-sm">
                Write a prompt in the editor and click "Analyze Prompt" to see detailed analytics.
              </p>
            </div>
          ) : (
            <div className="h-full">
              <h3 className="text-xl font-semibold mb-4">Prompt Analysis</h3>
              {/* This would be replaced with actual analysis components */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p>{analysis.message}</p>
                {/* Add more analysis visualization components here */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptPal; 