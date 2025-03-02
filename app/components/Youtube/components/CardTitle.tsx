import type { Tables } from "~/types/types";

interface CardTitleProps {
  title: Tables<"youtube_videos">["title"];
}

export function CardTitle({ title }: CardTitleProps) {
  return (
    <h2 className="h-20 font-bold text-xl text-white line-clamp-2 hover:line-clamp-none">
      {title}
    </h2>
  );
}
