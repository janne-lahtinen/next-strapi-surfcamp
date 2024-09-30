import HighlightArticle from "@/app/_components/Blog/HighlightArticle";
import SubscribeToNewsletter from "@/app/_components/Blog/SubscribeToNewsletter";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import { fetchBlogArticles } from "@/utils/strapi.utils";

interface blogAttributes {
  headline: string;
  excerpt: string;
  featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
  slug: string;
  author: string;
  isHighlightArticle: boolean;
  publishedAt: string;
  imageSrc: string;
}

export default async function Blog() {
  const data = await fetchBlogArticles();
  const highlightArticle = data.find((article: blogAttributes) => article.isHighlightArticle);
  const featuredArticles = data.filter((article: blogAttributes) => !article.isHighlightArticle);

  return (
    <main className="blog-page">
      <HighlightArticle data={highlightArticle} />
      <SubscribeToNewsletter />
      <FeaturedItems headline={null} items={featuredArticles} itemType={'article'} />
    </main>
  );
}

export const revalidate = 300;
