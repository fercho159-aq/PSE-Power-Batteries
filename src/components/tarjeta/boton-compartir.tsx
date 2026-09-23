"use client";

import { useState } from "react";
import { ShareNetworkIcon } from "@phosphor-icons/react";

// Usa el menú nativo de compartir; en escritorio cae a copiar el enlace.
export function BotonCompartir({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  async function compartir() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, url });
      } catch {
        // El usuario cerró el menú: no hay nada que hacer.
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={compartir}
      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-2)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
    >
      <ShareNetworkIcon className="size-4" />
      {copiado ? "Enlace copiado" : "Compartir tarjeta"}
    </button>
  );
}
