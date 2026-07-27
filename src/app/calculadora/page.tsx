/* Hallmark · genre: atmospheric · macrostructure: Long Document · design-system: design.md · designed-as-app */
import type { Metadata } from "next";

import { CalculadoraRespaldo } from "@/components/calculadora/calculadora-respaldo";

export const metadata: Metadata = {
  title: "Calculadora de respaldo",
  description:
    "Calcula los amperes-hora que necesita tu equipo: dinos el voltaje, el consumo en watts y las horas de respaldo.",
};

export default function CalculadoraPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      {/* Long Document — una sola columna, la prosa manda, la herramienta va inline */}
      <header className="hm-reveal max-w-[62ch]">
        <p className="hm-eyebrow">Herramienta · Dimensionamiento</p>
        <h1 className="hm-display mt-4 text-[clamp(2rem,5vw+0.5rem,3.25rem)]">
          ¿Qué batería necesita tu equipo?
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[var(--color-ink-2)]">
          Dinos cuánto consume tu equipo y cuántas horas debe seguir encendido si
          falla la energía. Con eso estimamos la capacidad en amperes-hora y te
          sugerimos modelos reales del catálogo que la cubren. Es un cálculo
          aproximado: un asesor lo confirma contigo antes de cotizar.
        </p>
      </header>

      <div className="mt-12">
        <CalculadoraRespaldo />
      </div>
    </div>
  );
}
