# Frontend Architecture

Documento de arquitectura del frontend del portfolio. Su objetivo es explicar cómo está organizado el proyecto, cómo fluye la información desde la API Laravel hasta la interfaz y qué decisiones estructurales conviene respetar al seguir evolucionando la aplicación. [web:124][web:149]

## Objetivo

Este frontend está construido como una SPA en React + Vite y consume contenido dinámico desde una API Laravel externa. La arquitectura busca separar navegación, presentación, acceso a datos y lógica reutilizable para mantener el proyecto escalable, entendible y fácil de mantener.

## Contexto del sistema

```text
Usuario
  -> Frontend React/Vite (alex.syskovex.com)
  -> Cliente API centralizado (src/services/api.js)
  -> API Laravel (portfolio-api.syskovex.com/api)
  -> Respuesta JSON
  -> Hooks por página
  -> Componentes / Layout / Páginas
```

## Despliegue

- **Frontend público**: `https://alex.syskovex.com`
- **Backend API**: `https://portfolio-api.syskovex.com`
- **Base final consumida por Axios**: `https://portfolio-api.syskovex.com/api`

El frontend está desplegado en Cloudflare con dominio propio y el backend está desplegado en Render. La conexión con la API se resuelve mediante `VITE_API_URL`, expuesta por Vite en cliente con `import.meta.env`. [web:49][web:61][web:78]

## Principios de arquitectura

- Separar acceso a datos de la UI.
- Mantener rutas y navegación centralizadas.
- Encapsular la lógica de carga por dominio de página.
- Reutilizar layout y secciones comunes.
- Evitar hardcodear contenido que ya existe en backend.
- Hacer que cada capa tenga una responsabilidad clara.

## Capas del frontend

### 1. Entrada de aplicación

Archivos principales:
- `src/main.jsx`
- `src/App.jsx`

Responsabilidades:
- montar React en el DOM;
- envolver la aplicación con `BrowserRouter`;
- controlar comportamiento global de navegación;
- delegar el árbol de rutas al router principal.

### 2. Router

Archivo principal:
- `src/router/index.jsx`

Responsabilidades:
- definir rutas públicas;
- aplicar carga diferida por página;
- renderizar las vistas dentro de `MainLayout`;
- redirigir rutas no válidas a `/`.

Rutas actuales:
- `/`
- `/sobre-mi`
- `/certificaciones`
- `/proyectos`
- `/proyectos/:slug`
- `/contacto`
- `/laboratorio`

### 3. Layout y navegación

Archivos principales:
- `src/layout/MainLayout.jsx`
- `src/layout/navbar/Navbar.jsx`
- `src/layout/sections/*`

Responsabilidades:
- definir estructura compartida entre páginas;
- renderizar navbar, secciones comunes y outlet;
- compartir contexto entre layout y páginas hijas cuando sea necesario;
- mantener consistencia visual y estructural.

### 4. Páginas

Ubicación:
- `src/pages/*`

Responsabilidades:
- representar cada vista pública del portfolio;
- coordinar hooks, layout parcial y componentes específicos;
- componer la UI final de cada sección visible por ruta.

Páginas actuales:
- `home`
- `about`
- `certificaciones`
- `projects`
- `project detail`
- `contact`
- `laboratory`

### 5. Hooks

Ubicación:
- `src/hooks/core/*`
- `src/hooks/pages/*`
- `src/hooks/*.js`

Responsabilidades:
- encapsular lógica reutilizable;
- desacoplar fetch, estado, loading y errores de la presentación;
- agrupar la lógica de consumo por dominio funcional.

Hooks principales detectados:
- `usePortfolioHome`
- `usePortfolioAbout`
- `useProjects`
- `useProjectDetail`
- `useLaboratoryHome`
- `useContactChat`
- `usePageTitle`
- `usePortfolioData`
- `useAsyncResource`

### 6. Servicios

Archivo principal:
- `src/services/api.js`

Responsabilidades:
- centralizar el acceso HTTP;
- construir la base URL de la API;
- exponer servicios agrupados por dominio;
- normalizar errores de red y de backend.

Servicios expuestos:
- `portfolioService`
- `laboratoriosRealesService`
- `contactService`

### 7. Componentes reutilizables

Ubicación:
- `src/components/*`
- `src/modal/*`

Responsabilidades:
- encapsular piezas de interfaz reutilizables;
- permitir composición de páginas sin duplicar UI;
- aislar elementos complejos como tarjetas y modal del CV.

Bloques detectados:
- tarjetas de proyecto;
- tarjetas de laboratorio;
- modal de CV;
- subcomponentes del CV.

### 8. Estilos

Ubicación:
- `src/style/*`
- CSS locales por componente o página;
- CSS Modules en partes del CV.

Responsabilidades:
- separar estilos globales de estilos locales;
- mantener consistencia visual entre páginas;
- aislar estilos específicos cuando un bloque lo requiere.

## Flujo de datos

El flujo de datos estándar sigue este patrón:

