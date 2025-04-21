import { Smartphone } from "lucide-react";
import { useLoaderData } from "react-router";
import PageTitleContainer from "~/components/common/PageTitleContainer";
import MediumSectionContainer from "~/components/Mobile/MediumSectionContainer";
import OfficialBlogSectionContainer from "~/components/Mobile/OfficialBlogSectionContainer";
import YoutubeSectionContainer from "~/components/Mobile/YoutubeSectionContainer";
import { getLynxBlogContents } from "~/services/fetch.lynx";
import { getReactNativeBlogContents } from "~/services/fetch.react-native";

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

  // ----------------------------
  // Official Blog
  // ----------------------------

  const officialBlogs = await mobileService.getOfficialBlogs();

  const reactNativeBlogContents = await getReactNativeBlogContents();
  const lynxBlogContents = await getLynxBlogContents();
  return {
    youtubeChannels,
    youtubeVideos,
    mediumBlogs,
    mediumBlogContents,
    officialBlogs,
    reactNativeBlogContents,
    lynxBlogContents,
  };
};

export default function index() {
  const {
    youtubeChannels,
    youtubeVideos,
    mediumBlogs,
    mediumBlogContents,
    officialBlogs,
    reactNativeBlogContents,
    lynxBlogContents,
  } = useLoaderData<typeof loader>();

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
        <OfficialBlogSectionContainer
          officialBlogs={officialBlogs}
          officialBlogResult={[reactNativeBlogContents, lynxBlogContents]}
        />
      </div>
    </div>
  );
}
