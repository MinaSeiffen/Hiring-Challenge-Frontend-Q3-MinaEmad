import React from "react";

interface InfiniteScrollLoaderProps {
  isPaginationMode: boolean;
  infiniteLoading: boolean;
  hasMore: boolean;
  allUsersLength: number;
  observerRef: React.RefObject<HTMLDivElement | null>;
}

export const InfiniteScrollLoader: React.FC<InfiniteScrollLoaderProps> = ({
  isPaginationMode,
  infiniteLoading,
  hasMore,
  allUsersLength,
  observerRef,
}) => {
  if (isPaginationMode) {
    return null;
  }

  return (
    <div ref={observerRef} className="flex justify-center py-4">
      {infiniteLoading && (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Loading more users...</span>
        </div>
      )}
      {!hasMore && allUsersLength > 0 && (
        <span className="text-sm text-gray-500 dark:text-gray-400">No more users to load</span>
      )}
    </div>
  );
};
