/* Hallmark · genre: editorial · page: artículo (Long Document) · design-system: design.md */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaretRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
import { SITIO } from "@/lib/analytics";
import { ARTICULOS, buscarArticulo, formatearFecha } from "@/lib/blog";
import { linkConsulta } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = buscarArticulo(slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.descripcion,
    keywords: [a.palabraClave],
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titulo,
      description: a.descripcion,
      url: `/blog/${a.slug}`,
      publishedTime: a.fecha,
      images: [{ url: a.imagen.src, alt: a.imagen.alt }],
    },
  };
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const a = buscarArticulo(slug);
  if (!a) notFound();

  const url = `${SITIO}/blog/${a.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.titulo,
      description: a.descripcion,
      keywords: a.palabraClave,
      datePublished: a.fecha,
      image: `${SITIO}${a.imagen.src}`,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "PSE Power Batteries", url: SITIO },
      publisher: {
        "@type": "Organization",
        name: "PSE Power Batteries",
        logo: { "@type": "ImageObject", url: `${SITIO}/media/logo-pse-hex.png` },
      },
    },
    ...(a.preguntas?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: a.preguntas.map((p) => ({
              "@type": "Question",
              name: p.pregunta,
              acceptedAnswer: { "@type": "Answer", text: p.respuesta },
            })),
          },
        ]
      : []),
  ];

  const { Contenido } = a;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav
        aria-label="Ruta de navegación"
        className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-ink-2)]"
      >
        <Link href="/blog" className="hover:text-[var(--color-ink)]">
          Blog
        </Link>
        <CaretRightIcon className="size-3" aria-hidden />
        <span className="text-[var(--color-ink)]">{a.categoria}</span>
      </nav>

      <header className="mt-6">
        <h1 className="hm-display text-[clamp(2rem,5vw,3rem)]">{a.titulo}</h1>
        <p className="mt-4 font-mono text-xs text-[var(--color-ink-2)]">
          <time dateTime={a.fecha}>{formatearFecha(a.fecha)}</time> ·{" "}
          {a.minutosLectura} min de lectura · PSE Power Batteries
        </p>
      </header>

      <div className="hm-plate relative mt-8 aspect-[16/9] overflow-hidden">
        <Image
          src={a.imagen.src}
          alt={a.imagen.alt}
          fill
          priority
          sizes="(min-width: 768px) 720px, 100vw"
          className="object-contain p-6"
        />
      </div>

      <div className="hm-prosa mt-10">
        <Contenido />
      </div>

      {a.preguntas?.length ? (
        <section
          aria-labelledby="preguntas"
          className="mt-12 border-t border-[var(--color-rule)] pt-10"
        >
          <h2
            id="preguntas"
            className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]"
          >
            Preguntas frecuentes
          </h2>
          <dl className="mt-6 flex flex-col gap-6">
            {a.preguntas.map((p) => (
              <div key={p.pregunta}>
                <dt className="font-semibold text-[var(--color-ink)]">{p.pregunta}</dt>
                <dd className="mt-2 text-[var(--color-ink-2)]">{p.respuesta}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <aside className="hm-card mt-12 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--color-ink)]">
            ¿No sabes qué batería necesitas?
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-2)]">
            Mándanos una foto de la etiqueta y te cotizamos sin costo.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-[var(--color-wa)] text-[var(--color-wa-ink)] hover:bg-[var(--color-wa)]/90"
        >
          <a
            href={linkConsulta(`Leí la nota "${a.titulo}" y quiero cotizar una batería.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappLogoIcon weight="fill" />
            Cotizar por WhatsApp
          </a>
        </Button>
      </aside>
    </article>
  );
}
