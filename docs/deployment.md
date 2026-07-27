# Frontend Deployment

Este documento resume cómo se despliega el frontend del portfolio, qué configuración necesita y qué puntos conviene revisar cuando cambie la infraestructura.

## Resumen

El frontend está desplegado en Cloudflare con dominio propio:

- Producción: `https://alex.syskovex.com`

La aplicación se construye con Vite y genera su salida en la carpeta `dist/`, que es el directorio publicado en producción. Cloudflare Pages documenta para proyectos Vite un flujo de build con `npm run build` y salida en `dist`. [web:161]

## Proveedor de despliegue

### Cloudflare

El frontend se publica en Cloudflare Pages con dominio personalizado. Cloudflare permite conectar dominios o subdominios personalizados a un proyecto Pages desde la sección **Workers & Pages** y configurar el dominio desde **Custom domains**. [web:61]

## Dominio público

- Dominio principal del frontend: `alex.syskovex.com`

Si el proyecto está conectado a un subdominio, Cloudflare Pages puede usar un registro CNAME apuntando al subdominio `*.pages.dev` del proyecto. La documentación de Cloudflare indica que para subdominios puede configurarse mediante un CNAME hacia el proyecto Pages. [web:61]

## Flujo de despliegue esperado

```text
GitHub repository
  -> Cloudflare Pages build
  -> npm install
  -> npm run build
  -> output: dist/
  -> publicación en alex.syskovex.com
```

Cloudflare Pages puede reconstruir y desplegar automáticamente el proyecto con cada nuevo commit cuando el repositorio está conectado al servicio. [web:161]

## Configuración de build

Configuración esperada en Cloudflare Pages:

- **Framework preset**: Vite o configuración equivalente
- **Build command**: `npm run build`
- **Build output directory**: `dist`

Cloudflare documenta ese mismo patrón de despliegue para proyectos Vite publicados en Pages. [web:161]

## Variables de entorno necesarias

La variable principal usada por el frontend es:

```env
VITE_API_URL=https://portfolio-api.syskovex.com
```

Esta variable debe configurarse tanto en local como en el proveedor de despliegue si quieres que la build apunte al backend correcto. Vite expone variables con prefijo `VITE_` a través de `import.meta.env`. [web:49][web:159]

## Relación con la API

El frontend no llama directamente a un backend embebido ni a funciones locales. Toda la carga principal de datos se resuelve contra la API Laravel pública:

- Base backend: `https://portfolio-api.syskovex.com`
- Base usada por Axios: `https://portfolio-api.syskovex.com/api`

Regla importante:
- `VITE_API_URL` debe apuntar al dominio base sin `/api`
- `src/services/api.js` añade `/api` internamente

## Configuración del proyecto

### Scripts usados en build

```bash
npm install
npm run build
```

### Salida generada

```text
dist/
```

## Build local de comprobación

Antes de desplegar, conviene validar la build localmente:

```bash
npm install
npm run build
npm run preview
```

Esto permite comprobar que el proyecto genera correctamente la carpeta `dist/` y que no depende de configuraciones no presentes en producción. El flujo `build -> preview` forma parte de la forma habitual de validar un proyecto Vite antes del despliegue. [web:49][web:161]

## Archivos públicos relevantes

En el proyecto ya existen varios archivos públicos y de soporte de publicación:

- `_headers`
- `_redirects`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `og-image.jpg`
- favicons
- assets WebP y AVIF
- `llms.txt`

Estos archivos ayudan a definir cabeceras, redirecciones, indexación, metadata y assets públicos del sitio.

## Checklist de despliegue

Antes de dar por buena una publicación:

- Revisar que `VITE_API_URL` apunte al backend correcto.
- Ejecutar `npm run build` sin errores.
- Confirmar que la salida se genera en `dist/`.
- Verificar navegación por rutas principales.
- Verificar carga de datos desde la API.
- Verificar assets públicos y metadatos.
- Probar versión pública en `alex.syskovex.com`.

## Problemas comunes

### La app carga pero no trae datos

Revisar:
- valor de `VITE_API_URL`
- disponibilidad del backend
- errores CORS
- endpoints reales consumidos por `src/services/api.js`

### La build funciona local pero no en producción

Revisar:
- variables de entorno configuradas en Cloudflare
- rutas de assets
- salida `dist/`
- dependencias faltantes o no instaladas en CI

### El dominio no resuelve correctamente

Si el dominio personalizado deja de apuntar al proyecto, Cloudflare indica revisar la configuración del dominio en **Custom domains** y el registro DNS asociado al proyecto Pages. [web:61]

## Relación con otros documentos

- `README.md`: visión general del proyecto
- `docs/architecture.md`: organización interna del frontend
- `docs/env.md`: variables de entorno y reglas de configuración