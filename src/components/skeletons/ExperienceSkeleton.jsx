import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function ExperienceSkeleton({ count = 2 }) {
  return (
    <div className="space-y-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} className="p-6 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-2">
              <SkeletonLine className="h-6 w-56" />
              <SkeletonLine className="h-4 w-40" />
            </div>
            <SkeletonLine className="h-6 w-32 rounded-full" />
          </div>
          <div className="space-y-2 pt-2">
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-5/6" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  );
}

