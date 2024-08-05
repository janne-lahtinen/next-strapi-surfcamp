import { formatDate } from "@/utils/strapi.utils";
import Image from "next/image";

interface articleData {
  article: {
    headline: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
    imageSrc: string;
  }
}

const ArticleIntro = ({ article }: articleData) => {  
  return (
    <div className="article-intro">
      <div className="article-intro__background">
        <Image src={article.imageSrc} alt="" width={article.featuredImage.data.attributes.width} height={article.featuredImage.data.attributes.height} />
      </div>
      <h3 className="article-intro__headline">{article.headline}</h3>
      <p className="copy-small bold">{formatDate(article.publishedAt)}</p>
      <p className="copy-small">{article.author}</p>
    </div>
  )
}

export default ArticleIntro;