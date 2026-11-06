import React from 'react';
import SkeletonCard, { SkeletonLine } from './SkeletonCard';

export default function ProfileSkeleton() {
  return (
    <SkeletonCard className="p-8 md:p-10 space-y-8 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/5">
        <div className="w-24 h-24 rounded-full bg-white/[0.05] shrink-0" />
        <div className="space-y-3 flex-1 text-center sm:text-left w-full">
          <SkeletonLine className="h-7 w-48 mx-auto sm:mx-0" />
          <SkeletonLine className="h-4 w-64 mx-auto sm:mx-0" />
          <SkeletonLine className="h-4 w-40 mx-auto sm:mx-0" />
        </div>
      </div>

      <div className="space-y-4">
        <SkeletonLine className="h-4 w-full" />
        <SkeletonLine className="h-4 w-5/6" />
        <SkeletonLine className="h-4 w-4/6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
        <SkeletonLine className="h-10 w-full rounded-xl" />
        <SkeletonLine className="h-10 w-full rounded-xl" />
        <SkeletonLine className="h-10 w-full rounded-xl" />
        <SkeletonLine className="h-10 w-full rounded-xl" />
      </div>
    </SkeletonCard>
  );
}

