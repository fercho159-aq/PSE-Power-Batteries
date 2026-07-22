# Contrato técnico — migración a Next.js (PSE Power Batteries)

Stack: Next.js 16 (App Router, `src/`), React 19, TypeScript, Tailwind v4, shadcn/ui
(estilo `radix-lyra`, iconos **phosphor** vía `@phosphor-icons/react`).

## Reglas para todos

- Español de México en toda la UI. Sin emojis.
- Componentes de servidor por defecto; `"use client"` solo donde hay estado/eventos.
- Reusa `@/components/ui/*` (button, card, badge, input, sheet, accordion,
  dropdown-menu, select, separator, label, sonner). Si falta uno, agrégalo con
  `npx shadcn@latest add <n> --yes`.
- **No edites archivos fuera de los que se te asignan.** Si necesitas algo de otro
  módulo, impórtalo según el contrato de abajo aunque todavía no exista.
- Tokens de marca ya cargados en `src/app/globals.css` (`--pse-ink`, `--pse-royal`,
  `--pse-orange`, `--pse-green`, `--pse-paper`, `--pse-steel`) y mapeados a los tokens
  de shadcn. Usa `bg-primary`, `text-accent`, etc.; no inventes colores nuevos.
- Referencia de diseño y copys: `legacy/index.html` y `legacy/css/styles.css`
  (sitio estático anterior). Conserva la identidad: fondo oscuro, acento azul eléctrico `--pse-royal #1E56C8`,
  naranja escaso `--pse-orange #F59A23`, verde WhatsApp `--pse-green #1DA45B`, tipografía mono para datos técnicos, mucho aire.
- Imágenes en `public/media/` (logos de marca: `logo-powersonic.png`, `logo-kaise.png`,
  `logo-dynasty.png`, `logo-genesis.png`, logo del sitio `logo-ps-final-1-03.png`).
- Al terminar, verifica que tus archivos tipan: `npx tsc --noEmit` (ignora errores
  que provengan de módulos de otros agentes que aún no existen).

## Datos: `src/lib/catalogo.ts` (YA EXISTE, no lo modifiques)

```ts
export type Marca = "Power-Sonic" | "Kaise" | "Dynasty" | "Genesis";
export type Bateria = {
  id: string;        // "power-sonic-ps-1270"
  marca: Marca;
  serie: string;     // "PS" | "PDC" | "PG" | "PHR" | "KB" | "KBL" | "UPS12" | "NP"
  modelo: string;    // "PS 1270"
  volt: number;      // 12
  ah: number;        // 7
  tipo: string;      // "Ciclo profundo" | "Alta descarga (High-Rate)" | ...
  medidas: string | null;  // "151 × 65 × 98 mm"
  peso: number | null;     // kg
  terminal: string | null;
  imagen: string | null;   // solo Kaise trae imagen (URL externa)
  fuente: string;
};
export const CATALOGO: Bateria[];
export const MARCAS: Marca[];
export const MARCA_SLUG: Record<Marca, string>;   // "Power-Sonic" -> "power-sonic"
export const SLUG_MARCA: Record<string, Marca>;
```

71 modelos. **Se muestra el catálogo completo** (decisión del cliente), con filtros
para que no abrume.

## Contratos entre módulos

### Carrito — `@/components/carrito/carrito-context`
```ts
"use client";
export type ItemCarrito = { id: string; modelo: string; marca: string; cantidad: number };
export function CarritoProvider(props: { children: React.ReactNode }): JSX.Element;
export function useCarrito(): {
  items: ItemCarrito[];
  total: number;                       // suma de cantidades
  agregar: (b: Bateria, cantidad?: number) => void;
  quitar: (id: string) => void;
  setCantidad: (id: string, cantidad: number) => void;
  limpiar: () => void;
  abrir: () => void;                   // abre el sheet
};
```
- `@/components/carrito/boton-agregar` → `<BotonAgregar bateria={b} />` (client).
- `@/components/carrito/carrito-sheet` → `<CarritoSheet />` (client, incluye el
  botón/badge que lo abre; se monta en el header).

### Tarjeta de producto — `@/components/catalogo/bateria-card`
```tsx
export function BateriaCard(props: { bateria: Bateria; href?: string }): JSX.Element;
```

### WhatsApp — `@/lib/whatsapp.ts`
```ts
export const WHATSAPP_URL = "https://wa.link/rk6bz0";
export const WHATSAPP_NUMERO = "525549868279";
export function linkPedido(items: ItemCarrito[]): string;      // wa.me/...?text=...
export function linkConsulta(texto: string): string;
```

### Búsqueda — `@/lib/buscar.ts`
```ts
export function buscar(q: string): Bateria[];                  // modelo, marca, serie, "12v 7ah"
export function equivalentes(b: Bateria, excluirMarca?: boolean): Bateria[]; // mismo V, Ah ±15%
export function parseConsulta(q: string): { volt?: number; ah?: number; texto: string };
```

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Home tipo Kaise: hero grande, poca info, marcas, CTA a catálogo |
| `/baterias` | Catálogo completo + filtros + buscador |
| `/baterias/[marca]` | Modelos de la marca, agrupados por serie |
| `/baterias/[marca]/[modelo]` | Ficha técnica + agregar al carrito |
| `/calculadora` | Calculadora de respaldo (portada del sitio anterior) |

`[modelo]` usa el `id` de la batería sin el prefijo de marca, en kebab-case
(ej. `/baterias/power-sonic/ps-1270`). Genera `generateStaticParams` para ambas.
