import {
  CurrencyDollarIcon,
  HandshakeIcon,
  SealCheckIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";

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
    <section id="nosotros" className="scroll-mt-28 border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Somos PSE
        </p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold sm:text-3xl">
          Proyectos y Sistemas en Energía
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Hace mucho tiempo decidimos quedarnos: nuestras soluciones son a muy largo plazo.
          Más de 30 años distribuyendo energía de respaldo con proveedores de primera línea.
        </p>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map(({ Icono, titulo, texto }) => (
            <li key={titulo}>
              <Icono
                weight="duotone"
                className="size-7 text-[var(--pse-royal)]"
                aria-hidden
              />
              <h3 className="mt-4 text-sm font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
