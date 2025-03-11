import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface AiBadgeProps {
  aiComment: string | null;
}

export function AiBadge({ aiComment }: AiBadgeProps) {
  return (
    <div className="absolute top-2 right-2 z-10 group">
      <div
        className="bg-red-500 hover:bg-red-800 hover:cursor-pointer p-2 rounded-full shadow-lg"
        onClick={() => {
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: "🤖 l'IA recommande cette vidéo",
            text: aiComment || "No comment available",
            icon: "info",
            background: "#1f2937",
            color: "#f9fafb",
          });
        }}
      >
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
    </div>
  );
}
