import Image from "next/image";
import Link from "next/link";

interface data {
  data: {
    headline: string;
    excerpt: string,
    slug: string;
    featuredImage: { data: { attributes: { url: string; width: number; height: number } } };
    imageSrc: string;
  }
}

const HighlightArticle = ({data}:data) => {
  const { headline, excerpt, slug, imageSrc, featuredImage } = data;

  return (
    <article className="highlight-article">
      <div className="highlight-article__info">
        <h3>{headline}</h3>
        <p className="copy">{excerpt}</p>
        <Link href={`/blog/${slug}`} className="btn btn--medium btn--turquoise">READ MORE</Link>
      </div>
      <Image src={imageSrc} className="highlight-article__image" alt="kukkuu" width={featuredImage.data.attributes.width} height={featuredImage.data.attributes.height} />
    </article>
  )
}

export default HighlightArticle;
