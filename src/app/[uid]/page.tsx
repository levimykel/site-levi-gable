import type { Metadata } from "next";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { cacheTagPrismicPages, getPreviewRef } from "@prismicio/next";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default function Page({ params }: PageProps<"/[uid]">) {
	return (
		<Suspense>
			<PageContent params={params} />
		</Suspense>
	);
}

async function PageContent({ params }: Pick<PageProps<"/[uid]">, "params">) {
	const { uid } = await params;
	const page = await getPage(uid, await getPreviewRef());

	return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({ params }: PageProps<"/[uid]">): Promise<Metadata> {
	const { uid } = await params;
	const page = await getPage(uid, await getPreviewRef());

	return {
		title: page.data.meta_title || undefined,
		description: page.data.meta_description || undefined,
		openGraph: page.data.meta_image.url ? { images: [{ url: page.data.meta_image.url }] } : undefined,
	};
}

export async function generateStaticParams() {
	const client = createClient();
	const pages = await client.getAllByType("page");

	return pages.map((page) => ({ uid: page.uid }));
}

async function getPage(uid: string, ref?: string) {
	"use cache";
	cacheLife("max");
	const client = createClient();
	const page = await client.getByUID("page", uid, { ref }).catch(() => notFound());
	cacheTagPrismicPages([page]);
	return page;
}
