import ArticleComponent from "@/app/_components/Blog/ArticleComponent";
import ArticleIntro from "@/app/_components/Blog/ArticleIntro";
import ArticleOverview from "@/app/_components/Blog/ArticleOverview";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import { fetchBlogArticles, fetchDataFromStrapi } from "@/utils/strapi.utils"
import { type BlocksContent } from '@strapi/blocks-react-renderer';

interface paramsData {
  params: {
    article: string;
  }
}

interface articleData {
  slug: string;
}

interface rawArticleData {
  attributes: {
    slug: string;
  }
}

interface basicComponent {
  id: number;
  __component: string;
}

interface headlineComponent extends basicComponent {
  headline: string;
  slug: string;
}

interface paragraphComponent extends basicComponent {
  paragraphText: BlocksContent;
}

interface imageTextComponent extends basicComponent {
  isLandscape: boolean;
  imageShowsRight: boolean;
  image: { data: { attributes: { url: string; width: number; height: number } } };
  paragraph: BlocksContent;
  caption?: string;
}

interface landscapeImageComponent extends basicComponent {
  caption?: string;
  landscapeImage: { data: { attributes: { url: string; width: number; height: number } } };
}

type unionComponent = headlineComponent | paragraphComponent | imageTextComponent | landscapeImageComponent;

export default async function Article({ params }: paramsData) {
  const { article: slug } = params;
  const articles = await fetchBlogArticles();
  const article = articles.find((article: articleData) => article.slug === slug);
  const moreArticles = articles.filter((article: articleData) => article.slug !== slug); 
  
  return (
    <main>
      <ArticleIntro article={article} />
      <section className="article-section">
        <ArticleOverview article={article} />
        {article.articleComponents.map((component: unionComponent) => (
          <ArticleComponent key={component.id} component={component} />
        ))}
        <FeaturedItems items={moreArticles} headline={'Explore our other articles'} itemType="article" />
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const articles = await fetchDataFromStrapi({route:'blog-articles'});

    return articles.map((article: rawArticleData) => ({
      article: article.attributes.slug,
    }))
  } catch (error) {
    console.log('Error fetching slugs for articles.', error);
  }
}

export const revalidate = 300;