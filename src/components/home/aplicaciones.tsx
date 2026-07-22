import {
  CellTowerIcon,
  FirstAidKitIcon,
  SirenIcon,
  WheelchairIcon,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react/lib";

type App = { icono: Icon; tag: string; titulo: string; texto: string };

// Copys de legacy/index.html (sección #aplicaciones), reducidos a una línea.
const APPS: App[] = [
  {
    icono: FirstAidKitIcon,
    tag: "Equipo médico",
    titulo: "Encendido continuo",
    texto: "Larga vida para monitoreo y equipo hospitalario que no admite cortes.",
  },
  {
    icono: SirenIcon,
    tag: "Emergencia",
    titulo: "Iluminación y seguridad",
    texto: "Alarmas e iluminación que responden cuando falla la red.",
  },
  {
    icono: CellTowerIcon,
    tag: "Telecom",
    titulo: "Ciclo profundo",
    texto: "Respaldo para radiobases e infraestructura de red.",
  },
  {
    icono: WheelchairIcon,
    tag: "Movilidad",
    titulo: "Sillas y scooters",
    texto: "Carritos eléctricos, scooters y vehículos ligeros.",
  },
];

export function Aplicaciones() {
  return (
    <section className="border-t border-border bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Aplicaciones</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            La batería para el uso que necesitas
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {APPS.map((a) => {
            const Icono = a.icono;
            return (
              <article key={a.tag} className="border border-border bg-card p-6">
                <span className="inline-flex size-10 items-center justify-center bg-primary/10 text-primary">
                  <Icono size={22} weight="regular" />
                </span>
                <p className="mt-5 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {a.tag}
                </p>
                <h3 className="mt-1 text-base font-semibold text-card-foreground">{a.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.texto}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
