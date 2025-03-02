interface AiBadgeProps {
  aiScore: number | null;
}

export function AiBadge({ aiScore }: AiBadgeProps) {
  return (
    <div className="absolute top-2 right-2 z-10 group">
      <div className="bg-red-500 p-2 rounded-full shadow-lg">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <div className="absolute right-0 w-48 px-2 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -bottom-8">
        {aiScore ? `AI Score: ${aiScore}/100` : "Verified by AI"}
      </div>
    </div>
  );
}
