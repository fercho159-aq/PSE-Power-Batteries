import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BatteryHighIcon } from "@phosphor-icons/react/dist/ssr";

import { BotonAgregar } from "@/components/carrito/boton-agregar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { rutaBateria, type Bateria } from "@/lib/catalogo";

export { rutaBateria };

export function BateriaCard({ bateria, href }: { bateria: Bateria; href?: string }) {
  const destino = href ?? rutaBateria(bateria);

  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden p-0">
      <Link
        href={destino}
        className="flex flex-1 flex-col gap-4 p-5 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-md bg-white">
          {bateria.imagen ? (
            <Image
              src={bateria.imagen}
              alt={`Batería ${bateria.marca} ${bateria.modelo}`}
              fill
              sizes="(max-width: 640px) 100vw, 300px"
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <BatteryHighIcon size={44} weight="duotone" className="text-muted-foreground/50" />
          )}
        </div>

        <div className="flex items-start justify-between gap-3">
          <Badge variant="secondary" className="uppercase tracking-wide">
            {bateria.marca}
          </Badge>
          <ArrowUpRight
            size={18}
            weight="bold"
            className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl leading-tight font-semibold text-foreground">{bateria.modelo}</h3>
          <p className="font-mono text-lg text-primary">
            {bateria.volt} V <span className="text-muted-foreground">·</span> {bateria.ah} Ah
          </p>
        </div>

        <dl className="mt-auto space-y-1 text-sm text-muted-foreground">
          <div className="flex gap-2">
            <dt className="sr-only">Tipo</dt>
            <dd>{bateria.tipo}</dd>
          </div>
          {bateria.medidas && (
            <div className="flex gap-2">
              <dt className="sr-only">Medidas</dt>
              <dd className="font-mono text-xs">{bateria.medidas}</dd>
            </div>
          )}
          {bateria.peso !== null && (
            <div className="flex gap-2">
              <dt className="sr-only">Peso</dt>
              <dd className="font-mono text-xs">{bateria.peso} kg</dd>
            </div>
          )}
        </dl>
      </Link>

      <div className="border-t border-border p-4">
        <BotonAgregar bateria={bateria} />
      </div>
    </Card>
  );
}
