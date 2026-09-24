// Registro del blog. Cada nota vive en src/content/blog/<slug>.tsx y exporta
// un `Articulo`; para publicar una nueva basta con agregarla a ARTICULOS.

import type { ComponentType } from "react";

import { articulo as bateriasSelladasCdmx } from "@/content/blog/baterias-selladas-cdmx";
import { articulo as comoProlongarVidaUtilBateria } from "@/content/blog/como-prolongar-vida-util-bateria";
import { articulo as elegirBateriasAgmRespaldoConfiables } from "@/content/blog/elegir-baterias-agm-respaldo-confiables";

export type PreguntaFrecuente = { pregunta: string; respuesta: string };

export type Articulo = {
  slug: string;
  titulo: string;
  /** Meta description: 140–160 caracteres, incluye la palabra clave. */
  descripcion: string;
  palabraClave: string;
  /** ISO yyyy-mm-dd */
  fecha: string;
  categoria: string;
  minutosLectura: number;
  imagen: { src: string; alt: string };
  Contenido: ComponentType;
  /** Se muestran al final y se publican como FAQPage en JSON-LD. */
  preguntas?: PreguntaFrecuente[];
};

export const ARTICULOS: Articulo[] = [elegirBateriasAgmRespaldoConfiables, comoProlongarVidaUtilBateria, bateriasSelladasCdmx].sort((a, b) =>
  b.fecha.localeCompare(a.fecha)
);

export function buscarArticulo(slug: string): Articulo | undefined {
  return ARTICULOS.find((a) => a.slug === slug);
}

export function formatearFecha(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
