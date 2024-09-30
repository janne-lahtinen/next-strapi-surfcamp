import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { formatDate } from "@/utils/strapi.utils";

interface ArticleContent {
  article: {
    headline: string;
    slug: string;
    date: string;
    featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
    imageSrc: string;
    publishedAt: string;
  };
}

const FeaturedArticle: React.FC<ArticleContent> = ({ article }) => {
  return (
    <Link href={`/blog/${article.slug}`} className="featured-items__article">
      <div className="featured-items__article-image">
        <Image
          src={article.imageSrc}
          width={article.featuredImage.data.attributes.width}
          height={article.featuredImage.data.attributes.height}
          alt={`Go read article: ${article.headline}`}
        />
      </div>
      <div className="featured-items__article-text">
        <h5>{article.headline}</h5>
        <p className="copy--small">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
