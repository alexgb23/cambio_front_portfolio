import {
  Activity,
  Cloud,
  Database,
  FileJson,
  FileText,
  Globe,
  Mail,
  MonitorSmartphone,
  Package,
  Server,
  Shield,
} from "lucide-react";
import styles from "./ProjectOverview.module.css";

const iconMap = {
  react: MonitorSmartphone,
  laravel: Server,
  shield: Shield,
  "file-text": FileText,
  "file-json": FileJson,
  activity: Activity,
  docker: Package,
  cloud: Cloud,
  database: Database,
  mail: Mail,
};

function normalizeIconSources(iconUrl) {
  if (!iconUrl || typeof iconUrl !== "string") {
    return {
      darkUrl: null,
      lightUrl: null,
      singleUrl: null,
    };
  }

  const parts = iconUrl
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return {
      darkUrl: null,
      lightUrl: null,
      singleUrl: null,
    };
  }

  if (parts.length === 1) {
    return {
      darkUrl: null,
      lightUrl: null,
      singleUrl: parts[0],
    };
  }

  const darkUrl = parts.find((item) => /dark/i.test(item)) || parts[0] || null;
  const lightUrl =
    parts.find((item) => /light/i.test(item)) || parts[1] || parts[0] || null;

  return {
    darkUrl,
    lightUrl,
    singleUrl: null,
  };
}

function detectBrandKey(iconUrl) {
  if (!iconUrl || typeof iconUrl !== "string") return null;

  const value = iconUrl.toLowerCase();

  if (value.includes("/render/")) return "render";
  if (value.includes("/resend/")) return "resend";
  if (value.includes("/neon/")) return "neon";
  if (value.includes("/nginx/")) return "nginx";
  if (value.includes("/docker/")) return "docker";
  if (value.includes("/laravel/")) return "laravel";

  return null;
}

function mapNodeItem(title, subtitle, icon, iconUrl) {
  const sources = normalizeIconSources(iconUrl);

  return {
    title,
    subtitle,
    icon,
    iconUrl: sources.singleUrl,
    darkIconUrl: sources.darkUrl,
    lightIconUrl: sources.lightUrl,
    brandKey: detectBrandKey(iconUrl),
  };
}

