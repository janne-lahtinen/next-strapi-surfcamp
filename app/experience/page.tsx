import { fetchDataFromStrapi, processInfoblocks } from "@/utils/strapi.utils";
import HeroSection from "@/app/_components/HeroSection";
import InfoBlock from "@/app/_components/InfoBlock";
import experienceHero from '@/public/assets/experience_hero.png';
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { ReactElement } from "react";

interface infoBlockData {
  headline: string;
  text: BlocksContent;
  showImageRight: boolean;
  publishedAt: string;
  image: {
    data: {
      id: number;
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
  button?: ReactElement;
  imageSrc: string;
  id: number;
}

export default async function Experience() {
  const heroHeadline = (
    <>
      <h1>
        barrel.<br />
        your.<br />
        happiness.<br />
      </h1>
    </>
  );

  const data = await fetchDataFromStrapi({ route: 'infoblocks-experience?populate=deep' });
  const infoBlockData = await processInfoblocks(data);  

  return (
    <main>
      <HeroSection headline={heroHeadline} imgSrc={experienceHero} theme="orange" />
      {infoBlockData.map((data: infoBlockData) => (
        <InfoBlock key={data.id} data={data} />
      ))}
    </main>
  );
}

export const revalidate = 300;