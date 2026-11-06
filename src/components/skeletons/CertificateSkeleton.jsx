import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function CertificateSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} className="overflow-hidden flex flex-col h-[340px]">
          {/* Simulated Image Placeholder */}
          <div className="w-full h-52 bg-white/[0.04] relative overflow-hidden border-b border-white/[0.06]">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          </div>

          {/* Certificate metadata */}
          <div className="p-6 sm:p-7 flex items-start gap-4 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-white/[0.05] shrink-0" />
            <div className="space-y-2 flex-1">
              <SkeletonLine className="h-3.5 w-16 rounded-full" />
              <SkeletonLine className="h-5 w-4/5" />
              <SkeletonLine className="h-3.5 w-1/2" />
            </div>
          </div>
        </SkeletonCard>
      ))}
    </div>
  );
}

