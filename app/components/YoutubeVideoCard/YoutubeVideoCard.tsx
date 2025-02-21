import { CardImage } from "../YoutuberCard/components/CardImage";
import { CardSubtitle } from "../YoutuberCard/components/CardSubtitle";
import { CardTitle } from "../YoutuberCard/components/CardTitle";
import { CardDescription } from "../YoutuberCard/components/CardDescription";
import type { Tables } from "~/types/types";

interface YoutubeVideoProps {
  video: Tables<'youtube_videos'>
  channelName: Tables<'youtube_channel_ids'>[('channel_name')]
}

export function YoutubeVideoCard({ video, channelName }: YoutubeVideoProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <CardImage 
          imageUrl={video.thumbnail_url} 
          altText={video.title} 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-20" />
      </div>
      <div className="p-5 space-y-3">
        <CardTitle title={video.title} />
        <CardSubtitle channelName={channelName} />
        <CardDescription description={video.description} />
      </div>
    </div>
  );
} 