import Link from "next/link";

import type { Articulo } from "@/lib/blog";
import { CATALOGO, rutaBateria } from "@/lib/catalogo";

// Palabra clave: "baterías selladas en CDMX" (producto + ubicación).
// Aparece en slug, título, H1, primer párrafo, un H2 y la meta description.

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
        Si buscas <strong>baterías selladas en CDMX</strong>, lo más probable es que
        tengas un equipo que no puede apagarse: un no-break en la oficina, el panel de
        alarma de un edificio, un monitor en un consultorio o una silla de ruedas
        eléctrica. En todos esos casos la pregunta no es solo dónde comprar, sino{" "}
        <em>cuál</em> batería comprar para que el equipo funcione igual que el primer
        día.
      </p>
      <p>
        En esta guía te explicamos cómo leer los datos de tu batería actual, qué
        tipo de batería sellada conviene para cada aplicación y cómo evitar los
        errores más comunes al reemplazarla.
      </p>

      <h2>¿Qué es una batería sellada VRLA/AGM?</h2>
      <p>
        Una batería sellada de plomo-ácido, también llamada <strong>VRLA</strong>{" "}
        (regulada por válvula), no necesita que le agregues agua y no derrama
        electrolito. En las de tipo <strong>AGM</strong>, el electrolito está absorbido
        en separadores de fibra de vidrio, lo que permite instalarlas en espacios
        cerrados y en distintas posiciones.
      </p>
      <p>
        Por eso son el estándar en no-breaks (UPS), sistemas de seguridad,
        iluminación de emergencia, equipo médico, telecomunicaciones y movilidad
        eléctrica: son compactas, no requieren mantenimiento y entregan energía de
        forma estable.
      </p>

      <h2>Cómo leer los datos de tu batería antes de reemplazarla</h2>
      <p>
        Toda la información que necesitas está impresa en la etiqueta de la batería
        que ya tienes. Antes de cotizar, revisa estos cuatro datos:
      </p>
      <ol>
        <li>
          <strong>Voltaje (V).</strong> La gran mayoría son de 12 V. Debe coincidir
          exactamente con la original.
        </li>
        <li>
          <strong>Capacidad (Ah).</strong> Indica cuánta energía almacena. Puedes
          usar la misma capacidad o una ligeramente mayor si cabe en el espacio,
          pero nunca menor si quieres conservar el tiempo de respaldo.
        </li>
        <li>
          <strong>Medidas.</strong> Largo, ancho y alto en milímetros. Una batería
          con las mismas especificaciones pero 5 mm más alta puede no cerrar la tapa
          del equipo.
        </li>
        <li>
          <strong>Terminal.</strong> Las más comunes en baterías chicas son{" "}
          <strong>F1</strong> (conector de 4.8 mm) y <strong>F2</strong> (6.3 mm). En
          capacidades mayores se usan terminales de tornillo.
        </li>
      </ol>
      <p>
        Con esos cuatro datos, o simplemente con una foto de la etiqueta, podemos
        identificar el reemplazo exacto. Si no conoces la capacidad que necesitas,
        la <Link href="/calculadora">calculadora de respaldo</Link> te da una
        estimación a partir del consumo de tu equipo.
      </p>

      <h2>Qué batería sellada elegir según tu equipo</h2>

      <h3>No-break (UPS) de casa u oficina</h3>
      <p>
        Los no-break de escritorio suelen usar baterías de <strong>12 V 7 Ah o
        9 Ah</strong>, del mismo tamaño (151 × 65 mm de base). Modelos como la{" "}
        <Modelo id="power-sonic-ps-1270" />, la <Modelo id="kaise-kb-127s" /> o la{" "}
        <Modelo id="genesis-np7-12" /> son reemplazos directos en la mayoría de los
        casos. Si tu equipo usa 9 Ah, revisa la <Modelo id="power-sonic-ps-1290" /> o
        la <Modelo id="kaise-kb-1290" />.
      </p>
      <p>
        Para UPS de centro de datos o de gran capacidad existen series diseñadas
        específicamente para descargas cortas y de alta potencia, como la serie
        Dynasty UPS12 (por ejemplo la <Modelo id="dynasty-ups12-100mr" />) o la serie
        Power-Sonic PHR (<Modelo id="power-sonic-phr-12150" />).
      </p>

      <h3>Alarmas, control de acceso y cercas eléctricas</h3>
      <p>
        Los paneles de alarma y controladores de acceso trabajan casi siempre con{" "}
        <strong>12 V de 4.5 a 7 Ah</strong>. La <Modelo id="kaise-kb-1245" /> y la{" "}
        <Modelo id="power-sonic-ps-1250" /> son opciones habituales para gabinetes
        compactos. Aquí lo más importante es respetar la terminal (F1 o F2) para no
        tener que modificar el cableado.
      </p>

      <h3>Equipo médico</h3>
      <p>
        Monitores, bombas de infusión, camas hospitalarias y equipos portátiles
        dependen de la batería para no interrumpir un tratamiento. En estos equipos
        conviene reemplazar siempre con la <strong>misma capacidad y medida</strong>{" "}
        que indica el fabricante y hacerlo de forma preventiva, antes de que la
        batería falle, no después.
      </p>

      <h3>Sillas de ruedas, scooters y movilidad eléctrica</h3>
      <p>
        Aquí la batería se descarga y recarga todos los días, así que necesitas una
        de <strong>ciclo profundo</strong>. Una batería de uso general se desgasta
        muy rápido en este trabajo. Opciones como la <Modelo id="power-sonic-pdc-12350" />{" "}
        o la línea Kaise KBL (<Modelo id="kaise-kbl12400" />) están diseñadas para
        ese uso.
      </p>

      <h3>Telecomunicaciones y respaldo de larga duración</h3>
      <p>
        Para radiobases, sitios de red o plantas solares se usan bancos de baterías
        de alta capacidad con larga vida de diseño, como la serie Power-Sonic PG (
        <Modelo id="power-sonic-pg-12v100-fr" />) o la{" "}
        <Modelo id="kaise-kbl-121000" /> de ciclo profundo.
      </p>

      <h2>Señales de que tu batería sellada ya necesita cambio</h2>
      <ul>
        <li>El no-break o el equipo se apaga segundos después de un corte de luz.</li>
        <li>El equipo marca “batería baja” aunque haya estado conectado toda la noche.</li>
        <li>La batería está inflada, deformada o tiene residuos en las terminales.</li>
        <li>Ya pasaron más de 3 años desde la última vez que se cambió.</li>
      </ul>
      <p>
        La vida útil depende mucho de la temperatura: una batería instalada junto a
        un equipo que se calienta, o en un cuarto sin ventilación, dura bastante
        menos que una en un lugar fresco. En la Ciudad de México, donde los cortes y
        las variaciones de voltaje son más frecuentes en temporada de lluvias, vale
        la pena revisar las baterías de respaldo antes de que empiece la temporada.
      </p>

      <h2>Errores comunes al comprar baterías selladas en CDMX</h2>
      <ul>
        <li>
          <strong>Comprar solo por voltaje.</strong> Dos baterías de 12 V pueden tener
          capacidades, medidas y terminales totalmente distintas.
        </li>
        <li>
          <strong>Mezclar baterías nuevas con viejas</strong> en un mismo banco (por
          ejemplo, en un UPS que usa dos o más). La vieja limita a la nueva y ambas
          se desgastan más rápido. Cámbialas todas juntas.
        </li>
        <li>
          <strong>Usar una batería de uso general en una aplicación de ciclo
          profundo</strong>, como una silla eléctrica o un sistema solar.
        </li>
        <li>
          <strong>Guardarla descargada.</strong> Una batería sellada que se almacena
          sin carga por meses pierde capacidad de forma permanente.
        </li>
      </ul>

      <h2>Dónde comprar baterías selladas en CDMX</h2>
      <p>
        En <strong>PSE Power Batteries</strong> distribuimos baterías selladas
        VRLA/AGM de <Link href="/baterias/power-sonic">Power-Sonic</Link>,{" "}
        <Link href="/baterias/kaise">Kaise</Link>,{" "}
        <Link href="/baterias/dynasty">Dynasty</Link> y{" "}
        <Link href="/baterias/genesis">Genesis</Link>, con más de 30 años de
        experiencia en equipo médico, sistemas de emergencia, telecomunicaciones y
        movilidad eléctrica.
      </p>
      <p>
        Mándanos por WhatsApp una foto de la etiqueta de tu batería actual o el
        modelo de tu equipo: identificamos el reemplazo, te cotizamos sin costo y
        la entrega es de 24 a 48 horas. También puedes armar tu pedido directamente
        desde el <Link href="/baterias">catálogo</Link>.
      </p>
    </>
  );
}

