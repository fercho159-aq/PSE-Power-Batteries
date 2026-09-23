import { TARJETA } from "@/lib/tarjeta";

export const dynamic = "force-static";

// Archivo .vcf para el botón "Guardar contacto": iOS y Android lo abren
// directo en la app de Contactos.
export function GET() {
  const [nombre, ...apellidos] = TARJETA.nombre.split(" ");
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${apellidos.join(" ")};${nombre};;;`,
    `FN:${TARJETA.nombre}`,
    `ORG:${TARJETA.empresa}`,
    `TITLE:${TARJETA.puesto}`,
    `TEL;TYPE=CELL,VOICE:${TARJETA.telefonoE164}`,
    `EMAIL;TYPE=WORK,INTERNET:${TARJETA.correo}`,
    `URL:${TARJETA.sitio}`,
    `NOTE:${TARJETA.lema}`,
    "END:VCARD",
  ].join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="pse-power-batteries.vcf"',
    },
  });
}
