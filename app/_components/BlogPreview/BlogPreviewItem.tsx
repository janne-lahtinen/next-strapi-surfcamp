import { formatDate } from "@/utils/strapi.utils";
import Image from "next/image";
import Link from "next/link";

interface articleData {
  article: {
    headline: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
    imageSrc: string;
    isHighlightArticle: boolean;
    slug: string;
  }
}

const BlogPreviewItem = ({article}: articleData) => {  
  return (
    <Link href={`/blog/${article.slug}`} className="blog-preview__item">
      <div className="blog-preview__image">
        <Image src={article.imageSrc} width={article.featuredImage.data.attributes.width} height={article.featuredImage.data.attributes.height} alt="" />
      </div>
      <h5 className="blog-preview__title">
        {article.headline}
      </h5>
      <p className="copy-small">
        {formatDate(article.publishedAt)}
      </p>
    </Link>
  )
}

export default BlogPreviewItem;