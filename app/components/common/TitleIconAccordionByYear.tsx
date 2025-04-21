import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type { ReactNode } from "react";
import useIsMobile from "../hooks/useMobile";
import type { OfficialBlogEntry } from "~/services/official-blog";

export interface TitleIconAccordionItemByYear {
  title: string;
  type: string;
  extraInfo?: ReactNode;
  contents?: Record<string, OfficialBlogEntry[]>;
}

interface Props {
  items: TitleIconAccordionItemByYear[] | undefined;
}

export function TitleIconAccordionByYear({ items }: Props) {
  if (!items) return;
  const isMobile = useIsMobile();

  return (
    <Accordion
      type="multiple"
      className="w-full flex flex-col gap-4 px-3 mb-10"
    >
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="cursor-pointer">
            <div className={`flex  items-center justify-between w-full`}>
              <div className="flex items-center gap-3 w-full">
                {isMobile ? (
                  <div className="flex items-center gap-3 justify-between w-full">
                    <div>
                      <AvatarTitleSection title={item.title} />
                    </div>
                    <div className="text-sm pr-2 text-right">
                      {
                        Object.values(item.contents || {}).flatMap(
                          (content) => content
                        ).length
                      }{" "}
                      {item.type}s{" "}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div>
                      <AvatarTitleSection title={item.title} />
                    </div>
                    <div>
                      {
                        Object.values(item.contents || {}).flatMap(
                          (content) => content
                        ).length
                      }{" "}
                      {item.type}s{" "}
                    </div>
                  </div>
                )}
              </div>
              {!!item.extraInfo && !isMobile && (
                <div className="flex w-full justify-end pr-2">
                  {item.extraInfo}
                </div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {
              <div key={item.title} className="flex flex-col gap-10">
                {Object.keys(item.contents || {})
                  .sort((a, b) => Number(b) - Number(a))
                  .map((year) => (
                    <div
                      key={year + item.title}
                      className="flex flex-col gap-2"
                    >
                      <div className="text-xl">{year}</div>
                      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {item.contents?.[year]?.map((blogContent) => {
                          return (
                            <div
                              key={blogContent.title}
                              className="py-3 px-4 flex flex-col gap-3  rounded-lg bg-gray-600 hover:bg-gray-500 hover:text-gray-300"
                            >
                              <div>
                                <h3 className="h-28 text-lg font-semibold text-white text-left">
                                  {blogContent.title}
                                </h3>
                              </div>
                              <div className="overflow-hidden text-ellipsis line-clamp-3">
                                {blogContent.content}
                              </div>
                              <div>
                                <a
                                  href={blogContent.url}
                                  className="text-gray-400 text-sm hover:text-gray-300"
                                >
                                  <div className="underline flex items-center gap-2">
                                    <span>Visit original blog article</span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            }
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AvatarTitleSection({ title }: { title: string }) {
  const IMAGE_PATH = "../../../images/";
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-4">
      {isMobile ? (
        <>
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={IMAGE_PATH + title + ".jpg"}
              className="rounded-full w-8 h-8 bg-white"
            />
          </Avatar>
          <span className="text-[1rem] font-semibold">{title}</span>
        </>
      ) : (
        <>
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={IMAGE_PATH + title + ".jpg"}
              className="rounded-full w-10 h-10 bg-white"
            />
          </Avatar>
          <span className="text-xl font-semibold">{title}</span>
        </>
      )}
    </div>
  );
}
