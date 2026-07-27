import { useMemo } from "react";
import {
  FaCode,
  FaNetworkWired,
  FaMicrochip,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import usePageTitle from "../../hooks/usePageTitle";
import { usePortfolioAbout } from "../../hooks/usePortfolioData";
import "./About.css";

const expertiseIconMap = {
  code: FaCode,
  database: FaDatabase,
  network: FaNetworkWired,
  networking: FaNetworkWired,
  microchip: FaMicrochip,
  automation: FaMicrochip,
  server: FaServer,
  infrastructure: FaServer,
};

const staticExpertise = [
  {
    id: "about-software",
    title: "Software y desarrollo",
    text: "Aplicaciones, APIs y herramientas técnicas orientadas a necesidades reales, integración y mantenibilidad.",
    icon_key: "code",
    tone: "tone-0",
  },
  {
    id: "about-infrastructure",
    title: "Infraestructura y virtualización",
    text: "Servidores, entornos Linux, virtualización, despliegues y servicios técnicos con enfoque estable y escalable.",
    icon_key: "server",
    tone: "tone-1",
  },
  {
    id: "about-networking",
    title: "Redes y conectividad",
    text: "Segmentación, VLANs, routing, switching gestionado y servicios perimetrales para entornos reales.",
    icon_key: "network",
    tone: "tone-2",
  },
  {
    id: "about-automation",
    title: "Automatización, IoT y sistemas conectados",
    text: "Integración de sensores, nodos, dispositivos y automatizaciones aplicadas a procesos técnicos y espacios reales.",
    icon_key: "automation",
    tone: "tone-0",
  },
];

const staticAboutTitle =
  "Infraestructura, sistemas y automatización con visión integral";

const staticAboutIntro =
  "Soy Alex, perfil técnico especializado en infraestructura IT, redes, virtualización, automatización y sistemas conectados. Me enfoco en el diseño, integración y mantenimiento de soluciones tecnológicas reales, priorizando estabilidad, funcionalidad y coherencia entre servicios, red e infraestructura.";

const staticParagraphs = [
  "Trabajo con laboratorio propio y entornos prácticos donde desarrollo y valido configuraciones relacionadas con Linux, virtualización, segmentación de red, servicios perimetrales, switching gestionado, automatización y monitorización. Este enfoque me permite comprender los proyectos más allá de la capa visual o del desarrollo aislado, abordándolos desde una perspectiva global de arquitectura técnica.",
  "Además, cuento con formación en domótica e inmótica, así como conocimientos de desarrollo de software, lo que me permite moverme con soltura entre la infraestructura física, la lógica de automatización y las aplicaciones que interactúan con esos entornos.",
  "Mi objetivo es seguir consolidando un perfil técnico integral, con base sólida en sistemas, redes, virtualización, automatización e integración tecnológica.",
];

const extraKnowsAbout = [
  "Infraestructura IT",
  "Linux",
  "Docker",
  "PostgreSQL",
  "Proxmox",
  "pfSense",
  "Laravel",
  "React",
  "Bash scripting",
  "Domótica e inmótica",
];

function uniqueStrings(values = []) {
  return [...new Set(values.filter(Boolean).map((item) => item.trim()))];
}

function About() {
  usePageTitle("Sobre mí | Alex Galvez");

  const {
    highlights = [],
    loading: aboutLoading,
    error: aboutError,
  } = usePortfolioAbout();

  const knowsAbout = useMemo(() => {
    const fromExpertise = staticExpertise.flatMap((item) => [
      item.title,
      item.text,
    ]);
    return uniqueStrings([...fromExpertise, ...extraKnowsAbout]);
  }, []);

  const sameAs = useMemo(
    () =>
      uniqueStrings([
        "https://github.com/alexgb23",
        "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
        "https://instagram.com/_aaleex_88",
      ]),
    [],
  );

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://alex.syskovex.com/sobre-mi/#profile",
          url: "https://alex.syskovex.com/sobre-mi",
          name: "Perfil técnico de Alex Galvez",
          description:
            "Perfil técnico especializado en infraestructura IT, redes, virtualización, automatización y sistemas conectados.",
          inLanguage: "es",
          dateCreated: "2026-05-29",
          dateModified: "2026-07-17",
          mainEntity: {
            "@id": "https://alex.syskovex.com/sobre-mi/#alex-galvez",
          },
        },
        {
          "@type": "Person",
          "@id": "https://alex.syskovex.com/sobre-mi/#alex-galvez",
          name: "Alexander Galvez",
          alternateName: "Alex Galvez",
          url: "https://alex.syskovex.com/sobre-mi",
          image: [
            "https://alex.syskovex.com/imagen_portfolio_mia_retocada-1280.avif",
            "https://alex.syskovex.com/imagen_portfolio_mia_retocada-1280.webp",
          ],
          jobTitle: "Systems, Infrastructure and Software Technician",
          description:
            "Técnico especializado en sistemas, infraestructura IT, redes, virtualización, automatización e integración de soluciones tecnológicas reales.",
          homeLocation: {
            "@type": "Place",
            name: "Barakaldo, País Vasco, España",
          },
          sameAs,
          knowsAbout,
          subjectOf: [
            {
              "@type": "WebSite",
              name: "SYSKOVEX",
              url: "https://syskovex.com",
            },
          ],
        },
      ],
    }),
    [knowsAbout, sameAs],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(structuredData).replace(/<\//g, "<\\/"),
    [structuredData],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd,
        }}
      />

      <section className="about-section" id="about">
        <div className="container about-container">
          <div className="about-left">
            <span className="about-kicker">// Sobre mí</span>

            <h1 className="about-title">{staticAboutTitle}</h1>

            <p className="about-text">{staticAboutIntro}</p>

            {staticParagraphs.map((paragraph, index) => (
              <p key={index} className="about-text">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-right">
            <div className="about-avatar-block">
              <div className="about-avatar-frame">
                <picture className="about-avatar-picture">
                  <source
                    type="image/avif"
                    srcSet="
                      /imagen_portfolio_mia_retocada-480.avif 480w,
                      /imagen_portfolio_mia_retocada-768.avif 768w,
                      /imagen_portfolio_mia_retocada-960.avif 960w,
                      /imagen_portfolio_mia_retocada-1280.avif 1280w
                    "
                    sizes="(max-width: 767px) 320px, (max-width: 1279px) 420px, 640px"
                  />
                  <source
                    type="image/webp"
                    srcSet="
                      /imagen_portfolio_mia_retocada-480.webp 480w,
                      /imagen_portfolio_mia_retocada-768.webp 768w,
                      /imagen_portfolio_mia_retocada-960.webp 960w,
                      /imagen_portfolio_mia_retocada-1280.webp 1280w
                    "
                    sizes="(max-width: 767px) 320px, (max-width: 1279px) 420px, 640px"
                  />
                  <img
                    src="/imagen_portfolio_mia_retocada-1280.avif"
                    alt="Retrato profesional de Alex Galvez"
                    className="about-profile-avatar"
                    width="640"
                    height="820"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        {aboutError ? (
          <section className="technical-section">
            <div className="technical-line"></div>
            <div className="empty-inline-state">
              <p>No se pudo cargar la sección técnica en este momento.</p>
            </div>
          </section>
        ) : null}

        {!aboutLoading && highlights.length > 0 ? (
          <section className="technical-section">
            <div className="technical-line"></div>

            <div className="technical-timeline">
              {highlights.map((item, index) => (
                <article
                  key={item.id || item.number || index}
                  className={`stat-card ${item.side || "left"}`}
                >
                  <span className="stat-number">{item.number}</span>

                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="expertise-section">
          <div className="expertise-grid grid-4xl">
            {staticExpertise.map((item, index) => {
              const Icon =
                expertiseIconMap[(item?.icon_key || "").toLowerCase()] ||
                FaCode;

              return (
                <article
                  key={item.id || item.title || index}
                  className={`expertise-card expertise-card-hover ${item.tone || "tone-0"}`}
                >
                  <div className="card-head">
                    <div className="expertise-icon">
                      <Icon />
                    </div>

                    <div className="card-title-wrap">
                      <h3>{item.title}</h3>
                    </div>
                  </div>

                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}

export default About;
