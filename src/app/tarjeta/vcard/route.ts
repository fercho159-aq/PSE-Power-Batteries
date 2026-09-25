import { readFile } from "node:fs/promises";
import path from "node:path";

import { TARJETA } from "@/lib/tarjeta";

export const dynamic = "force-static";

// Foto del contacto: el logo sobre fondo blanco, cuadrado, para que se vea
// bien en el círculo de la app de Contactos.
const FOTO_CONTACTO = "public/media/tarjeta/foto-contacto.jpg";

/** vCard exige líneas de máximo 75 caracteres; las siguientes empiezan con espacio. */
function plegar(linea: string): string {
  const partes = [linea.slice(0, 75)];
  for (let i = 75; i < linea.length; i += 74) partes.push(" " + linea.slice(i, i + 74));
  return partes.join("\r\n");
}

// Archivo .vcf para el botón "Guardar contacto": iOS y Android lo abren
// directo en la app de Contactos.
export async function GET() {
  const [nombre, ...apellidos] = TARJETA.nombre.split(" ");
  const foto = await readFile(path.join(process.cwd(), FOTO_CONTACTO));

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${apellidos.join(" ")};${nombre};;;`,
    `FN:${TARJETA.nombre}`,
    `ORG:${TARJETA.empresa}`,
    ...(TARJETA.puesto ? [`TITLE:${TARJETA.puesto}`] : []),
    `TEL;TYPE=CELL,VOICE:${TARJETA.telefonoE164}`,
    `TEL;TYPE=WORK,VOICE:${TARJETA.whatsappE164}`,
    `EMAIL;TYPE=WORK,INTERNET:${TARJETA.correo}`,
    `URL:${TARJETA.sitio}`,
    `NOTE:WhatsApp ${TARJETA.whatsappNumero}. ${TARJETA.lema}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${foto.toString("base64")}`,
    "END:VCARD",
  ]
    .map(plegar)
    .join("\r\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jesus-romero-pse-power-batteries.vcf"',
    },
  });
}
