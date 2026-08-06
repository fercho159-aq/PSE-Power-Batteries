/* Hallmark · genre: atmospheric · macrostructure: Stat-Led · design-system: design.md · designed-as-app */
import {
  CurrencyDollarIcon,
  HandshakeIcon,
  SealCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";

const PILARES = [
  {
    Icono: CurrencyDollarIcon,
    titulo: "Precios competitivos",
    texto:
      "Más de 30 años de posicionamiento nos permiten ofrecer los precios más competitivos del mercado.",
  },
  {
    Icono: UsersThreeIcon,
    titulo: "Equipo experto",
    texto:
      "Nuestro equipo de consulta te da información exacta de lo que buscas, no aproximaciones.",
  },
  {
    Icono: HandshakeIcon,
    titulo: "Soluciones completas",
    texto:
      "No vendemos y desaparecemos. Acompañamos cada proyecto como proveedores de largo plazo.",
  },
  {
    Icono: SealCheckIcon,
    titulo: "Calidad",
    texto:
      "Nuestros estándares están al nivel del equipo que distribuimos. Nosotros nos ocupamos.",
  },
];

export function Nosotros() {
  return (
    <section
      id="nosotros"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-20 sm:py-24"
    >
      <header className="max-w-2xl">
        <p className="hm-eyebrow">04 / Nosotros</p>
        <h2 className="hm-display mt-4 text-[clamp(1.9rem,4vw,3rem)]">
          Proyectos y Sistemas en Energía
        </h2>
        <p className="mt-4 text-base text-[var(--color-ink-2)]">
          Hace mucho tiempo decidimos quedarnos: nuestras soluciones son a muy
          largo plazo. Más de 30 años distribuyendo energía de respaldo con
          proveedores de primera línea.
        </p>
      </header>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {PILARES.map(({ Icono, titulo, texto }) => (
          <li key={titulo} className="hm-card flex flex-col gap-4 p-5">
            <Icono
              weight="duotone"
              className="size-7 text-[var(--color-accent)]"
              aria-hidden
            />
            <div>
              <h3 className="hm-display text-base">{titulo}</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-2)]">{texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
