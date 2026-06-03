import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useAsciiEngine } from '../hooks/useAsciiEngine';

const AsciiCanvas = forwardRef(({ mode, text, imageSrc, settings, theme, onCameraError }, ref) => {
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(document.createElement('canvas'));
  const videoRef = useRef(null);
  const requestRef = useRef();
  
  const { renderAscii } = useAsciiEngine();
  
  useImperativeHandle(ref, () => ({
    takeSnapshot: () => {
      if (canvasRef.current) {
        const link = document.createElement('a');
        link.download = `ascii-snapshot-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
      }
    }
  }));

  useEffect(() => {
    if (mode === 'camera') {
      const video = document.createElement('video');
      video.autoplay = true;
      video.playsInline = true;
      videoRef.current = video;

      navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(err => {
          if (onCameraError) onCameraError(err.message || 'Camera access denied');
        });

      return () => {
        if (video.srcObject) {
          video.srcObject.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [mode, onCameraError]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hiddenCanvas = hiddenCanvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const hiddenCtx = hiddenCanvas.getContext('2d', { willReadFrequently: true });
    
    let isDrawing = true;
    let imageObj = null;

    if (mode === 'image' && imageSrc) {
      imageObj = new Image();
      imageObj.src = imageSrc;
      imageObj.onload = () => {
         if (isDrawing) renderFrame();
      };
    }

    const renderFrame = () => {
      if (!isDrawing) return;

      const { resolution } = settings;
      
      let sourceWidth = 640;
      let sourceHeight = 480;

      if (mode === 'camera' && videoRef.current && videoRef.current.readyState >= 2) {
        sourceWidth = videoRef.current.videoWidth;
        sourceHeight = videoRef.current.videoHeight;
      } else if (mode === 'image' && imageObj) {
        sourceWidth = imageObj.width;
        sourceHeight = imageObj.height;
      } else if (mode === 'text') {
        sourceWidth = 800;
        sourceHeight = 400;
      }

      const displayWidth = canvas.parentElement.clientWidth;
      const displayHeight = canvas.parentElement.clientHeight;
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      const fontAspect = 0.55;
      const imageAspect = sourceHeight / sourceWidth;
      const cols = resolution;
      let rows = Math.floor(cols * imageAspect / fontAspect);

      // Prevent division by zero or negative
      if (rows < 1) rows = 1;
      
      hiddenCanvas.width = cols;
      hiddenCanvas.height = rows;

      hiddenCtx.fillStyle = 'black';
      hiddenCtx.fillRect(0, 0, cols, rows);

      if (mode === 'camera' && videoRef.current && videoRef.current.readyState >= 2) {
        hiddenCtx.drawImage(videoRef.current, 0, 0, cols, rows);
      } else if (mode === 'image' && imageObj) {
        hiddenCtx.drawImage(imageObj, 0, 0, cols, rows);
      } else if (mode === 'text' && text) {
        hiddenCtx.fillStyle = 'white';
        hiddenCtx.textAlign = 'center';
        hiddenCtx.textBaseline = 'middle';
        
        let fontSize = Math.floor(rows * 0.8);
        hiddenCtx.font = `bold ${fontSize}px sans-serif`;
        
        // Scale down font if text is too wide
        const metrics = hiddenCtx.measureText(text);
        if (metrics.width > cols * 0.9) {
          fontSize = Math.floor(fontSize * ((cols * 0.9) / metrics.width));
          hiddenCtx.font = `bold ${fontSize}px sans-serif`;
        }
        
        hiddenCtx.fillText(text, cols / 2, rows / 2);
      }

      renderAscii(hiddenCtx, ctx, canvas.width, canvas.height, cols, rows, settings, theme);

      if (mode === 'camera' || mode === 'text') {
        requestRef.current = requestAnimationFrame(renderFrame);
      }
    };

    if (mode === 'camera' || mode === 'text') {
      renderFrame();
    } else if (mode === 'image' && imageObj && imageObj.complete) {
      renderFrame();
    }

    return () => {
      isDrawing = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mode, text, imageSrc, settings, theme, renderAscii]);

  return (
    <div className="canvas-container w-full h-full bg-black">
      <canvas 
        ref={canvasRef} 
        className="block"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  );
});

AsciiCanvas.displayName = 'AsciiCanvas';
export default AsciiCanvas;
