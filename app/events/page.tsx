import { type BlocksContent } from '@strapi/blocks-react-renderer';
import SignupForm from "../_components/Event/SignupForm";
import { fetchAllEvents } from '@/utils/strapi.utils';
import FeaturedItems from '../_components/FeaturedItems/FeaturedItems';

export default async function Events() {
  const allEvents = await fetchAllEvents();
  
  const headline = 'You want to stay tuned for our events?';
  const infoText = (
    [
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "Staying in touch with our website is your ticket to catching the wave of exciting upcoming events at our surfing school! By subscribing to our updates, you'll be the first to know about:"
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "🏄‍♂️ Epic Surf Sessions: Get the scoop on our thrilling surf lessons, workshops, and camps designed for surfers of all levels, from beginners to advanced riders."
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "🌊 Surfing Competitions: Stay informed about local and regional surf competitions, where you can witness top talent and even participate if you're up for the challenge."
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "🏝️ Surf Retreats: Discover exclusive surf retreats in breathtaking locations, perfect for a rejuvenating getaway that combines surfing and relaxation."
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "📅 Event Calendar: Our website keeps you up-to-date with a comprehensive event calendar, so you never miss a single opportunity to ride the waves."
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "🤙 Special Offers: Be the first to access special offers, discounts, and promotions for our surfing programs and gear."
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', 
            text: "Join our surfing community by staying connected through our website, and be ready to dive into the world of thrilling waves, endless adventures, and unforgettable memories!"
          }
        ],
      },
    ]
  ) as BlocksContent;

  return (
    <main className="events-page">
      <SignupForm infoText={infoText} headline={headline} />
      <FeaturedItems headline={'Upcoming camps & events'} items={allEvents} itemType='event' />
    </main>
  )
}