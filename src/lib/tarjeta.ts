// Datos de la tarjeta digital (/tarjeta). La etiqueta NFC y el QR apuntan a
// esa URL, así que cambiar algo aquí actualiza la tarjeta sin reprogramarlas.
// TODO: confirmar nombre, puesto y foto con el cliente.

import { WHATSAPP_NUMERO, WHATSAPP_URL } from "@/lib/whatsapp";

export const TARJETA = {
  nombre: "Nombre Apellido",
  puesto: "Director comercial",
  empresa: "PSE Power Batteries",
  razonSocial: "Proyectos y Sistemas en Energía S.A. de C.V.",
  lema: "Baterías selladas VRLA/AGM para equipo que no puede apagarse.",
  // Foto cuadrada en /public (ej. "/media/tarjeta/foto.jpg"); null usa el logo.
  foto: null as string | null,
  telefono: "55 4986 8279",
  telefonoE164: `+${WHATSAPP_NUMERO}`,
  whatsapp: WHATSAPP_URL,
  correo: "contacto@psepowerbatteries.com",
  sitio: "https://psepowerbatteries.com",
};
