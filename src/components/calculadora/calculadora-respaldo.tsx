/* Hallmark · genre: atmospheric · macrostructure: Long Document · design-system: design.md · designed-as-app */
"use client";

import { useMemo, useState } from "react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";

import { BateriaCard, rutaBateria } from "@/components/catalogo/bateria-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATALOGO } from "@/lib/catalogo";
import { WHATSAPP_URL, linkConsulta } from "@/lib/whatsapp";

// Capacidades estándar del mercado (idénticas a legacy/js/main.js).
const SIZES = [5, 7, 9, 12, 18, 26, 35, 40, 55, 65, 75, 100, 120, 150, 200, 250];

// 0.8 = profundidad de descarga recomendada para no acortar la vida de la batería.
const PROFUNDIDAD_DESCARGA = 0.8;

type Resultado = {
  volt: number;
  raw: number;
  size: number | null;
  valor: string;
  nota: string;
  mensaje: string;
};

function calcular(volt: number, watts: number, horas: number): Resultado | null {
  if (!(watts > 0) || !(horas > 0)) return null;

  const raw = (watts * horas) / (volt * PROFUNDIDAD_DESCARGA);
  const size = SIZES.find((s) => s >= raw) ?? null;

  if (size) {
    return {
      volt,
      raw,
      size,
      valor: `${volt}V · ${size} Ah`,
      nota:
        `Batería sellada AGM de ciclo profundo de ${volt} V y al menos ${Math.ceil(raw)} Ah. ` +
        `Te recomendamos la capacidad estándar de ${size} Ah.`,
      mensaje:
        `Hola, usé la calculadora del sitio: necesito una batería de ${volt} V y ${size} Ah aprox. ` +
        `(consumo ${watts} W, ${horas} h de respaldo). ¿Me pueden cotizar?`,
    };
  }

  return {
    volt,
    raw,
    size: null,
    valor: `${volt}V · 250+ Ah`,
    nota:
      "Tu equipo necesita más de 250 Ah: se resuelve con un arreglo de varias baterías. " +
      "Un asesor te arma la configuración.",
    mensaje:
      `Hola, usé la calculadora del sitio: necesito un arreglo de más de 250 Ah en ${volt} V ` +
      `(consumo ${watts} W, ${horas} h de respaldo). ¿Me pueden cotizar?`,
  };
}

const labelClase =
  "font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-ink-2)]";

const campoClase =
  "h-11 bg-[var(--color-paper-3)] border-[var(--border)] text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:border-[var(--color-focus)]";

export function CalculadoraRespaldo() {
  const [volt, setVolt] = useState("12");
  const [watts, setWatts] = useState("100");
  const [horas, setHoras] = useState("4");

  const resultado = useMemo(
    () => calcular(Number(volt), Number(watts), Number(horas)),
    [volt, watts, horas]
  );

  // Modelos reales del catálogo con el mismo voltaje y capacidad suficiente.
  const sugerencias = useMemo(() => {
    if (!resultado) return [];
    const minimo = resultado.raw;
    return CATALOGO.filter((b) => b.volt === resultado.volt && b.ah >= minimo)
      .sort((a, b) => a.ah - b.ah)
      .slice(0, 4);
  }, [resultado]);

  return (
    <div className="space-y-14">
      <form
        className="hm-card p-6 sm:p-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="calcV" className={labelClase}>
              Voltaje del sistema
            </Label>
            <Select value={volt} onValueChange={setVolt}>
              <SelectTrigger id="calcV" className={`w-full ${campoClase}`}>
                <SelectValue placeholder="Voltaje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 V</SelectItem>
                <SelectItem value="12">12 V</SelectItem>
                <SelectItem value="24">24 V</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="calcW" className={labelClase}>
              Consumo (watts)
            </Label>
            <Input
              id="calcW"
              type="number"
              inputMode="numeric"
              min={1}
              max={10000}
              step={1}
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
              className={`${campoClase} font-mono tabular-nums`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calcH" className={labelClase}>
              Horas de respaldo
            </Label>
            <Input
              id="calcH"
              type="number"
              inputMode="decimal"
              min={0.5}
              max={72}
              step={0.5}
              value={horas}
              onChange={(e) => setHoras(e.target.value)}
              className={`${campoClase} font-mono tabular-nums`}
            />
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-6 border-t border-[var(--border)] pt-6 md:flex-row md:items-end md:justify-between"
          aria-live="polite"
        >
          <div className="min-w-0">
            <p className="hm-eyebrow">Batería recomendada</p>
            <p className="mt-3 font-mono text-[clamp(2.25rem,6vw,3.25rem)] leading-none tabular-nums text-[var(--color-accent)]">
              {resultado ? resultado.valor : "— · —"}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-ink-2)]">
              {resultado
                ? resultado.nota
                : "Escribe el consumo y las horas de respaldo para calcular."}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-[var(--color-wa)] px-5 text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              <a
                href={resultado ? linkConsulta(resultado.mensaje) : WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogoIcon weight="fill" data-icon="inline-start" />
                Cotizar esta batería
              </a>
            </Button>
            <p className="mt-2 font-mono text-[0.7rem] text-[var(--color-ink-2)]">
              Cálculo aproximado · un asesor lo confirma
            </p>
          </div>
        </div>
      </form>

      <section>
        <p className="hm-eyebrow">Del catálogo</p>
        <h2 className="hm-display mt-3 text-2xl">Modelos que cumplen</h2>
        {sugerencias.length > 0 ? (
          <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(0,1fr))] sm:grid-cols-2">
            {sugerencias.map((b) => (
              <BateriaCard key={b.id} bateria={b} href={rutaBateria(b)} />
            ))}
          </div>
        ) : (
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-ink-2)]">
            No tenemos un modelo de una sola pieza que cubra esa capacidad en{" "}
            {resultado ? `${resultado.volt} V` : "ese voltaje"}. Escríbenos por
            WhatsApp y te armamos el arreglo con varias baterías.
          </p>
        )}
      </section>
    </div>
  );
}
