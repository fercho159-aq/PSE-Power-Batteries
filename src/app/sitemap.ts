import type { MetadataRoute } from "next";

import { SITIO } from "@/lib/analytics";
import { ARTICULOS } from "@/lib/blog";
import { CATALOGO, MARCAS, MARCA_SLUG, rutaBateria } from "@/lib/catalogo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas: MetadataRoute.Sitemap = [
    { url: SITIO, changeFrequency: "weekly", priority: 1 },
    { url: `${SITIO}/baterias`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITIO}/calculadora`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITIO}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITIO}/tarjeta`, changeFrequency: "monthly", priority: 0.3 },
  ];
  const marcas = MARCAS.map((marca) => ({
    url: `${SITIO}/baterias/${MARCA_SLUG[marca]}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const modelos = CATALOGO.map((b) => ({
    url: `${SITIO}${rutaBateria(b)}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const articulos = ARTICULOS.map((a) => ({
    url: `${SITIO}/blog/${a.slug}`,
    lastModified: a.fecha,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...paginas, ...marcas, ...modelos, ...articulos];
}
