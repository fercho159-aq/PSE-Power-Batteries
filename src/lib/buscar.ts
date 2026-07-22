import { CATALOGO, type Bateria } from "@/lib/catalogo";

/** minúsculas y sin acentos */
function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Clave de comparación de modelos: sin acentos, sin espacios, guiones ni puntos.
 * "PS 1270" -> "ps1270", "ps-1270" -> "ps1270".
 */
function clave(s: string): string {
  return normalizar(s).replace(/[^a-z0-9]/g, "");
}

const RE_AH = /(\d+(?:[.,]\d+)?)\s*(?:a\s*\/\s*h|ah|amperes?|amperios?|amperajes?|ampers?|amps?)\b/i;
const RE_VOLT = /(\d+(?:[.,]\d+)?)\s*(?:vcd|vdc|volteos?|voltios?|volts?|v)\b/i;

function aNumero(s: string): number {
  return parseFloat(s.replace(",", "."));
}

export function parseConsulta(q: string): { volt?: number; ah?: number; texto: string } {
  let resto = normalizar(q ?? "");
  let volt: number | undefined;
  let ah: number | undefined;

  // El amperaje se detecta primero: "ah" empieza con "a" y no debe confundirse con "v".
  const mAh = resto.match(RE_AH);
  if (mAh) {
    ah = aNumero(mAh[1]);
    resto = resto.replace(mAh[0], " ");
  }

  const mVolt = resto.match(RE_VOLT);
  if (mVolt) {
    volt = aNumero(mVolt[1]);
    resto = resto.replace(mVolt[0], " ");
  }

  return { volt, ah, texto: resto.replace(/\s+/g, " ").trim() };
}

/** Campos normalizados de una batería, cacheados por id. */
type Indice = { modelo: string; marca: string; serie: string; tipo: string };
const INDICE = new Map<string, Indice>();

function indice(b: Bateria): Indice {
  let i = INDICE.get(b.id);
  if (!i) {
    i = {
      modelo: clave(b.modelo),
      marca: clave(b.marca),
      serie: clave(b.serie),
      tipo: normalizar(b.tipo),
    };
    INDICE.set(b.id, i);
  }
  return i;
}

/**
 * Puntúa la parte textual de la consulta.
 * Devuelve null cuando la batería no corresponde (se descarta del resultado).
 */
function puntuarTexto(b: Bateria, texto: string, laxo = false): number | null {
  if (!texto) return 0;
  const i = indice(b);
  const k = clave(texto);
  if (!k) return 0;

  // Coincidencia de la consulta completa contra el modelo: "ps 1270" -> "ps1270".
  if (i.modelo === k) return 120;
  if (i.modelo.startsWith(k)) return 90;
  if (i.modelo.includes(k)) return 70;
  if (i.marca === k) return 60;

  // Consulta de varias palabras: todas deben coincidir con algún campo.
  const tokens = normalizar(texto).split(/\s+/).filter(Boolean);
  let puntos = 0;
  for (const t of tokens) {
    const kt = clave(t);
    if (!kt) continue;
    let p = 0;
    if (i.modelo === kt) p = 40;
    else if (i.modelo.includes(kt)) p = 25;
    else if (i.marca.includes(kt)) p = 18;
    else if (i.serie === kt) p = 15;
    else if (i.serie.includes(kt)) p = 8;
    else if (i.tipo.includes(t)) p = 5;
    // Modo estricto: todas las palabras deben coincidir. Modo laxo: basta con una.
    if (p === 0 && !laxo) return null;
    puntos += p;
  }
  return puntos > 0 ? puntos : null;
}

function pasada(
  volt: number | undefined,
  ah: number | undefined,
  texto: string,
  laxo: boolean
): Bateria[] {
  const conPuntos: Array<{ b: Bateria; p: number }> = [];

  for (const b of CATALOGO) {
    if (volt !== undefined && Math.abs(b.volt - volt) > 0.5) continue;

    let p = 0;
    if (ah !== undefined) {
      const dif = Math.abs(b.ah - ah);
      const tolerancia = Math.max(ah * 0.15, 0.5);
      if (dif > tolerancia) continue;
      p += dif <= Math.max(ah * 0.02, 0.2) ? 60 : 30;
    }
    if (volt !== undefined) p += 15;

    const pt = puntuarTexto(b, texto, laxo);
    if (pt === null) continue;
    p += pt;

    if (p === 0) continue;
    conPuntos.push({ b, p });
  }

  conPuntos.sort(
    (x, y) =>
      y.p - x.p ||
      x.b.marca.localeCompare(y.b.marca, "es") ||
      x.b.ah - y.b.ah ||
      x.b.modelo.localeCompare(y.b.modelo, "es")
  );

  return conPuntos.map((c) => c.b);
}

export function buscar(q: string): Bateria[] {
  const consulta = (q ?? "").trim();
  if (!consulta) return [...CATALOGO];

  const { volt, ah, texto } = parseConsulta(consulta);
  const estricta = pasada(volt, ah, texto, false);
  if (estricta.length > 0 || !texto) return estricta;

  // Sin resultados exactos: se relaja la consulta a "alguna palabra coincide"
  // para casos como "np 12-7" contra el modelo "NP7 12".
  return pasada(volt, ah, texto, true);
}

/** Mismo voltaje y capacidad dentro de ±15%. Máximo 6 resultados. */
export function equivalentes(b: Bateria, excluirMarca = false): Bateria[] {
  const tolerancia = Math.max(b.ah * 0.15, 0.5);

  return CATALOGO.filter((c) => {
    if (c.id === b.id) return false;
    if (Math.abs(c.volt - b.volt) > 0.5) return false;
    if (Math.abs(c.ah - b.ah) > tolerancia) return false;
    if (excluirMarca && c.marca === b.marca) return false;
    return true;
  })
    .sort(
      (x, y) =>
        Math.abs(x.ah - b.ah) - Math.abs(y.ah - b.ah) ||
        x.marca.localeCompare(y.marca, "es") ||
        x.modelo.localeCompare(y.modelo, "es")
    )
    .slice(0, 6);
}
