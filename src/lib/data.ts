import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { cacheTagPrismicPages } from "@prismicio/next";
import { createClient } from "@/prismicio";

export async function getSettings(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const settings = await client.getSingle("settings", { ref }).catch(() => null);
  if (settings) cacheTagPrismicPages([settings]);
  return settings;
}

export async function getEasterEggs(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const eggs = await client.getSingle("easter_eggs", { ref }).catch(() => null);
  if (eggs) cacheTagPrismicPages([eggs]);
  return eggs;
}

export async function getHomepage(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const page = await client.getSingle("homepage", { ref }).catch(() => notFound());
  cacheTagPrismicPages([page]);
  return page;
}

export async function getGigs(ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const gigs = await client.getAllByType("gig", {
    ref,
    orderings: [{ field: "my.gig.date", direction: "desc" }],
  });
  cacheTagPrismicPages(gigs);
  return gigs;
}

export async function getGig(uid: string, ref?: string) {
  "use cache";
  cacheLife("max");
  const client = createClient();
  const gig = await client.getByUID("gig", uid, { ref }).catch(() => notFound());
  cacheTagPrismicPages([gig]);
  return gig;
}
