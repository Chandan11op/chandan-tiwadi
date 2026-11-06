import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function EducationSkeleton({ count = 3 }) {
  return (
    <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 pl-6 md:pl-10 space-y-12 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="relative">
          {/* Node dot on timeline */}
          <div className="absolute -left-[31px] md:-left-[47px] top-6 w-8 h-8 rounded-full bg-white/10 border-2 border-white/20" />

          {/* Skeleton Card */}
          <SkeletonCard className="p-7 sm:p-9 flex flex-col md:flex-row gap-7 items-start">
            <div className="w-full md:w-48 h-36 shrink-0 rounded-2xl bg-white/[0.04]" />
            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <SkeletonLine className="h-6 w-1/2" />
                <SkeletonLine className="h-6 w-28 rounded-full" />
              </div>
              <div className="flex gap-3">
                <SkeletonLine className="h-5 w-40" />
                <SkeletonLine className="h-5 w-24 rounded-full" />
              </div>
              <div className="pt-3 border-t border-white/5 space-y-2">
                <SkeletonLine className="h-3 w-32" />
                <div className="flex flex-wrap gap-2">
                  <SkeletonLine className="h-6 w-20 rounded-xl" />
                  <SkeletonLine className="h-6 w-24 rounded-xl" />
                  <SkeletonLine className="h-6 w-16 rounded-xl" />
                </div>
              </div>
            </div>
          </SkeletonCard>
        </div>
      ))}
    </div>
  );
}

