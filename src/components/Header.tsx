import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import type { SettingsDocument } from "../../prismicio-types";
import { Logo } from "./Logo";
import { withCool } from "./CoolAndGood";
import { EggTrigger } from "./chaos/EggTrigger";
import { LanguageSwitcher } from "./chaos/LanguageSwitcher";

const FALLBACK_MARQUEE = [
  "NEW ALBUM NEVER",
  "NOW 40% MORE DISTORTION",
  "LOUD SINCE FOREVER",
  "NICK HAS LOST ANOTHER PICK",
  "TRY TYPING SOMETHING",
];

export function Header({ settings }: { settings: SettingsDocument | null }) {
  const title = settings?.data.site_title || "MRS";
  const marquee = settings?.data.marquee.map((item) => item.text).filter((text) => text) ?? [];
  const items = marquee.length > 0 ? marquee : FALLBACK_MARQUEE;

  return (
    <header className="site-header">
      <div className="header-row">
        <Logo title={title} />
        {settings?.data.tagline ? (
          <p className="tagline">
            <EggTrigger egg="desert">{settings.data.tagline}</EggTrigger>
          </p>
        ) : null}
        <nav>
          <ul>
            {settings?.data.navigation.filter(isFilled.link).map((link) => (
              <li key={link.key ?? link.text}>
                <PrismicNextLink field={link} />
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher />
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...items, ...items, ...items].map((text, i) => (
            <span key={i}>★ {withCool(text ?? "")} </span>
          ))}
        </div>
      </div>
    </header>
  );
}
