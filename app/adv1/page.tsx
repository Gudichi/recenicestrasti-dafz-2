import Image from "next/image";
import styles from "./Adv1.module.css";
import { rawAdvertorial } from "./content";

function AsSeenIn() {
  const brands = ["24sata.hr", "Jutarnji.hr", "Index Rouge", "Lepa & Srećna"];

  return (
    <section className={styles.asSeenWrap} aria-label="Viđeno u medijima">
      <div className={styles.asSeenHeader}>
        <span className={styles.ruleLeft} aria-hidden="true" />
        <span className={styles.asSeenLabel}>Viđeno u medijima</span>
        <span className={styles.ruleRight} aria-hidden="true" />
      </div>

      <div className={styles.asSeenBox}>
        <ul className={styles.brandList}>
          {brands.map((brand) => (
            <li key={brand} className={styles.brandItem}>
              <span className={styles.brandText} aria-label={brand}>
                {brand}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function normalizeAdvertorialHTML(raw: string): string {
  let html = raw.trim();

  html = html.replace(/<u>([\s\S]*?)<\/u>/gi, '<span class="u">$1</span>');

  html = html.replace(/<b>/gi, "<strong>").replace(/<\/b>/gi, "</strong>");
  html = html.replace(/<i>/gi, "<em>").replace(/<\/i>/gi, "</em>");

  html = html.replace(
    /<(h[1-3][^>]*)>([\s\S]*?)<\/h[1-3]>/gi,
    (_, openTag: string, inner: string) => {
      const cleaned = inner.replace(/<\/?strong>/gi, "").replace(/<\/?em>/gi, "");
      const level = openTag.match(/h([1-3])/i)?.[1] ?? "1";
      return `<${openTag}>${cleaned}</h${level}>`;
    }
  );

  html = html
    .replace(
      /<strong>\s*(<em>[\s\S]*?<\/em>)\s*<\/strong>/gi,
      (_, inner: string) => inner
    )
    .replace(
      /<em>\s*(<strong>[\s\S]*?<\/strong>)\s*<\/em>/gi,
      (_, inner: string) => inner
    );

  html = html.replace(
    /(?:^|\n)([^<\n][^\n]*)(?=\n|$)/g,
    (match: string, line: string) => {
      if (/^\s*$/.test(line)) return match;
      if (/^\s*(<|#|[-*]>?)/.test(line.trim())) return match;
      const trimmed = line.trim();
      if (!trimmed) return match;
      return `\n<p>${trimmed}</p>`;
    }
  );

  return html;
}

function convertQuotesToBlockquotes(html: string): string {
  return html.replace(
    /<p([^>]*)>([\s\S]*?)<\/p>/gi,
    (match: string, attrs: string, content: string) => {
      const text = content.trim();
      const isQuote =
        (/^["“”„][\s\S]*["””„]$/.test(text) && text.length > 2) ||
        /^&ldquo;[\s\S]*&rdquo;$/.test(text);

      if (!isQuote) {
        return match;
      }

      const stripped = text.replace(/^["“”„]+|["””„]+$/g, "").trim();
      const final = stripped.length > 0 ? stripped : text;
      return `<blockquote>${final}</blockquote>`;
    }
  );
}

function limitEmphasisPerParagraph(html: string): string {
  return html.replace(
    /<p\b([^>]*)>([\s\S]*?)<\/p>/gi,
    (match: string, attrs: string, inner: string) => {
      let strongCount = 0;
      let emCount = 0;

      const strongLimited = inner.replace(
        /<strong>([\s\S]*?)<\/strong>/gi,
        (full: string, content: string) => {
          strongCount += 1;
          return strongCount <= 2 ? full : content;
        }
      );

      const emLimited = strongLimited.replace(
        /<em>([\s\S]*?)<\/em>/gi,
        (full: string, content: string) => {
          emCount += 1;
          return emCount <= 2 ? full : content;
        }
      );

      return `<p${attrs}>${emLimited}</p>`;
    }
  );
}

function addLeadToFirstParagraphs(html: string, limit = 3): string {
  let leadCount = 0;
  return html.replace(/<p\b([^>]*)>/gi, (match: string, attrs: string) => {
    if (leadCount >= limit) return match;
    leadCount += 1;

    if (/\bclass\s*=/.test(attrs)) {
      return match.replace(
        /\bclass\s*=\s*["']([^"']*)["']/,
        (_, classNames: string) => {
          const merged = new Set(classNames.split(/\s+/).filter(Boolean));
          merged.add("lead");
          return `class="${Array.from(merged).join(" ")}"`;
        }
      );
    }

    const trimmed = attrs.trim();
    const space = trimmed.length > 0 ? ` ${trimmed}` : "";
    return `<p class="lead"${space}>`;
  });
}

function processAdvertorial(raw: string): string {
  const normalized = normalizeAdvertorialHTML(raw);
  const blockquotes = convertQuotesToBlockquotes(normalized);
  const limited = limitEmphasisPerParagraph(blockquotes);
  return addLeadToFirstParagraphs(limited);
}

const processedHtml = processAdvertorial(rawAdvertorial);

export default function AdvertorialPage() {
  return (
    <main className={styles.wrapper}>
      <article className={styles.article}>
        <header className={styles.hero}>
          <div className={styles.heroImageWrap}>
            <Image
              src="/gif-1.gif"
              alt="Gif prikaz aplikacije koja šalje dnevne zadatke"
              width={1280}
              height={860}
              className={styles.heroImage}
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              unoptimized
            />
          </div>
          <p className={styles.heroCaption}>
            Svakog jutra otvorim aplikaciju, dobijem konkretne korake i znam
            točno što je sljedeće.
          </p>
        </header>

        <AsSeenIn />

        <h1 className={styles.headline}>
          I tako sam počela koristiti aplikaciju koja ti svaki dan kaže što da
          napraviš — i gdje.
        </h1>
        <div
          className={styles.bodyText}
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </article>
    </main>
  );
}