export const articulo: Articulo = {
  slug: "baterias-selladas-cdmx",
  titulo: "Baterías selladas en CDMX: cómo elegir la correcta para tu equipo",
  descripcion:
    "Guía para elegir baterías selladas en CDMX para no-break, alarmas, equipo médico y sillas eléctricas: voltaje, Ah, medidas, terminal y cuándo reemplazarlas.",
  palabraClave: "baterías selladas en CDMX",
  fecha: "2026-09-23",
  categoria: "Guías",
  minutosLectura: 6,
  imagen: {
    src: "/media/ps_group-shot-min.png",
    alt: "Baterías selladas VRLA/AGM de distintas capacidades",
  },
  Contenido,
  preguntas: [
    {
      pregunta: "¿Cuánto dura una batería sellada de no-break?",
      respuesta:
        "En uso normal, una batería sellada de uso general dura entre 3 y 5 años. El calor y los cortes de luz frecuentes acortan ese tiempo, por lo que conviene revisarla cada año.",
    },
    {
      pregunta: "¿Puedo poner una batería de más Ah en mi no-break?",
      respuesta:
        "Sí, siempre que tenga el mismo voltaje, la misma terminal y quepa en el espacio del equipo. Una capacidad mayor da más tiempo de respaldo; una menor lo reduce.",
    },
    {
      pregunta: "¿Qué diferencia hay entre una batería sellada de uso general y una de ciclo profundo?",
      respuesta:
        "La de uso general está pensada para estar en carga casi siempre y descargarse de vez en cuando, como en un no-break o una alarma. La de ciclo profundo soporta descargas y recargas diarias, como en sillas de ruedas eléctricas o sistemas solares.",
    },
    {
      pregunta: "¿Hacen entregas de baterías selladas en CDMX?",
      respuesta:
        "Sí. Cotizamos sin costo por WhatsApp y la entrega es de 24 a 48 horas.",
    },
  ],
};
