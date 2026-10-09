import React from 'react';
import { Droplets, Box, Leaf, Drumstick } from 'lucide-react';

/**
 * Category Icon Helper using strictly requested lucide-react icons:
 * - Milk -> Droplets
 * - Fresh Paneer -> Box
 * - Mushrooms -> Leaf
 * - Chicken -> Drumstick
 */
export function CategoryIcon({ category, size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-7 h-7 p-1.5',
    md: 'w-9 h-9 p-2',
    lg: 'w-11 h-11 p-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const wrapperClass = sizeMap[size] || sizeMap.md;
  const iconClass = iconSizes[size] || iconSizes.md;

  switch (category) {
    case 'Milk':
      return (
        <div
          className={`${wrapperClass} rounded-xl bg-sky-50 text-sky-600 border border-sky-200/60 flex items-center justify-center shrink-0 ${className}`}
          title="Milk"
        >
          <Droplets className={iconClass} />
        </div>
      );

    case 'Fresh Paneer':
      return (
        <div
          className={`${wrapperClass} rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0 ${className}`}
          title="Fresh Paneer"
        >
          <Box className={iconClass} />
        </div>
      );

    case 'Mushrooms':
      return (
        <div
          className={`${wrapperClass} rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0 ${className}`}
          title="Mushrooms"
        >
          <Leaf className={iconClass} />
        </div>
      );

    case 'Chicken':
      return (
        <div
          className={`${wrapperClass} rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center shrink-0 ${className}`}
          title="Chicken"
        >
          <Drumstick className={iconClass} />
        </div>
      );

    default:
      return (
        <div
          className={`${wrapperClass} rounded-xl bg-slate-50 text-slate-600 border border-slate-200 flex items-center justify-center shrink-0 ${className}`}
        >
          <Box className={iconClass} />
        </div>
      );
  }
}
