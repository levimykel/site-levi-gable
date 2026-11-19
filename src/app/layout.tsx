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
import { isFilled } from "@prismicio/client";
import { PrismicPreview, getPreviewRef } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { getEasterEggs, getSettings } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChaosLayer } from "@/components/chaos/ChaosLayer";
import { Shouts } from "@/components/chaos/Shouts";
import { HiddenPick } from "@/components/chaos/HiddenPick";
import { BeerPolicy } from "@/components/chaos/BeerPolicy";
import "./globals.css";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});
const typewriter = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
});
const wetPaint = Rubik_Wet_Paint({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-wet",
});
const comic = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
});
const shade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shade",
});
const metal = Metal_Mania({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-metal",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings(await getPreviewRef());
  const siteTitle = settings?.data.site_title || "MRS";
  return {
    title: {
      default: settings?.data.meta_title || siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: settings?.data.meta_description || undefined,
    icons: { icon: "/mrs-logo.jpg" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={[marker, typewriter, wetPaint, comic, shade, metal].map((f) => f.variable).join(" ")}>
      <body>
        <Suspense fallback={<div className="site-header-fallback">MRS</div>}>
          <SettingsHeader />
        </Suspense>
        <main className="tilt-zone">{children}</main>
        <Suspense>
          <SettingsFooter />
        </Suspense>
        <HiddenPick />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

async function SettingsHeader() {
  const ref = await getPreviewRef();
  const [settings, easterEggs] = await Promise.all([getSettings(ref), getEasterEggs(ref)]);
  const data = settings?.data;
  return (
    <>
      <Header settings={settings} />
      <ChaosLayer
        awayTitles={data?.away_titles.map((t) => t.text ?? "").filter(Boolean) ?? []}
        labels={{
          mosh: data?.mosh_label ?? "",
          drunk: data?.drunk_label ?? "",
          sober: data?.sober_label ?? "",
          soberOn: data?.sober_on_message ?? "",
          soberOff: data?.sober_off_message ?? "",
        }}
        eggs={
          easterEggs?.data.eggs.flatMap(({ egg, name, messages }) =>
            egg
              ? [
                  {
                    egg,
                    name: name ?? "",
                    messages: messages.map((m) => ("text" in m ? m.text : "")).filter(Boolean),
                  },
                ]
              : [],
          ) ?? []
        }
      />
      <Shouts
        shouts={
          settings?.data.shouts.flatMap((s) =>
            s.text && isFilled.image(s.image) ? [{ name: s.name ?? "", text: s.text, image: s.image }] : [],
          ) ?? []
        }
      />
    </>
  );
}

async function SettingsFooter() {
  const settings = await getSettings(await getPreviewRef());
  const data = settings?.data;
  return (
    <>
      <Footer settings={settings} />
      <BeerPolicy
        text={{
          text: data?.cookie_text ?? "",
          textAgain: data?.cookie_text_again ?? "",
          accept: data?.cookie_accept ?? "",
          alsoAccept: data?.cookie_also_accept ?? "",
          decline: data?.cookie_decline ?? "",
          declineMessage: data?.cookie_decline_message ?? "",
        }}
      />
    </>
  );
}
