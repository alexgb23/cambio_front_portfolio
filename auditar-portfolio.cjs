const fs = require("fs");
const path = require("path");

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const outputFile = path.join(root, "auditoria-portfolio.md");

const ignoredDirs = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
  ".cache",
  ".vercel",
  ".idea",
  ".vscode",
]);

const codeExts = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".sass",
  ".html",
  ".json",
  ".md",
]);

const state = {
  files: [],
  dirs: [],
  components: [],
  pages: [],
  hooks: [],
  contexts: [],
  cssClasses: new Map(),
  jsxClassUse: new Map(),
  imports: [],
  apiRefs: [],
  envRefs: new Set(),
  viteConfig: false,
  packageJson: null,
  missing: [],
  tree: [],
};

function walk(dir, rel = "", depth = 0) {
  let entries = [];
  try {
    entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => !ignoredDirs.has(e.name))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const relative = path.join(rel, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      state.dirs.push(relative);
      state.tree.push(`${"  ".repeat(depth)}📁 ${entry.name}/`);
      walk(full, relative, depth + 1);
    } else {
      state.files.push(relative);
      state.tree.push(`${"  ".repeat(depth)}📄 ${entry.name}`);
      analyzeFile(full, relative);
    }
  }
}

function safeRead(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function addMapCount(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

function analyzeFile(full, relative) {
  const ext = path.extname(relative).toLowerCase();
  if (!codeExts.has(ext)) return;

  const content = safeRead(full);
  if (!content) return;

  if (relative === "package.json") {
    try {
      state.packageJson = JSON.parse(content);
    } catch {}
  }

  if (relative.startsWith("src/pages/")) state.pages.push(relative);
  if (relative.startsWith("src/hooks/")) state.hooks.push(relative);
  if (/context/i.test(relative)) state.contexts.push(relative);
  if (
    relative === "vite.config.js" ||
    relative === "vite.config.ts" ||
    relative === "vite.config.mjs"
  ) {
    state.viteConfig = true;
  }

  if (
    /function\s+[A-Z][A-Za-z0-9_]*/.test(content) ||
    /const\s+[A-Z][A-Za-z0-9_]*\s*=\s*\(/.test(content) ||
    /export\s+default\s+function\s+[A-Z]/.test(content)
  ) {
    if (relative.startsWith("src/")) state.components.push(relative);
  }

  const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
  let m;
  while ((m = importRegex.exec(content))) {
    state.imports.push({ file: relative, import: m[1] });
  }

  if ([".css", ".scss", ".sass"].includes(ext)) {
    const classRegexCss = /\.([a-zA-Z_-][a-zA-Z0-9_-]*)/g;
    while ((m = classRegexCss.exec(content)))
      addMapCount(state.cssClasses, m[1]);
  }

  const classRegexJsx = /className\s*=\s*["'`]([^"'`]+)["'`]/g;
  while ((m = classRegexJsx.exec(content))) {
    m[1]
      .split(/\s+/)
      .filter(Boolean)
      .forEach((c) => addMapCount(state.jsxClassUse, c));
  }

  const apiRegexes = [
    /axios\.(get|post|put|delete|patch)\(([^)]+)\)/g,
    /fetch\(([^)]+)\)/g,
    /https?:\/\/[^\s'"`]+/g,
    /\/api\/[A-Za-z0-9_\-\/{}]+/g,
  ];

  for (const rgx of apiRegexes) {
    while ((m = rgx.exec(content))) {
      state.apiRefs.push({ file: relative, ref: m[0] });
    }
  }

  const envRegex = /import\.meta\.env\.([A-Z0-9_]+)/g;
  while ((m = envRegex.exec(content))) state.envRefs.add(m[1]);
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function assessMissing() {
  const checks = [
    ["src/main.jsx", "Falta src/main.jsx"],
    ["index.html", "Falta index.html"],
    ["package.json", "Falta package.json"],
    ["src/pages", "No existe carpeta src/pages"],
    ["src/components", "No existe carpeta src/components"],
    ["src/style", "No existe carpeta src/style o estilos globales"],
  ];

  for (const [file, msg] of checks) {
    if (!exists(file)) state.missing.push(msg);
  }

  if (
    !exists("vite.config.js") &&
    !exists("vite.config.ts") &&
    !exists("vite.config.mjs")
  ) {
    state.missing.push("No existe vite.config.*");
  }

  if (!exists(".env") && !exists(".env.local") && !exists(".env.development")) {
    state.missing.push("No existe archivo .env, .env.local o .env.development");
  }

  if (
    !state.files.some(
      (f) =>
        f.includes("/services/") ||
        f.includes("/api/") ||
        /api\.(js|jsx|ts|tsx)$/.test(f),
    )
  ) {
    state.missing.push(
      "No se detecta una capa clara de servicios/API; revisa si la lógica está mezclada en componentes",
    );
  }

  if (state.envRefs.size === 0) {
    state.missing.push(
      "No se detectaron variables import.meta.env; revisa si la URL de la API Laravel está hardcodeada",
    );
  }

  if (!state.files.some((f) => /router|routes/i.test(f))) {
    state.missing.push("No se detecta archivo claro de rutas/router");
  }

  if (!state.files.some((f) => /seo|helmet|meta/i.test(f))) {
    state.missing.push(
      "No se detecta gestión SEO/meta por componentes o páginas",
    );
  }
}

function topEntries(map, limit = 100) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

walk(root);
assessMissing();

const deps = state.packageJson?.dependencies || {};
const devDeps = state.packageJson?.devDependencies || {};

const report = `# Auditoría del portfolio

## Resumen
- Ruta analizada: ${root}
- Carpetas: ${state.dirs.length}
- Archivos: ${state.files.length}
- Páginas detectadas: ${state.pages.length}
- Componentes detectados: ${state.components.length}
- Hooks detectados: ${state.hooks.length}
- Contextos detectados: ${state.contexts.length}
- Referencias API detectadas: ${state.apiRefs.length}
- Variables de entorno detectadas: ${state.envRefs.size}

## Stack detectado
- Vite config detectado: ${state.viteConfig ? "Sí" : "No"}
- React detectado: ${deps.react || devDeps.react ? "Sí" : "No"}
- Laravel API: ${state.apiRefs.length ? "Probables referencias encontradas" : "No detectado automáticamente"}

### Dependencias
${
  Object.entries(deps)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n") || "- Sin dependencias detectadas"
}

### DevDependencies
${
  Object.entries(devDeps)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n") || "- Sin devDependencies detectadas"
}

## Estructura
\`\`\`
${state.tree.slice(0, 1500).join("\n")}
\`\`\`

## Páginas
${state.pages.map((x) => `- ${x}`).join("\n") || "- No detectadas"}

## Componentes
${
  state.components
    .slice(0, 400)
    .map((x) => `- ${x}`)
    .join("\n") || "- No detectados"
}

## Hooks
${state.hooks.map((x) => `- ${x}`).join("\n") || "- No detectados"}

## Contextos
${state.contexts.map((x) => `- ${x}`).join("\n") || "- No detectados"}

## Variables de entorno
${
  [...state.envRefs]
    .sort()
    .map((x) => `- ${x}`)
    .join("\n") || "- No detectadas"
}

## Referencias API
${
  state.apiRefs
    .slice(0, 300)
    .map((x) => `- ${x.file}: ${x.ref}`)
    .join("\n") || "- No detectadas"
}

## Clases CSS definidas
${
  topEntries(state.cssClasses)
    .map(([k, v]) => `- .${k} (${v})`)
    .join("\n") || "- No detectadas"
}

## Clases usadas en JSX
${
  topEntries(state.jsxClassUse)
    .map(([k, v]) => `- ${k} (${v})`)
    .join("\n") || "- No detectadas"
}

## Imports detectados
${
  state.imports
    .slice(0, 400)
    .map((x) => `- ${x.file} -> ${x.import}`)
    .join("\n") || "- No detectados"
}

## Posibles faltantes o puntos a revisar
${state.missing.map((x) => `- ${x}`).join("\n") || "- No se detectan faltantes obvios"}

## Cosas que deberías revisar en un portfolio React + Vite + Laravel API
- URL base de API mediante import.meta.env.VITE_API_URL.
- Capa de servicios separada para llamadas a Laravel.
- Estados de carga, error y vacío en cada sección que consume API.
- Manejo de SEO, title, description, Open Graph y canonical.
- Lazy loading de páginas o secciones pesadas.
- Estructura clara entre pages, components, hooks, services y assets.
- Comprobación de componentes huérfanos no usados.
- Accesibilidad: headings, alt, aria-label y contraste.
- Limpieza de clases no usadas o estilos duplicados.
`;

fs.writeFileSync(outputFile, report, "utf8");
console.log(`Informe generado: ${outputFile}`);
