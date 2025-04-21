import { ScrollText, Section } from "lucide-react";
import React, { Fragment } from "react";
import SectionTitleContainer from "../common/SectionTitleContainer";
import SectionTitleWithIconContainer from "../common/SectionTitleWithIconContainer";
import { FaBlog, FaInternetExplorer } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import type { Tables } from "~/types/database.mobile.types";
import { TitleIconAccordion } from "../common/TitleIconAccordion";
import type { OfficialBlogResult } from "~/services/official-blog";
import dayjs from "dayjs";
import { TitleIconAccordionByYear } from "../common/TitleIconAccordionByYear";

interface OfficialBlogSectionContainerProps {
  officialBlogs: Tables<"official_blogs">[] | null;
  officialBlogResult: OfficialBlogResult[];
}
function OfficialBlogSectionContainer({
  officialBlogs,
  officialBlogResult,
}: OfficialBlogSectionContainerProps) {
  if (!officialBlogs) {
    return null;
  }

  return (
    <Fragment>
      <SectionTitleWithIconContainer
        title="Official Blog"
        icon={<ImBlog className="w-10 h-10" />}
      />
      <TitleIconAccordionByYear
        items={officialBlogs.map((blog, index) => {
          const blogResult = officialBlogResult.find(
            (result) => result.framework === blog.blog_name
          );

          if (blogResult) {
            const years = Object.keys(blogResult.data);
            const latestYear = years[years.length - 1];

            const latestContent = blogResult.data[latestYear][0];

            const dateString = `${latestContent.year}-${latestContent.month}-${latestContent.day}`;
            const date = dayjs(dateString);

            // 6. Format the date using dayjs
            const formattedDate = date.format("MMMM D, YYYY");

            return {
              title: blog.blog_name,
              type: "Article",
              extraInfo: (
                <div className="flex flex-col flex-wrap">
                  <div>
                    Last updated at &nbsp;
                    <span className="font-bold">{formattedDate}</span>
                  </div>
                  <div className="flex justify-end">
                    ({dayjs(formattedDate).fromNow()})
                  </div>
                </div>
              ),
              contents: blogResult.data,
            };
          } else {
            return {
              title: "not found",
              type: "Article",
            };
          }
        })}
      />
    </Fragment>
  );
}

export default OfficialBlogSectionContainer;
