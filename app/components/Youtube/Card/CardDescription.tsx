"use client";

import { useState, useRef } from "react";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import type { Tables } from "~/types/database.types";

interface CardDescriptionProps {
  description: Tables<"youtube_videos">["description"];
  maxLength?: number;
}

export function CardDescription({
  description,
  maxLength = 150,
}: CardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const shouldShowButton = description && description.length > maxLength;

  return (
    <div className="relative">
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isExpanded ? "1000px" : "4.5em" }}
      >
        <p
          ref={contentRef}
          className={`text-gray-500 text-sm ${
            isExpanded ? "" : "line-clamp-3 h-10"
          }`}
        >
          {description || ""}
        </p>
      </div>

      {shouldShowButton && (
        <div className="flex justify-center my-2 relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="transition-colors cursor-pointer absolute -bottom-10"
            title={isExpanded ? "Show less" : "Read more"}
            aria-label={isExpanded ? "Show less" : "Read more"}
          >
            {isExpanded ? (
              <FaRegArrowAltCircleUp className="w-7 h-7 text-gray-400 hover:text-gray-300" />
            ) : (
              <FaRegArrowAltCircleDown className="w-7 h-7 text-gray-400 hover:text-gray-300" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
