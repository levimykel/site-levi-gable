import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import type { SettingsDocument } from "../../prismicio-types";
import { splitHidden } from "@/lib/hidden";
import { EggCounter } from "./chaos/EggCounter";
import { AiDisclaimer } from "./chaos/FooterJokes";
import { EggTrigger } from "./chaos/EggTrigger";
import { withCool } from "./CoolAndGood";
import { VisitorCounter } from "./chaos/VisitorCounter";

export function Footer({ settings }: { settings: SettingsDocument | null }) {
  const data = settings?.data;
  const madeIn = data?.made_in ? splitHidden(data.made_in) : null;

  return (
    <footer className="site-footer">
      {data?.under_construction ? <div className="under-construction">{data.under_construction}</div> : null}
      {data && isFilled.richText(data.footer_text) ? <PrismicRichText field={data.footer_text} /> : null}
      {data?.ai_disclaimer ? <AiDisclaimer text={data.ai_disclaimer} /> : null}
      {data?.sign_off ? <p className="sign-off">{withCool(data.sign_off)}</p> : null}
      {data?.made_in ? (
        <p className="made-in">
          {madeIn ? (
            <>
              {madeIn.before}
              <EggTrigger egg="desert">{madeIn.hidden}</EggTrigger>
              {madeIn.after}
            </>
          ) : (
            data.made_in
          )}
        </p>
      ) : null}
      {data && isFilled.link(data.instagram) ? (
        <PrismicNextLink field={data.instagram} className="insta">
          {data.instagram_label || data.instagram.text}
        </PrismicNextLink>
      ) : null}
      <VisitorCounter label={data?.visitor_label ?? ""} />
      <EggCounter label={data?.egg_counter_label ?? ""} />
      {data?.netscape ? <p className="netscape">{data.netscape}</p> : null}
      {data?.hint ? <p className="hint">{data.hint}</p> : null}
    </footer>
  );
}
