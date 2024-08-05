import SignupForm from "@/app/_components/Event/SignupForm";
import FeaturedItems from "@/app/_components/FeaturedItems/FeaturedItems";
import { fetchAllEvents, fetchDataFromStrapi, fetchIndividualEvent } from "@/utils/strapi.utils";
import { type BlocksContent } from '@strapi/blocks-react-renderer';

interface paramsData {
  params: {
    eventId: string;
  }
}

interface eventData {
  name: string;
  id: number;
  date: string;
  image: { src: string; width: number; height: number };
  imageSrc: string;
  startingDate: string;
  sharedPrice: number;
}

export default async function Event({ params }: paramsData) {
  const { eventId } = params;
  const event = await fetchIndividualEvent(eventId);
  const pricing = {
    singlePrice: event.singlePrice,
    sharedPrice: event.sharedPrice,
  }
  const otherEvents = await fetchAllEvents(eventId);

  return (
    <main className="event-page">
      <SignupForm
        headline={event.name}
        buttonLabel="Sign up"
        infoText={event.description as BlocksContent}
        pricing={pricing}
        eventId={eventId}
      />
      <FeaturedItems headline={'Explore our other events'} items={otherEvents} itemType='event' />
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const events = await fetchDataFromStrapi({route:'events'});
    const slugs = events.map((event: {id: string;}) => {
      eventId: String(event.id);
    })
    return slugs;
  } catch (error) {
    console.log('Error fetching slugs for events.', error);
  }
}

export const revalidate = 300;