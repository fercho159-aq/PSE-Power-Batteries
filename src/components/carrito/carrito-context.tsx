"use client";

import * as React from "react";

import type { Bateria } from "@/lib/catalogo";

const CLAVE_STORAGE = "pse-carrito";

export type ItemCarrito = {
  id: string;
  modelo: string;
  marca: string;
  cantidad: number;
  /** Se guardan para armar el mensaje de WhatsApp sin releer el catálogo. */
  volt?: number;
  ah?: number;
};

type CarritoContextValue = {
  items: ItemCarrito[];
  total: number;
  agregar: (b: Bateria, cantidad?: number) => void;
  quitar: (id: string) => void;
  setCantidad: (id: string, cantidad: number) => void;
  limpiar: () => void;
  abrir: () => void;
  // Uso interno del sheet.
  abierto: boolean;
  setAbierto: (abierto: boolean) => void;
};

const CarritoContext = React.createContext<CarritoContextValue | null>(null);

/** Valida lo que viene de localStorage: puede estar corrupto o ser de otra versión. */
function parseItems(crudo: string | null): ItemCarrito[] {
  if (!crudo) return [];
  try {
    const datos: unknown = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    return datos.filter((item): item is ItemCarrito => {
      if (typeof item !== "object" || item === null) return false;
      const i = item as Record<string, unknown>;
      return (
        typeof i.id === "string" &&
        typeof i.modelo === "string" &&
        typeof i.marca === "string" &&
        typeof i.cantidad === "number" &&
        i.cantidad > 0
      );
    });
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = React.useState(false);
  // Evita escribir el carrito vacío inicial encima del que ya estaba guardado.
  const [hidratado, setHidratado] = React.useState(false);

  // Hidratación: el server no puede leer localStorage, así que el carrito guardado
  // se carga tras el primer render. Es el patrón esperado aquí.
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setItems(parseItems(window.localStorage.getItem(CLAVE_STORAGE)));
    setHidratado(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  React.useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    } catch {
      // Almacenamiento lleno o bloqueado: el carrito sigue vivo en memoria.
    }
  }, [items, hidratado]);

  const agregar = React.useCallback((b: Bateria, cantidad = 1) => {
    const suma = Math.max(1, Math.floor(cantidad));
    setItems((previos) => {
      const existente = previos.find((item) => item.id === b.id);
      if (existente) {
        return previos.map((item) =>
          item.id === b.id ? { ...item, cantidad: item.cantidad + suma } : item
        );
      }
      return [
        ...previos,
        {
          id: b.id,
          modelo: b.modelo,
          marca: b.marca,
          cantidad: suma,
          volt: b.volt,
          ah: b.ah,
        },
      ];
    });
  }, []);

  const quitar = React.useCallback((id: string) => {
    setItems((previos) => previos.filter((item) => item.id !== id));
  }, []);

  const setCantidad = React.useCallback((id: string, cantidad: number) => {
    const valor = Math.floor(cantidad);
    setItems((previos) =>
      valor < 1
        ? previos.filter((item) => item.id !== id)
        : previos.map((item) =>
            item.id === id ? { ...item, cantidad: valor } : item
          )
    );
  }, []);

  const limpiar = React.useCallback(() => setItems([]), []);
  const abrir = React.useCallback(() => setAbierto(true), []);

  const total = items.reduce((suma, item) => suma + item.cantidad, 0);

  const valor = React.useMemo<CarritoContextValue>(
    () => ({
      items,
      total,
      agregar,
      quitar,
      setCantidad,
      limpiar,
      abrir,
      abierto,
      setAbierto,
    }),
    [items, total, agregar, quitar, setCantidad, limpiar, abrir, abierto]
  );

  return (
    <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextValue {
  const contexto = React.useContext(CarritoContext);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>.");
  }
  return contexto;
}
