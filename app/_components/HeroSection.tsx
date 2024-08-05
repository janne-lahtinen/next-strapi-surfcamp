import Image from "next/image";
import { StaticImageData } from "next/image";
import { ReactElement } from "react";
import frontHero from '@/public/assets/front_hero.png';
import frontHeroLogo from '@/public/assets/logo.svg';
import Link from "next/link";

interface heroProps {
  imgSrc: StaticImageData;
  headline: ReactElement;
  theme?: string;
}

const HeroSection = ({ imgSrc, headline, theme = "turquoise" }:heroProps ) => {
  
  return (
    <section className='hero'>
      <div className="hero__background">
        <Image src={imgSrc || frontHero} alt="" className="hero__background-image" />
      </div>
      <div className={`hero__headline hero__headline--${theme}`}>
        { headline || <h1>Headline <br />missing</h1> }
      </div>
      <button className={`btn btn--medium btn--${theme}`}>
        <Link href='/events'>BOOK NOW</Link>
      </button>
      <Image
        src={frontHeroLogo}
        alt="logo"
        className={`hero__logo hero__logo--${theme}`}
      />
    </section>
  )
};

export default HeroSection;