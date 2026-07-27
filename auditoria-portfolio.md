# Auditoría del portfolio

## Resumen
- Ruta analizada: C:\portfolio-frontend
- Carpetas: 25
- Archivos: 104
- Páginas detectadas: 17
- Componentes detectados: 25
- Hooks detectados: 10
- Contextos detectados: 0
- Referencias API detectadas: 280
- Variables de entorno detectadas: 1

## Stack detectado
- Vite config detectado: Sí
- React detectado: Sí
- Laravel API: Probables referencias encontradas

### Dependencias
- axios: ^1.16.1
- react: ^19.2.6
- react-dom: ^19.2.6
- react-icons: ^5.6.0
- react-router-dom: ^6.30.4

### DevDependencies
- @eslint/js: ^10.0.1
- @types/react: ^19.2.14
- @types/react-dom: ^19.2.3
- @vitejs/plugin-react: ^6.0.1
- eslint: ^10.3.0
- eslint-plugin-react-hooks: ^7.1.1
- eslint-plugin-react-refresh: ^0.5.2
- globals: ^17.6.0
- stylelint: ^17.14.0
- stylelint-config-standard: ^40.0.0
- vite: ^8.0.12

## Estructura
```
📄 .env
📄 .gitignore
📄 .stylelintrc.json
📄 # 1. Navegar a la unidad C.txt
📄 auditar-portfolio.cjs
📄 eslint.config.js
📄 index.html
📄 info_frontend.txt
📄 package-lock.json
📄 package.json
📁 public/
  📄 _headers
  📄 _redirects
  📄 apple-touch-icon-114x114.png
  📄 apple-touch-icon-120x120.png
  📄 apple-touch-icon-180x180.png
  📄 apple-touch-icon-57x57.png
  📄 apple-touch-icon.png
  📄 avatar-nav-144.webp
  📄 avatar-nav-72.webp
  📄 favicon-114.png
  📄 favicon-120.png
  📄 favicon-128.png
  📄 favicon-16.png
  📄 favicon-180.png
  📄 favicon-256.png
  📄 favicon-32.png
  📄 favicon-48.png
  📄 favicon-512.png
  📄 favicon-57.png
  📄 favicon-64.png
  📄 favicon.ico
  📁 fonts/
    📄 inter-v20-latin-700italic.woff2
    📄 inter-v20-latin-regular.woff2
    📄 space-grotesk-v22-latin-700.woff2
    📄 space-grotesk-v22-latin-regular.woff2
  📄 icons.svg
  📄 imagen_portfolio_mia_retocada-1280.avif
  📄 imagen_portfolio_mia_retocada-1280.webp
  📄 imagen_portfolio_mia_retocada-480.avif
  📄 imagen_portfolio_mia_retocada-480.webp
  📄 imagen_portfolio_mia_retocada-768.avif
  📄 imagen_portfolio_mia_retocada-768.webp
  📄 imagen_portfolio_mia_retocada-960.avif
  📄 imagen_portfolio_mia_retocada-960.webp
  📄 llms.txt
  📄 og-image.jpg
  📄 robots.txt
  📄 site.webmanifest
  📄 sitemap.xml
📄 README.md
📁 src/
  📄 App.jsx
  📁 assets/
    📄 hero.png
    📄 react.svg
    📄 vite.svg
  📁 components/
    📁 cards/
      📄 Cards.css
      📄 MetricCard.jsx
      📄 NodeCard.jsx
      📄 ProjectCard.jsx
      📄 ServerCard.jsx
    📁 layout/
      📄 MainLayout.jsx
      📁 Navbar/
        📄 Navbar.css
        📄 Navbar.jsx
    📁 sections/
      📁 aboutPreview/
        📄 AboutPreview.jsx
      📄 ContactPreview.jsx
      📄 FeaturedLaboratory.jsx
      📄 FeaturedProjects.css
      📄 FeaturedProjects.jsx
      📁 heroSection/
        📄 HeroSection.css
        📄 HeroSection.jsx
  📁 data/
  📁 hooks/
    📁 core/
      📄 useAsyncResource.js
    📄 HOOK_USAGE_EXAMPLES.txt
    📁 pages/
      📄 useContactChat.js
      📄 useLaboratoryDetail.js
      📄 useLaboratoryHome.js
      📄 useLaboratoryList.js
      📄 usePortfolioHome.js
      📄 useProjectDetail.js
      📄 useProjects.js
    📄 usePageTitle.js
    📄 usePortfolioData.js
  📄 main.jsx
  📁 pages/
    📁 about/
      📄 About.css
      📄 About.jsx
      📄 AboutSkeleton.jsx
    📁 automation/
      📄 Automation.css
      📄 Automation.jsx
    📁 contact/
      📄 Contact.css
      📄 Contact.jsx
      📄 ContactSkeleton.jsx
    📁 home/
      📄 Home.jsx
      📄 HomeSkeleton.jsx
    📁 infrastructure/
      📄 Infrastructure.jsx
    📁 laboratory/
      📄 Laboratory.css
      📄 Laboratory.jsx
      📄 LaboratoryDetail.jsx
      📄 LaboratorySkeleton.jsx
    📁 projects/
      📄 Projects.jsx
      📄 ProjectsSkeleton.jsx
  📁 services/
    📄 api.js
  📁 style/
    📄 GlobalCardsPages.css
    📄 globals.css
    📄 GlobalSections.css
    📄 Skeletons.css
📄 vite.config.js
```

