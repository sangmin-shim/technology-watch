import { useState } from 'react';
import type { Tables } from "~/types/types";

interface CardDescriptionProps {
  description: Tables<'youtube_videos'>['description'];
  maxLength?: number;
}

export function CardDescription({ description, maxLength = 150 }: CardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <p className={`text-gray-300 text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
        {description ?? ''}
      </p>
      {description && description.length > maxLength && (
        <div className="flex justify-center mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            title={isExpanded ? "Show less" : "Read more"}
          >
            <svg 
              className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 