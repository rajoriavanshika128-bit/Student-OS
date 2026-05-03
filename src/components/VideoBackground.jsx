import React, { useEffect, useRef } from 'react';

export default function VideoBackground() {
  const videoRef = useRef(null);
  const streamUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    } 
    
    else {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
      script.onload = () => {
        if (window.Hls.isSupported()) {
          const hls = new window.Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(video);
        }
      };
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="global-video-bg">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="global-video-element"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.2) blur(40px) saturate(0.5)',
          opacity: 0.4
        }}
      />
    </div>
  );
}
