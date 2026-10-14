import React from 'react';

/**
 * CinematicSmoke
 * 
 * High-visibility, multi-tiered volumetric cobalt atmospheric smoke system.
 * Supports:
 * - 'ambient': Broad billowing background atmospheric fog across sections.
 * - 'portrait': Concentrated, curling smoke plumes and ethereal blue-white vapor clouds placed directly behind the subject's portrait.
 * - 'transition': Low-lying flowing fog stream between major sections.
 * 
 * 100% hardware-accelerated transforms & opacity, mix-blend-mode: screen, pointer-events: none.
 */
export default function CinematicSmoke({
  variant = 'ambient', // 'ambient', 'portrait', 'transition'
  align = 'center',    // 'center', 'right', 'left'
  className = '',
  intensity = 'normal' // 'hero', 'normal', 'subtle'
}) {
  // 1. DEDICATED PORTRAIT SILHOUETTE SMOKE
  if (variant === 'portrait') {
    return (
      <div className={`smoke-portrait-stage ${className}`} aria-hidden="true">
        {/* Core Rising Cobalt Plume */}
        <div className="smoke-portrait-core" />

        {/* Ethereal Left Vapor Wisp */}
        <div className="smoke-portrait-wisps-left" />

        {/* Ethereal Right Vapor Wisp */}
        <div className="smoke-portrait-wisps-right" />

        {/* Volumetric Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] h-[420px] rounded-full bg-[#4D5BC9]/50 blur-[45px] pointer-events-none mix-blend-screen" />
        
        {/* Deep Ambient Base */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[440px] h-[500px] rounded-full bg-[#2C3480]/60 blur-[65px] pointer-events-none mix-blend-screen" />
      </div>
    );
  }

  // 2. SECTION TRANSITION FOG STREAM
  if (variant === 'transition') {
    return (
      <div className={`absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden z-0 ${className}`} aria-hidden="true">
        <div className="smoke-transition-stream" />
      </div>
    );
  }

  // 3. BROAD AMBIENT BILLOWING ATMOSPHERIC BACKGROUND
  const getContainerPosition = () => {
    switch (align) {
      case 'right':
        return { top: '-5%', right: '-5%' };
      case 'left':
        return { top: '-5%', left: '-5%' };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const isHero = intensity === 'hero';

  return (
    <div className={`billowing-smoke-container ${className}`} aria-hidden="true">
      <div 
        className="absolute w-[800px] h-[800px] pointer-events-none select-none"
        style={getContainerPosition()}
      >
        {/* Plume 1: Primary Deep Cobalt Mass (High Contrast) */}
        <div className="smoke-plume-primary top-0 left-0" />

        {/* Plume 2: Luminous Blue-White Vapor Cloud (Bright Core) */}
        <div className={`smoke-plume-vapor ${isHero ? 'top-8 left-16' : 'top-14 left-10'}`} />

        {/* Plume 3: Secondary Billowing Drift */}
        <div className="smoke-plume-secondary bottom-0 right-0" />

        {/* Core Volumetric Light Bloom */}
        <div className="smoke-light-bloom top-1/4 left-1/4" />

        {/* Hero Specific Volumetric Bloom */}
        {isHero && (
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#2C3480]/40 blur-[80px] pointer-events-none mix-blend-screen" />
        )}
      </div>
    </div>
  );
}
