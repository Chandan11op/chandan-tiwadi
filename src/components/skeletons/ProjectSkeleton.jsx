import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function ProjectSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard
          key={idx}
          className="p-7 sm:p-9 flex flex-col justify-between h-[360px] min-h-[340px]"
        >
          <div className="flex-1 flex flex-col space-y-4">
            {/* Badge & Date row */}
            <div className="flex items-center justify-between">
              <SkeletonLine className="h-6 w-32 rounded-full" />
              <SkeletonLine className="h-4 w-24" />
            </div>

            {/* Title & subtitle */}
            <div className="space-y-2 pt-2">
              <SkeletonLine className="h-8 w-3/4" />
              <SkeletonLine className="h-4 w-1/3" />
            </div>

            {/* Description lines */}
            <div className="space-y-2 pt-2">
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
              <SkeletonLine className="h-4 w-4/6" />
            </div>

            {/* Technologies pills */}
            <div className="flex flex-wrap gap-2 pt-3">
              <SkeletonLine className="h-6 w-16 rounded-full" />
              <SkeletonLine className="h-6 w-20 rounded-full" />
              <SkeletonLine className="h-6 w-14 rounded-full" />
              <SkeletonLine className="h-6 w-18 rounded-full" />
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <SkeletonLine className="h-9 w-28 rounded-xl" />
            <SkeletonLine className="h-9 w-28 rounded-xl" />
          </div>
        </SkeletonCard>
      ))}
    </div>
  );
}

