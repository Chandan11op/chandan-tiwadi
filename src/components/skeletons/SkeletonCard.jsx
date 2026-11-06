import React from 'react';

export default function SkeletonCard({ className = '', children }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

export function SkeletonLine({ className = 'h-4 w-full' }) {
  return (
    <div className={`rounded-md bg-white/[0.05] relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </div>
  );
}

