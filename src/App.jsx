import React, { useState, useRef } from 'react';
import ControlPanel from './components/ControlPanel';
import AsciiCanvas from './components/AsciiCanvas';

function App() {
  const [mode, setMode] = useState('text'); // text, image, camera
  const [theme, setTheme] = useState('matrix'); // matrix, synthwave, truecolor
  const [settings, setSettings] = useState({
    resolution: 100,
    brightness: 0,
    contrast: 0,
    invert: false,
  });
  
  const [text, setText] = useState('ASCII');
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);

  const handleSnapshot = () => {
    if (canvasRef.current) {
      canvasRef.current.takeSnapshot();
    }
  };

  const handleCameraError = (err) => {
    setError(`Camera Error: ${err}`);
    setMode('text');
  };

  // Determine theme class for wrapper
  let themeClass = 'theme-matrix';
  if (theme === 'synthwave') themeClass = 'theme-synthwave';
  if (theme === 'truecolor') themeClass = 'theme-truecolor';

  return (
    <div className={`flex flex-col lg:flex-row h-screen w-full bg-zinc-950 font-sans overflow-hidden ${themeClass}`}>
      
      {/* Control Panel */}
      <ControlPanel 
        mode={mode} setMode={(m) => { setMode(m); setError(null); }}
        theme={theme} setTheme={setTheme}
        settings={settings} setSettings={setSettings}
        text={text} setText={setText}
        setImageSrc={setImageSrc}
        onSnapshot={handleSnapshot}
      />

      {/* Main Display Area */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        
        {/* Error overlay */}
        {error && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-2xl font-medium backdrop-blur">
            {error}
          </div>
        )}

        <AsciiCanvas 
          ref={canvasRef}
          mode={mode}
          text={text}
          imageSrc={imageSrc}
          settings={settings}
          theme={theme}
          onCameraError={handleCameraError}
        />
        
      </div>
    </div>
  );
}

export default App;
