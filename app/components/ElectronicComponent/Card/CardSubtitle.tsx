import type { Tables } from "database.types";

interface CardSubtitleProps {
  channelName: Tables<"youtube_channel_ids">["channel_name"];
}

export function CardSubtitle({ channelName }: CardSubtitleProps) {
  return (
    <h3 className="text-md font-bold text-gray-500 transition-colors">
      {channelName}
    </h3>
  );
}
