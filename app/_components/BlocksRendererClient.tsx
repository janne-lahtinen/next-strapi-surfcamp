'use client';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

export default function BlocksRendererClient({content}: {readonly content: BlocksContent;}) {
  return(
    <BlocksRenderer content={content} blocks={{paragraph: ({ children }) => <p className="copy">{children}</p>}} />
  )
}