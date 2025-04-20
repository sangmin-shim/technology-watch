import React from "react";
import SectionTitleContainer from "../common/SectionTitleContainer";
import SectionTitleWithIconContainer from "../common/SectionTitleWithIconContainer";
import { FaMedium } from "react-icons/fa";

function MediumSectionContainer() {
  return (
    <div>
      <SectionTitleWithIconContainer
        title="Medium"
        icon={<FaMedium className="w-10 h-10 text-white" />}
      />
    </div>
  );
}

export default MediumSectionContainer;
