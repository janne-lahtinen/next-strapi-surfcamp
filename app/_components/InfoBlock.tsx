import Image from "next/image";
import { ReactElement } from "react";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import blockImage from '@/public/assets/tent_view.png';
import BlocksRendererClient from "./BlocksRendererClient";

interface InfoBlockData {
  data: {
    id: number;
    headline: string;
    text: BlocksContent;
    button?: ReactElement;
    image: {
      data: {
        attributes: {
          id: string;
          name: string;
          alternativeText: string | null;
          width: number;
          height: number;
          url: string;
        }
      }
    };
    showImageRight: boolean;
    imageSrc: string;
  }
}

const InfoBlock = ({data}: InfoBlockData) => {
  const { headline, showImageRight, image, imageSrc, text, button } = data;

  let infoImage: ReactElement;
  if (image) {
    infoImage = <Image
      className="info__image"
      src={imageSrc}
      alt={image.data.attributes.alternativeText ? image.data.attributes.alternativeText : ''}
      width={image.data.attributes.width}
      height={image.data.attributes.height}
    />
  } else {
    infoImage = <Image className="info__image" src={blockImage} alt="" />
  }

  return (
    <div className={`info ${showImageRight ? 'info--reversed' : ''}`}>
      {infoImage}
      <div className="info__text">
        <h2 className="info__headline">{headline}</h2>
        <BlocksRendererClient content={text} />
        {button}
      </div>
    </div>
  )
}

export default InfoBlock;
