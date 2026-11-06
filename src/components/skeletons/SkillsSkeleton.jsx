import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function SkillsSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} className="p-6 sm:p-7 flex flex-col min-h-[220px]">
          {/* Category Header */}
          <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] shrink-0" />
            <SkeletonLine className="h-5 w-32" />
          </div>

          {/* Skill items badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <SkeletonLine className="h-7 w-20 rounded-xl" />
            <SkeletonLine className="h-7 w-24 rounded-xl" />
            <SkeletonLine className="h-7 w-16 rounded-xl" />
            <SkeletonLine className="h-7 w-28 rounded-xl" />
            <SkeletonLine className="h-7 w-22 rounded-xl" />
            <SkeletonLine className="h-7 w-18 rounded-xl" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  );
}

