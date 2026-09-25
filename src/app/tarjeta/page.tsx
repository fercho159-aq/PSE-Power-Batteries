/* Hallmark · genre: editorial · page: tarjeta digital (link-in-bio) · design-system: design.md */
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AddressBookIcon,
  ArrowUpRightIcon,
  BatteryFullIcon,
  CalculatorIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";

import { BotonCompartir } from "@/components/tarjeta/boton-compartir";
import { TARJETA } from "@/lib/tarjeta";

export const metadata: Metadata = {
  title: `${TARJETA.nombre} · Tarjeta digital`,
  description: `${TARJETA.nombre}, ${TARJETA.empresa}. ${TARJETA.lema}`,
};

type Enlace = {
  href: string;
  etiqueta: string;
  detalle: string;
  Icono: typeof PhoneIcon;
  externo?: boolean;
};

const CONTACTO: Enlace[] = [
  {
    href: `tel:${TARJETA.telefonoE164}`,
    etiqueta: "Llamar",
    detalle: TARJETA.telefono,
    Icono: PhoneIcon,
  },
  {
    href: TARJETA.whatsapp,
    etiqueta: "WhatsApp",
    detalle: TARJETA.whatsappNumero,
    Icono: WhatsappLogoIcon,
    externo: true,
  },
  {
    href: `mailto:${TARJETA.correo}`,
    etiqueta: "Correo",
    detalle: TARJETA.correo,
    Icono: EnvelopeSimpleIcon,
  },
];

const ENLACES: Enlace[] = [
  {
    href: "/baterias",
    etiqueta: "Catálogo de baterías",
    detalle: "Power-Sonic · Kaise · Dynasty · Genesis",
    Icono: BatteryFullIcon,
  },
  {
    href: "/calculadora",
    etiqueta: "Calculadora de respaldo",
    detalle: "¿Qué batería necesita tu equipo?",
    Icono: CalculatorIcon,
  },
  {
    href: TARJETA.sitio,
    etiqueta: "Sitio web",
    detalle: TARJETA.sitio.replace("https://", ""),
    Icono: GlobeIcon,
    externo: true,
  },
];

function FilaEnlace({ href, etiqueta, detalle, Icono, externo }: Enlace) {
  const contenido = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-paper-3)] text-[var(--color-ink)]">
        <Icono className="size-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold text-[var(--color-ink)]">{etiqueta}</span>
        <span className="truncate font-mono text-xs text-[var(--color-ink-2)]">{detalle}</span>
      </span>
      <ArrowUpRightIcon className="size-4 shrink-0 text-[var(--color-ink-2)]" />
    </>
  );
  const clases =
    "hm-card flex items-center gap-3 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={clases}>
        {contenido}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={clases}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {contenido}
    </a>
  );
}

export default function TarjetaPage() {
  return (
    <main className="flex min-h-dvh justify-center bg-[var(--color-paper)] px-4 pb-10">
      <div className="hm-reveal flex w-full max-w-md flex-col">
        {/* Banda de marca + foto */}
        <div className="-mx-4 h-32 bg-[image:var(--grad-panel)] sm:mx-0 sm:mt-6 sm:rounded-t-[var(--radius-xl)]" />
        <div className="-mt-14 flex flex-col items-center text-center">
          <div className="relative size-28 overflow-hidden rounded-full border-4 border-[var(--color-paper)] bg-white shadow-[var(--glow-amber)]">
            {TARJETA.foto ? (
              <Image
                src={TARJETA.foto}
                alt={TARJETA.nombre}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src="/media/logo-pse-hex.png"
                alt={TARJETA.empresa}
                fill
                sizes="112px"
                className="object-contain p-5"
                priority
              />
            )}
          </div>

          <h1 className="hm-display mt-4 text-3xl">{TARJETA.nombre}</h1>
          {TARJETA.puesto ? (
            <p className="mt-1 text-sm text-[var(--color-ink-2)]">{TARJETA.puesto}</p>
          ) : null}
          <p className="hm-eyebrow mt-3">{TARJETA.empresa}</p>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-ink-2)]">{TARJETA.lema}</p>
        </div>

        {/* Acciones principales */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <a
            href={TARJETA.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-wa)] text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            <WhatsappLogoIcon className="size-5" weight="fill" />
            WhatsApp
          </a>
          <a
            href="/tarjeta/vcard"
            className="flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-ink)] text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            <AddressBookIcon className="size-5" />
            Guardar contacto
          </a>
        </div>

        <section aria-label="Contacto" className="mt-6 flex flex-col gap-2">
          {CONTACTO.map((e) => (
            <FilaEnlace key={e.etiqueta} {...e} />
          ))}
        </section>

        <section aria-labelledby="enlaces" className="mt-6 flex flex-col gap-2">
          <h2 id="enlaces" className="hm-eyebrow text-[var(--color-ink-2)]">
            Enlaces
          </h2>
          {ENLACES.map((e) => (
            <FilaEnlace key={e.etiqueta} {...e} />
          ))}
        </section>

        <div className="mt-8 flex flex-col items-center gap-3">
          <BotonCompartir titulo={`${TARJETA.nombre} · ${TARJETA.empresa}`} />
          <p className="font-mono text-[11px] text-[var(--color-ink-2)]">
            {TARJETA.razonSocial}
          </p>
        </div>
      </div>
    </main>
  );
}
