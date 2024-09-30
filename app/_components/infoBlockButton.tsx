import Link from "next/link";

interface infoBlockButtonData {
  id: number;
  text: string;
  colour: string;
  slug: string;
}

export default function infoBlockButton(buttonData: infoBlockButtonData) {
  return (
    <Link
      href={`/${buttonData.slug}`}
      className={`btn btn--medium btn--${buttonData.colour}`}
    >
      {buttonData.text}
    </Link>
  )
}
