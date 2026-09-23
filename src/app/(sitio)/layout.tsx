import { CarritoProvider } from "@/components/carrito/carrito-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

// Layout de la tienda. Vive en un grupo de rutas para que páginas sueltas
// como /tarjeta se muestren sin header, footer ni carrito.
export default function SitioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CarritoProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <Toaster position="bottom-right" />
    </CarritoProvider>
  );
}
