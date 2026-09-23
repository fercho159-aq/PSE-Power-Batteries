"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

// Un solo listener para medir los clics de contacto en todo el sitio, en vez
// de instrumentar cada enlace. Los nombres de evento se marcan como
// conversiones en GA4 / Google Ads.
function eventoPara(href: string): string | null {
  if (href.includes("wa.me") || href.includes("wa.link")) return "clic_whatsapp";
  if (href.startsWith("tel:")) return "clic_telefono";
  if (href.startsWith("mailto:")) return "clic_correo";
  if (href.includes("/tarjeta/vcard")) return "guardar_contacto";
  return null;
}

export function RastreoClics() {
  useEffect(() => {
    function alHacerClic(e: MouseEvent) {
      const enlace = (e.target as Element | null)?.closest?.("a[href]");
      if (!enlace) return;
      const href = enlace.getAttribute("href") ?? "";
      const evento = eventoPara(href);
      if (evento) {
        sendGAEvent("event", evento, { pagina: window.location.pathname });
      }
    }
    document.addEventListener("click", alHacerClic, { capture: true });
    return () => document.removeEventListener("click", alHacerClic, { capture: true });
  }, []);

  return null;
}
