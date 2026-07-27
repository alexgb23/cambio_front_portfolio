import { Link } from "react-router";
import {
  ArrowUpRight,
  FolderKanban,
  Rocket,
  Activity,
  FlaskConical,
} from "lucide-react";
import "./FeaturedLaboratoryCard.css";

function buildResponsiveImageSources(mediaLike, fallbackImage = "") {
  const media = mediaLike || null;

  if (media) {
    return {
      avifSrcSet: media.avifSrcSet || media.avif_srcset || "",
      webpSrcSet: media.webpSrcSet || media.webp_srcset || "",
      fallbackSrcSet: media.srcSet || media.srcset || "",
      sizes:
        media.sizes ||
        "(max-width: 767px) 92vw, (max-width: 1279px) 48vw, 420px",
      fallbackSrc: media.src || fallbackImage || "",
      width: Number(media.width || 1400),
      height: Number(media.height || 900),
    };
  }

  return {
    avifSrcSet: "",
    webpSrcSet: "",
    fallbackSrcSet: "",
    sizes: "(max-width: 767px) 92vw, (max-width: 1279px) 48vw, 420px",
    fallbackSrc: fallbackImage || "",
    width: 1400,
    height: 900,
  };
}

function getThemeImageSources(item) {
  const lightMedia =
    item?.coverImageMediaLight ||
    item?.cover_image_media_light ||
    item?.coverImageMedia?.light ||
    item?.cover_image_media?.light ||
    null;

  const darkMedia =
    item?.coverImageMediaDark ||
    item?.cover_image_media_dark ||
    item?.coverImageMedia?.dark ||
    item?.cover_image_media?.dark ||
    null;

  const lightImage =
    item?.coverImageLight ||
    item?.cover_image_light ||
    item?.coverImage ||
    "";

  const darkImage =
    item?.coverImageDark ||
    item?.cover_image_dark ||
    item?.coverImage ||
    "";

  const light = buildResponsiveImageSources(lightMedia, lightImage);
  const dark = buildResponsiveImageSources(darkMedia, darkImage);

  return {
    light: light?.fallbackSrc ? light : dark,
    dark: dark?.fallbackSrc ? dark : light,
  };
}

function BackgroundPicture({ sources, className, alt }) {
  if (!sources?.fallbackSrc) return null;

  return (
    <picture className={className} aria-hidden={alt ? undefined : "true"}>
      {sources.avifSrcSet ? (
        <source type="image/avif" srcSet={sources.avifSrcSet} sizes={sources.sizes} />
      ) : null}

      {sources.webpSrcSet ? (
        <source type="image/webp" srcSet={sources.webpSrcSet} sizes={sources.sizes} />
      ) : null}

      <img
        src={sources.fallbackSrc}
        srcSet={sources.fallbackSrcSet || undefined}
        sizes={sources.fallbackSrcSet ? sources.sizes : undefined}
        alt={alt || ""}
        className="lab-card-rich__image"
        loading="lazy"
        decoding="async"
        width={sources.width}
        height={sources.height}
      />
    </picture>
  );
}

export default function LaboratoryCard({ item, className = "" }) {
  if (!item) return null;

  const {
    title = "Laboratorio destacado",
    summary = "Laboratorio técnico real.",
    category = "Laboratorio",
    status = "Activo",
    relatedAreas = [],
    documentationCount = 0,
    progressCount = 0,
  } = item;

  const safeRelatedAreas = Array.isArray(relatedAreas) ? relatedAreas : [];
  const themeSources = getThemeImageSources(item);
  const hasImage = Boolean(
    themeSources?.light?.fallbackSrc || themeSources?.dark?.fallbackSrc
  );

  return (
    <article
      className={[
        "lab-card-rich",
        hasImage ? "has-media" : "is-empty-media",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="lab-card-rich__media">
        {hasImage ? (
          <>
            <BackgroundPicture
              sources={themeSources.light}
              className="lab-card-rich__picture lab-card-rich__picture--light"
              alt=""
            />

            <BackgroundPicture
              sources={themeSources.dark}
              className="lab-card-rich__picture lab-card-rich__picture--dark"
              alt=""
            />
          </>
        ) : (
          <div className="lab-card-rich__image-fallback" aria-hidden="true">
            <FlaskConical size={28} />
          </div>
        )}

        <div className="lab-card-rich__overlay" />

        <div className="lab-card-rich__floating">
          <span className="lab-card-rich__badge">{category}</span>
          <span className="lab-card-rich__badge is-status">{status}</span>
        </div>
      </div>

      <div className="lab-card-rich__body">
        <div className="lab-card-rich__top">
          <div className="lab-card-rich__heading">
            <span className="lab-card-rich__kicker">Laboratorio real</span>

            <h3 className="lab-card-rich__title">
              <Link
                to="/laboratorio"
                className="lab-card-rich__primary-link"
                aria-label={`Abrir laboratorio ${title}`}
              >
                {title}
              </Link>
            </h3>

            <p className="lab-card-rich__description">{summary}</p>
          </div>

          <Link
            to="/laboratorio"
            className="lab-card-rich__cta lab-card-rich__cta-link"
            aria-label={`Ir a laboratorio desde ${title}`}
          >
            <span>Ir a laboratorio</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

        {safeRelatedAreas.length > 0 ? (
          <div className="lab-card-rich__tags">
            {safeRelatedAreas.map((tag) => (
              <span className="lab-card-rich__tag" key={`tag-${tag}`}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="lab-card-rich__stats">
          <div className="lab-card-rich__stat">
            <div className="lab-card-rich__stat-label">
              <FolderKanban size={16} />
              Documentación
            </div>
            <strong>{documentationCount}</strong>
            <span>bloques</span>
          </div>

          <div className="lab-card-rich__stat">
            <div className="lab-card-rich__stat-label">
              <Rocket size={16} />
              Avances
            </div>
            <strong>{progressCount}</strong>
            <span>hitos</span>
          </div>

          <div className="lab-card-rich__stat">
            <div className="lab-card-rich__stat-label">
              <Activity size={16} />
              Estado
            </div>
            <strong className="is-text">{status}</strong>
            <span>actual</span>
          </div>
        </div>
      </div>
    </article>
  );
}