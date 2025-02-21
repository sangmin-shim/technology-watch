import { CardImage } from './components/CardImage';
import { CardTitle } from './components/CardTitle';
import { CardSubtitle } from './components/CardSubtitle';
import { CardDescription } from './components/CardDescription';

interface YoutuberCardProps {
  youtuber: {
    name: string;
    title: string;
    description: string;
    image_url: string;
  };
}

export function YoutuberCard({ youtuber }: YoutuberCardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <CardImage 
        imageUrl={youtuber.image_url} 
        altText={youtuber.name} 
      />
      <div className="px-6 py-4">
        <CardTitle name={youtuber.name} />
        <CardSubtitle title={youtuber.title} />
        <CardDescription description={youtuber.description} />
      </div>
    </div>
  );
} 