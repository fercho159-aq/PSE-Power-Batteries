# Guía: correo de Hostinger en el celular y en Gmail

Para: cliente de PSE Power Batteries · sesión de las 9:00 am

## Antes de empezar (tener a la mano)

- Correo completo (ej. `contacto@psepowerbatteries.com`) y su **contraseña**.
  Si no la sabe: hPanel → **Correos** → el buzón → **Cambiar contraseña**.
- Celular con la app **Gmail** instalada y su cuenta de Gmail ya abierta.

Datos del servidor de Hostinger:

| | Servidor | Puerto | Seguridad |
|---|---|---|---|
| Entrante (IMAP) | `imap.hostinger.com` | 993 | SSL/TLS |
| Saliente (SMTP) | `smtp.hostinger.com` | 465 | SSL/TLS |

Usuario = el correo completo. Contraseña = la del buzón (no la de Gmail).

---

## 1. En el celular: app Gmail (Android y iPhone)

1. Abrir Gmail → tocar la **foto de perfil** (arriba a la derecha).
2. **Agregar otra cuenta** → **Otra** (en iPhone: **Otra (IMAP)**).
3. Escribir el correo de Hostinger → **Configuración manual** → **Personal (IMAP)**.
4. Escribir la contraseña del buzón.
5. Entrante: `imap.hostinger.com`, puerto **993**, **SSL/TLS**.
6. Saliente: `smtp.hostinger.com`, puerto **465**, **SSL/TLS**, activar
   **Solicitar acceso**, mismo usuario y contraseña.
7. Frecuencia de sincronización: **15 minutos**, activar **Notificarme**.
8. Nombre visible: **Nombre Apellido · PSE Power Batteries**.

Resultado: en la foto de perfil puede cambiar entre su Gmail y el correo de la
empresa. Al redactar, en el campo **De** elige desde cuál envía.

> En iPhone también se puede agregar en **Ajustes → Mail → Cuentas → Agregar
> cuenta → Otra** con los mismos datos, para usar la app Mail de Apple.

## 2. En la computadora: recibir en Gmail y responder como la empresa

Gmail ya no permite **Consultar el correo de otras cuentas** (POP). En su
lugar, se usan dos pasos:

**a) Reenviar de Hostinger a Gmail**
hPanel → **Correos** → **Reenviadores** → **Crear reenviador**:
de `contacto@psepowerbatteries.com` a su `@gmail.com`.
Así todo lo que llega a la empresa también llega a Gmail.

**b) Enviar como la empresa desde Gmail**
Gmail web → ⚙️ **Ver toda la configuración** → **Cuentas e importación** →
**Enviar correo como** → **Añadir otra dirección de correo**:

- Nombre: **Nombre Apellido · PSE Power Batteries**
- Correo: el de Hostinger; dejar marcado **Tratar como un alias**
- Servidor SMTP `smtp.hostinger.com`, puerto **465**, **SSL**, usuario y
  contraseña del buzón
- Gmail envía un **código de confirmación** a ese correo (llega por el
  reenviador del paso a); pegarlo para terminar.

Extra: en la misma pantalla marcar **Responder desde la misma dirección a la
que se envió el mensaje**, para que al responder a un cliente salga del correo
de la empresa.

## Si algo falla

- **"Contraseña incorrecta":** la contraseña es la del buzón de Hostinger;
  restablecerla en hPanel y volver a intentar.
- **No envía:** revisar que el saliente sea puerto **465 + SSL** (no 587).
- **No llega el código de Gmail:** revisar que el reenviador esté activo o
  entrar a `webmail.hostinger.com` a copiarlo.
