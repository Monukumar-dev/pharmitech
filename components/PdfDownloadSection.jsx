"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import TextEffect from "./TextEffect";

const WA_DEFAULT_TEXT = "Hello, I need a quote for a cleanroom project";

const VARIANT_CLASS = {
  primary: "cta-btn cta-btn-primary",
  outline: "cta-btn cta-btn-outline",
  whatsapp: "cta-btn cta-btn-whatsapp",
};

/**
 * Maps API chapter blocks (`new_chapter`, `cta_bottom`, etc.) into CTA props.
 * Expects `{ chapter_info, contact_info }` (or flat `chapter_info` fields on the root).
 */
export function ctaFromNewChapter(chapter) {
  if (!chapter) return null;

  // Backward compatible: nested `chapter_info`, or flat fields on `new_chapter` / `cta_bottom`.
  const ci = chapter.chapter_info ?? chapter;
  const contact = chapter.contact_info;

  if (!ci?.title && !ci?.description && !ci?.document_pdf_url) {
    return null;
  }

  const primaryLabel =
    ci.request_quote_button_name || "List of Clients";

  const buttons = [{ variant: "primary", label: primaryLabel, href: "#" }];

  if (ci.document_pdf_url) {
    buttons.push({
      variant: "outline",
      label: ci.document_download_button_name || "Download Brochure",
      href: ci.document_pdf_url,
      download: true,
      external: true,
      ariaLabel: "Download company brochure PDF",
    });
  }

  if (contact?.whatsapp_number) {
    buttons.push({
      variant: "whatsapp",
      label: ci.whatsapp_button_name || "Connect on WhatsApp",
      href: `https://wa.me/${contact.whatsapp_number}?text=${encodeURIComponent(WA_DEFAULT_TEXT)}`,
      external: true,
    });
  }

  return {
    title: ci.title,
    description: ci.description,
    buttons,
  };
}

function ctaFromHome(homeData) {
  return ctaFromNewChapter(homeData?.new_chapter);
}

/**
 * Universal PDF / CTA band. Same chrome everywhere; only the normalized `cta` payload changes.
 *
 * @param {object|null|undefined} cta — Explicit CTA data. `undefined` = use Redux home `new_chapter`.
 *        Pass `null` to render nothing. Pass an object from `ctaFromNewChapter` or your own matching shape.
 */
export default function PdfDownloadSection({ cta , isBrochureVisible, isWhatsappVisible }) {
  const homeData = useSelector((state) => state.home.homeData);

  const resolved = cta !== undefined ? cta : ctaFromHome(homeData);

  if (resolved == null) return null;
  if (!resolved?.title && !resolved?.description && !resolved?.buttons?.length) {
    return null;
  }

  return (
    <div className="how-it-works pb-0">
      <div className="container-fluid position-relative z-3">
        <div className="callToAction">
          <div className="cta-overlay"></div>
          <div className="cta-content w-75">
            {resolved.title ? (
              <TextEffect
                data-cursor="-opaque"
                className="cta-title text-effect wow fadeInUp"
                as="h1"
                text={resolved.title}
              />
            ) : null}

            {resolved.description ? (
              <p className="cta-text wow fadeInUp" data-wow-delay="0.2s">
                {resolved.description}
              </p>
            ) : null}

            <div className="d-flex flex-wrap gap-3">
              {(resolved.buttons ?? []).map((btn, i) => {
                const className = `${VARIANT_CLASS[btn.variant] ?? VARIANT_CLASS.primary} wow fadeInUp`;
                const delay = btn.wowDelay ?? "0.4s";

                return (
                  <Link
                    key={`${btn.variant}-${btn.href}-${i}`}
                    href={btn.href}
                    className={className}
                    data-wow-delay={delay}
                    {...(btn.download ? { download: true } : {})}
                    {...(btn.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(btn.ariaLabel ? { "aria-label": btn.ariaLabel } : {})}
                  >
                    {btn.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
