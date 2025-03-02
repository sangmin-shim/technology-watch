import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface AiBadgeProps {
  aiScore: number | null;
}

export function AiBadge({ aiScore }: AiBadgeProps) {
  // Determine the pathColor based on aiScore
  let pathColor;
  if (aiScore !== null) {
    if (aiScore > 94) {
      pathColor = "rgba(0, 255, 0, 1)"; // Green
    } else if (aiScore > 84) {
      pathColor = "rgba(0, 0, 255, 1)"; // Blue
    } else if (aiScore > 79) {
      pathColor = "rgba(135, 206, 235, 1)"; // Sky blue
    } else {
      pathColor = `rgba(62, 152, 199, ${aiScore / 100})`; // Default color
    }
  }

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
      <div className="absolute right-0 px-2 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -bottom-8">
        {!!aiScore && (
          <div
            style={{ width: 100, height: 60 }}
            className="text-white flex items-center justify-center gap-3"
          >
            <CircularProgressbar
              value={aiScore}
              text={`${aiScore}`}
              styles={buildStyles({
                pathColor: pathColor,
                textColor: "#fff",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
            <p>AI Score</p>
          </div>
        )}
      </div>
    </div>
  );
}
