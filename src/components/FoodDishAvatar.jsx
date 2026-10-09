import React from 'react';

/**
 * High-fidelity vector food dish avatars matching the rounded dish aesthetic
 * in the reference UI mockup.
 */
export function FoodDishAvatar({ category, size = 'lg', className = '' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-28 h-28',
  };

  const currentSize = sizeClasses[size] || sizeClasses.lg;

  if (category === 'Pasteurized Milk') {
    return (
      <div className={`relative ${currentSize} rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-2 shadow-lg border-2 border-white ring-2 ring-blue-100/50 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
          <circle cx="50" cy="50" r="46" fill="#f0f7ff" stroke="#e0eefe" strokeWidth="2" />
          {/* Chilled milk bottle */}
          <path d="M42 22 L58 22 L56 32 L62 42 L62 76 C62 80 58 84 50 84 C42 84 38 80 38 76 L38 42 L44 32 Z" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" />
          {/* Blue cap */}
          <rect x="40" y="18" width="20" height="6" rx="2" fill="#3b82f6" />
          {/* Cold milk level */}
          <path d="M40 46 Q50 49 60 46 L60 76 C60 78 57 82 50 82 C43 82 40 78 40 76 Z" fill="#dbeafe" />
          {/* Droplets & Cold Frost */}
          <circle cx="45" cy="58" r="2" fill="#60a5fa" opacity="0.8" />
          <circle cx="53" cy="66" r="1.5" fill="#60a5fa" opacity="0.8" />
          <circle cx="56" cy="52" r="1.5" fill="#60a5fa" opacity="0.7" />
          {/* Cold chain snowflake badge */}
          <circle cx="50" cy="62" r="6" fill="#3b82f6" opacity="0.2" />
          <path d="M50 58 L50 66 M46 62 L54 62" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (category === 'Curd') {
    return (
      <div className={`relative ${currentSize} rounded-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-2 shadow-lg border-2 border-white ring-2 ring-amber-100/50 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
          <circle cx="50" cy="50" r="46" fill="#fffbeb" stroke="#fef3c7" strokeWidth="2" />
          {/* Terracotta / Ceramic pot rim */}
          <ellipse cx="50" cy="46" rx="30" ry="12" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
          {/* Pot body */}
          <path d="M22 46 C20 68 34 82 50 82 C66 82 80 68 78 46 Z" fill="#fdba74" stroke="#ea580c" strokeWidth="2" />
          {/* Creamy rich curd surface */}
          <ellipse cx="50" cy="44" rx="26" ry="10" fill="#ffffff" />
          {/* Garnish mint & pomegranate */}
          <circle cx="48" cy="43" r="2.5" fill="#dc2626" />
          <circle cx="53" cy="45" r="2" fill="#dc2626" />
          <path d="M49 41 C50 37 54 39 53 43 Z" fill="#16a34a" />
          <ellipse cx="45" cy="45" rx="5" ry="2" fill="#fef08a" opacity="0.7" />
        </svg>
      </div>
    );
  }

  if (category === 'Mushrooms') {
    return (
      <div className={`relative ${currentSize} rounded-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-2 shadow-lg border-2 border-white ring-2 ring-rose-100/50 ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
          <circle cx="50" cy="50" r="46" fill="#fff1f2" stroke="#ffe4e6" strokeWidth="2" />
          {/* Ceramic plate */}
          <circle cx="50" cy="50" r="38" fill="#ffffff" stroke="#fecdd3" strokeWidth="1.5" />
          {/* Mushroom 1 */}
          <ellipse cx="44" cy="44" rx="14" ry="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="41" y="48" width="6" height="12" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Mushroom 2 */}
          <ellipse cx="60" cy="54" rx="12" ry="9" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="58" y="58" width="5" height="10" rx="2.5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Herbs & seasoning */}
          <circle cx="42" cy="42" r="1.5" fill="#15803d" />
          <circle cx="48" cy="46" r="1.2" fill="#15803d" />
          <circle cx="58" cy="51" r="1.5" fill="#15803d" />
          <circle cx="50" cy="56" r="1" fill="#78350f" />
        </svg>
      </div>
    );
  }

  // Default: Fresh Paneer
  return (
    <div className={`relative ${currentSize} rounded-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-2 shadow-lg border-2 border-white ring-2 ring-orange-100/50 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
        {/* Porcelain base dish */}
        <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#fed7aa" strokeWidth="2" />
        <circle cx="50" cy="50" r="36" fill="#fff7ed" stroke="#ffedd5" strokeWidth="1.5" />
        {/* Cubed fresh paneer pieces */}
        <rect x="36" y="34" width="16" height="15" rx="3" fill="#ffffff" stroke="#fbbf24" strokeWidth="1.5" />
        <rect x="50" y="42" width="17" height="16" rx="3" fill="#fefce8" stroke="#fbbf24" strokeWidth="1.5" />
        <rect x="32" y="48" width="16" height="15" rx="3" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Saffron & spice tint */}
        <circle cx="44" cy="41" r="2" fill="#f59e0b" opacity="0.8" />
        <circle cx="58" cy="49" r="2" fill="#ea580c" opacity="0.8" />
        <circle cx="40" cy="55" r="1.8" fill="#f59e0b" opacity="0.8" />
        {/* Fresh coriander sprig */}
        <path d="M48 36 C45 31 52 29 55 35 C58 30 63 34 57 39 Z" fill="#16a34a" />
      </svg>
    </div>
  );
}
