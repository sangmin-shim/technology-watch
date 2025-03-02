import type { Route } from "./+types/home";
import { youtubeService, type VideosWithChannel } from "../services/supabase";
import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import type { Tables } from "~/types/types";
import CardFilterContainer from "~/components/Youtube/components/CardFilterContainer";
import { CardContainer } from "~/components/Youtube/components/CardContainer";

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

  const [videos, setVideos] = useState<VideosWithChannel>(videosFromDB);

  const totalVideosCount = useMemo(() => {
    return videos.length;
  }, [videos]);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-white">
          Featured Videos {totalVideosCount}
        </h1>
        <CardFilterContainer />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <CardContainer
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
