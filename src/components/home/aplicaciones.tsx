/* Hallmark · genre: atmospheric · macrostructure: Stat-Led · design-system: design.md · designed-as-app */
import {
  CellTowerIcon,
  FirstAidKitIcon,
  SirenIcon,
  WheelchairIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

type App = { icono: Icon; tag: string; texto: string };

// Copys de legacy/index.html (sección #aplicaciones), reducidos a una línea.
const APPS: App[] = [
  {
    icono: FirstAidKitIcon,
    tag: "Equipo médico",
    texto: "Monitoreo y equipo hospitalario que no admite cortes.",
  },
  {
    icono: SirenIcon,
    tag: "Emergencia",
    texto: "Alarmas e iluminación que responden cuando falla la red.",
  },
  {
    icono: CellTowerIcon,
    tag: "Telecom",
    texto: "Respaldo para radiobases e infraestructura de red.",
  },
  {
    icono: WheelchairIcon,
    tag: "Movilidad",
    texto: "Sillas de ruedas, scooters y vehículos ligeros.",
  },
];

export function Aplicaciones() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="hm-eyebrow">03 / Aplicaciones</p>
        <h2 className="hm-display mt-4 text-[clamp(1.9rem,4vw,3rem)]">
          La batería para el uso que necesitas
        </h2>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {APPS.map((a) => {
          const Icono = a.icono;
          return (
            <li key={a.tag} className="hm-card flex flex-col gap-4 p-5">
              <span className="inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-paper-3)]">
                <Icono size={22} weight="duotone" className="text-[var(--color-accent)]" />
              </span>
              <div>
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-ink)]">
                  {a.tag}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">{a.texto}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
