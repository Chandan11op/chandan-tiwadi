import React from 'react';

/**
 * CinematicSmoke
 * 
 * Generates visible, organic, billowing volumetric cobalt smoke.
 * Combines deep cobalt (#2C3480), luminous cobalt (#4D5BC9), and blue-white vapor clouds.
 * 100% hardware-accelerated CSS transforms, zero layout shifts, pointer-events: none.
 */
export default function CinematicSmoke({
  intensity = 'normal', // 'hero', 'normal', 'subtle'
  className = '',
  align = 'center' // 'center', 'right', 'left'
}) {
  const getAlignmentStyle = () => {
    switch (align) {
      case 'right':
        return 'right-[-10%] top-[-10%]';
      case 'left':
        return 'left-[-10%] top-[-10%]';
      default:
        return 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const isHero = intensity === 'hero';

  return (
    <div className={`billowing-smoke-container ${className}`} aria-hidden="true">
      {/* Anchor Container */}
      <div className={`absolute ${getAlignmentStyle()} w-[700px] h-[700px] pointer-events-none`}>
        {/* Plume 1: Primary Deep Cobalt Mass */}
        <div className="smoke-plume-primary top-0 left-0" />

        {/* Plume 2: Luminous Blue-White Vapor Cloud (High Visibility) */}
        <div className={`smoke-plume-vapor ${isHero ? 'top-10 left-16' : 'top-14 left-8'}`} />

        {/* Plume 3: Secondary Billowing Drift */}
        <div className="smoke-plume-secondary bottom-0 right-0" />

        {/* Core Volumetric Bloom */}
        <div className="smoke-light-bloom top-1/4 left-1/4" />

        {/* Hero Specific Additional Ambient Cobalt Aura */}
        {isHero && (
          <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] rounded-full bg-[#2C3480]/30 blur-[90px] pointer-events-none" />
        )}
      </div>
    </div>
  );
}
