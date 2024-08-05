import { fetchBlogArticles } from "@/utils/strapi.utils";
import BlogPreviewItem from "./BlogPreviewItem";

interface articleData {
  headline: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
  imageSrc: string;
  isHighlightArticle: boolean;
  slug: string;
}

const BlogPreview = async () => {
  const data = await fetchBlogArticles();
  const highlightArticle = data.find((article: articleData) => article.isHighlightArticle);
  const recentArticles = data.filter((article: articleData) => !article.isHighlightArticle).slice(0, 3);
  const articlesToDisplay = [highlightArticle, ...recentArticles];

  return (
    <div className="blog-preview">
      <h2 className="blog-preview__headline">the blog.</h2>
      <div className="blog-preview__container">
        {articlesToDisplay.map((article) => <BlogPreviewItem key={article.id} article={article} />)}
      </div>
    </div>
  )
}

export default BlogPreview;