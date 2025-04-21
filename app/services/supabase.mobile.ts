import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database.mobile.types";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_MOBILE_URL!,
  process.env.VITE_SUPABASE_ANON_MOBILE_KEY!
);

export const mobileService = {
  // --------------------------
  // Youtube
  // --------------------------
  async getYoutubeChannels() {
    const { data, error } = await supabase.from("youtube_channels").select("*");
    if (error) throw error;
    return data;
  },

  async getYoutubeVideos() {
    const { data, error } = await supabase
      .from("youtube_videos")
      .select(`*, youtube_channels (channel_name)`)
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // --------------------------
  // Medium
  // --------------------------
  async getMediumBlogs() {
    const { data, error } = await supabase.from("medium_blogs").select("*");

    if (error) throw error;
    return data;
  },

  async getMediumBlogContents() {
    const { data, error } = await supabase
      .from("medium_blog_contents")
      .select(`*, medium_blogs (blog_name)`)
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
