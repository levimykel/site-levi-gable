import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { getPreviewRef } from "@prismicio/next";
import { getHomepage } from "@/lib/data";
import { components } from "@/slices";

export default async function Home() {
  const page = await getHomepage(await getPreviewRef());
  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage(await getPreviewRef());
  return {
    title: page.data.meta_title || undefined,
    description: page.data.meta_description || undefined,
    openGraph: page.data.meta_image.url ? { images: [{ url: page.data.meta_image.url }] } : undefined,
  };
}
