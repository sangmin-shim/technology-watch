import React, { useState } from "react";
import { CardImage } from "./CardImage";
import { CardSubtitle } from "./CardSubtitle";
import { CardTitle } from "./CardTitle";
import { CardDescription } from "./CardDescription";
import { VideoModal } from "../../VideoModal/VideoModal";
import type { Tables } from "~/types/types";
import { AiBadge } from "../../AiBadge/AiBadge";

interface YoutubeVideoProps {
  video: Tables<"youtube_videos">;
  channelName: Tables<"youtube_channel_ids">["channel_name"];
}

export function YoutubeVideoCard({ video, channelName }: YoutubeVideoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
        {/* {video.is_validated_by_ai && */}
        <AiBadge aiScore={video.ai_score} />
        {/* } */}

        {/* Thumbnail area - clickable */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <CardImage imageUrl={video.thumbnail_url} altText={video.title} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-20" />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-black/50 rounded-full p-4">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
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
