import React from 'react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ size = 'md', fullScreen = false }) => {
  const sizeMap = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-20 w-20 border-6',
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-brand-200 border-t-brand-600 ${sizeMap[size]}`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  );
};
