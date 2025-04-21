import React, { Fragment, useState } from "react";
import SectionTitleContainer from "../common/SectionTitleContainer";
import SectionTitleWithIconContainer from "../common/SectionTitleWithIconContainer";
import { FaMedium } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Tables } from "~/types/database.mobile.types";
import { TitleIconAccordion } from "../common/TitleIconAccordion";
import clsx from "clsx";
import type { Json } from "database.types";
import { ArrowBigDown, ArrowBigUp, ExternalLink } from "lucide-react";

dayjs.extend(relativeTime);

interface MediumSectionContainerProps {
  mediumBlogs: Tables<"medium_blogs">[] | null;
  mediumBlogContents: Tables<"medium_blog_contents">[] | null;
}

function MediumSectionContainer({
  mediumBlogs,
  mediumBlogContents,
}: MediumSectionContainerProps) {
  if (!mediumBlogs || !mediumBlogContents) {
    return null;
  }

  const blogsWithContents = mediumBlogs.map((blog) => {
    const contents = mediumBlogContents.filter(
      (content) => content.blog_name === blog.blog_name
    );
    return { ...blog, contents };
  });

  return (
    <Fragment>
      <SectionTitleWithIconContainer
        title="Medium"
        icon={<FaMedium className="w-10 h-10 text-white" />}
      />
      <TitleIconAccordion
        items={blogsWithContents.map((blog) => {
          const latestContent = blog.contents.reduce((latest, content) =>
            new Date(content.published_at) > new Date(latest.published_at)
              ? content
              : latest
          );

          const lastUpdatedDate = latestContent
            ? dayjs(latestContent.published_at).format("MMM D, YYYY")
            : "Unknown";

          return {
            title: blog.blog_name,
            type: "Article",
            extraInfo: (
              <div className="flex flex-col flex-wrap">
                <div>
                  Last updated at &nbsp;
                  {lastUpdatedDate}
                </div>
              </div>
            ),
            contents: blog.contents.map((content) => (
              <div
                key={content.guid}
                className="py-3 px-4 flex flex-col gap-3  rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white text-left truncate hover:whitespace-normal hover:overflow-visible hover:text-clip">
                    {content.title}
                  </h3>
                </div>
                <div>
                  <a
                    href={content.guid}
                    className="text-gray-400 text-sm hover:text-gray-300"
                  >
                    <div className="underline flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit original blog article</span>
                    </div>
                  </a>
                </div>
                {!!content.contents && (
                  <HtmlPreviewCard html={content.contents} maxHeight={300} />
                )}

                <p className="text-gray-400 text-xs pr-2 flex justify-end w-full">
                  {dayjs(content.published_at).fromNow()}
                </p>
              </div>
            )),
          };
        })}
      />
    </Fragment>
  );
}

export default MediumSectionContainer;

const HtmlPreviewCard = ({
  html,
  maxHeight = 300,
}: {
  html: Json | null;
  maxHeight: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 border-t-2">
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="relative flex justify-center mb-5 items-center border border-gray-200 hover:bg-gray-300  hover:text-gray-500 hover:cursor-pointer rounded-lg"
        >
          <ArrowBigUp className="w-8 h-8" />
          <div>Show Less</div>
        </div>
      )}
      <div
        className={clsx("transition-all overflow-hidden", {
          "max-h-[300px]": !expanded,
        })}
        style={!expanded ? { maxHeight } : undefined}
      >
        <div
          className="prose max-w-none [&_img]:max-w-full [&_iframe]:max-w-full [&_iframe]:h-auto text-xl first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-black first-letter:text-white"
          dangerouslySetInnerHTML={{
            __html: typeof html === "string" ? html : "",
          }}
        />
      </div>

      {!expanded && (
        <div
          onClick={() => setExpanded(true)}
          className="relative flex justify-center mt-5 items-center border border-gray-200 hover:bg-gray-300  hover:text-gray-500 hover:cursor-pointer rounded-lg"
        >
          <ArrowBigDown className="w-8 h-8" />
          <div>Show More</div>
        </div>
      )}
    </div>
  );
};
