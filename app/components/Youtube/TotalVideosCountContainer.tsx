import { Film } from "lucide-react";
import { useMemo } from "react";
import type { VideosWithChannel } from "~/services/supabase";

interface TotalVideosCountContainerProps {
  videos: VideosWithChannel;
}

function TotalVideosCountContainer({ videos }: TotalVideosCountContainerProps) {
  const totalVideosCount = useMemo(() => {
    return videos.length;
  }, [videos]);

  return (
    <div>
      <div className="border border-gray-700 flex w-fit items-center gap-2 px-4 py-2 rounded-lg text-white">
        <Film className="h-5 w-5" />
        <span className="font-medium">Total Videos:</span>
        <span className="text-primary-foreground px-2 py-0.5 rounded-md font-bold">
          {totalVideosCount}
        </span>
      </div>
    </div>
  );
}

export default TotalVideosCountContainer;