function ProjectOverview({ project }) {
  const section =
    project?.secciones?.find((item) => item?.clave === "project_overview") ||
    project?.secciones?.find((item) => item?.clave === "resumen") ||
    null;

  if (!section) return null;

  const metadata =
    section?.metadata &&
    typeof section.metadata === "object" &&
    !Array.isArray(section.metadata)
      ? section.metadata
      : {};

  const highlights =
    section?.items &&
    typeof section.items === "object" &&
    !Array.isArray(section.items)
      ? Object.values(section.items)
          .map((item) => String(item).trim())
          .filter(Boolean)
      : [];

  const services = [1, 2, 3, 4]
    .map((index) =>
      mapNodeItem(
        metadata[`service_${index}_title`],
        metadata[`service_${index}_subtitle`],
        metadata[`service_${index}_icon`],
        metadata[`service_${index}_icon_url`],
      ),
    )
    .filter((item) => item.title);

  const infra = [1, 2, 3, 4]
    .map((index) =>
      mapNodeItem(
        metadata[`infra_${index}_title`],
        metadata[`infra_${index}_subtitle`],
        metadata[`infra_${index}_icon`],
        metadata[`infra_${index}_icon_url`],
      ),
    )
    .filter((item) => item.title);

  const stack = [1, 2, 3]
    .map((index) =>
      mapNodeItem(
        metadata[`stack_${index}_title`],
        metadata[`stack_${index}_subtitle`],
        metadata[`stack_${index}_icon`],
        metadata[`stack_${index}_icon_url`],
      ),
    )
    .filter((item) => item.title);

  const client = mapNodeItem(
    metadata.client_title || "Frontend",
    metadata.client_subtitle || "React + Vite",
    metadata.client_icon || "react",
    metadata.client_icon_url || null,
  );
  client.label = metadata.client_label || "Cliente";

  const gateway = mapNodeItem(
    metadata.gateway_name || "Laravel API",
    metadata.gateway_subtitle || "REST + Sanctum",
    metadata.gateway_icon || "laravel",
    metadata.gateway_icon_url ||
      "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/laravel/default.svg",
  );
  gateway.label = metadata.gateway_title || "Backend API";

  const balancer = mapNodeItem(
    metadata.balancer_name || "Render",
    metadata.balancer_subtitle || "Deploy",
    metadata.balancer_icon || "cloud",
    metadata.balancer_icon_url || null,
  );
  balancer.label = metadata.balancer_title || "Deploy";

  const hasArchitecture =
    metadata.diagram_title ||
    client.title ||
    gateway.title ||
    balancer.title ||
    services.length > 0 ||
    infra.length > 0 ||
    stack.length > 0;

  return (
    <section className={styles.section} id="overview">
      <div className={styles.grid}>
        <article className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <span className={styles.eyebrow}>Resumen técnico</span>
            <h2>{section?.titulo || "Descripción general"}</h2>
          </div>

          <div className={styles.infoScroll}>
            {section?.contenido ? (
              <p className={styles.description}>{section.contenido}</p>
            ) : null}

            {highlights.length > 0 ? (
              <ul className={styles.featureList}>
                {highlights.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>

        {hasArchitecture ? (
          <article className={styles.diagramCard}>
            <div className={styles.cardHeader}>
              <span className={styles.eyebrow}>Arquitectura</span>
              <h2>{metadata.diagram_title || "Vista General del Sistema"}</h2>
            </div>

            <div className={styles.diagram}>
              <div className={styles.rowTop}>
                <NodeCard {...client} />
                <div className={styles.connector} />
                <NodeCard {...gateway} />
                <div className={styles.connector} />
                <NodeCard {...balancer} />

                {services.length > 0 ? (
                  <>
                    <div className={styles.connectorDown} />
                    <div className={styles.nodeGroup}>
                      <span className={styles.nodeGroupTitle}>
                        Microservicios
                      </span>

                      <div className={styles.nodeMiniGrid}>
                        {services.map((service, index) => (
                          <MiniNode
                            key={`${service.title}-${index}`}
                            {...service}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>

              {infra.length > 0 || stack.length > 0 ? (
                <div className={styles.bottomPanels}>
                  {infra.length > 0 ? (
                    <div className={styles.bottomPanel}>
                      <span className={styles.bottomPanelTitle}>
                        Infraestructura
                      </span>

                      <div className={styles.bottomGrid}>
                        {infra.map((item, index) => (
                          <MiniNode key={`${item.title}-${index}`} {...item} />
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {stack.length > 0 ? (
                    <div className={styles.bottomPanel}>
                      <span className={styles.bottomPanelTitle}>
                        {metadata.stack_title || "Infraestructura base"}
                      </span>

                      <div className={styles.bottomGrid}>
                        {stack.map((item, index) => (
                          <MiniNode key={`${item.title}-${index}`} {...item} />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}

function BrandIcon({
  icon,
  iconUrl,
  darkIconUrl,
  lightIconUrl,
  brandKey,
  alt,
  size = 24,
}) {
  const Icon = iconMap[icon] || Globe;

  const handleError = (event) => {
    const wrapper = event.currentTarget.closest("[data-brand-icon]");
    if (!wrapper) return;
    wrapper.setAttribute("data-icon-error", "true");
  };

  const brandClass = brandKey
    ? styles[`brand${brandKey[0].toUpperCase()}${brandKey.slice(1)}`]
    : "";

  if (darkIconUrl || lightIconUrl) {
    return (
      <span className={`${styles.brandIcon} ${brandClass}`} data-brand-icon>
        {darkIconUrl ? (
          <img
            className={`${styles.themeIcon} ${styles.themeDarkAsset}`}
            src={darkIconUrl}
            alt={alt}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            onError={handleError}
          />
        ) : null}

        {lightIconUrl ? (
          <img
            className={`${styles.themeIcon} ${styles.themeLightAsset}`}
            src={lightIconUrl}
            alt={alt}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            onError={handleError}
          />
        ) : null}

        <span className={styles.iconFallback} aria-hidden="true">
          <Icon size={size} strokeWidth={1.8} />
        </span>
      </span>
    );
  }

  if (iconUrl) {
    return (
      <span className={`${styles.brandIcon} ${brandClass}`} data-brand-icon>
        <img
          className={styles.themeIcon}
          src={iconUrl}
          alt={alt}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          onError={handleError}
        />

        <span className={styles.iconFallback} aria-hidden="true">
          <Icon size={size} strokeWidth={1.8} />
        </span>
      </span>
    );
  }

  return <Icon size={size} strokeWidth={1.8} />;
}

function NodeCard(props) {
  const { label, title, subtitle } = props;

  return (
    <div className={styles.node}>
      <span className={styles.nodeTitle}>{label}</span>

      <div className={styles.nodeIcon}>
        <BrandIcon {...props} alt={title} size={16} />
      </div>

      <strong className={styles.nodeMain}>{title}</strong>
      {subtitle ? <small className={styles.nodeSub}>{subtitle}</small> : null}
    </div>
  );
}

function MiniNode(props) {
  const { title, subtitle } = props;

  return (
    <div className={styles.miniNode}>
      <div className={styles.miniNodeIcon}>
        <BrandIcon {...props} alt={title} size={12} />
      </div>

      <strong>{title}</strong>
      {subtitle ? <small>{subtitle}</small> : null}
    </div>
  );
}

export default ProjectOverview;
