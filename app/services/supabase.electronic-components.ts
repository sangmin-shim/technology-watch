import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

export const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export const youtubeService = {
  async getVideos() {
    const { data, error } = await supabase
      .from("youtube_videos")
      .select(
        `
        *,
        youtube_channel_ids (
          channel_name
        )
      `
      )
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getValidatedVideosByAI() {
    const { data, error } = await supabase
      .from("youtube_videos")
      .select(
        `
        *,
        youtube_channel_ids (
          channel_name
        )
      `
      )
      .eq("is_validated_by_ai", true)
      .order("ai_score", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getChannels() {
    const { data, error } = await supabase
      .from("youtube_channel_ids")
      .select("*");

    if (error) throw error;
    return data;
  },

  async getSummaries() {
    const { data, error } = await supabase
      .from("youtube_summaries")
      .select("*");

    if (error) throw error;
    return data;
  },
};

export type VideosWithChannel = Awaited<
  ReturnType<typeof youtubeService.getVideos>
>;

export type Channels = Awaited<ReturnType<typeof youtubeService.getChannels>>;
export type Summaries = Awaited<ReturnType<typeof youtubeService.getSummaries>>;
