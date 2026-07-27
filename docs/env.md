# Frontend Environment Variables

Este documento describe las variables de entorno usadas por el frontend del portfolio y cómo deben configurarse en local y en producción.

## Regla principal

El frontend utiliza variables de entorno de Vite. Solo las variables con prefijo `VITE_` quedan expuestas al código cliente mediante `import.meta.env`. Esa es la convención oficial de Vite para variables accesibles desde frontend. [web:49][web:159]

## Variable actual

### `VITE_API_URL`

Define el dominio base del backend Laravel consumido por el frontend.

Ejemplo en producción:

```env
VITE_API_URL=https://portfolio-api.syskovex.com
```

Ejemplo en local:

```env
VITE_API_URL=http://localhost:8000
```

## Cómo se usa en el proyecto

El frontend construye internamente la base final de la API desde `src/services/api.js`:

```js
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8000"
).replace(/\/$/, "");
const API_BASE_URL = `${API_URL}/api`;
```

Resultado esperado en producción:

```text
https://portfolio-api.syskovex.com/api
```

Resultado esperado en local:

```text
http://localhost:8000/api
```

## Regla crítica

No añadas `/api` dentro de `VITE_API_URL`.

### Correcto

```env
VITE_API_URL=https://portfolio-api.syskovex.com
```

### Incorrecto

```env
VITE_API_URL=https://portfolio-api.syskovex.com/api
```

Si añades `/api` al valor, el frontend generará rutas duplicadas como:

```text
https://portfolio-api.syskovex.com/api/api/...
```

## Archivos recomendados

### `.env.example`

Debe existir en el repositorio con un valor de ejemplo no sensible:

```env
VITE_API_URL=https://portfolio-api.syskovex.com
```

### `.env`

Archivo local para desarrollo. No debe subirse con secretos o valores privados no deseados.

Ejemplo:

```env
VITE_API_URL=http://localhost:8000
```

## Entornos habituales

### Desarrollo local

```env
VITE_API_URL=http://localhost:8000
```

Se usa cuando el backend Laravel corre en local.

### Producción

```env
VITE_API_URL=https://portfolio-api.syskovex.com
```

Se usa en la build del sitio desplegado públicamente.

## Buenas prácticas

- Mantener `.env.example` actualizado.
- No subir secretos innecesarios a Git.
- Reiniciar el servidor de desarrollo si cambias variables.
- Usar siempre prefijo `VITE_`.
- No asumir que una variable nueva estará disponible si no sigue la convención de Vite. Vite documenta expresamente que solo expone variables con ese prefijo al código cliente. [web:49]

## Comprobación rápida

Para validar la variable en local:

1. Crear `.env`
2. Añadir `VITE_API_URL`
3. Ejecutar:

```bash
npm run dev
```

Si cambias el valor mientras el servidor ya está arrancado, puede ser necesario reiniciarlo para que Vite recargue correctamente las variables de entorno. Ese comportamiento también es habitual en proyectos con `import.meta.env`. [web:160][web:165]

## Relación con el código

Archivos relacionados:

- `src/services/api.js`
- `src/hooks/pages/useContactChat.js`
- `.env`
- `.env.example`

## Relación con otros documentos

- `README.md`: setup general
- `docs/architecture.md`: flujo interno del frontend
- `docs/deployment.md`: despliegue y publicación