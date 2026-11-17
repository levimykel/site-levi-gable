import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import type { SettingsDocument } from "../../prismicio-types";
import { EggCounter } from "./chaos/EggCounter";
import { VisitorCounter } from "./chaos/VisitorCounter";

export function Footer({ settings }: { settings: SettingsDocument | null }) {
  return (
    <footer className="site-footer">
      <div className="under-construction">🚧 UNDER CONSTRUCTION SINCE 2019 🚧</div>
      {settings && isFilled.richText(settings.data.footer_text) ? (
        <PrismicRichText field={settings.data.footer_text} />
      ) : (
        <p>© MRS. All rights reversed. No AIs were harmed (several were bullied).</p>
      )}
      {settings && isFilled.link(settings.data.instagram) ? (
        <PrismicNextLink field={settings.data.instagram} className="insta">
          📸 follow us on the gram
        </PrismicNextLink>
      ) : null}
      <VisitorCounter />
      <EggCounter />
      <p className="netscape">Best viewed in Netscape Navigator 4.0 at 640×480 with a Leffe in hand.</p>
      <p className="hint">psst… try typing &ldquo;beer&rdquo;. Or don&rsquo;t. We&rsquo;re a website, not a cop.</p>
    </footer>
  );
}
