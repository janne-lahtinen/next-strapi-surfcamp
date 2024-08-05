import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/strapi.utils";

interface EventContent {
  event: {
    name: string;
    id: number;
    date: string;
    image: { src: string; width: number; height: number };
    imageSrc: string;
    startingDate: string;
    sharedPrice: number;
  }
}

const FeaturedEvent = ({event}: EventContent) => {  
  return (
    <Link
      href={`/events/${event.id}`}
      className="featured-items__article"
    >
      <div className="featured-items__article-image">
        <Image
          src={event.image.src}
          width={event.image.width}
          height={event.image.height}
          alt={`Go check out the event: ${event.name}`}
        />
      </div>
      <div className="featured-items__article-text featured-items__article-text--event">
        <h5>{event.name}</h5>
        <p className="copy--small bold">{formatDate(event.startingDate)}</p>
        <p className="copy--small">Prices starting at {event.sharedPrice} €</p>
      </div>
    </Link>
  )
}

export default FeaturedEvent;