import {
  Download,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Braces,
  Package,
  Video,
} from "lucide-react";
import styles from "./ProjectResources.module.css";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getVisibleAttachments(project) {
  return asArray(project?.adjuntos).filter(
    (item) =>
      item &&
      item.es_visible !== false &&
      !normalizeText(item?.titulo).includes("fondo_tarjeta"),
  );
}

function findFirst(items, predicate) {
  return items.find(predicate) || null;
}

function findMany(items, predicate) {
  return items.filter(predicate);
}

function byGroup(group) {
  return (item) => normalizeText(item?.grupo) === group;
}

function byType(type) {
  return (item) => normalizeText(item?.tipo) === type;
}

function includesText(text) {
  return (item) =>
    normalizeText(item?.titulo).includes(text) ||
    normalizeText(item?.subtitulo).includes(text) ||
    normalizeText(item?.descripcion).includes(text);
}

function getResourceCards(project) {
  const attachments = getVisibleAttachments(project);
  const docs = asArray(project?.documentacion);

  const imageItems = findMany(
    attachments,
    (item) =>
      byGroup("capturas")(item) ||
      byGroup("galeria")(item) ||
      byType("image")(item) ||
      includesText("captura")(item) ||
      includesText("screenshot")(item) ||
      includesText("imagen")(item),
  );

  const videoItems = findMany(
    attachments,
    (item) =>
      byGroup("videos")(item) ||
      byType("video")(item) ||
      includesText("video")(item) ||
      includesText("demo")(item),
  );

  const pdfItem =
    findFirst(docs, (item) => item?.url) ||
    findFirst(
      attachments,
      (item) =>
        byType("doc")(item) ||
        byType("file")(item) ||
        includesText("documentación")(item) ||
        includesText("documentacion")(item) ||
        includesText("pdf")(item),
    );

  const apiDocsItem = findFirst(
    attachments,
    (item) =>
      includesText("swagger")(item) ||
      includesText("openapi")(item) ||
      normalizeText(item?.titulo) === "documentación api",
  );

  const serviceItems = findMany(
    attachments,
    (item) => byType("link")(item) && !includesText("fondo_tarjeta")(item),
  );

  const installerItem = findFirst(
    attachments,
    (item) =>
      includesText("instalador")(item) ||
      includesText("windows")(item) ||
      includesText("linux")(item),
  );

  const dockerItem = findFirst(
    attachments,
    (item) =>
      includesText("docker")(item) ||
      includesText("docker hub")(item) ||
      includesText("image")(item),
  );

  return [
    {
      key: "screenshots",
      title: "Capturas de Pantalla",
      subtitle:
        imageItems.length > 0
          ? `${imageItems.length} imágenes`
          : "Galería pendiente",
      href: imageItems[0]?.url || null,
      icon: ImageIcon,
      accent: "cyan",
    },
    {
      key: "videos",
      title: "Videos",
      subtitle:
        videoItems.length > 0
          ? `${videoItems.length} demostraciones`
          : "Demos pendientes",
      href: videoItems[0]?.url || null,
      icon: Video,
      accent: "violet",
    },
    {
      key: "docs",
      title: "Documentación (PDF)",
      subtitle: pdfItem ? "Guía completa" : "Sin PDF aún",
      href: pdfItem?.url || null,
      icon: FileText,
      accent: "white",
    },
    {
      key: "api",
      title: "API Docs (Swagger)",
      subtitle: apiDocsItem ? "Explorar API" : "Sin docs aún",
      href: apiDocsItem?.url || null,
      icon: Braces,
      accent: "green",
    },
    {
      key: "services",
      title: "URLs de Servicios",
      subtitle:
        serviceItems.length > 0
          ? `${serviceItems.length} endpoints`
          : "Sin servicios aún",
      href: serviceItems[0]?.url || null,
      icon: LinkIcon,
      accent: "blue",
    },
    {
      key: "installer",
      title: "Instalador",
      subtitle: installerItem?.subtitulo || "Linux / Windows",
      href: installerItem?.url || null,
      icon: Download,
      accent: "lime",
    },
    {
      key: "docker",
      title: "Docker Image",
      subtitle: dockerItem ? "Ver en Docker Hub" : "No disponible",
      href: dockerItem?.url || null,
      icon: Package,
      accent: "cyanSoft",
    },
  ];
}

function handleTrackWheel(event) {
  const el = event.currentTarget;
  const canScrollHorizontally = el.scrollWidth > el.clientWidth;

  if (!canScrollHorizontally) return;

  event.preventDefault();
  el.scrollLeft += event.deltaY;
}

function ProjectResources({ project }) {
  if (!project) return null;

  const cards = getResourceCards(project);

  return (
    <section
      className={styles.section}
      id="resources"
      aria-label="Recursos del proyecto"
    >
      <div className={styles.track} onWheel={handleTrackWheel}>
        {cards.map((card) => {
          const Icon = card.icon;

          const content = (
            <>
              <div
                className={`${styles.iconBox} ${styles[`accent${card.accent}`]}`}
              >
                <Icon size={18} strokeWidth={2} />
              </div>

              <div className={styles.texts}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.subtitle}>{card.subtitle}</p>
              </div>
            </>
          );

          if (!card.href) {
            return (
              <article key={card.key} className={styles.card}>
                {content}
              </article>
            );
          }

          return (
            <a
              key={card.key}
              href={card.href}
              target="_blank"
              rel="noreferrer"
              className={styles.card}
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectResources;
