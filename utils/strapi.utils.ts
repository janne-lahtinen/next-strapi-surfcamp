import axios from "axios";
import infoBlockButton from "../app/_components/infoBlockButton";
import * as qs from 'qs';
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { ReactElement } from "react";

const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';

interface fetchDataRoute {
  route: string;
}

interface infoBlockAttributes {
  headline: string;
  text: object[];
  showImageRight: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: { data: { attributes: { url: object } } };
  button: infoBlockButton;
}

interface infoBlockData {
  id: number;
  attributes: infoBlockAttributes;
}

interface infoBlockButton {
  id: number;
  text: string;
  colour: string;
  slug: string;
}

interface blogAttributes {
  headline: string;
  excerpt: string;
  featuredImage: { data: { attributes: { url: object } } };
  slug: string;
  author: string;
  isHighlightArticle: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface articleData {
  id: number;
  attributes: blogAttributes;
}

interface eventAttributes {
  name: string;
  description: object[],
  startingDate: string;
  endDate: string;
  singlePrice: number,
  sharedPrice: number,
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    data: [
      {
        attributes: {
          url: object;
          width: number;
          height: number;
        }
      }]
  };
}

interface eventData {
  id: number;
  attributes: eventAttributes;
}

interface formData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

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

interface infoBlockRawData {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    info_blocks: {
      data: infoBlockData[];
    }
  }
}

type queryType = { [key: string]: object }

interface Filters {
  startingDate: {
    $gt: Date;
  };
  id?: {
    $ne: string;
  };
}

interface QueryObject {
  pagination: {
    start: number;
    limit: number;
  };
  sort: string[];
  filters: Filters;
  populate: {
    image: {
      populate: string;
    };
  };
}

export async function fetchDataFromStrapi({ route }: fetchDataRoute) {
  const url = `${BASE_URL}/api/${route}`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Could not fetch data from ${url}`);
  }
}

export function processImageSource(url: string) {
  return BASE_URL + url;
}

export async function processInfoblocks(data: infoBlockRawData) {
  const infoBlocksRaw = data.attributes.info_blocks.data;
  return infoBlocksRaw.map((infoblock: any) => ({ // Todo: change type
    ...infoblock.attributes,
    imageSrc: BASE_URL + infoblock.attributes.image?.data?.attributes?.url,
    id: infoblock.id,
    button: createInfoBlockButton(infoblock.attributes.button)
  }));
}

function createInfoBlockButton(buttonData: infoBlockButton) {
  if (!buttonData) {
    return null;
  }

  return (
    infoBlockButton(buttonData)
  )
}

export async function fetchBlogArticles() {
  const blogData = await fetchDataFromStrapi({ route: 'blog-articles?populate=deep' });

  const processedBlogArticles = blogData.map(processBlogArticle);

  processedBlogArticles.sort(
    (a: blogAttributes, z: blogAttributes) => {
      if (new Date(a.publishedAt) > new Date(z.publishedAt)) {
        return 1;
      }
      if (new Date(a.publishedAt) < new Date(z.publishedAt)) {
        return -1;
      }
      return 0;
    }
  );

  return processedBlogArticles;
}

function processBlogArticle(article: articleData) {
  return {
    ...article.attributes,
    id: article.id,
    imageSrc: BASE_URL + article.attributes.featuredImage?.data?.attributes?.url,
  };
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  } as const
  return date.toLocaleDateString('en-US', options);
}

export async function fetchIndividualEvent(eventId: string) {
  const response = await axios.get(`${BASE_URL}/api/events/${eventId}`);
  return processEventData(response.data.data);
}

export function processEventData(event: eventData) {
  return {
    ...event.attributes,
    id: event.id,
    image: {
      src: BASE_URL + event.attributes.image?.data[0]?.attributes?.url,
      width: event.attributes.image?.data[0]?.attributes?.width,
      height: event.attributes.image?.data[0]?.attributes?.height,
    }
  }
}

export function generateSignupPayload(formData: formData, eventId: string | null) {
  if (!eventId) {
    return {
      data: { ...formData, isGeneralInterest: true }
    }
  } else {
    return {
      data: {
        ...formData,
        event: {
          "connect": [eventId],
        }
      }
    }
  }
}

export async function fetchAllEvents(eventIdToExclude: string | null = null) {
  const query = createEventQuery(eventIdToExclude);

  const response = await axios.get(
    `${BASE_URL}/api/events?${query}`
  );

  return response.data.data.map((event: eventData) => processEventData(event));
}

function createEventQuery(eventIdToExclude: string | null = null) {
  const queryObject: QueryObject = {
    pagination: {
      start: 0,
      limit: 12,
    },
    sort: ['startingDate:asc'],
    filters: {
      startingDate: {
        $gt: new Date(),
      },
    },
    populate: {
      image: {
        populate: '*'
      }
    }
  };

  if (eventIdToExclude) {
    queryObject.filters.id = {
      $ne: eventIdToExclude,
    }
  }

  return qs.stringify(queryObject, {
    encodeValuesOnly: true, // prettify URL
  });
}
