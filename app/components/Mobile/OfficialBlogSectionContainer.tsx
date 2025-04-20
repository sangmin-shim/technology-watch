import { ScrollText, Section } from "lucide-react";
import React from "react";
import SectionTitleContainer from "../common/SectionTitleContainer";
import SectionTitleWithIconContainer from "../common/SectionTitleWithIconContainer";
import { FaBlog, FaInternetExplorer } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { RiIndeterminateCircleLine } from "react-icons/ri";

function OfficialBlogSectionContainer() {
  return (
    <div>
      <SectionTitleWithIconContainer
        title="Official Blog"
        icon={<ImBlog className="w-10 h-10" />}
      />
    </div>
  );
}

export default OfficialBlogSectionContainer;
