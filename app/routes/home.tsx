import type { Route } from "./+types/home";
import {
  youtubeService,
  type Channels,
  type VideosWithChannel,
} from "../services/supabase";
import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import CardFilterContainer from "~/components/Youtube/components/CardFilterContainer";
import { CardContainer } from "~/components/Youtube/components/CardContainer";
import CardPaginationContainer from "~/components/Youtube/components/CardPaginationContainer";
import TotalVideosCountContainer from "~/components/Youtube/components/TotalVideosCountContainer";
import PageTitleContainer from "~/components/Youtube/PageTitleContainer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Youtuber Directory" },
    { name: "description", content: "Browse your favorite YouTubers!" },
  ];
}
import { ImYoutube } from "react-icons/im";

export const loader = async () => {
  const videosFromDB = await youtubeService.getValidatedVideosByAI();
  const channelsFromDB = await youtubeService.getChannels();

  return { videosFromDB, channelsFromDB };
};

export default function Home() {
  const { videosFromDB, channelsFromDB } = useLoaderData<typeof loader>();

  const [videos, setVideos] = useState<VideosWithChannel>(videosFromDB);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const DEFAULT_PAGE_SIZE = 9;
  const totalPages = useMemo(
    () => Math.ceil(videos.length / DEFAULT_PAGE_SIZE),
    [videos]
  );

  const paginatedVideos = useMemo(() => {
    const startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    return videos.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);
  }, [videos, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filteredChannels: Channels) => {
    if (filteredChannels.length === 0) {
      setVideos([]);
    } else {
      setVideos(
        videosFromDB.filter((video) =>
          filteredChannels.some(
            (channel) =>
              channel.channel_name === video.youtube_channel_ids.channel_name
          )
        )
      );
      setCurrentPage(1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col gap-5">
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <PageTitleContainer
          icon={<ImYoutube className="w-14 h-14 text-red-600" />}
          title="Electronic component"
        />
        <TotalVideosCountContainer videos={videos} />

        <CardFilterContainer
          channels={channelsFromDB}
          onFilters={handleFilterChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedVideos.map((video) => (
            <CardContainer
              key={video.video_id}
              video={video}
              channelName={video.youtube_channel_ids.channel_name}
            />
          ))}
        </div>
        <CardPaginationContainer
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
