import Link from "next/link";

interface infoBlockButton {
  id: number;
  text: string;
  colour: string;
  slug: string;
}

export default function infoBlockButton(buttonData: infoBlockButton) {
  return (
    <Link 
    href={`/${buttonData.slug}`}
    className={`btn btn--medium btn--${buttonData.colour}`}
  >
    {buttonData.text}
  </Link>
  )
}