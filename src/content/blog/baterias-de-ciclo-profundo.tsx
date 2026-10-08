import Link from "next/link";

import type { Articulo } from "@/lib/blog";
import { CATALOGO, rutaBateria } from "@/lib/catalogo";

// Palabra clave: "baterías de ciclo profundo".
// Aparece en slug, título, primer párrafo, un H2 y la meta description.

/** Enlace a la ficha de un modelo del catálogo por su id. */
function Modelo({ id }: { id: string }) {
  const b = CATALOGO.find((x) => x.id === id);
  if (!b) throw new Error(`Modelo inexistente en el blog: ${id}`);
  return (
    <Link href={rutaBateria(b)}>
      {b.marca} {b.modelo}
    </Link>
  );
}

function Contenido() {
  return (
    <>
      <p>
        Las <strong>baterías de ciclo profundo</strong> están hechas para un
        trabajo distinto al de una batería de respaldo: en lugar de esperar
        cargadas a que falle la luz, se descargan y se vuelven a cargar una y
        otra vez. Si tu silla de ruedas eléctrica, tu scooter o tu sistema solar
        se queda sin energía antes de lo esperado, es muy probable que la
        batería instalada no sea la adecuada para ese uso.
      </p>

      <h2>Qué es un ciclo y por qué importa</h2>
      <p>
        Un <strong>ciclo</strong> es una descarga seguida de una recarga. Una
        batería de respaldo, como la de un no-break o una alarma, pasa casi toda
        su vida cargada y solo trabaja cuando hay un corte: hace pocos ciclos al
        año. Una batería de movilidad eléctrica hace un ciclo prácticamente cada
        día.
      </p>
      <p>
        Por fuera las dos pueden verse idénticas, con el mismo voltaje, la misma
        capacidad y las mismas medidas. La diferencia está en la construcción
        interna: las de ciclo profundo están diseñadas para soportar descargas
        amplias y repetidas sin perder capacidad tan rápido.
      </p>

      <h2>Ciclo profundo o uso general: cómo saber cuál necesitas</h2>
      <p>La pregunta que lo define es cada cuánto se descarga la batería.</p>
      <ul>
        <li>
          <strong>Se descarga de vez en cuando</strong> y el resto del tiempo
          está conectada a la corriente: uso general o respaldo. Es el caso de
          no-breaks, alarmas, iluminación de emergencia y control de acceso.
        </li>
        <li>
          <strong>Se descarga todos o casi todos los días</strong>: ciclo
          profundo. Es el caso de la movilidad eléctrica y de los sistemas que
          guardan energía para usarla después.
        </li>
      </ul>
      <p>
        Poner una batería de uso general en un trabajo de ciclo diario funciona
        al principio, pero se desgasta muy rápido. Es uno de los errores más
        comunes y de los más caros, porque obliga a comprar dos veces.
      </p>

      <h2>Dónde se usan las baterías de ciclo profundo</h2>
      <ul>
        <li>Sillas de ruedas eléctricas y scooters de movilidad.</li>
        <li>Carritos y vehículos eléctricos ligeros.</li>
        <li>Sistemas solares que almacenan energía durante el día.</li>
        <li>Equipos portátiles que trabajan lejos de un contacto.</li>
      </ul>

      <h2>Opciones en nuestro catálogo</h2>
      <p>
        Manejamos dos series de ciclo profundo, ambas selladas, sin
        mantenimiento y sin derrames:
      </p>
      <ul>
        <li>
          <strong>Power-Sonic PDC.</strong> Desde tamaños compactos como la{" "}
          <Modelo id="power-sonic-pdc-1285" /> hasta capacidades grandes como la{" "}
          <Modelo id="power-sonic-pdc121000" />. La{" "}
          <Modelo id="power-sonic-pdc-12350" /> es una opción para movilidad
          eléctrica.
        </li>
        <li>
          <strong>Kaise KBL.</strong> AGM de ciclo profundo en capacidades
          medias y altas, como la <Modelo id="kaise-kbl12400" />, la{" "}
          <Modelo id="kaise-kbl12550" /> o la <Modelo id="kaise-kbl-121000" />.
        </li>
      </ul>
      <p>
        Igual que en cualquier reemplazo, hay que respetar el voltaje, las
        medidas y la terminal de la batería original. Y si el equipo usa dos
        baterías, como la mayoría de las sillas eléctricas, se cambian las dos
        al mismo tiempo.
      </p>

      <h2>Cómo cuidar una batería de ciclo profundo</h2>
      <ul>
        <li>
          <strong>Recárgala después de usarla.</strong> No esperes a que se
          vacíe por completo ni la dejes descargada varios días.
        </li>
        <li>
          <strong>Evita agotarla hasta el final.</strong> Entre más profunda es
          cada descarga, menos ciclos dura la batería.
        </li>
        <li>
          <strong>Usa el cargador adecuado.</strong> Debe ser para baterías
          selladas AGM y del voltaje correcto; el que trae el equipo de fábrica
          es la referencia.
        </li>
        <li>
          <strong>Si la vas a guardar, guárdala cargada</strong> y en un lugar
          fresco, y dale una recarga cada cierto tiempo.
        </li>
      </ul>

      <h2>Señales de que ya necesita cambio</h2>
      <ul>
        <li>El equipo recorre o trabaja mucho menos tiempo que antes.</li>
        <li>La carga se completa muy rápido y también se agota muy rápido.</li>
        <li>La batería está inflada, deformada o con residuos en las terminales.</li>
      </ul>

      <h2>Te ayudamos a elegirla</h2>
      <p>
        En <strong>PSE Power Batteries</strong> llevamos más de 30 años
        distribuyendo baterías para movilidad, equipo médico, emergencia y
        telecomunicaciones. Mándanos por WhatsApp una foto de la etiqueta de tu
        batería actual o el modelo de tu equipo y te decimos cuál es el
        reemplazo, con cotización sin costo. También puedes revisar el{" "}
        <Link href="/baterias">catálogo</Link> o estimar la capacidad con la{" "}
        <Link href="/calculadora">calculadora de respaldo</Link>.
      </p>
    </>
  );
}

