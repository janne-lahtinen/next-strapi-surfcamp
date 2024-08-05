import ArticleHeadline from "./ArticleHeadline";
import ArticleParagraph from "./ArticleParagraph";
import ImageTextComponent from "./ImageTextComponent";
import LandscapeImage from "./LandscapeImage";
import { type BlocksContent } from '@strapi/blocks-react-renderer';


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

const ArticleComponent = ({component}: {component: unionComponent}) => {
  const componentType = component.__component.split('blog-article.')[1];

  const isHeadlineComponent = (component: unionComponent): component is headlineComponent => {
    return component.__component === 'blog-article.headline';
  };
  
  const isParagraphComponent = (component: unionComponent): component is paragraphComponent => {
    return component.__component === 'blog-article.paragraph';
  };
  
  const isImageTextComponent = (component: unionComponent): component is imageTextComponent => {
    return component.__component === 'blog-article.paragraph-with-image';
  };
  
  const isLandscapeImageComponent = (component: unionComponent): component is landscapeImageComponent => {
    return component.__component === 'blog-article.landscape-image';
  };
  
    
  switch (componentType) {
    case 'headline':
      if (isHeadlineComponent(component)) {
        return <ArticleHeadline component={component} />;
      }
    case 'paragraph-with-image':
      if (isImageTextComponent(component)) {
        return <ImageTextComponent component={component} />;
      }
    case 'paragraph':
      if (isParagraphComponent(component)) {
        return <ArticleParagraph component={component} />;
      }
    case 'landscape-image':
      if (isLandscapeImageComponent(component)) {
        return <LandscapeImage component={component} />;
      }
    default:
      return <p>Component not found</p>;
  }
}

export default ArticleComponent;