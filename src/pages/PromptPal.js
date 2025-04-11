import React, { useState, useEffect, useRef } from "react";

const PromptPal = () => {
  console.log("Component initializing");
  
  const [promptText, setPromptText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [refsReady, setRefsReady] = useState(false);
  const [exampleShown, setExampleShown] = useState(false);
  
  // Animation states
  const [isTyping, setIsTyping] = useState(false);
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDots, setAnalysisDots] = useState("");
  
  // Example content for the final tutorial step
  const examplePrompt = "Create a step-by-step tutorial for beginners learning JavaScript that covers variables, functions, and basic DOM manipulation.";
  const exampleAnalysis = {
    message: "Analysis Results:",
    clarity: 85,
    specificity: 90,
    actionability: 95,
    feedback: "Great prompt! You've clearly specified the audience (beginners), topic (JavaScript), and key concepts to cover. Consider adding desired length or format for even better results."
  };
  
  // Use localStorage to persist tutorial state between page visits
  const [showTutorial, setShowTutorial] = useState(() => {
    // Add console.log to check localStorage value
    const savedTutorialState = localStorage.getItem("promptPalTutorialShown");
    console.log("Initial localStorage value:", savedTutorialState);
    
    // Explicitly log the return value and its reasoning
    const shouldShowTutorial = savedTutorialState === null || savedTutorialState !== "false";
    console.log("Initial showTutorial state:", shouldShowTutorial, 
      "because savedTutorialState is", savedTutorialState === null ? "null" : `"${savedTutorialState}"`);
    
    return shouldShowTutorial;
  });
  
  console.log("Current tutorial state:", { showTutorial, tutorialStep });
  
  // Create refs for the elements we want to highlight
  const promptEditorRef = useRef(null);
  const analyzeButtonRef = useRef(null);
  const analysisRef = useRef(null);

  // Check when refs are available and set the flag
  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const checkRefs = () => {
      if (promptEditorRef.current && analyzeButtonRef.current && analysisRef.current) {
        console.log("All refs are now available");
        setRefsReady(true);
      } else {
        console.log("Refs not yet available, will check again");
        setTimeout(checkRefs, 100); // Keep checking until refs are available
      }
    };
    
    checkRefs();
    return () => setRefsReady(false); // Clean up on unmount
  }, []);

  // Save tutorial state to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving to localStorage:", showTutorial);
    localStorage.setItem("promptPalTutorialShown", showTutorial.toString());
    
    // For testing: Log all localStorage values related to tutorial
    console.log("After saving, localStorage contains:", {
      promptPalTutorialShown: localStorage.getItem("promptPalTutorialShown")
    });
  }, [showTutorial]);

  // Run the typing animation
  useEffect(() => {
    if (tutorialStep === 4 && !exampleShown) {
      // Split the example prompt into words
      const words = examplePrompt.split(' ');
      setIsTyping(true);
      setDisplayedPrompt("");
      let currentWordIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          // Add a word (plus space unless it's the last word)
          setDisplayedPrompt(prev => 
            prev + words[currentWordIndex] + (currentWordIndex < words.length - 1 ? ' ' : '')
          );
          currentWordIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setPromptText(examplePrompt);
          
          // Start analyzing animation after typing is complete
          setIsAnalyzing(true);
          let dotCount = 0;
          
          const analyzingInterval = setInterval(() => {
            setAnalysisDots(".".repeat((dotCount % 3) + 1));
            dotCount++;
            
            // After 1 second, show the analysis
            if (dotCount > 3) {
              clearInterval(analyzingInterval);
              setIsAnalyzing(false);
              setAnalysis(exampleAnalysis);
              setExampleShown(true);
            }
          }, 300); // Update dots every 300ms
        }
      }, 200); // Type a word every 200ms
      
      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [tutorialStep]);

  // Log when refs are available
  useEffect(() => {
    console.log("Refs available:", {
      promptEditorRef: !!promptEditorRef.current,
      analyzeButtonRef: !!analyzeButtonRef.current,
      analysisRef: !!analysisRef.current
    });
  }, []);

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
    console.log("Moving to next tutorial step from", tutorialStep);
    if (tutorialStep < 4) {
      setTutorialStep(tutorialStep + 1);
    } else {
      console.log("Tutorial complete, hiding tutorial");
      setShowTutorial(false);
      // Clean up example content when tutorial ends
      if (exampleShown) {
        setPromptText("");
        setAnalysis(null);
        setExampleShown(false);
        setDisplayedPrompt("");
        setIsTyping(false);
        setIsAnalyzing(false);
      }
    }
  };

  // Skip the tutorial entirely
  const skipTutorial = () => {
    console.log("Tutorial skipped");
    setShowTutorial(false);
    // Clean up example content when tutorial is skipped
    if (exampleShown || isTyping || isAnalyzing) {
      setPromptText("");
      setAnalysis(null);
      setExampleShown(false);
      setDisplayedPrompt("");
      setIsTyping(false);
      setIsAnalyzing(false);
    }
  };

  // Reset the tutorial
  const resetTutorial = () => {
    console.log("Tutorial reset");
    setTutorialStep(1);
    setExampleShown(false);
    setDisplayedPrompt("");
    setIsTyping(false);
    setIsAnalyzing(false);
    setAnalysis(null);
    setShowTutorial(true);
  };

  // Define avatar positions for each step
  const avatarPositions = {
    1: { bottom: "20%", left: "25%" },
    2: { bottom: "20%", left: "30%" },
    3: { bottom: "20%", left: "75%" },
    4: { bottom: "20%", left: "50%" }
  };

  // Define content for each step
  const tutorialContent = {
    1: "👋 Hi there! I'm your Prompt Pal guide. This is the prompt editor where you write your AI prompts.",
    2: "When you're done writing your prompt, click the 'Analyze Prompt' button to evaluate it.",
    3: "Your prompt analysis will appear in this section, showing you insights and opportunities for improvement.",
    4: "Let's see it all in action! Watch as I type an example prompt and generate an analysis."
  };

  // Get current spotlight dimensions
  const getSpotlightDimensions = () => {
    // For step 4, we need to handle the special case of multiple highlights
    if (tutorialStep === 4) {
      if (!promptEditorRef.current || !analysisRef.current) {
        return null;
      }
      
      return {
        multiSpot: true,
        spots: [
          // Get prompt editor dimensions
          getDimensionsForElement(promptEditorRef.current),
          // Get analysis area dimensions
          getDimensionsForElement(analysisRef.current)
        ]
      };
    }
    
    // For other steps, handle normally
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
      console.log(`Target element for step ${tutorialStep} is not available`);
      return null;
    }
    
    return {
      multiSpot: false,
      ...getDimensionsForElement(targetEl)
    };
  };
  
  // Helper function to get dimensions for an element
  const getDimensionsForElement = (element) => {
    const rect = element.getBoundingClientRect();
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
    console.log("renderTutorial called, showTutorial =", showTutorial, "refsReady =", refsReady);
    
    if (!showTutorial || !refsReady) {
      console.log(refsReady ? "Tutorial hidden" : "Refs not ready yet", "not rendering overlay");
      return null;
    }

    const spotlightDim = getSpotlightDimensions();
    console.log("Spotlight dimensions:", spotlightDim);
    
    if (!spotlightDim) {
      console.log("No spotlight dimensions available, cannot render tutorial");
      return null;
    }

    console.log("Rendering tutorial overlay for step", tutorialStep);
    
    const avatarPos = avatarPositions[tutorialStep];

    return (
      <>
        {/* Create the dark overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" style={{ pointerEvents: "none" }}>
          {spotlightDim.multiSpot ? (
            // Render multiple spotlights for step 4
            spotlightDim.spots.map((spot, index) => (
              <div 
                key={`spotlight-${index}`}
                className="absolute border-2 border-blue-400"
                style={{
                  top: `${spot.top}px`,
                  left: `${spot.left}px`,
                  width: `${spot.width}px`,
                  height: `${spot.height}px`,
                  boxShadow: "0 0 20px 5px rgba(59, 130, 246, 0.3)",
                  backdropFilter: "brightness(180%)",
                  background: "rgba(255, 255, 255, 0.15)"
                }}
              ></div>
            ))
          ) : (
            // Render single spotlight for other steps
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
          )}
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
                  {tutorialStep === 4 ? "Got it!" : "Next"}
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
    console.log("Tutorial step changed to", tutorialStep);
    // Force a re-render to update spotlight position
    const timer = setTimeout(() => {
      console.log("Forcing re-render for spotlight update");
      setShowTutorial(s => s); // Functional update that doesn't create a dependency
    }, 50);
    return () => clearTimeout(timer);
  }, [tutorialStep]);

  // Temporarily force tutorial to show for debugging
  useEffect(() => {
    console.log("DEBUGGING: Forcing tutorial to show");
    const timer = setTimeout(() => {
      console.log("Setting showTutorial to true for testing");
      setShowTutorial(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log("Before rendering component, showTutorial =", showTutorial);

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
      
      {/* For debugging - always show tutorial state */}
      <div className="fixed top-0 right-0 bg-black bg-opacity-70 text-white p-2 text-xs z-50">
        Tutorial: {showTutorial ? "Visible" : "Hidden"} (Step {tutorialStep})
      </div>

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
              value={tutorialStep === 4 && isTyping ? displayedPrompt : promptText}
              onChange={(e) => setPromptText(e.target.value)}
              readOnly={tutorialStep === 4 && (isTyping || isAnalyzing)}
            ></textarea>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-gray-500 text-sm">
              {(tutorialStep === 4 && isTyping) ? displayedPrompt.length : promptText.length} characters
            </span>
            <button
              ref={analyzeButtonRef}
              onClick={handleAnalyzePrompt}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center hover:bg-blue-200 transition-colors"
              disabled={promptText.trim().length === 0 || isTyping || isAnalyzing}
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
              {isAnalyzing ? (
                // Show marking animation
                <div className="flex flex-col items-center">
                  <svg className="animate-spin w-12 h-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Marking{analysisDots}</h3>
                  <p className="text-gray-500 max-w-sm">
                    Analyzing your prompt for clarity, specificity, and actionability.
                  </p>
                </div>
              ) : (
                // Default empty state
                <>
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
                </>
              )}
            </div>
          ) : (
            <div className="h-full">
              <h3 className="text-xl font-semibold mb-4">Prompt Analysis</h3>
              {/* This would be replaced with actual analysis components */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-medium">{analysis.message}</p>
                
                {/* Show detailed analysis for the example in step 4 */}
                {exampleShown && (
                  <div className="mt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Clarity</p>
                        <p className="text-xl font-bold text-blue-600">{analysis.clarity}%</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Specificity</p>
                        <p className="text-xl font-bold text-green-600">{analysis.specificity}%</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-sm text-gray-500">Actionability</p>
                        <p className="text-xl font-bold text-purple-600">{analysis.actionability}%</p>
                      </div>
                    </div>
                    <div className="mt-3 border-t pt-3">
                      <p className="font-medium mb-1">Feedback:</p>
                      <p className="text-gray-700">{analysis.feedback}</p>
                    </div>
                  </div>
                )}
                
                {/* If not in the example, just show the message */}
                {!exampleShown && <p>{analysis.message}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptPal; 