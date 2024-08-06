'use client';

import { useState } from "react";
import FeaturedArticle from "@/app/_components/FeaturedItems/FeaturedArticle";
import FeaturedEvent from "./FeaturedEvent";

interface ArticleItems {
  headline: string;
  slug: string;
  date: string;
  featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
  imageSrc: string;
  publishedAt: string;
}

interface ArticleContent {
  headline?: string | null;
  itemType: 'article';
  items: ArticleItems[];
}

interface EventItems {
  name: string;
  id: number;
  date: string;
  image: { src: string; width: number; height: number };
  startingDate: string;
  sharedPrice: number;
}

interface EventContent {
  headline?: string | null;
  itemType: 'event';
  items: EventItems[];
}

type ItemContent = ArticleContent | EventContent;

// Type Guards
const isArticleItems = (item: ArticleItems | EventItems): item is ArticleItems => {
  return (item as ArticleItems).slug !== undefined;
};

const isEventItems = (item: ArticleItems | EventItems): item is EventItems => {
  return (item as EventItems).id !== undefined;
};

const FeaturedItems: React.FC<ItemContent> = ({ headline, items, itemType }) => {
  const [itemNumber, setItemNumber] = useState(3);

  const onShowMore = () => {
    if (itemNumber + 3 > items.length) {
      setItemNumber(items.length);
    } else {
      setItemNumber(itemNumber + 3);
    }
  };

  return (
    <section className="featured-items">
      <h3 className="featured-items__headline">{headline || 'Our featured articles'}</h3>
      <div className="featured-items__container">
        {items.slice(0, itemNumber).map((item) => {
          if (itemType === 'article' && isArticleItems(item)) {
            return <FeaturedArticle key={item.slug} article={item} />;
          } else if (itemType === 'event' && isEventItems(item)) {
            return <FeaturedEvent key={item.id} event={item} />;
          }
          return null;
        })}
      </div>
      {itemNumber < items.length && (
        <button className="btn btn--medium btn--turquoise" onClick={onShowMore}>
          See more
        </button>
      )}
    </section>
  );
};

export default FeaturedItems;
