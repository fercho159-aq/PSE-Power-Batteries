import type { Metadata } from "next";

import { CalculadoraRespaldo } from "@/components/calculadora/calculadora-respaldo";

export const metadata: Metadata = {
  title: "Calculadora de respaldo",
  description:
    "Calcula los amperes-hora que necesita tu equipo: dinos el voltaje, el consumo en watts y las horas de respaldo.",
};

export default function CalculadoraPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Calculadora de respaldo
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          ¿Qué batería necesita tu equipo?
        </h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Dinos cuánto consume tu equipo y cuántas horas debe seguir encendido si falla la
          energía. Te decimos la capacidad aproximada que necesitas.
        </p>
      </header>

      <div className="mt-10">
        <CalculadoraRespaldo />
      </div>
    </div>
  );
}
