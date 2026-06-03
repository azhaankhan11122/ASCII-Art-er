import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Type, Download, Upload, Monitor } from 'lucide-react';

export default function ControlPanel({
  mode, setMode,
  theme, setTheme,
  settings, setSettings,
  text, setText,
  setImageSrc,
  onSnapshot
}) {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImageSrc(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImageSrc(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full lg:w-80 h-full bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col gap-8 overflow-y-auto shrink-0">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-mono tracking-tighter text-white flex items-center gap-2">
          <Monitor className="w-8 h-8 text-zinc-400" />
          ASCII-fy
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Real-time ASCII Art Engine</p>
      </div>

      {/* Modes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Mode</h3>
        <div className="flex bg-zinc-950 p-1 rounded-xl">
          <button
            onClick={() => setMode('text')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'text' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Type className="w-4 h-4" /> Text
          </button>
          <button
            onClick={() => setMode('image')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'image' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <ImageIcon className="w-4 h-4" /> Image
          </button>
          <button
            onClick={() => setMode('camera')}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all ${mode === 'camera' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Camera className="w-4 h-4" /> Cam
          </button>
        </div>
      </div>

      {/* Mode Specific Inputs */}
      {mode === 'text' && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Input Text</h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 font-mono"
            placeholder="Type something..."
          />
        </div>
      )}

      {mode === 'image' && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Upload Image</h3>
          <div 
            className="border-2 border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm text-center">Click or drag image here</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      )}

      {/* Themes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Theme</h3>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => setTheme('matrix')}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-between transition-all border ${theme === 'matrix' ? 'border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41]' : 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
          >
            <span className="font-mono font-bold">Matrix</span>
            <div className="w-3 h-3 rounded-full bg-[#00FF41]" />
          </button>
          
          <button
            onClick={() => setTheme('synthwave')}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-between transition-all border ${theme === 'synthwave' ? 'border-[#ff007f] bg-[#ff007f]/10 text-[#ff007f]' : 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
          >
            <span className="font-mono font-bold">Synthwave</span>
            <div className="w-3 h-3 rounded-full bg-[#ff007f]" />
          </button>
          
          <button
            onClick={() => setTheme('truecolor')}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-between transition-all border ${theme === 'truecolor' ? 'border-zinc-300 bg-zinc-300/10 text-white' : 'border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
          >
            <span className="font-mono font-bold">True Color</span>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
          </button>
        </div>
      </div>

      {/* Adjustments */}
      <div className="space-y-6">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Settings</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-400 font-mono">
            <span>Resolution</span>
            <span>{settings.resolution} cols</span>
          </div>
          <input
            type="range"
            min="40"
            max="180"
            value={settings.resolution}
            onChange={(e) => updateSetting('resolution', parseInt(e.target.value))}
            className="w-full accent-zinc-500"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-400 font-mono">
            <span>Brightness</span>
            <span>{settings.brightness > 0 ? '+' : ''}{settings.brightness}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.brightness}
            onChange={(e) => updateSetting('brightness', parseInt(e.target.value))}
            className="w-full accent-zinc-500"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-400 font-mono">
            <span>Contrast</span>
            <span>{settings.contrast > 0 ? '+' : ''}{settings.contrast}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.contrast}
            onChange={(e) => updateSetting('contrast', parseInt(e.target.value))}
            className="w-full accent-zinc-500"
          />
        </div>

        <label className="flex items-center gap-3 text-sm text-zinc-300 cursor-pointer">
          <input 
            type="checkbox" 
            checked={settings.invert}
            onChange={(e) => updateSetting('invert', e.target.checked)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 accent-zinc-500"
          />
          Invert ASCII Gradient
        </label>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={onSnapshot}
          className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
        >
          <Download className="w-5 h-5" />
          Take Snapshot
        </button>
      </div>
    </div>
  );
}
