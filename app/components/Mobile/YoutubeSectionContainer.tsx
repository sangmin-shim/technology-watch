'use client"';
import { ImYoutube } from "react-icons/im";
import SectionTitleWithIconContainer from "../common/SectionTitleWithIconContainer";
import { TitleIconAccordion } from "../common/TitleIconAccordion";
import type { Tables } from "~/types/database.mobile.types";
import { Fragment } from "react/jsx-runtime";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { Play } from "lucide-react";

dayjs.extend(relativeTime);
interface YoutubeSectionContainerProps {
  youtubeChannels: Tables<"youtube_channels">[] | null;
  youtubeVideos: Tables<"youtube_videos">[] | null;
}

function YoutubeSectionContainer({
  youtubeChannels,
  youtubeVideos,
}: YoutubeSectionContainerProps) {
  if (!youtubeChannels || !youtubeVideos) {
    return null;
  }

  const channelsWithVideos = youtubeChannels.map((channel) => {
    const videos = youtubeVideos.filter(
      (video) => video.channel_id === channel.channel_id
    );
    return { ...channel, videos };
  });

  return (
    <Fragment>
      <SectionTitleWithIconContainer
        title="Youtube"
        icon={<ImYoutube className="w-10 h-10 text-red-600" />}
      />

      <TitleIconAccordion
        items={channelsWithVideos.map((channel) => {
          const latestVideo = channel.videos.reduce((latest, video) =>
            new Date(video.published_at) > new Date(latest.published_at)
              ? video
              : latest
          );

          const lastUpdatedDate = latestVideo
            ? dayjs(latestVideo.published_at).format("MMM D, YYYY")
            : "Unknown";

          return {
            title: channel.channel_name,
            extraInfo: (
              <div>
                Last updated at &nbsp;
                <span className="font-bold">{lastUpdatedDate}</span> &nbsp; (
                {dayjs(lastUpdatedDate).fromNow()})
              </div>
            ),
            contents: channel.videos.map((video) => (
              <div key={video.video_id}>
                <YoutubeVideoCard video={video} />
              </div>
            )),
          };
        })}
      />
    </Fragment>
  );
}

export default YoutubeSectionContainer;

function YoutubeVideoCard({ video }: { video: Tables<"youtube_videos"> }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="bg-gray-600 hover:bg-gray-500 rounded-lg overflow-hidden h-96">
      <div className="relative w-full h-64">
        {!isPlaying ? (
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={handleThumbnailClick}
          >
            <img
              src={video.thumbnail_url || "/placeholder.svg"}
              alt={video.title || ""}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-black bg-opacity-60 flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.video_id}?autoplay=1`}
            title={video.title || ""}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
          ></iframe>
        )}
      </div>
      <div className="p-3">
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-xl line-clamp-2 mb-1">
              {video.title}
            </h3>
            <p className="text-gray-400 text-xs mb-1">
              {dayjs(video.published_at).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
