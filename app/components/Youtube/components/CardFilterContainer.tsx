import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import type { Channels, VideosWithChannel } from "~/services/supabase";

interface CardFilterContainerProps {
  channels: Channels;
  onFilters: (filteredChannels: Channels) => void;
}

function CardFilterContainer({
  channels,
  onFilters,
}: CardFilterContainerProps) {
  const [filteredChannels, setFilteredChannels] = useState<Channels>(channels);

  const handleChannelClick = (channel: Channels[number]) => {
    setFilteredChannels((prev) => {
      let updatedChannels;
      if (prev?.includes(channel)) {
        updatedChannels = prev.filter((prevChannel) => prevChannel !== channel);
      } else {
        updatedChannels = prev ? [...prev, channel] : [channel];
      }
      onFilters(updatedChannels);
      return updatedChannels;
    });
  };

  const handleAllClick = () => {
    const newFilteredChannels =
      filteredChannels?.length === channels.length ? [] : channels;
    setFilteredChannels(newFilteredChannels);
    onFilters(newFilteredChannels);
  };

  return (
    <div className="flex gap-2">
      <Button
        className="hover:cursor-pointer"
        variant="secondary"
        onClick={() => handleAllClick()}
      >
        All
      </Button>
      {channels.map((channel) => (
        <Button
          key={channel.channel_id}
          className={`hover:cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${
                      filteredChannels?.includes(channel)
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-200  border-gray-100"
                        : "bg-black text-white border border-gray-700"
                    }
                `}
          onClick={() => handleChannelClick(channel)}
        >
          {channel.channel_name}
        </Button>
      ))}
    </div>
  );
}

export default CardFilterContainer;
