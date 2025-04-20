import type { Tables } from "database.types";

interface CardImageProps {
  imageUrl: Tables<"youtube_videos">["thumbnail_url"];
  altText: Tables<"youtube_videos">["title"];
}

export function CardImage({ imageUrl, altText }: CardImageProps) {
  return (
    <div className="aspect-video w-full overflow-hidden">
      <img
        className="rounded-lg w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        src={imageUrl ?? ""}
        alt={altText ?? ""}
        loading="lazy"
      />
    </div>
  );
}
