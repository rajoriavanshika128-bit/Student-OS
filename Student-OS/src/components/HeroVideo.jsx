import React, { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const videoRef = useRef(null);
  const streamUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
    } else {
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
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div className="hero-video-wrapper">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-element"
      />
      <div className="hero-video-overlay" />
    </div>
  );
}
