// Enlaces de WhatsApp para cotización. Todo el contacto del sitio termina aquí:
// el cliente pidió que el pedido se cierre por WhatsApp, no por formulario.

export const WHATSAPP_URL = "https://wa.link/rk6bz0";
export const WHATSAPP_NUMERO = "525549868279";

const FIRMA = "Enviado desde psepowerbatteries.com";

/**
 * Tipo estructural local, compatible con `ItemCarrito` de
 * `@/components/carrito/carrito-context`. Se declara aquí (en vez de importarlo)
 * para que este módulo no dependa de un componente cliente.
 */
export type ItemPedido = {
  modelo: string;
  marca: string;
  cantidad: number;
  volt?: number;
  ah?: number;
};

function armarUrl(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

function especificacion(item: ItemPedido): string {
  if (item.volt == null && item.ah == null) return "";
  const partes: string[] = [];
  if (item.volt != null) partes.push(`${item.volt}V`);
  if (item.ah != null) partes.push(`${item.ah}Ah`);
  return ` (${partes.join(" ")})`;
}

/** Mensaje de pedido con la lista de baterías del carrito. */
export function linkPedido(items: ItemPedido[]): string {
  const lineas = items.map(
    (item) =>
      `- ${item.cantidad} x ${item.marca} ${item.modelo}${especificacion(item)}`
  );
  const mensaje = [
    "Hola, quiero cotizar este pedido:",
    ...lineas,
    "",
    FIRMA,
  ].join("\n");
  return armarUrl(mensaje);
}

/** Mensaje libre, para el buscador y los CTA sueltos. */
export function linkConsulta(texto: string): string {
  const consulta = texto.trim();
  const mensaje = [
    consulta
      ? `Hola, tengo una consulta: ${consulta}`
      : "Hola, quiero información sobre sus baterías.",
    "",
    FIRMA,
  ].join("\n");
  return armarUrl(mensaje);
}
