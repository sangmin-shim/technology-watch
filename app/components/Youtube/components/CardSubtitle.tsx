import type { Tables } from "~/types/types";

interface CardSubtitleProps {
  channelName: Tables<"youtube_channel_ids">["channel_name"];
}

export function CardSubtitle({ channelName }: CardSubtitleProps) {
  return (
    <h3 className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
      {channelName}
    </h3>
  );
}
