import React from "react";
import type { Summaries, VideosWithChannel } from "~/services/supabase";
import SectionTitleContainer from "./SectionTitleContainer";
import { CardContainer } from "./Card/CardContainer";
import { MessageCircleWarning } from "lucide-react";
import { RiRobot2Line } from "react-icons/ri";

interface LatestVideosContainerProps {
  videos: VideosWithChannel;
  summary: Summaries[number];
}

function LatestVideosContainer({
  videos,
  summary,
}: LatestVideosContainerProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <PingAnimation />
        <SectionTitleContainer title="Dernières vidéos" />
        <LatestVideoDateRange summary={summary} />
      </div>
      <AiSummarySection summary={summary} />
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
  );
}

function AiSummarySection({ summary }: { summary: Summaries[number] }) {
  return (
    <div className="mb-6 bg-gradient-to-r bg-gray-200 dark:from-red-950/30 dark:to-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
      <div className="flex items-start gap-3">
        <div className="mb-0.5 p-1.5 bg-red-300  rounded-full flex items-center justify-center">
          <RiRobot2Line className="m-0.5 h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <div className="border">
          <h3 className="font-medium text-red-700 dark:text-red-300 mb-1 flex items-center text-xl">
            Résumé du jour par l'IA
          </h3>
          <p className="text-lg text-black font-regular">
            &nbsp; {summary.day_summary}
          </p>
        </div>
      </div>
    </div>
  );
}

function LatestVideoDateRange({ summary }: { summary: Summaries[number] }) {
  return (
    <p className="text-lg text-gray-300 mt-2">
      {summary?.created_at
        ? new Date(
            new Date(summary.created_at).getTime() - 86400000
          ).toLocaleDateString() +
          " - " +
          new Date(new Date(summary.created_at).getTime()).toLocaleDateString()
        : ""}
    </p>
  );
}

function PingAnimation() {
  return (
    <div>
      <span className="relative flex size-3 mt-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
      </span>
    </div>
  );
}
export default LatestVideosContainer;
