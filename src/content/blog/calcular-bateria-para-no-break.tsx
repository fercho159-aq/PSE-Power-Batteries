import Link from "next/link";

import type { Articulo } from "@/lib/blog";
import { CATALOGO, rutaBateria } from "@/lib/catalogo";

// Palabra clave: "calcular la batería para un no-break".
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
        «¿Cuánto tiempo me va a aguantar?» es la primera pregunta cuando se
        instala un respaldo de energía. Para responderla hay que{" "}
        <strong>calcular la batería para un no-break</strong> o sistema de
        respaldo a partir de dos datos: cuánto consume lo que vas a conectar y
        cuánto tiempo necesitas que siga encendido.
      </p>
      <p>
        Aquí te explicamos la cuenta paso a paso, con un ejemplo, y qué tomar en
        cuenta para que el resultado se parezca a lo que pasa en la realidad.
      </p>

      <h2>Los tres datos que necesitas</h2>
      <ol>
        <li>
          <strong>Consumo en watts (W).</strong> La suma de todo lo que va a
          quedar conectado al respaldo. Viene en la etiqueta o en el adaptador
          de cada equipo.
        </li>
        <li>
          <strong>Tiempo de respaldo en horas.</strong> Cuánto debe durar. Media
          hora se escribe 0.5; quince minutos, 0.25.
        </li>
        <li>
          <strong>Voltaje del sistema (V).</strong> El del banco de baterías de
          tu equipo: normalmente 12 V, y 24 V o más en equipos de mayor
          capacidad.
        </li>
      </ol>

      <h2>Cómo calcular la batería para un no-break</h2>
      <p>La fórmula es esta:</p>
      <blockquote>
        <p>
          <strong>
            Capacidad (Ah) = (watts × horas) ÷ (voltaje × 0.8)
          </strong>
        </p>
      </blockquote>
      <p>
        El <strong>0.8</strong> es la profundidad de descarga recomendada: se
        calcula como si solo fueras a usar el 80 % de la batería. Vaciarla por
        completo en cada corte acorta su vida, así que ese margen la protege.
      </p>

      <h3>Un ejemplo</h3>
      <p>
        Quieres mantener encendidos un módem, un monitor y una computadora que
        juntos consumen <strong>300 W</strong>, durante{" "}
        <strong>media hora</strong>, en un sistema de <strong>12 V</strong>:
      </p>
      <ul>
        <li>300 W × 0.5 h = 150 Wh</li>
        <li>12 V × 0.8 = 9.6</li>
        <li>150 ÷ 9.6 = 15.6 Ah</li>
      </ul>
      <p>
        Como no existe una batería de 15.6 Ah, se sube a la capacidad estándar
        siguiente: <strong>18 Ah</strong>. En el catálogo eso corresponde, por
        ejemplo, a la <Modelo id="power-sonic-ps-12180" /> o la{" "}
        <Modelo id="kaise-kb-12180" />.
      </p>
      <p>
        Si prefieres no hacer la cuenta a mano, la{" "}
        <Link href="/calculadora">calculadora de respaldo</Link> usa esta misma
        fórmula y te muestra los modelos que cumplen.
      </p>

      <h2>Por qué el resultado es una estimación</h2>
      <p>
        La cuenta da un buen punto de partida, pero el tiempo real depende de
        varias cosas que la fórmula no ve:
      </p>
      <ul>
        <li>
          <strong>La velocidad de la descarga.</strong> Una batería entrega
          menos energía cuando se vacía en pocos minutos que cuando se descarga
          despacio. Por eso, para respaldos cortos y de mucha potencia existen
          series de alta descarga, como la Power-Sonic PHR (
          <Modelo id="power-sonic-phr-12150" />) o la Dynasty UPS12 (
          <Modelo id="dynasty-ups12-100mr" />).
        </li>
        <li>
          <strong>Las pérdidas del propio equipo.</strong> El no-break consume
          parte de la energía al convertirla.
        </li>
        <li>
          <strong>La edad y la temperatura.</strong> Una batería con años de uso
          o instalada en un lugar caluroso rinde menos que una nueva.
        </li>
      </ul>
      <p>
        Por eso conviene dejar margen: si el cálculo queda muy cerca de una
        capacidad, elige la siguiente.
      </p>

      <h2>¿Y si mi sistema es de 24 V?</h2>
      <p>
        Muchos equipos usan dos o más baterías de 12 V conectadas entre sí. La
        regla es:
      </p>
      <ul>
        <li>
          <strong>En serie</strong> se suma el voltaje y la capacidad queda
          igual: dos baterías de 12 V 18 Ah dan 24 V 18 Ah.
        </li>
        <li>
          <strong>En paralelo</strong> se suma la capacidad y el voltaje queda
          igual: dos baterías de 12 V 18 Ah dan 12 V 36 Ah.
        </li>
      </ul>
      <p>
        En cualquiera de los dos casos, todas las baterías del banco deben ser
        del mismo modelo y de la misma edad. Mezclar una nueva con una usada
        hace que ambas se desgasten más rápido.
      </p>

      <h2>Si solo vas a reemplazar la batería</h2>
      <p>
        Cuando el no-break ya trae su batería, no hace falta calcular nada: se
        reemplaza por una del <strong>mismo voltaje, capacidad, medidas y
        terminal</strong>. Puedes subir un poco la capacidad si cabe en el
        compartimento, pero el cargador del equipo está pensado para la
        original, así que no conviene alejarse mucho.
      </p>

      <h2>Te ayudamos con el cálculo</h2>
      <p>
        En <strong>PSE Power Batteries</strong> llevamos más de 30 años en
        energía de respaldo. Si necesitas más capacidad de la que da una sola
        batería, o no estás seguro del consumo de tu equipo, escríbenos por
        WhatsApp: armamos el arreglo contigo y te cotizamos sin costo. También
        puedes ver las opciones en el <Link href="/baterias">catálogo</Link>.
      </p>
    </>
  );
}

export const articulo: Articulo = {
  slug: "calcular-bateria-para-no-break",
  titulo: "Cómo calcular la batería para un no-break y su tiempo de respaldo",
  descripcion:
    "Aprende a calcular la batería para un no-break: la fórmula de watts, horas y voltaje, un ejemplo paso a paso y qué considerar para elegir la capacidad en Ah.",
  palabraClave: "calcular la batería para un no-break",
  fecha: "2026-10-08",
  categoria: "Guías",
  minutosLectura: 3,
  imagen: {
    src: "/media/portada-calcular-bateria-para-no-break.webp",
    alt: "Batería sellada de 12 V para no-break",
  },
  Contenido,
  preguntas: [
    {
      pregunta: "¿Cómo sé cuántos Ah necesita mi no-break?",
      respuesta:
        "Multiplica el consumo en watts por las horas de respaldo y divide el resultado entre el voltaje del sistema por 0.8. El resultado se redondea a la capacidad estándar siguiente.",
    },
    {
      pregunta: "¿Una batería de más Ah da más tiempo de respaldo?",
      respuesta:
        "Sí. Con el mismo consumo, a mayor capacidad en Ah, más tiempo de respaldo. Debe tener el mismo voltaje y terminal, y caber en el espacio del equipo.",
    },
    {
      pregunta: "¿Por qué mi no-break dura menos de lo calculado?",
      respuesta:
        "El cálculo es una estimación. En descargas muy rápidas la batería entrega menos energía, el equipo tiene pérdidas al convertirla, y la edad y el calor reducen la capacidad.",
    },
  ],
};
