import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router";
import HeroSection from "../../layout/sections/heroSection/HeroSection";
import HomeStacks from "../../layout/sections/homeStacks/HomeStacks";
import HomeTechnologies from "../../layout/sections/homeTechnologies/HomeTechnologies";
import ContactPreview from "../../layout/sections/ContactPreview";
import { usePortfolioHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

import "./Home.css";

const PLATE_SOURCE_X = 1012;
const PLATE_SOURCE_Y = 490;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function Home() {
  const { openCvModal, setCvSocialLinks, isDarkMode } = useOutletContext();

  const stageRef = useRef(null);
  const heroHostRef = useRef(null);
  const frameRef = useRef(0);

  // Metadatos de la imagen de fondo realmente aplicada al stage.
  const [homeBgMeta, setHomeBgMeta] = useState({
    src: "",
    naturalWidth: 0,
    naturalHeight: 0,
    loaded: false,
  });

  // Punto del plato convertido al sistema local del hero para posicionar el avatar.
  const [heroPlatePoint, setHeroPlatePoint] = useState({
    x: null,
    y: null,
    ready: false,
  });

  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const {
    socialLinks,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  // Expone los enlaces sociales al layout padre.
  useEffect(() => {
    if (typeof setCvSocialLinks === "function") {
      setCvSocialLinks(socialLinks);
    }
  }, [socialLinks, setCvSocialLinks]);

  // Precarga ambas imágenes de fondo para evitar parpadeos al cambiar de tema.
  useEffect(() => {
    const darkImg = new Image();
    const lightImg = new Image();

    darkImg.src = "/fondoHome/fondo_home_dark.webp";
    lightImg.src = "/fondoHome/fondo_home_light.webp";
  }, []);

  // Obtiene la imagen de fondo activa y sus dimensiones reales.
  useEffect(() => {
    const stageElement = stageRef.current;
    if (!stageElement) return;

    let cancelled = false;

    const extractLastBackgroundUrl = (backgroundImageValue) => {
      if (!backgroundImageValue || backgroundImageValue === "none") return "";

      const matches = [
        ...backgroundImageValue.matchAll(/url\((["']?)(.*?)\1\)/g),
      ];

      if (!matches.length) return "";

      return matches[matches.length - 1][2];
    };

    const computedStage = window.getComputedStyle(stageElement);
    const renderedBackgroundSrc = extractLastBackgroundUrl(
      computedStage.backgroundImage,
    );

    if (!renderedBackgroundSrc) {
      setHomeBgMeta({
        src: "",
        naturalWidth: 0,
        naturalHeight: 0,
        loaded: false,
      });
      return;
    }

    const img = new Image();

    img.onload = () => {
      if (cancelled) return;

      setHomeBgMeta({
        src: renderedBackgroundSrc,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        loaded: true,
      });
    };

    img.onerror = () => {
      if (cancelled) return;

      setHomeBgMeta({
        src: renderedBackgroundSrc,
        naturalWidth: 0,
        naturalHeight: 0,
        loaded: false,
      });
    };

    img.src = renderedBackgroundSrc;

    return () => {
      cancelled = true;
    };
  }, [isDarkMode]);

  // Calcula el punto real del plato dentro del stage y lo traduce al sistema local del hero.
  useEffect(() => {
    if (!homeBgMeta.loaded) return;

    const stageElement = stageRef.current;
    const heroHostElement = heroHostRef.current;
    if (!stageElement || !heroHostElement) return;

    const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let resizeTimeoutId = 0;

    const clearMetrics = () => {
      stageElement.style.removeProperty("--plate-debug-x");
      stageElement.style.removeProperty("--plate-debug-y");
      stageElement.style.removeProperty("--home-bg-scale");
      stageElement.style.removeProperty("--bg-offset-x");
      stageElement.style.removeProperty("--bg-offset-y");
      stageElement.style.removeProperty("--bg-rendered-width");
      stageElement.style.removeProperty("--bg-rendered-height");

      setHeroPlatePoint({
        x: null,
        y: null,
        ready: false,
      });
    };

    const updateMetrics = () => {
      if (!desktopMediaQuery.matches) {
        clearMetrics();
        return;
      }

      const stageRect = stageElement.getBoundingClientRect();
      const heroRect = heroHostElement.getBoundingClientRect();

      const bgAreaWidth = stageRect.width;
      const bgAreaHeight = stageRect.height;

      if (
        !bgAreaWidth ||
        !bgAreaHeight ||
        !homeBgMeta.naturalWidth ||
        !homeBgMeta.naturalHeight
      ) {
        return;
      }

      // El fondo está en cover, así que calculamos su escala renderizada real.
      const scale = Math.max(
        bgAreaWidth / homeBgMeta.naturalWidth,
        bgAreaHeight / homeBgMeta.naturalHeight,
      );

      const renderedWidth = homeBgMeta.naturalWidth * scale;
      const renderedHeight = homeBgMeta.naturalHeight * scale;

      const offsetX = (bgAreaWidth - renderedWidth) / 2;
      const offsetY = (bgAreaHeight - renderedHeight) / 2;

      // Coordenadas reales del punto del plato dentro del stage.
      const plateCenterX =
        offsetX + (PLATE_SOURCE_X / homeBgMeta.naturalWidth) * renderedWidth;

      const plateCenterY =
        offsetY + (PLATE_SOURCE_Y / homeBgMeta.naturalHeight) * renderedHeight;

      // Variables CSS globales del stage, útiles para overlays y posicionamiento absoluto.
      stageElement.style.setProperty("--plate-debug-x", `${plateCenterX}px`);
      stageElement.style.setProperty("--plate-debug-y", `${plateCenterY}px`);
      stageElement.style.setProperty("--home-bg-scale", `${scale}`);
      stageElement.style.setProperty("--bg-offset-x", `${offsetX}px`);
      stageElement.style.setProperty("--bg-offset-y", `${offsetY}px`);
      stageElement.style.setProperty(
        "--bg-rendered-width",
        `${renderedWidth}px`,
      );
      stageElement.style.setProperty(
        "--bg-rendered-height",
        `${renderedHeight}px`,
      );

      // Convierte el punto global del stage al sistema local del hero.
      const heroLocalX = plateCenterX - (heroRect.left - stageRect.left);
      const heroLocalY = plateCenterY - (heroRect.top - stageRect.top);

      // Evita renders extra cuando el valor apenas cambia.
      setHeroPlatePoint((prev) => {
        if (
          prev.ready &&
          Math.abs(prev.x - heroLocalX) < 0.5 &&
          Math.abs(prev.y - heroLocalY) < 0.5
        ) {
          return prev;
        }

        return {
          x: heroLocalX,
          y: heroLocalY,
          ready: true,
        };
      });
    };

    // Espera a que el layout termine de asentarse antes de medir.
    const scheduleStableUpdate = (delay = 140) => {
      window.clearTimeout(resizeTimeoutId);

      resizeTimeoutId = window.setTimeout(() => {
        cancelAnimationFrame(frameRef.current);

        frameRef.current = requestAnimationFrame(() => {
          frameRef.current = requestAnimationFrame(() => {
            updateMetrics();
          });
        });
      }, delay);
    };

    const handleWindowResize = () => {
      scheduleStableUpdate(140);
    };

    const handleDesktopChange = (event) => {
      if (event.matches) {
        scheduleStableUpdate(0);
      } else {
        clearMetrics();
      }
    };

    scheduleStableUpdate(0);
    window.setTimeout(() => scheduleStableUpdate(0), 250);
    window.setTimeout(() => scheduleStableUpdate(0), 500);

    window.addEventListener("resize", handleWindowResize);

    if (desktopMediaQuery.addEventListener) {
      desktopMediaQuery.addEventListener("change", handleDesktopChange);
    } else {
      desktopMediaQuery.addListener(handleDesktopChange);
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.clearTimeout(resizeTimeoutId);
      cancelAnimationFrame(frameRef.current);

      if (desktopMediaQuery.removeEventListener) {
        desktopMediaQuery.removeEventListener("change", handleDesktopChange);
      } else {
        desktopMediaQuery.removeListener(handleDesktopChange);
      }
    };
  }, [homeBgMeta.loaded, homeBgMeta.naturalWidth, homeBgMeta.naturalHeight]);

  const hasSocialLinks = Array.isArray(socialLinks) && socialLinks.length > 0;

  // Datos estructurados SEO de la home.
  const homeSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://alex.syskovex.com/#website",
          url: "https://alex.syskovex.com/",
          name: "Portfolio de Alexander Galvez",
          description:
            "Portfolio técnico de Alexander Galvez especializado en infraestructura IT, redes, virtualización, automatización y desarrollo de software.",
          inLanguage: "es",
        },
        {
          "@type": "Person",
          "@id": "https://alex.syskovex.com/#alexander-galvez",
          name: "Alexander Galvez",
          alternateName: "Alex Galvez",
          url: "https://alex.syskovex.com/",
          image:
            "https://alex.syskovex.com/imagen_portfolio_mia_retocada-960.avif",
          jobTitle: "Systems, Infrastructure and Software Technician",
          description:
            "Perfil técnico especializado en infraestructura IT, redes, virtualización, automatización y desarrollo de software.",
          knowsAbout: [
            "Infraestructura IT",
            "Administración de sistemas",
            "Virtualización",
            "Redes",
            "Seguridad perimetral",
            "Automatización",
            "IoT",
            "Linux",
            "APIs",
            "Desarrollo de software",
          ],
          sameAs: [
            "https://github.com/alexgb23",
            "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
            "https://instagram.com/_aaleex_88",
            "https://www.facebook.com/alexander.galvez.benavides",
          ],
          mainEntityOfPage: {
            "@id": "https://alex.syskovex.com/#website",
          },
        },
      ],
    }),
    [],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(homeSchema).replace(/<\//g, "<\\/"),
    [homeSchema],
  );

  return (
    <section id="main-content" className="home-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <div
        ref={stageRef}
        className={`home-bleed-stage ${isDarkMode ? "home-bleed-stage--dark" : "home-bleed-stage--light"}`}
      >
        <span className="plate-debug-point" aria-hidden="true" />

        <div className="home-screen__inner container">
          <div className="home-screen__layout">
            <section ref={heroHostRef} className="home-screen__hero">
              <HeroSection
                socialLinks={socialLinks}
                onOpenCv={openCvModal}
                platePoint={heroPlatePoint}
              />
            </section>

            <section
              className="home-screen__stacks"
              aria-labelledby="home-stacks-title"
            >
              <HomeStacks />
            </section>

            <section
              className="home-screen__technologies"
              aria-labelledby="home-technologies-title"
            >
              <HomeTechnologies />
            </section>

            <aside
              className="home-screen__contact"
              aria-label="Enlaces de contacto"
            >
              <ContactPreview
                socialLinks={socialLinks}
                loading={homeLoading}
                error={homeError}
              />
            </aside>
          </div>
        </div>
      </div>

      {homeError && !hasSocialLinks ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state">
            <p>
              No se pudieron cargar los enlaces de contacto en este momento.
            </p>
          </div>
        </section>
      ) : null}
    </section>
  );
}

export default Home;
