import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import type { SettingsDocument } from "../../prismicio-types";
import { EggCounter } from "./chaos/EggCounter";
import { AiDisclaimer, SignOff } from "./chaos/FooterJokes";
import { VisitorCounter } from "./chaos/VisitorCounter";

export function Footer({ settings }: { settings: SettingsDocument | null }) {
  return (
    <footer className="site-footer">
      <div className="under-construction">🚧 UNDER CONSTRUCTION SINCE 2019 🚧</div>
      {settings && isFilled.richText(settings.data.footer_text) ? (
        <PrismicRichText field={settings.data.footer_text} />
      ) : (
        <p>© MRS. All rights reversed.</p>
      )}
      <AiDisclaimer />
      <SignOff />
      <p className="made-in">Proudly made in the desert rock region (Paris, France).</p>
      {settings && isFilled.link(settings.data.instagram) ? (
        <PrismicNextLink field={settings.data.instagram} className="insta">
          📸 follow us on the gram
        </PrismicNextLink>
      ) : null}
      <VisitorCounter />
      <EggCounter />
      <p className="netscape">Best viewed in Netscape Navigator 4.0 at 640×480 with the volume at 11.</p>
      <p className="hint">psst… try typing the drummer&rsquo;s name. Or don&rsquo;t. We&rsquo;re a website, not a cop.</p>
    </footer>
  );
}
