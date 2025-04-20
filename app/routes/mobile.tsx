import { Smartphone } from "lucide-react";
import React from "react";
import PageTitleContainer from "~/components/common/PageTitleContainer";
import MediumSectionContainer from "~/components/Mobile/MediumSectionContainer";
import OfficialBlogSectionContainer from "~/components/Mobile/OfficialBlogSectionContainer";
import YoutubeSectionContainer from "~/components/Mobile/YoutubeSectionContainer";

export default function index() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col gap-5 text-white">
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <PageTitleContainer
          icon={<Smartphone className="w-10 h-10" />}
          title="Mobile"
        />
        <YoutubeSectionContainer />
        <MediumSectionContainer />
        <OfficialBlogSectionContainer />
      </div>
    </div>
  );
}
