import { processImageSource } from "@/utils/strapi.utils";
import Image from "next/image";

interface componentData {
  component: {
    caption?: string;
    landscapeImage: { data: { attributes: { url: string; width: number; height: number } } };
  }
}

const LandscapeImage = ({component}: componentData) => {
  const { landscapeImage, caption } = component;
  
  return (
    <div className="article-landscape-image">
      <Image src={processImageSource(landscapeImage.data.attributes.url)} alt="" width={landscapeImage.data.attributes.width} height={landscapeImage.data.attributes.height} />
      {caption && <p className="article-landscape-image__caption copy-small">{caption}</p>}
    </div>
  )
}

export default LandscapeImage;