## Páginas
- src/pages/about/About.css
- src/pages/about/About.jsx
- src/pages/about/AboutSkeleton.jsx
- src/pages/automation/Automation.css
- src/pages/automation/Automation.jsx
- src/pages/contact/Contact.css
- src/pages/contact/Contact.jsx
- src/pages/contact/ContactSkeleton.jsx
- src/pages/home/Home.jsx
- src/pages/home/HomeSkeleton.jsx
- src/pages/infrastructure/Infrastructure.jsx
- src/pages/laboratory/Laboratory.css
- src/pages/laboratory/Laboratory.jsx
- src/pages/laboratory/LaboratoryDetail.jsx
- src/pages/laboratory/LaboratorySkeleton.jsx
- src/pages/projects/Projects.jsx
- src/pages/projects/ProjectsSkeleton.jsx

## Componentes
- src/App.jsx
- src/components/cards/MetricCard.jsx
- src/components/cards/NodeCard.jsx
- src/components/cards/ProjectCard.jsx
- src/components/cards/ServerCard.jsx
- src/components/layout/MainLayout.jsx
- src/components/layout/Navbar/Navbar.jsx
- src/components/sections/aboutPreview/AboutPreview.jsx
- src/components/sections/ContactPreview.jsx
- src/components/sections/FeaturedLaboratory.jsx
- src/components/sections/FeaturedProjects.jsx
- src/components/sections/heroSection/HeroSection.jsx
- src/pages/about/About.jsx
- src/pages/about/AboutSkeleton.jsx
- src/pages/automation/Automation.jsx
- src/pages/contact/Contact.jsx
- src/pages/contact/ContactSkeleton.jsx
- src/pages/home/Home.jsx
- src/pages/home/HomeSkeleton.jsx
- src/pages/infrastructure/Infrastructure.jsx
- src/pages/laboratory/Laboratory.jsx
- src/pages/laboratory/LaboratoryDetail.jsx
- src/pages/laboratory/LaboratorySkeleton.jsx
- src/pages/projects/Projects.jsx
- src/pages/projects/ProjectsSkeleton.jsx

## Hooks
- src/hooks/core/useAsyncResource.js
- src/hooks/pages/useContactChat.js
- src/hooks/pages/useLaboratoryDetail.js
- src/hooks/pages/useLaboratoryHome.js
- src/hooks/pages/useLaboratoryList.js
- src/hooks/pages/usePortfolioHome.js
- src/hooks/pages/useProjectDetail.js
- src/hooks/pages/useProjects.js
- src/hooks/usePageTitle.js
- src/hooks/usePortfolioData.js

## Contextos
- No detectados

## Variables de entorno
- VITE_API_URL

