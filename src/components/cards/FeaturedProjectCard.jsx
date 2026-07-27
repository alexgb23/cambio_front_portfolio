import { useMemo } from "react";
import { useNavigate } from "react-router";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
} from "react-icons/fa";
import "./FeaturedProjectCard.css";

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }

      if (typeof parsed === "string") {
        return parsed
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    } catch {
      return trimmed
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function buildVariant(basePath, width, extension) {
  if (!basePath) return "";
  return `${basePath}-${width}.${extension}`;
}

function buildSrcSet(basePath, extension) {
  if (!basePath) return "";

  return [
    `${buildVariant(basePath, 480, extension)} 480w`,
    `${buildVariant(basePath, 768, extension)} 768w`,
    `${buildVariant(basePath, 960, extension)} 960w`,
  ].join(", ");
}

function getResponsiveImageSources(images) {
  const normalized = normalizeList(images);

  const avifBase =
    normalized.find((item) => /avif$/i.test(item) || /avif/i.test(item)) || "";
  const webpBase =
    normalized.find((item) => /webp$/i.test(item) || /webp/i.test(item)) || "";

  const avifSrcSet = avifBase ? buildSrcSet(avifBase, "avif") : "";
  const webpSrcSet = webpBase ? buildSrcSet(webpBase, "webp") : "";

  const fallbackSrc = webpBase
    ? buildVariant(webpBase, 768, "webp")
    : avifBase
      ? buildVariant(avifBase, 768, "avif")
      : "";

  const fallbackSrcSet = webpBase
    ? buildSrcSet(webpBase, "webp")
    : avifBase
      ? buildSrcSet(avifBase, "avif")
      : "";

  return {
    avifSrcSet,
    webpSrcSet,
    fallbackSrc,
    fallbackSrcSet,
  };
}

function getProjectIcon(project, techList) {
  const text =
    `${project?.title || ""} ${project?.short_description || ""} ${
      project?.stack_summary || ""
    } ${techList.join(" ")}`.toLowerCase();

  if (
    text.includes("api") ||
    text.includes("backend") ||
    text.includes("laravel") ||
    text.includes("node") ||
    text.includes("server")
  ) {
    return <FaServer />;
  }

  if (
    text.includes("postgres") ||
    text.includes("mysql") ||
    text.includes("database") ||
    text.includes("sql")
  ) {
    return <FaDatabase />;
  }

  if (
    text.includes("red") ||
    text.includes("network") ||
    text.includes("firewall") ||
    text.includes("pfsense") ||
    text.includes("dns") ||
    text.includes("vlan")
  ) {
    return <FaNetworkWired />;
  }

  if (
    text.includes("security") ||
    text.includes("seguridad") ||
    text.includes("auth") ||
    text.includes("jwt")
  ) {
    return <FaShieldAlt />;
  }

  if (
    text.includes("cloud") ||
    text.includes("docker") ||
    text.includes("deploy") ||
    text.includes("proxmox")
  ) {
    return <FaCloud />;
  }

  return <FaCode />;
}

function BackgroundPicture({ sources, className }) {
  if (!sources?.fallbackSrc) return null;

  return (
    <picture className={className} aria-hidden="true">
      {sources.avifSrcSet ? (
        <source
          type="image/avif"
          srcSet={sources.avifSrcSet}
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 45vw, 534px"
        />
      ) : null}

      {sources.webpSrcSet ? (
        <source
          type="image/webp"
          srcSet={sources.webpSrcSet}
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 45vw, 534px"
        />
      ) : null}

      <img
        src={sources.fallbackSrc}
        srcSet={sources.fallbackSrcSet || undefined}
        sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 45vw, 534px"
        alt=""
        className="project-card-bg__image"
        width="534"
        height="313"
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export default function ProjectCard({
  project = null,
  index = 0,
  maxTags = 3,
}) {
  const navigate = useNavigate();

  const techList = useMemo(() => {
    return normalizeList(project?.technologies ?? project?.tecnologías).slice(
      0,
      maxTags
    );
  }, [project?.technologies, project?.tecnologías, maxTags]);

  const tone = index % 3;

  const projectSlug = useMemo(() => {
    return typeof project?.slug === "string" ? project.slug.trim() : "";
  }, [project?.slug]);

  const icon = useMemo(() => {
    return getProjectIcon(project, techList);
  }, [project, techList]);

  const darkSources = useMemo(() => {
    return getResponsiveImageSources(project?.card_background_dark);
  }, [project?.card_background_dark]);

  const lightSources = useMemo(() => {
    return getResponsiveImageSources(project?.card_background_light);
  }, [project?.card_background_light]);

  const hasBackground = Boolean(
    darkSources?.fallbackSrc || lightSources?.fallbackSrc
  );

  const handleOpenProject = () => {
    if (!projectSlug) return;
    navigate(`/proyectos/${projectSlug}`);
  };

  if (!project) return null;

  return (
    <article
      className={`expertise-card expertise-card-hover tone-${tone} ${
        hasBackground ? "has-project-bg" : ""
      }`}
      onClick={handleOpenProject}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenProject();
        }
      }}
      role="button"
      tabIndex={projectSlug ? 0 : -1}
      aria-label={`Abrir proyecto ${project?.title || "sin título"}`}
      style={{ cursor: projectSlug ? "pointer" : "default" }}
    >
      {hasBackground ? (
        <>
          <div className="project-card-bg" aria-hidden="true">
            <BackgroundPicture
              sources={lightSources?.fallbackSrc ? lightSources : darkSources}
              className="project-card-bg__picture project-card-bg__picture--light"
            />

            <BackgroundPicture
              sources={darkSources?.fallbackSrc ? darkSources : lightSources}
              className="project-card-bg__picture project-card-bg__picture--dark"
            />
          </div>

          <div className="expertise-card-overlay" aria-hidden="true" />
        </>
      ) : null}

      <div className="card-head">
        <div className="expertise-icon">{icon}</div>

        <div className="card-title-wrap">
          <h3>{project?.title || "Sin título"}</h3>
        </div>
      </div>

      <p>{project?.short_description || "Sin descripción"}</p>

      <div className="laboratory-counter project-card-stack">
        <strong>{project?.stack_summary || "Software"}</strong>
      </div>

      {techList.length > 0 ? (
        <div className="project-card-tags">
          {techList.map((tech, techIndex) => (
            <span key={`${tech}-${techIndex}`} className="project-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}