import {
  ArrowRight,
  ExternalLink,
  BadgeCheck,
  BrainCircuit,
  FileText,
  Orbit,
} from "lucide-react";
import { useMemo } from "react";
import styles from "./LaboratoryHero.module.css";

function buildVariant(basePath, width, extension) {
  return `${basePath}-${width}.${extension}`;
}

function buildSrcSet(basePath, extension) {
  return [
    `${buildVariant(basePath, 480, extension)} 480w`,
    `${buildVariant(basePath, 768, extension)} 768w`,
    `${buildVariant(basePath, 960, extension)} 960w`,
  ].join(", ");
}

function buildImageSources(avifBase, webpBase) {
  return {
    avifSrcSet: buildSrcSet(avifBase, "avif"),
    webpSrcSet: buildSrcSet(webpBase, "webp"),
    fallbackSrc: buildVariant(webpBase, 768, "webp"),
    fallbackSrcSet: buildSrcSet(webpBase, "webp"),
  };
}

export default function LaboratoryHero() {
  const darkImageSources = useMemo(
    () =>
      buildImageSources(
        "/imgFondoLaboratorio/fondoLabDarkAvif",
        "/imgFondoLaboratorio/fondoLabDarkWebp",
      ),
    [],
  );

  const lightImageSources = useMemo(
    () =>
      buildImageSources(
        "/imgFondoLaboratorio/fondoLabLightAvif",
        "/imgFondoLaboratorio/fondoLabLightWebp",
      ),
    [],
  );

  const imageSizes =
    "(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 960px";

  return (
    <section className={`section section-spaced ${styles.hero}`}>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>Mi laboratorio de pruebas</span>

            <h1 className={styles.title}>
              Bienvenido a <span>SYSKOVEX</span> Laboratory
            </h1>

            <p className={styles.description}>
              Mi entorno de pruebas y experimentación donde exploro, construyo e
              investigo soluciones en infraestructura, automatización, redes e
              inteligencia artificial.
            </p>

            <div className={styles.actions}>
              <a
                href="https://syskovex.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                <span>Explorar laboratorio completo</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="https://syskovex.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.siteLink}
              >
                <span>syskovex.com</span>
                <ExternalLink className={styles.siteLinkIcon} />
              </a>
            </div>
          </div>

          <div className={styles.visual}>
            <picture className={`${styles.visualPicture} ${styles.visualLight}`} aria-hidden="true">
              <source
                type="image/avif"
                srcSet={lightImageSources.avifSrcSet}
                sizes={imageSizes}
              />
              <source
                type="image/webp"
                srcSet={lightImageSources.webpSrcSet}
                sizes={imageSizes}
              />
              <img
                src={lightImageSources.fallbackSrc}
                srcSet={lightImageSources.fallbackSrcSet}
                sizes={imageSizes}
                alt="Vista principal del laboratorio SYSKOVEX"
                className={styles.visualImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="960"
                height="960"
              />
            </picture>

            <picture className={`${styles.visualPicture} ${styles.visualDark}`} aria-hidden="true">
              <source
                type="image/avif"
                srcSet={darkImageSources.avifSrcSet}
                sizes={imageSizes}
              />
              <source
                type="image/webp"
                srcSet={darkImageSources.webpSrcSet}
                sizes={imageSizes}
              />
              <img
                src={darkImageSources.fallbackSrc}
                srcSet={darkImageSources.fallbackSrcSet}
                sizes={imageSizes}
                alt="Vista principal del laboratorio SYSKOVEX"
                className={styles.visualImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="960"
                height="960"
              />
            </picture>
          </div>

          <aside className={styles.panel}>
            <div className={styles.panelBrand}>
              <span className={styles.panelLogo}>X</span>
              <strong>SYSKOVEX</strong>
            </div>

            <p className={styles.panelText}>
              Un laboratorio personal dedicado a la innovación y al aprendizaje
              continuo.
            </p>

            <ul className={styles.panelList}>
              <li>
                <BadgeCheck size={17} />
                <span>Pruebas reales</span>
              </li>
              <li>
                <BrainCircuit size={17} />
                <span>Investigación aplicada</span>
              </li>
              <li>
                <FileText size={17} />
                <span>Documentación abierta</span>
              </li>
              <li>
                <Orbit size={17} />
                <span>Compartir conocimiento</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}