## Referencias API
- index.html: https://alex.syskovex.com/
- index.html: https://alex.syskovex.com/
- index.html: https://alex.syskovex.com/og-image.jpg
- index.html: https://alex.syskovex.com/og-image.jpg
- package-lock.json: https://opencollective.com/babel
- package-lock.json: https://registry.npmjs.org/@cacheable/memory/-/memory-2.0.9.tgz
- package-lock.json: https://registry.npmjs.org/@keyv/bigmap/-/bigmap-1.3.1.tgz
- package-lock.json: https://registry.npmjs.org/keyv/-/keyv-5.6.0.tgz
- package-lock.json: https://registry.npmjs.org/@cacheable/utils/-/utils-2.4.1.tgz
- package-lock.json: https://registry.npmjs.org/keyv/-/keyv-5.6.0.tgz
- package-lock.json: https://registry.npmjs.org/@csstools/css-calc/-/css-calc-3.2.1.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@csstools/css-parser-algorithms/-/css-parser-algorithms-4.0.0.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@csstools/css-syntax-patches-for-csstree/-/css-syntax-patches-for-csstree-1.1.5.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@csstools/css-tokenizer/-/css-tokenizer-4.0.0.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@csstools/media-query-list-parser/-/media-query-list-parser-5.0.0.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@csstools/selector-resolve-nested/-/selector-resolve-nested-4.0.0.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@csstools/selector-specificity/-/selector-specificity-6.0.0.tgz
- package-lock.json: https://github.com/sponsors/csstools
- package-lock.json: https://opencollective.com/csstools
- package-lock.json: https://registry.npmjs.org/@emnapi/core/-/core-1.11.1.tgz
- package-lock.json: https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.1.tgz
- package-lock.json: https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.2.tgz
- package-lock.json: https://opencollective.com/eslint
- package-lock.json: https://opencollective.com/eslint
- package-lock.json: https://eslint.org/donate
- package-lock.json: https://github.com/sponsors/nzakas
- package-lock.json: https://github.com/sponsors/nzakas
- package-lock.json: https://registry.npmjs.org/@keyv/serialize/-/serialize-1.1.1.tgz
- package-lock.json: https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.6.tgz
- package-lock.json: https://github.com/sponsors/Brooooooklyn
- package-lock.json: https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz
- package-lock.json: https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz
- package-lock.json: https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz
- package-lock.json: https://github.com/sponsors/Boshen
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.1.3.tgz
- package-lock.json: https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.1.tgz
- package-lock.json: https://registry.npmjs.org/@sindresorhus/merge-streams/-/merge-streams-4.0.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.3.tgz
- package-lock.json: https://github.com/sponsors/epoberezkin
- package-lock.json: https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz
- package-lock.json: https://github.com/chalk/ansi-regex?sponsor=1
- package-lock.json: https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz
- package-lock.json: https://github.com/chalk/ansi-styles?sponsor=1
- package-lock.json: https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz
- package-lock.json: https://registry.npmjs.org/astral-regex/-/astral-regex-2.0.0.tgz
- package-lock.json: https://registry.npmjs.org/braces/-/braces-3.0.3.tgz
- package-lock.json: https://opencollective.com/browserslist
- package-lock.json: https://tidelift.com/funding/github/npm/browserslist
- package-lock.json: https://github.com/sponsors/ai
- package-lock.json: https://registry.npmjs.org/cacheable/-/cacheable-2.3.5.tgz
- package-lock.json: https://registry.npmjs.org/keyv/-/keyv-5.6.0.tgz
- package-lock.json: https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz
- package-lock.json: https://opencollective.com/browserslist
- package-lock.json: https://tidelift.com/funding/github/npm/caniuse-lite
- package-lock.json: https://github.com/sponsors/ai
- package-lock.json: https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz
- package-lock.json: https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz
- package-lock.json: https://registry.npmjs.org/colord/-/colord-2.9.3.tgz
- package-lock.json: https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-9.0.2.tgz
- package-lock.json: https://github.com/sponsors/d-fischer
- package-lock.json: https://registry.npmjs.org/css-functions-list/-/css-functions-list-3.3.3.tgz
- package-lock.json: https://registry.npmjs.org/css-tree/-/css-tree-3.2.1.tgz
- package-lock.json: https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz
- package-lock.json: https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz
- package-lock.json: https://registry.npmjs.org/env-paths/-/env-paths-2.2.1.tgz
- package-lock.json: https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://eslint.org/donate
- package-lock.json: https://opencollective.com/eslint
- package-lock.json: https://opencollective.com/eslint
- package-lock.json: https://opencollective.com/eslint
- package-lock.json: https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz
- package-lock.json: https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz
- package-lock.json: https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.2.tgz
- package-lock.json: https://github.com/sponsors/fastify
- package-lock.json: https://opencollective.com/fastify
- package-lock.json: https://registry.npmjs.org/fastest-levenshtein/-/fastest-levenshtein-1.0.16.tgz
- package-lock.json: https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz
- package-lock.json: https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://github.com/sponsors/RubenVerborgh
- package-lock.json: https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz
- package-lock.json: https://github.com/sponsors/ljharb
- package-lock.json: https://registry.npmjs.org/get-east-asian-width/-/get-east-asian-width-1.6.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://github.com/sponsors/ljharb
- package-lock.json: https://registry.npmjs.org/global-modules/-/global-modules-2.0.0.tgz
- package-lock.json: https://registry.npmjs.org/global-prefix/-/global-prefix-3.0.0.tgz
- package-lock.json: https://registry.npmjs.org/which/-/which-1.3.1.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/globby/-/globby-16.2.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz
- package-lock.json: https://registry.npmjs.org/globjoin/-/globjoin-0.1.4.tgz
- package-lock.json: https://github.com/sponsors/ljharb
- package-lock.json: https://registry.npmjs.org/has-flag/-/has-flag-5.0.1.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://github.com/sponsors/ljharb
- package-lock.json: https://github.com/sponsors/ljharb
- package-lock.json: https://registry.npmjs.org/hashery/-/hashery-1.5.1.tgz
- package-lock.json: https://registry.npmjs.org/hookified/-/hookified-1.15.1.tgz
- package-lock.json: https://registry.npmjs.org/html-tags/-/html-tags-5.1.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/import-meta-resolve/-/import-meta-resolve-4.2.0.tgz
- package-lock.json: https://github.com/sponsors/wooorm
- package-lock.json: https://registry.npmjs.org/ini/-/ini-1.3.8.tgz
- package-lock.json: https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz
- package-lock.json: https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz
- package-lock.json: https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz
- package-lock.json: https://registry.npmjs.org/is-path-inside/-/is-path-inside-4.0.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/js-yaml/-/js-yaml-4.3.0.tgz
- package-lock.json: https://github.com/sponsors/puzrin
- package-lock.json: https://github.com/sponsors/nodeca
- package-lock.json: https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz
- package-lock.json: https://registry.npmjs.org/kind-of/-/kind-of-6.0.3.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://opencollective.com/parcel
- package-lock.json: https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/lodash.truncate/-/lodash.truncate-4.4.2.tgz
- package-lock.json: https://registry.npmjs.org/mathml-tag-names/-/mathml-tag-names-4.0.0.tgz
- package-lock.json: https://github.com/sponsors/wooorm
- package-lock.json: https://registry.npmjs.org/mdn-data/-/mdn-data-2.27.1.tgz
- package-lock.json: https://registry.npmjs.org/meow/-/meow-14.1.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz
- package-lock.json: https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz
- package-lock.json: https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz
- package-lock.json: https://github.com/sponsors/jonschlinkert
- package-lock.json: https://github.com/sponsors/isaacs
- package-lock.json: https://github.com/sponsors/ai
- package-lock.json: https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz
- package-lock.json: https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://github.com/sponsors/jonschlinkert
- package-lock.json: https://opencollective.com/postcss/
- package-lock.json: https://tidelift.com/funding/github/npm/postcss
- package-lock.json: https://github.com/sponsors/ai
- package-lock.json: https://registry.npmjs.org/postcss-safe-parser/-/postcss-safe-parser-7.0.1.tgz
- package-lock.json: https://opencollective.com/postcss/
- package-lock.json: https://tidelift.com/funding/github/npm/postcss-safe-parser
- package-lock.json: https://github.com/sponsors/ai
- package-lock.json: https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-7.1.4.tgz
- package-lock.json: https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz
- package-lock.json: https://registry.npmjs.org/qified/-/qified-0.10.1.tgz
- package-lock.json: https://registry.npmjs.org/hookified/-/hookified-2.2.0.tgz
- package-lock.json: https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz
- package-lock.json: https://github.com/sponsors/feross
- package-lock.json: https://www.patreon.com/feross
- package-lock.json: https://feross.org/support
- package-lock.json: https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz
- package-lock.json: https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz
- package-lock.json: https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz
- package-lock.json: https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz
- package-lock.json: https://github.com/sponsors/feross
- package-lock.json: https://www.patreon.com/feross
- package-lock.json: https://feross.org/support
- package-lock.json: https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz
- package-lock.json: https://github.com/sponsors/isaacs
- package-lock.json: https://registry.npmjs.org/slash/-/slash-5.1.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/slice-ansi/-/slice-ansi-4.0.0.tgz
- package-lock.json: https://github.com/chalk/slice-ansi?sponsor=1
- package-lock.json: https://registry.npmjs.org/string-width/-/string-width-8.2.1.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz
- package-lock.json: https://github.com/chalk/strip-ansi?sponsor=1
- package-lock.json: https://registry.npmjs.org/stylelint/-/stylelint-17.14.0.tgz
- package-lock.json: https://opencollective.com/stylelint
- package-lock.json: https://github.com/sponsors/stylelint
- package-lock.json: https://registry.npmjs.org/stylelint-config-recommended/-/stylelint-config-recommended-18.0.0.tgz
- package-lock.json: https://opencollective.com/stylelint
- package-lock.json: https://github.com/sponsors/stylelint
- package-lock.json: https://registry.npmjs.org/stylelint-config-standard/-/stylelint-config-standard-40.0.0.tgz
- package-lock.json: https://opencollective.com/stylelint
- package-lock.json: https://github.com/sponsors/stylelint
- package-lock.json: https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-11.1.3.tgz
- package-lock.json: https://registry.npmjs.org/flat-cache/-/flat-cache-6.1.22.tgz
- package-lock.json: https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz
- package-lock.json: https://registry.npmjs.org/supports-color/-/supports-color-10.2.2.tgz
- package-lock.json: https://github.com/chalk/supports-color?sponsor=1
- package-lock.json: https://registry.npmjs.org/supports-hyperlinks/-/supports-hyperlinks-4.5.0.tgz
- package-lock.json: https://github.com/chalk/supports-hyperlinks?sponsor=1
- package-lock.json: https://registry.npmjs.org/svg-tags/-/svg-tags-1.0.0.tgz
- package-lock.json: https://registry.npmjs.org/table/-/table-6.9.0.tgz
- package-lock.json: https://registry.npmjs.org/ajv/-/ajv-8.20.0.tgz
- package-lock.json: https://github.com/sponsors/epoberezkin
- package-lock.json: https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz
- package-lock.json: https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz
- package-lock.json: https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz
- package-lock.json: https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz
- package-lock.json: https://github.com/sponsors/SuperchupuDev
- package-lock.json: https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz
- package-lock.json: https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz
- package-lock.json: https://registry.npmjs.org/unicorn-magic/-/unicorn-magic-0.4.0.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://opencollective.com/browserslist
- package-lock.json: https://tidelift.com/funding/github/npm/browserslist
- package-lock.json: https://github.com/sponsors/ai
- package-lock.json: https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz
- package-lock.json: https://github.com/vitejs/vite?sponsor=1
- package-lock.json: https://registry.npmjs.org/write-file-atomic/-/write-file-atomic-7.0.1.tgz
- package-lock.json: https://github.com/sponsors/sindresorhus
- package-lock.json: https://github.com/sponsors/colinhacks
- README.md: https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
- README.md: https://oxc.rs)
- README.md: https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
- README.md: https://swc.rs/)
- README.md: https://react.dev/learn/react-compiler/installation).
- README.md: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)
- README.md: https://typescript-eslint.io)
- src/components/layout/MainLayout.jsx: https://schema.org
- src/components/layout/MainLayout.jsx: https://alex.syskovex.com/#website
- src/components/layout/MainLayout.jsx: https://alex.syskovex.com/
- src/hooks/pages/useContactChat.js: fetch(`${API_URL}/api/contact-messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload)
- src/hooks/pages/useContactChat.js: http://localhost:8000
- src/hooks/pages/useContactChat.js: /api/contact-messages
- src/pages/home/Home.jsx: https://schema.org
- src/pages/home/Home.jsx: https://alex.syskovex.com/#alexander-galvez
- src/pages/home/Home.jsx: https://alex.syskovex.com/
- src/pages/home/Home.jsx: https://alex.syskovex.com/imagen_portfolio_mia_retocada-960.avif
- src/pages/home/Home.jsx: https://github.com/alexgb23
- src/pages/home/Home.jsx: https://www.linkedin.com/in/alexander-galvez-benavides-450917281/
- src/pages/home/Home.jsx: https://instagram.com/_aaleex_88
- src/pages/home/Home.jsx: https://www.facebook.com/alexander.galvez.benavides
- src/services/api.js: http://localhost:8000
- vite.config.js: https://vite.dev

## Clases CSS definidas
- .is-skeleton (23)
- .social-mini-card (20)
- .stat-card (19)
- .inline-link (19)
- .expertise-card (16)
- .expertise-icon (12)
- .contact-card (12)
- .neo-terminal (12)
- .nav-links (11)
- .expertise-grid (11)
- .card-icon (10)
- .cmd-input-line (10)
- .tag (9)
- .speciality-grid (9)
- .speciality-card (9)
- .social-mini-icon (9)
- .card-hover (8)
- .state-wrapper (8)
- .card (7)
- .hero-centered-section (7)
- .social-mini-front (7)
- .lab-section (7)
- .lab-section-intro (7)
- .empty-inline-state (7)
- .laboratory-page (6)
- .lab-story-grid (6)
- .lab-column-cards (6)
- .lab-research-grid (6)
- .expertise-card-hover (6)
- .section-head-centered (6)
- .grid-cards (6)
- .card-head (5)
- .profile-avatar (5)
- .avatar-wrapper (5)
- .laboratory-overview (5)
- .laboratory-detail-layout (5)
- .laboratory-card (5)
- .lab-chip-row (5)
- .lab-detail-meta (5)
- .tone-0 (4)
- .tone-1 (4)
- .tone-2 (4)
- .card-title-wrap (4)
- .metric-display (4)
- .server-panel (4)
- .nav-cta (4)
- .skeleton (4)
- .hero-enter (4)
- .social-btn (4)
- .hero-center-content (4)
- .hero-top-row (4)
- .hero-kicker (4)
- .hero-main-title (4)
- .hero-intro (4)
- .hero-actions (4)
- .photo-container (4)
- .about-section (4)
- .photo-wrapper (4)
- .technical-section (4)
- .expertise-section (4)
- .social-mini-meta (4)
- .social-mini-shadow (4)
- .lab-panel-head (4)
- .laboratory-counter (4)
- .lab-project-tags (4)
- .lab-detail-links (4)
- .woff2 (4)
- .active (3)
- .project-tech-tag (3)
- .social-center-links (3)
- .stat-number (3)
- .skeleton-block (3)
- .about-container (3)
- .about-title (3)
- .about-text (3)
- .badge (3)
- .technical-timeline (3)
- .left (3)
- .cmd-output (3)
- .cmd-submit-btn (3)
- .social-mini-name (3)
- .social-mini-desc (3)
- .lab-overview-card (3)
- .laboratory-hero (3)
- .lab-section-divider (3)
- .laboratory-detail-side (3)
- .lab-data-list (3)
- .lab-actions (3)
- .lab-back-link-wrap (3)
- .laboratory-detail-hero (3)
- .section (3)
- .section-spaced (3)
- .section-more (3)
- .list-linear (3)
- .card-top (2)
- .card-badge (2)
- .server-code (2)
- .status (2)
- .server-stat-chip (2)
- .card-project (2)

## Clases usadas en JSX
- skeleton-block (158)
- skeleton-text-sm (67)
- card-head (43)
- card-title-wrap (43)
- skeleton-text-md (41)
- expertise-icon (39)
- expertise-card (31)
- tag (29)
- expertise-card-hover (23)
- skeleton-pill (22)
- section (20)
- section-spaced (19)
- section-kicker (19)
- laboratory-card (18)
- section-head-centered (15)
- inline-link (13)
- lab-section (12)
- lab-section-top (12)
- lab-section-intro (12)
- lab-label (12)
- lab-tag (12)
- laboratory-counter (11)
- lab-section-divider (11)
- section-separated (10)
- expertise-grid (10)
- skeleton-icon (10)
- skeleton (10)
- empty-inline-state (10)
- state-wrapper (10)
- centered (10)
- lab-panel (10)
- lab-panel-head (10)
- lab-panel-body (10)
- lab-chip-row (10)
- card-hover (8)
- lab-story-grid (8)
- skeleton-copy (7)
- w-100 (7)
- skeleton-text-xs (7)
- sr-only (7)
- is-skeleton (7)
- skeleton-card (7)
- server-meta-row (6)
- cmd-output (6)
- skeleton-text-lg (6)
- compact (6)
- card-top (5)
- card-icon (5)
- section-more (5)
- about-text (5)
- error (5)
- cmd-input-line (5)
- lab-detail-card (5)
- card-badge (4)
- date (4)
- container (4)
- tone-0 (4)
- tone-1 (4)
- tone-2 (4)
- social-mini-front (4)
- social-mini-textbox (4)
- social-mini-meta (4)
- w-80 (4)
- w-70 (4)
- sys-loader (4)
- grid-cards (4)
- laboratory-counter-inline (4)
- lab-actions (4)
- lab-data-list (4)
- w-24 (4)
- server-stat-chip (3)
- project-card-divider (3)
- tags (3)
- contact-grid (3)
- contact-card (3)
- social-mini-grid (3)
- neo-terminal (3)
- term-top-bar (3)
- term-controls (3)
- c-red (3)
- c-yellow (3)
- c-green (3)
- term-tab-title (3)
- term-content-area (3)
- cmd-input (3)
- w-90 (3)
- mini-head (3)
- social-mini-icon (3)
- lab-feature-grid (3)
- w-72 (3)
- server-panel (2)
- server-stats (2)
- nav-cta (2)
- social-mini-shine (2)
- social-mini-name (2)
- social-mini-desc (2)
- social-mini-shadow (2)
- left (2)
- prompt-color (2)
- w-40 (2)

## Imports detectados
- eslint.config.js -> @eslint/js
- eslint.config.js -> globals
- eslint.config.js -> eslint-plugin-react-hooks
- eslint.config.js -> eslint-plugin-react-refresh
- eslint.config.js -> eslint/config
- src/App.jsx -> react
- src/App.jsx -> react-router-dom
- src/App.jsx -> ./components/layout/MainLayout
- src/App.jsx -> ./pages/about/AboutSkeleton
- src/App.jsx -> ./pages/laboratory/LaboratorySkeleton
- src/App.jsx -> ./pages/projects/ProjectsSkeleton
- src/App.jsx -> ./pages/contact/ContactSkeleton
- src/App.jsx -> ./pages/home/HomeSkeleton
- src/components/cards/MetricCard.jsx -> react-icons/fa
- src/components/cards/NodeCard.jsx -> react-icons/fa
- src/components/cards/ServerCard.jsx -> react-icons/fa
- src/components/layout/MainLayout.jsx -> react
- src/components/layout/MainLayout.jsx -> react-router-dom
- src/components/layout/MainLayout.jsx -> ./Navbar/Navbar
- src/components/layout/Navbar/Navbar.jsx -> react
- src/components/layout/Navbar/Navbar.jsx -> react-router-dom
- src/components/layout/Navbar/Navbar.jsx -> react-icons/fa
- src/components/sections/aboutPreview/AboutPreview.jsx -> react-router-dom
- src/components/sections/ContactPreview.jsx -> react-router-dom
- src/components/sections/ContactPreview.jsx -> react-icons/fa
- src/components/sections/FeaturedLaboratory.jsx -> react-router-dom
- src/components/sections/FeaturedProjects.jsx -> react-router-dom
- src/components/sections/heroSection/HeroSection.jsx -> react-router-dom
- src/components/sections/heroSection/HeroSection.jsx -> react
- src/hooks/core/useAsyncResource.js -> react
- src/hooks/pages/useContactChat.js -> react
- src/hooks/pages/useLaboratoryDetail.js -> ../core/useAsyncResource
- src/hooks/pages/useLaboratoryDetail.js -> ../../services/api
- src/hooks/pages/useLaboratoryHome.js -> ../core/useAsyncResource
- src/hooks/pages/useLaboratoryHome.js -> ../../services/api
- src/hooks/pages/useLaboratoryList.js -> ../core/useAsyncResource
- src/hooks/pages/useLaboratoryList.js -> ../../services/api
- src/hooks/pages/usePortfolioHome.js -> ../core/useAsyncResource
- src/hooks/pages/usePortfolioHome.js -> ../../services/api
- src/hooks/pages/useProjectDetail.js -> ../core/useAsyncResource
- src/hooks/pages/useProjectDetail.js -> ../../services/api
- src/hooks/pages/useProjects.js -> ../core/useAsyncResource
- src/hooks/pages/useProjects.js -> ../../services/api
- src/hooks/usePageTitle.js -> react
- src/main.jsx -> react-dom/client
- src/main.jsx -> ./App
- src/pages/about/About.jsx -> ../../hooks/usePageTitle
- src/pages/about/About.jsx -> ../../hooks/pages/usePortfolioHome
- src/pages/automation/Automation.jsx -> ../../components/cards/NodeCard
- src/pages/automation/Automation.jsx -> ../../hooks/usePortfolioData
- src/pages/automation/Automation.jsx -> ../../hooks/usePageTitle
- src/pages/automation/Automation.jsx -> react-icons/fa
- src/pages/contact/Contact.jsx -> react
- src/pages/contact/Contact.jsx -> ../../hooks/usePageTitle
- src/pages/contact/Contact.jsx -> ../../hooks/pages/useContactChat
- src/pages/contact/Contact.jsx -> ../../hooks/usePortfolioData
- src/pages/home/Home.jsx -> react
- src/pages/home/Home.jsx -> ../../components/sections/heroSection/HeroSection
- src/pages/home/Home.jsx -> ../../components/sections/aboutPreview/AboutPreview
- src/pages/home/Home.jsx -> ../../components/sections/FeaturedProjects
- src/pages/home/Home.jsx -> ../../components/sections/FeaturedLaboratory
- src/pages/home/Home.jsx -> ../../components/sections/ContactPreview
- src/pages/home/Home.jsx -> ../../hooks/usePortfolioData
- src/pages/home/Home.jsx -> ../../hooks/usePageTitle
- src/pages/infrastructure/Infrastructure.jsx -> ../../components/cards/ServerCard
- src/pages/infrastructure/Infrastructure.jsx -> ../../components/cards/MetricCard
- src/pages/infrastructure/Infrastructure.jsx -> ../../hooks/usePortfolioData
- src/pages/infrastructure/Infrastructure.jsx -> ../../hooks/usePageTitle
- src/pages/infrastructure/Infrastructure.jsx -> react-icons/fa
- src/pages/laboratory/Laboratory.jsx -> react-router-dom
- src/pages/laboratory/Laboratory.jsx -> ../../hooks/usePortfolioData
- src/pages/laboratory/Laboratory.jsx -> ../../hooks/usePageTitle
- src/pages/laboratory/LaboratoryDetail.jsx -> react-router-dom
- src/pages/laboratory/LaboratoryDetail.jsx -> ../../hooks/usePortfolioData
- src/pages/laboratory/LaboratoryDetail.jsx -> ../../hooks/usePageTitle
- src/pages/projects/Projects.jsx -> ../../components/cards/ProjectCard
- src/pages/projects/Projects.jsx -> ../../hooks/usePortfolioData
- src/pages/projects/Projects.jsx -> ../../hooks/usePageTitle
- src/services/api.js -> axios
- vite.config.js -> vite
- vite.config.js -> @vitejs/plugin-react

## Posibles faltantes o puntos a revisar
- No se detecta archivo claro de rutas/router
- No se detecta gestión SEO/meta por componentes o páginas

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
