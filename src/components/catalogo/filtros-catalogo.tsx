"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, WhatsappLogo, X } from "@phosphor-icons/react";

import { BateriaCard } from "@/components/catalogo/bateria-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buscar, equivalentes, parseConsulta } from "@/lib/buscar";
import { CATALOGO, MARCAS, type Bateria, type Marca } from "@/lib/catalogo";
import { linkConsulta } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type RangoAh = { id: string; etiqueta: string; min: number; max: number };

const RANGOS_AH: RangoAh[] = [
  { id: "0-10", etiqueta: "Menos de 10 Ah", min: 0, max: 10 },
  { id: "10-40", etiqueta: "10 a 40 Ah", min: 10, max: 40 },
  { id: "40-100", etiqueta: "40 a 100 Ah", min: 40, max: 100 },
  { id: "100+", etiqueta: "100 Ah o más", min: 100, max: Infinity },
];

/** Chip de filtro reutilizable (marca, tipo, rango). */
function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        activo
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function FiltrosCatalogo({ catalogo = CATALOGO }: { catalogo?: Bateria[] }) {
  const [consulta, setConsulta] = useState("");
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [rangos, setRangos] = useState<string[]>([]);

  const tiposDisponibles = useMemo(
    () => Array.from(new Set(catalogo.map((b) => b.tipo))).sort((a, b) => a.localeCompare(b, "es")),
    [catalogo]
  );

  const marcasDisponibles = useMemo(
    () => MARCAS.filter((m) => catalogo.some((b) => b.marca === m)),
    [catalogo]
  );

  const hayFiltros =
    consulta.trim().length > 0 || marcas.length > 0 || tipos.length > 0 || rangos.length > 0;

  const resultados = useMemo(() => {
    // La búsqueda define el orden; los demás filtros solo recortan.
    const base = consulta.trim()
      ? buscar(consulta).filter((b) => catalogo.some((c) => c.id === b.id))
      : catalogo;

    return base.filter((b) => {
      if (marcas.length > 0 && !marcas.includes(b.marca)) return false;
      if (tipos.length > 0 && !tipos.includes(b.tipo)) return false;
      if (rangos.length > 0) {
        const dentro = RANGOS_AH.filter((r) => rangos.includes(r.id)).some(
          (r) => b.ah >= r.min && b.ah < r.max
        );
        if (!dentro) return false;
      }
      return true;
    });
  }, [consulta, catalogo, marcas, tipos, rangos]);

  // Sugerencias cuando la búsqueda no arroja nada: mismo V/Ah que lo que el cliente pidió.
  const sugerencias = useMemo(() => {
    if (resultados.length > 0 || !consulta.trim()) return [];
    const { volt, ah } = parseConsulta(consulta);
    if (ah === undefined) return [];
    const referencia: Bateria = {
      id: "__consulta__",
      marca: "Power-Sonic",
      serie: "",
      modelo: consulta,
      volt: volt ?? 12,
      ah,
      tipo: "",
      medidas: null,
      peso: null,
      terminal: null,
      imagen: null,
      fuente: "",
    };
    return equivalentes(referencia);
  }, [resultados.length, consulta]);

  function alternar<T>(valor: T, lista: T[], set: (v: T[]) => void) {
    set(lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]);
  }

  function limpiar() {
    setConsulta("");
    setMarcas([]);
    setTipos([]);
    setRangos([]);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6 rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Busca por modelo, marca o medida: PS 1270, kaise 100ah, 12v 7ah"
            aria-label="Buscar batería"
            className="h-12 pl-10 text-base"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Marca</p>
          <div className="flex flex-wrap gap-2">
            {marcasDisponibles.map((m) => (
              <Chip key={m} activo={marcas.includes(m)} onClick={() => alternar(m, marcas, setMarcas)}>
                {m}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Tipo</p>
          <div className="flex flex-wrap gap-2">
            {tiposDisponibles.map((t) => (
              <Chip key={t} activo={tipos.includes(t)} onClick={() => alternar(t, tipos, setTipos)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Capacidad
          </p>
          <div className="flex flex-wrap gap-2">
            {RANGOS_AH.map((r) => (
              <Chip
                key={r.id}
                activo={rangos.includes(r.id)}
                onClick={() => alternar(r.id, rangos, setRangos)}
              >
                {r.etiqueta}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-sm text-muted-foreground">
          Mostrando {resultados.length} de {catalogo.length} modelos
        </p>
        {hayFiltros && (
          <Button variant="ghost" size="sm" onClick={limpiar}>
            <X size={16} />
            Limpiar filtros
          </Button>
        )}
      </div>

      {resultados.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resultados.map((b) => (
            <BateriaCard key={b.id} bateria={b} />
          ))}
        </div>
      ) : (
        <div className="space-y-8 rounded-xl border border-dashed border-border bg-card p-6 sm:p-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No encontramos ese modelo</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Manejamos más modelos de los que aparecen en línea. Escríbenos el modelo o el voltaje y
              amperaje que necesitas y te confirmamos si lo tenemos en existencia.
            </p>
          </div>

          {sugerencias.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Equivalentes</Badge>
                <p className="text-sm text-muted-foreground">
                  Mismo voltaje y capacidad similar (±15%)
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sugerencias.map((b) => (
                  <BateriaCard key={b.id} bateria={b} />
                ))}
              </div>
            </div>
          )}

          <Button asChild size="lg">
            <a
              href={linkConsulta(
                consulta.trim()
                  ? `Hola, busco la batería "${consulta.trim()}". ¿La tienen disponible?`
                  : "Hola, busco una batería que no encontré en el catálogo."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={18} weight="fill" />
              Preguntar por WhatsApp
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
