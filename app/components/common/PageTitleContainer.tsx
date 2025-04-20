import type { ReactNode } from "react";

interface PageTitleContainerProps {
  title: string;
  icon: ReactNode;
}

function PageTitleContainer({ title, icon }: PageTitleContainerProps) {
  return (
    <div className="flex items-center gap-4 text-white mb-10">
      <div className="text-white">{icon}</div>
      <div>
        <h1 className="text-5xl font-bold">{title}</h1>
      </div>
    </div>
  );
}

export default PageTitleContainer;
