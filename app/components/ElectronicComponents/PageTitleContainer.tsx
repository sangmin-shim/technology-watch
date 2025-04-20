import type { ReactNode } from "react";

interface PageTitleContainerProps {
  title: string;
  icon: ReactNode;
}

function PageTitleContainer({ title, icon }: PageTitleContainerProps) {
  return (
    <div className="flex items-center gap-4 text-white">
      <div>{icon}</div>
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </div>
  );
}

export default PageTitleContainer;
