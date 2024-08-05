import BlocksRendererClient from "../BlocksRendererClient";
import { type BlocksContent } from '@strapi/blocks-react-renderer';

interface componentData {
  component: {
    id: number;
    __component: string;
    paragraphText: BlocksContent;
  }
}

const ArticleParagraph = ({component}: componentData) => {  
  return (
    <div className="article-paragraph">
      <BlocksRendererClient content={component.paragraphText} />
    </div>
  )
}

export default ArticleParagraph;