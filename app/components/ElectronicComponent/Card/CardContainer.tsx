import { useState } from "react";
import { CardImage } from "./CardImage";
import { CardSubtitle } from "./CardSubtitle";
import { CardTitle } from "./CardTitle";
import { CardDescription } from "./CardDescription";
import { VideoModal } from "../VideoModal/VideoModal";
import { PlayButtonOverlay } from "~/components/ui/svg";
import type { Tables } from "~/types/database.types";
import AiContainer from "../Ai/AiContainer";

interface CardContainer {
  video: Tables<"youtube_videos">;
  channelName: Tables<"youtube_channel_ids">["channel_name"];
}

export function CardContainer({ video, channelName }: CardContainer) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pb-7 bg-gray-800 rounded-xl h-fit min-h-16 shadow-lg  hover:shadow-sm  hover:shadow-gray-300 transition-all duration-300 hover:scale-105 relative"
      >
        {video.is_validated_by_ai && (
          <AiContainer
            aiScore={video.ai_score}
            aiComment={video.ai_comment}
            isHovered={isHovered}
          />
        )}

        {/* Thumbnail area - clickable */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <CardImage imageUrl={video.thumbnail_url} altText={video.title} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-20" />
          <PlayButtonOverlay />
        </div>

        {/* Content area - not clickable */}
        <div className="p-5 space-y-3" onClick={(e) => e.stopPropagation()}>
          <CardTitle title={video.title} />
          <CardSubtitle channelName={channelName} />
          <CardDescription description={video.description} />
        </div>
      </div>

      <VideoModal
        videoId={video.video_id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
