import { CircleChevronLeft } from "lucide-react";
import React from "react";

function BackToHomeButton() {
  return (
    <div>
      <a href="/">
        <div className="mt-5 flex items-center gap-2 text-gray-400 hover:text-gray-500">
          <CircleChevronLeft />
          <span className="text-sm">Home</span>
        </div>
      </a>
    </div>
  );
}

export default BackToHomeButton;
