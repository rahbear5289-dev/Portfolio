import React, { useEffect, useRef, useState } from 'react';

const DragonTrail = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: -100, y: -100 });
  
  const [isClicking, setIsClicking] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Detect mobile/tablet touch devices to completely disable cursor tracking on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsHidden(false);

    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      // Hide cursor offscreen when mouse leaves viewport
      target.current.x = -100;
      target.current.y = -100;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId;
    const animate = () => {
      // Very fast response for inner dot
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.25;

      // Slower trailing response for outer ring
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Inner Solid Glowing Cyan Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] top-0 left-0"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#22d3ee',
          boxShadow: '0 0 10px 2px rgba(34, 211, 238, 0.8)',
          willChange: 'transform',
        }}
      />

      {/* Outer Sleek Trailing Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] top-0 left-0"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(34, 211, 238, 0.4)',
          backgroundColor: 'transparent',
          boxShadow: 'inset 0 0 4px rgba(34, 211, 238, 0.1), 0 0 10px rgba(34, 211, 238, 0.1)',
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          ...(isClicking && {
            width: '24px',
            height: '24px',
            borderColor: 'rgba(34, 211, 238, 0.95)',
            boxShadow: 'inset 0 0 6px rgba(34, 211, 238, 0.3), 0 0 15px rgba(34, 211, 238, 0.4)',
          }),
        }}
      />
    </>
  );
};

export default DragonTrail;
