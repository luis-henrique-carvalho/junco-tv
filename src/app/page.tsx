import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page").catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page").catch(() => notFound());

  console.log("metadata", page.data);

  const imageUrl = asImageSrc(page.data.meta_image);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: imageUrl ? [{
        url: imageUrl,
        alt: page.data.meta_title || "Junco TV",
        width: 1200,
        height: 630,
        type: "image/jpeg"
      }] : [],
    },
  };
}
