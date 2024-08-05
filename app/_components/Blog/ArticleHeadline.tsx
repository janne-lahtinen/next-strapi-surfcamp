interface componentData {
  component: {
    id: number;
    __component: string;
    headline: string;
    slug: string;
  }
}

const ArticleHeadline = ({ component }: componentData) => {
  return (
    <h3 className="article-headline" id={component.slug}>{component.headline}</h3>
  )
}

export default ArticleHeadline;