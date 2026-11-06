import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function ResumeSkeleton({ count = 2 }) {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-white/[0.05] shrink-0" />
            <div className="space-y-2 flex-1">
              <SkeletonLine className="h-5 w-64" />
              <div className="flex items-center gap-3">
                <SkeletonLine className="h-4 w-20 rounded-full" />
                <SkeletonLine className="h-4 w-32" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SkeletonLine className="h-9 w-24 rounded-xl" />
            <SkeletonLine className="h-9 w-9 rounded-xl" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  );
}

