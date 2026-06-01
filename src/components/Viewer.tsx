import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Maximize, Minimize, Camera } from 'lucide-react';
import { Device, Language } from '../types';
import { devices, translations } from '../constants';
import * as Icons from 'lucide-react';

interface ViewerProps {
  lang: Language;
}

export default function DeviceViewer({ lang }: ViewerProps) {
  const t = (key: keyof typeof translations) => translations[key][lang];
  
  const [inputUrl, setInputUrl] = useState('https://asifio.blogspot.com');
  const [activeUrl, setActiveUrl] = useState('https://asifio.blogspot.com');
  const [activeDevice, setActiveDevice] = useState<Device>(devices[0]);
  const [loading, setLoading] = useState(false);
  const [isScaledToFit, setIsScaledToFit] = useState(true);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setContainerSize({ width, height });
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = inputUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
      setInputUrl(url);
    }
    setLoading(true);
    setActiveUrl(url);
  };

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' }
      } as any);

      const video = document.createElement('video');
      video.srcObject = stream;
      
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play().then(resolve);
        };
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `Responsiview-${activeDevice.name.en}.png`;
        link.click();
      }

      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error("Capture failed:", error);
    }
  };

  const IconComponent = (name: string) => {
    // @ts-ignore
    const Icon = Icons[name] || Icons.Monitor;
    return <Icon size={18} />;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Search and Device Selection Header */}
      <div className="flex flex-col border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 gap-4 sticky top-0 z-10 shadow-sm">
        
        {/* URL Bar */}
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto w-full">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={t('enterUrl')}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-800 rounded-xl leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!inputUrl}
            className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 dark:focus:ring-offset-black"
          >
            {t('check')}
          </button>
        </form>

        {/* Device Toggles */}
        <div className="flex justify-center flex-wrap gap-2">
          {devices.map(device => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeDevice.id === device.id 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800 dark:hover:bg-gray-800'
              }`}
            >
              {IconComponent(device.iconName)}
              <span>{device.name[lang]}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Viewer Area */}
      <div 
        ref={containerRef}
        className={`flex-1 p-4 md:p-8 pattern-bg relative ${isScaledToFit ? 'overflow-hidden' : 'overflow-auto'}`}
      >
        <div className={`mx-auto flex flex-col items-center pb-8 ${isScaledToFit ? 'h-full w-full justify-center' : 'w-max min-w-full'}`}>
          
          <div className="mb-4 flex items-center gap-2">
            {/* Device Dimension Info */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-500 dark:text-gray-400">
              {activeDevice.name[lang]} - {activeDevice.width} × {activeDevice.height}
            </div>

            {/* Toggle Scaling Button */}
            <button
              onClick={() => setIsScaledToFit(!isScaledToFit)}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              title={isScaledToFit ? 'View full real size' : 'Scale to fit screen'}
            >
              {isScaledToFit ? <Maximize size={16} /> : <Minimize size={16} />}
            </button>
            
            {/* Capture Button */}
            <button
              onClick={handleCapture}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              title={t('capture')}
            >
              <Camera size={16} />
            </button>
          </div>

          <div 
            style={{ 
              width: isScaledToFit ? `${(activeDevice.width + 24) * (() => {
                let scale = 1;
                const deviceTotalWidth = activeDevice.width + 24;
                const deviceTotalHeight = activeDevice.height + 24;
                if (containerSize.width > 0) {
                  const scaleX = (containerSize.width - 32) / deviceTotalWidth;
                  const scaleY = (containerSize.height - 120) / deviceTotalHeight;
                  scale = Math.max(Math.min(scaleX, scaleY, 1), 0.1);
                }
                return scale;
              })()}px` : `${activeDevice.width + 24}px`, 
              height: isScaledToFit ? `${(activeDevice.height + 24) * (() => {
                let scale = 1;
                const deviceTotalWidth = activeDevice.width + 24;
                const deviceTotalHeight = activeDevice.height + 24;
                if (containerSize.width > 0) {
                  const scaleX = (containerSize.width - 32) / deviceTotalWidth;
                  const scaleY = (containerSize.height - 120) / deviceTotalHeight;
                  scale = Math.max(Math.min(scaleX, scaleY, 1), 0.1);
                }
                return scale;
              })()}px` : `${activeDevice.height + 24}px`,
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            <div 
              className="absolute top-0 left-0 origin-top-left bg-white shadow-2xl rounded-[2.5rem] border-[12px] border-gray-900 dark:border-white transition-all duration-300 overflow-hidden"
              style={{ 
                width: `${activeDevice.width}px`, 
                height: `${activeDevice.height}px`,
                boxSizing: 'content-box',
                transform: isScaledToFit ? `scale(${(() => {
                  let scale = 1;
                  const deviceTotalWidth = activeDevice.width + 24;
                  const deviceTotalHeight = activeDevice.height + 24;
                  if (containerSize.width > 0) {
                    const scaleX = (containerSize.width - 32) / deviceTotalWidth;
                    const scaleY = (containerSize.height - 120) / deviceTotalHeight;
                    scale = Math.max(Math.min(scaleX, scaleY, 1), 0.1);
                  }
                  return scale;
                })()})` : 'scale(1)'
              }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80 z-10 backdrop-blur-sm">
                  <Loader2 className="animate-spin text-blue-500" size={32} />
                </div>
              )}
              
              <iframe
                ref={iframeRef}
                src={activeUrl}
                sandbox="allow-scripts allow-same-origin allow-forms"
                className="w-full h-full border-none bg-white block"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                title="Responsive preview"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Info Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 text-xs text-center py-2 px-4 relative z-10 shadow-sm shrink-0">
        {t('warning')}
      </div>
    </div>
  );
}
