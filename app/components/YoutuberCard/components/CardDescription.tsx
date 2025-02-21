import { truncateText } from '../../../utils/text';
import type { Tables } from "~/types/types";

interface CardDescriptionProps {
  description: Tables<'youtube_videos'>['description'];
  maxLength?: number;
}

export function CardDescription({ description, maxLength = 150 }: CardDescriptionProps) {
  return (
    <p className="text-gray-300 text-sm line-clamp-3 hover:line-clamp-none">
      {truncateText(description??'', maxLength)}
    </p>
  );
} 