```text
Página
  -> Hook de página
  -> Servicio API
  -> Axios / fetch
  -> API Laravel
  -> JSON
  -> Hook transforma / organiza estado
  -> Página renderiza componentes
```

Ejemplo conceptual:
- `Home.jsx` consume un hook de página;
- el hook llama a `portfolioService.getHomeData()`;
- `api.js` resuelve la petición contra `VITE_API_URL + /api`;
- la respuesta vuelve al hook;
- la página renderiza la vista final.

## Gestión de navegación

La navegación usa `react-router` y una estrategia de lazy loading por página.

### Decisiones actuales

- Cada vista principal se carga con `lazy()`.
- Cada ruta se envuelve con `Suspense`.
- Las rutas desconocidas redirigen a `/`.
- `App.jsx` controla el scroll global al cambiar de página.

### Scroll behavior

En `App.jsx`:
- si la navegación es `POP`, no se modifica el scroll;
- si la navegación es `PUSH`, la ventana vuelve arriba.

Esto evita romper la experiencia al usar atrás/adelante del navegador y mejora el comportamiento general de una SPA.

## Configuración de entorno

Archivo esperado:
- `.env`
- `.env.example`

Variable principal:
```env
VITE_API_URL=https://portfolio-api.syskovex.com
```

### Regla importante

`VITE_API_URL` debe apuntar al dominio base del backend, **sin** `/api`, porque `src/services/api.js` ya lo añade internamente:

```js
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000"
).replace(/\/$/, "");
const API_BASE_URL = `${API_URL}/api`;
```

## Decisiones técnicas relevantes

### Cliente API centralizado

Toda la comunicación principal con backend debe pasar por `src/services/api.js` para:
- evitar duplicación;
- mantener una sola base URL;
- unificar headers, timeout y manejo de errores.

### Hooks por página

La lógica de datos no se deja directamente dentro de los componentes de página cuando puede separarse en hooks. Esto facilita mantenimiento, reutilización y lectura del código.

### Lazy loading por rutas

Las páginas se cargan de forma diferida para reducir el peso inicial del frontend y dividir mejor el bundle.

### Layout compartido

Las rutas públicas viven dentro de `MainLayout`, lo que permite mantener una estructura común y consistente.

## Mapa rápido de archivos clave

### Entrada
- `src/main.jsx`
- `src/App.jsx`

### Navegación
- `src/router/index.jsx`

### Layout
- `src/layout/MainLayout.jsx`
- `src/layout/navbar/Navbar.jsx`

### Datos
- `src/services/api.js`
- `src/hooks/core/useAsyncResource.js`
- `src/hooks/pages/*`

### Páginas
- `src/pages/home/Home.jsx`
- `src/pages/about/About.jsx`
- `src/pages/certificaciones/Certificaciones.jsx`
- `src/pages/projects/Projects.jsx`
- `src/pages/projects/ProjectDetail.jsx`
- `src/pages/contact/Contact.jsx`
- `src/pages/laboratory/Laboratory.jsx`

### UI reutilizable
- `src/components/cards/*`
- `src/modal/*`

## Optimización y build

La build está gestionada por Vite con configuración personalizada en `vite.config.js`.

### Ajustes actuales

- polling en desarrollo para evitar problemas de watch en Windows;
- `manualChunks()` para separar React y vendors;
- soporte para análisis de bundle con `rollup-plugin-visualizer`;
- límite de advertencia de chunk ajustado.

## Restricciones e invariantes

Estas reglas conviene mantenerlas mientras evoluciona el proyecto:

- No incluir `/api` dentro de `VITE_API_URL`.
- No duplicar lógica HTTP fuera de `src/services/api.js` salvo casos muy justificados.
- Mantener las rutas públicas centralizadas en `src/router/index.jsx`.
- Mantener los hooks de datos desacoplados de la UI.
- No mezclar lógica de backend dentro del frontend.
- Respetar los slugs públicos ya existentes mientras dependan del SEO, navegación o enlaces externos.

## Evolución prevista

A corto y medio plazo, esta arquitectura está preparada para:
- completar `Projects` y `Laboratory`;
- ampliar contenido servido desde backend;
- añadir más componentes reutilizables;
- seguir mejorando rendimiento, estructura y documentación técnica.

## Punto de entrada recomendado para nuevos cambios

Si alguien entra nuevo al proyecto, el recorrido recomendado es:

1. `src/main.jsx`
2. `src/App.jsx`
3. `src/router/index.jsx`
4. `src/layout/MainLayout.jsx`
5. `src/services/api.js`
6. `src/hooks/pages/*`
7. `src/pages/*`

Ese recorrido permite entender primero arranque, navegación, layout, acceso a datos y después la implementación de cada vista.

## Relación con README

- `README.md`: visión general, instalación, variables, despliegue y uso rápido.
- `docs/architecture.md`: organización interna, flujo de datos y decisiones de estructura.

## Estado actual

La base del frontend ya está preparada para seguir creciendo como portfolio desacoplado. La navegación principal, la integración con la API, la organización por capas y el despliegue público están definidos, mientras que algunas vistas siguen en evolución funcional y visual.