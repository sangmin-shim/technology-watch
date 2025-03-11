import type { Route } from "./+types/home";
import {
  youtubeService,
  type Channels,
  type VideosWithChannel,
} from "../services/supabase";
import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import CardFilterContainer from "~/components/Youtube/Card/CardFilterContainer";
import { CardContainer } from "~/components/Youtube/Card/CardContainer";
import CardPaginationContainer from "~/components/Youtube/Card/CardPaginationContainer";
import TotalVideosCountContainer from "~/components/Youtube/TotalVideosCountContainer";
import PageTitleContainer from "~/components/Youtube/PageTitleContainer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Veille technologique" },
    { name: "description", content: "Veille technologique Youtube !" },
  ];
}
import { ImYoutube } from "react-icons/im";
import LatestVideosContainer from "~/components/Youtube/LatestVideosContainer";
import SectionTitleContainer from "~/components/Youtube/SectionTitleContainer";

export const loader = async () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const videosFromDB = await youtubeService.getValidatedVideosByAI();
  const channelsFromDB = await youtubeService.getChannels();
  const summariesFromDB = await youtubeService.getSummaries();

  const latestVideos = videosFromDB.filter(
    (video) =>
      video.published_at &&
      new Date(video.published_at) >= yesterday &&
      new Date(video.published_at) <= today
  );

  const latestVideosSummary = summariesFromDB
    .filter((summary) =>
      latestVideos.some((video) => {
        const videoDate = new Date(video.published_at || video.created_at);
        const summaryDate = new Date(summary.created_at);

        return (
          videoDate.getFullYear() === summaryDate.getFullYear() &&
          videoDate.getMonth() === summaryDate.getMonth() &&
          videoDate.getDate() === summaryDate.getDate()
        );
      })
    )
    .at(-1);

  return {
    videosFromDB,
    channelsFromDB,
    summariesFromDB,
    latestVideos,
    latestVideosSummary,
  };
};

export default function Home() {
  const { videosFromDB, channelsFromDB, latestVideos, latestVideosSummary } =
    useLoaderData<typeof loader>();
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
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col gap-5 text-white">
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <PageTitleContainer
          icon={<ImYoutube className="w-14 h-14 text-red-600" />}
          title="Composants électroniques"
        />
        <TotalVideosCountContainer videos={videos} />
        {!!latestVideosSummary && (
          <LatestVideosContainer
            videos={latestVideos}
            summary={latestVideosSummary}
          />
        )}
        {/* <CardFilterContainer
          channels={channelsFromDB}
          onFilters={handleFilterChange}
        /> */}
        <div>
          <SectionTitleContainer title="Toutes les vidéos" />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedVideos.map((video) => (
              <CardContainer
                key={video.video_id}
                video={video}
                channelName={video.youtube_channel_ids.channel_name}
              />
            ))}
          </div>
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