export const articulo: Articulo = {
  slug: "baterias-de-ciclo-profundo",
  titulo: "Baterías de ciclo profundo: qué son y cuándo las necesitas",
  descripcion:
    "Qué son las baterías de ciclo profundo, en qué se distinguen de las de respaldo y cómo elegirlas para sillas eléctricas, scooters y sistemas solares.",
  palabraClave: "baterías de ciclo profundo",
  fecha: "2026-10-08",
  categoria: "Guías",
  minutosLectura: 3,
  imagen: {
    src: "/media/portada-baterias-de-ciclo-profundo.webp",
    alt: "Batería sellada de ciclo profundo Power-Sonic PDC de 12 V",
  },
  Contenido,
  preguntas: [
    {
      pregunta: "¿Qué diferencia hay entre una batería de ciclo profundo y una de respaldo?",
      respuesta:
        "La de respaldo está pensada para permanecer cargada y descargarse de vez en cuando. La de ciclo profundo soporta descargas y recargas diarias sin perder capacidad tan rápido.",
    },
    {
      pregunta: "¿Puedo usar una batería de no-break en una silla de ruedas eléctrica?",
      respuesta:
        "No es recomendable. Aunque coincidan el voltaje y la capacidad, una batería de uso general se desgasta muy rápido con descargas diarias. La silla necesita una de ciclo profundo.",
    },
    {
      pregunta: "¿Las baterías de ciclo profundo necesitan mantenimiento?",
      respuesta:
        "Las selladas AGM no requieren agregar agua. El cuidado consiste en recargarlas después de cada uso, no dejarlas descargadas y usar un cargador adecuado.",
    },
  ],
};
