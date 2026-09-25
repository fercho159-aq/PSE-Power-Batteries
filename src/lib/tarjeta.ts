// Datos de la tarjeta digital (/tarjeta). La etiqueta NFC y el QR apuntan a
// esa URL, así que cambiar algo aquí actualiza la tarjeta sin reprogramarlas.

import { WHATSAPP_NUMERO, WHATSAPP_URL } from "@/lib/whatsapp";

export const TARJETA = {
  nombre: "Jesús Romero Quezada",
  // null oculta el puesto en la tarjeta y en el vCard.
  puesto: null as string | null,
  empresa: "PSE Power Batteries",
  razonSocial: "Proyectos y Sistemas en Energía S.A. de C.V.",
  lema: "Baterías selladas VRLA/AGM para equipo que no puede apagarse.",
  // Foto cuadrada en /public (ej. "/media/tarjeta/foto.jpg"); null usa el logo.
  foto: null as string | null,
  // Línea para llamadas; WhatsApp va a otro número.
  telefono: "55 2235 1363",
  telefonoE164: "+525522351363",
  whatsappNumero: "55 4986 8279",
  whatsappE164: `+${WHATSAPP_NUMERO}`,
  whatsapp: WHATSAPP_URL,
  correo: "contacto@psepowerbatteries.com",
  sitio: "https://psepowerbatteries.com",
};
