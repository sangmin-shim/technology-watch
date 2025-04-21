import type { ReactNode } from "react";
import SectionTitleContainer from "./SectionTitleContainer";

interface SectionTitleWithIconContainerProps {
  title: string;
  icon: ReactNode;
}
function SectionTitleWithIconContainer({
  title,
  icon,
}: SectionTitleWithIconContainerProps) {
  return (
    <div className="flex items-center gap-5">
      <div>{icon}</div>
      <SectionTitleContainer title={title} />
    </div>
  );
}

export default SectionTitleWithIconContainer;
