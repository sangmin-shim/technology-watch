import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import type { ReactNode } from "react";
import useIsMobile from "../hooks/useMobile";

interface TitleIconAccordionItem {
  title: string;
  type: string;
  extraInfo?: ReactNode;
  contents?: ReactNode[];
}

interface Props {
  items: TitleIconAccordionItem[] | undefined;
}

export function TitleIconAccordion({ items }: Props) {
  if (!items) return;
  const isMobile = useIsMobile();

  return (
    <Accordion
      type="multiple"
      className="w-full flex flex-col gap-4 px-10 mb-10"
    >
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="cursor-pointer">
            <div className="flex  items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <AvatarTitleSection title={item.title} />
                {item.contents?.length} {item.type}s
              </div>
              {!!item.extraInfo && !isMobile && (
                <div className="px-2">{item.extraInfo}</div>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {item.contents?.map((content) => (
              <div key={content?.toLocaleString()}>{content}</div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function AvatarTitleSection({ title }: { title: string }) {
  const IMAGE_PATH = "../../../images/";
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-10 h-10">
        <AvatarImage
          src={IMAGE_PATH + title + ".jpg"}
          className="rounded-full w-10 h-10"
        />
      </Avatar>
      <span className="text-xl font-semibold">{title}</span>
    </div>
  );
}
