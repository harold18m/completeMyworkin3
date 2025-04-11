"use client"

import { useCallback } from 'react'

interface CategoryNavProps {
  categories: {
    id: string;
    name: string;
    count: number;
    icon: string;
  }[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const scrollToCategory = useCallback((categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition-all duration-200 text-sm text-gray-700 hover:text-indigo-600"
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
            <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 