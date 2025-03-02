import type { Route } from "./+types/home";
import { YoutubeVideoCard } from "../components/YoutubeCard/components/YoutubeVideoCard";
import { youtubeService, type VideosWithChannel } from "../services/supabase";
import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import type { Tables } from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Youtuber Directory" },
    { name: "description", content: "Browse your favorite YouTubers!" },
  ];
}

export const loader = async () => {
  const videosFromDB = await youtubeService.getValidatedVideosByAI();
  return { videosFromDB };
};

export default function Home() {
  const { videosFromDB } = useLoaderData<typeof loader>();
  const totalVideosCount = useMemo(() => {
    return videosFromDB.length;
  }, [videosFromDB]);
  const [videos, setVideos] = useState<VideosWithChannel>(videosFromDB);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white">
          Featured Videos {totalVideosCount}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <YoutubeVideoCard
              key={video.video_id}
              video={video}
              channelName={video.youtube_channel_ids.channel_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
