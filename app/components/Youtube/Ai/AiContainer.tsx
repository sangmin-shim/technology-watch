import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { AiBadge } from "./AiBadge";

interface AiContainerProps {
  aiScore: number | null;
  aiComment: string | null;
  isHovered: boolean;
}
function AiContainer({ aiScore, aiComment, isHovered }: AiContainerProps) {
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
    <div className=" text-white font-semibold absolute top-0 left- z-10 group w-full flex justify-between">
      <div
        className={`rounded-tl-lg bg-gray-800  p-2  transition-opacity  duration-300 ${
          isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <CircularProgressbar
          className="w-16 h-16"
          value={aiScore ? aiScore : 0}
          text={`${aiScore} / 100`}
          styles={buildStyles({
            pathColor: pathColor,
            textColor: "#fff",
            trailColor: "#d6d6d6",
            textSize: "1.2rem",
          })}
        />
        <p>Score IA</p>
      </div>
      <div>
        <AiBadge aiComment={aiComment} />
      </div>
    </div>
  );
}

export default AiContainer;
