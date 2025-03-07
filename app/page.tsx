import { fetchDataFromStrapi, processInfoblocks } from "@/utils/strapi.utils";
import HeroSection from "@/app/_components/HeroSection";
import InfoBlock from "@/app/_components/InfoBlock";
import frontHero from '@/public/assets/front_hero.png';
import BlogPreview from "./_components/BlogPreview/BlogPreview";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { ReactElement } from "react";

interface infoBlockData {
  id: number
  headline: string;
  text: BlocksContent;
  button: ReactElement;
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

export default async function Home() {
  const data = await fetchDataFromStrapi({route: 'infoblocks-landing?populate=deep'});
  const infoBlockData = await processInfoblocks(data);  

  const heroHeadline = (
    <>
      <h1>
        barrel.<br />
        your.<br />
        happiness.<br />
      </h1>
    </>
  );

  return (
    <main>
      <HeroSection headline={heroHeadline} imgSrc={frontHero} />
      {infoBlockData.map((block: infoBlockData) => {
        return <InfoBlock key={block.id} data={block} />
      })}
      <BlogPreview />
    </main>
  );
}

export const revalidate = 300;