import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Bungee_Shade,
  Comic_Neue,
  Metal_Mania,
  Permanent_Marker,
  Rubik_Wet_Paint,
  Special_Elite,
} from "next/font/google";
import { PrismicPreview, getPreviewRef } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { getSettings } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChaosLayer } from "@/components/chaos/ChaosLayer";
import { HiddenHenry } from "@/components/chaos/HiddenHenry";
import { BeerPolicy } from "@/components/chaos/BeerPolicy";
import "./globals.css";

const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker" });
const typewriter = Special_Elite({ weight: "400", subsets: ["latin"], variable: "--font-typewriter" });
const wetPaint = Rubik_Wet_Paint({ weight: "400", subsets: ["latin"], variable: "--font-wet" });
const comic = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-comic" });
const shade = Bungee_Shade({ weight: "400", subsets: ["latin"], variable: "--font-shade" });
const metal = Metal_Mania({ weight: "400", subsets: ["latin"], variable: "--font-metal" });

export const metadata: Metadata = {
  title: { default: "MRS — loud, home-brewed, slightly sticky", template: "%s | MRS" },
  description: "MRS is a rock / grunge / punk band from Paris that brews beer and makes AI slop.",
  icons: { icon: "/legacy/henry.jpg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={[marker, typewriter, wetPaint, comic, shade, metal].map((f) => f.variable).join(" ")}
    >
      <body>
        <Suspense fallback={<div className="site-header-fallback">MRS</div>}>
          <SettingsHeader />
        </Suspense>
        <main className="tilt-zone">{children}</main>
        <Suspense>
          <SettingsFooter />
        </Suspense>
        <HiddenHenry />
        <BeerPolicy />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

async function SettingsHeader() {
  const settings = await getSettings(await getPreviewRef());
  return (
    <>
      <Header settings={settings} />
      <ChaosLayer awayTitles={settings?.data.away_titles.map((t) => t.text ?? "").filter(Boolean) ?? []} />
    </>
  );
}

async function SettingsFooter() {
  const settings = await getSettings(await getPreviewRef());
  return <Footer settings={settings} />;
}
