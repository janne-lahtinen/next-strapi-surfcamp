'use client';

import { useState } from "react";
import FeaturedArticle from "@/app/_components/FeaturedItems/FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";

interface articleItems {
  headline: string;
  slug: string;
  date: string;
  featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
  imageSrc: string;
  publishedAt: string;
}

interface articleContent {
  headline?: string | null;
  itemType: string;
  items: articleItems[];
}

interface eventItems {
  name: string;
  id: number;
  date: string;
  image: { url: string; width: number; height: number };
  startingDate: string;
  sharedPrice: number;
}

interface eventContent {
  headline?: string | null;
  itemType: string;
  items: eventItems[];
}

type itemContent = articleContent | eventContent;

// const isArticleContent = (content: itemContent): content is articleContent => {
//   return content.itemType === 'article';
// };

// const isEventContent = (content: itemContent): content is eventContent => {
//   return content.itemType === 'event';
// };

const FeaturedItems = ({ headline, items, itemType = 'article' }: itemContent) => {
  const [itemNumber, setItemNumber] = useState(3);

  const onShowMore = () => {
    if (itemNumber + 3 > items.length) {
      setItemNumber(items.length)
    } else {
      setItemNumber(itemNumber + 3)
    }
  }  

  return (
    <section className="featured-items">
      <h3 className="featured-items__headline">{ headline || 'Our featured articles' }</h3>
      <div className="featured-items__container">
        {items
          .slice(0, itemNumber)
          .map((item: any) => { // Todo: change type
            if (itemType === 'article') {
              return <FeaturedArticle key={item.slug} article={item} />
            } else {
              return <FeaturedEvent key={item.id} event={item} />
            }
        })}
      </div>
      {itemNumber < items.length && (
        <button className="btn btn--medium btn--turquoise" onClick={onShowMore}>
          See more
        </button>
      )}
    </section>
  )
}

export default FeaturedItems;