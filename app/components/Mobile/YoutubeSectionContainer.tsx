import { ImYoutube } from "react-icons/im";
import SectionTitleWithIconContainer from "../common/SectionTitleWithIconContainer";

function YoutubeSectionContainer() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <SectionTitleWithIconContainer
          title="Youtube"
          icon={<ImYoutube className="w-10 h-10 text-red-600" />}
        />
      </div>
    </div>
  );
}

export default YoutubeSectionContainer;
