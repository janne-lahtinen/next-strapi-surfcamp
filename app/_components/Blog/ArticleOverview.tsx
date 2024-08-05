import Link from "next/link";

interface componentData {
  id: number;
  __component: string;
  headline: string;
  slug: string;
}

interface articleData {
  article: {
    headline: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
    imageSrc: string;
    articleComponents: componentData[];
  }
}

const ArticleOverview = ({ article }: articleData) => {
  const headlines = article.articleComponents.filter(
    (component) => component.__component === 'blog-article.headline'
  )
  
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">In this blog</h3>
        <h5 className="article-overview__excerpt">{article.excerpt}</h5>
      </div>
      <ul className="article-overview__contents">
        {headlines.map((headline, idx) => (
          <Link key={headline.id} href={`#${headline.slug}`}>
            <li>{idx + 1}. {headline.headline}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default ArticleOverview;