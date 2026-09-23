import type { NextConfig } from "next";

// URLs del WordPress anterior (psepowerbatteries.com/index.php/...) que Google
// tiene indexadas. Se redirigen con 301 para no perder posicionamiento; las
// que no tienen equivalente (páginas demo del tema) caen al inicio.
const REDIRECCIONES_WORDPRESS = [
  { source: "/index.php/catalogo", destination: "/baterias" },
  { source: "/index.php/shop", destination: "/baterias" },
  { source: "/index.php/shop-2", destination: "/baterias" },
  { source: "/index.php/product/:ruta*", destination: "/baterias" },
  { source: "/index.php/product-category/:ruta*", destination: "/baterias" },
  { source: "/index.php/nosotros", destination: "/#nosotros" },
  { source: "/index.php", destination: "/" },
  { source: "/index.php/:ruta*", destination: "/" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return REDIRECCIONES_WORDPRESS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
