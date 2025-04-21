import { Smartphone } from "lucide-react";
import { useLoaderData } from "react-router";
import PageTitleContainer from "~/components/common/PageTitleContainer";
import MediumSectionContainer from "~/components/Mobile/MediumSectionContainer";
import OfficialBlogSectionContainer from "~/components/Mobile/OfficialBlogSectionContainer";
import YoutubeSectionContainer from "~/components/Mobile/YoutubeSectionContainer";

import { mobileService } from "~/services/supabase.mobile";

export const loader = async () => {
  // --------------------------
  // Youtube
  // --------------------------
  const youtubeChannels = await mobileService.getYoutubeChannels();
  const youtubeVideos = await mobileService.getYoutubeVideos();

  // ----------------------------
  // Medium
  // ----------------------------
  const mediumBlogContents = await mobileService.getMediumBlogContents();
  const mediumBlogs = await mobileService.getMediumBlogs();

  return { youtubeChannels, youtubeVideos, mediumBlogs, mediumBlogContents };
};

export default function index() {
  const { youtubeChannels, youtubeVideos, mediumBlogs, mediumBlogContents } =
    useLoaderData<typeof loader>();

  console.log("mediumBlogContents :: ", mediumBlogContents);
  return (
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col text-white">
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <PageTitleContainer
          icon={<Smartphone className="w-10 h-10" />}
          title="Mobile"
        />
        <YoutubeSectionContainer
          youtubeChannels={youtubeChannels}
          youtubeVideos={youtubeVideos}
        />
        <MediumSectionContainer
          mediumBlogs={mediumBlogs}
          mediumBlogContents={mediumBlogContents}
        />
        <OfficialBlogSectionContainer />
      </div>
    </div>
  );
}
