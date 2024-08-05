import { type BlocksContent } from '@strapi/blocks-react-renderer';

interface componentData {
  component: {
    id: number;
    __component: string;
    paragraph: BlocksContent;
    isLandscape: boolean;
    imageShowsRight: boolean;
    caption?: string;
    image: { data: { attributes: { url: string; width: number; height: number } } };
  }
}

import Image from "next/image";
import BlocksRendererClient from "../BlocksRendererClient";
import { processImageSource } from "@/utils/strapi.utils";

const ImageTextComponent = ({component}: componentData) => {
  const { paragraph, image, caption, isLandscape, imageShowsRight } = component;  
  
  return (
    <div 
      className={`article-text-image
        ${isLandscape ? '' : 'article-text-image--portrait'} 
        ${imageShowsRight ? '' : 'article-text-image--reverse'}`}
    >
      <div className="article-text-image__text">
        <BlocksRendererClient content={paragraph} />
      </div>
      <div className="article-text-image__container">
        <div className="article-text-image__image">
          <Image src={processImageSource(image.data.attributes.url)} alt="" width={image.data.attributes.width} height={image.data.attributes.height} />
          {caption && <p className="article-text-image__caption copy-small">{caption}</p>}
        </div>
      </div>
    </div>
  )
}

export default ImageTextComponent;