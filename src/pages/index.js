import { useState, useEffect } from 'react';
import AIChatSidebar2 from '../components/AIChatSidebar2';
import { initialState } from '../utils/initialState';

export default function Home() {
  const [html, setHtml] = useState(initialState.html);
  const [css, setCss] = useState(initialState.css);
  const [js, setJs] = useState(initialState.js);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setHtml(initialState.html);
    setCss(initialState.css);
    setJs(initialState.js);
  }, []);

  useEffect(() => {
    setIframeKey(prev => prev + 1);
  }, [html, css, js]);

  return (
    <div className="your-layout-class">
      <div className="preview-pane">
        <iframe
          key={iframeKey}
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <style>${css}</style>
              </head>
              <body>
                ${html}
                <script defer>${js}</script>
              </body>
            </html>
          `}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="preview"
          sandbox="allow-scripts"
        />
      </div>
      <AIChatSidebar2
        html={html}
        css={css}
        js={js}
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
      />
    </div>
  );
} 