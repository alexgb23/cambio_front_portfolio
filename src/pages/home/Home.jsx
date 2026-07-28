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
const PLATE_SOURCE_Y = 480;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function Home() {
  const { openCvModal, setCvSocialLinks, isDarkMode } = useOutletContext();

  const stageRef = useRef(null);
  const frameRef = useRef(0);

  const [homeBgMeta, setHomeBgMeta] = useState({
    src: "",
    naturalWidth: 0,
    naturalHeight: 0,
    loaded: false,
  });

  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const {
    socialLinks,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  useEffect(() => {
    if (typeof setCvSocialLinks === "function") {
      setCvSocialLinks(socialLinks);
    }
  }, [socialLinks, setCvSocialLinks]);

  useEffect(() => {
    const darkImg = new Image();
    const lightImg = new Image();

    darkImg.src = "/fondoHome/fondo_home_dark.webp";
    lightImg.src = "/fondoHome/fondo_home_light.webp";
  }, []);

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

      console.groupCollapsed("[HOME STAGE] image loaded");
      console.table({
        src: renderedBackgroundSrc,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        plateSourceX: PLATE_SOURCE_X,
        plateSourceY: PLATE_SOURCE_Y,
        plateRatioX: Number((PLATE_SOURCE_X / img.naturalWidth).toFixed(6)),
        plateRatioY: Number((PLATE_SOURCE_Y / img.naturalHeight).toFixed(6)),
      });
      console.groupEnd();
    };

    img.onerror = () => {
      if (cancelled) return;

      setHomeBgMeta({
        src: renderedBackgroundSrc,
        naturalWidth: 0,
        naturalHeight: 0,
        loaded: false,
      });

      console.error("[HOME STAGE] no se pudo cargar:", renderedBackgroundSrc);
    };

    img.src = renderedBackgroundSrc;

    return () => {
      cancelled = true;
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (!homeBgMeta.loaded) return;

    const stageElement = stageRef.current;
    if (!stageElement) return;

    const desktopMediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let resizeObserver = null;
    let resizeTimeoutId = 0;

    const clearMetrics = () => {
      stageElement.style.removeProperty("--plate-debug-x");
      stageElement.style.removeProperty("--plate-debug-y");
      stageElement.style.removeProperty("--home-bg-scale");
      stageElement.style.removeProperty("--bg-offset-x");
      stageElement.style.removeProperty("--bg-offset-y");
      stageElement.style.removeProperty("--bg-rendered-width");
      stageElement.style.removeProperty("--bg-rendered-height");
    };

    const updateMetrics = (reason = "unknown") => {
      if (!desktopMediaQuery.matches) {
        clearMetrics();
        return;
      }

      const stageRect = stageElement.getBoundingClientRect();
      const bgAreaWidth = stageRect.width;
      const bgAreaHeight = stageRect.height;

      if (
        !bgAreaWidth ||
        !bgAreaHeight ||
        !homeBgMeta.naturalWidth ||
        !homeBgMeta.naturalHeight
      ) {
        console.warn("[HOME STAGE] medidas no válidas", {
          reason,
          bgAreaWidth,
          bgAreaHeight,
          naturalWidth: homeBgMeta.naturalWidth,
          naturalHeight: homeBgMeta.naturalHeight,
        });
        return;
      }

      const scale = Math.max(
        bgAreaWidth / homeBgMeta.naturalWidth,
        bgAreaHeight / homeBgMeta.naturalHeight,
      );

      const renderedWidth = homeBgMeta.naturalWidth * scale;
      const renderedHeight = homeBgMeta.naturalHeight * scale;

      const offsetX = (bgAreaWidth - renderedWidth) / 2;
      const offsetY = (bgAreaHeight - renderedHeight) / 2;

      const plateCenterX =
        offsetX + (PLATE_SOURCE_X / homeBgMeta.naturalWidth) * renderedWidth;

      const plateCenterY =
        offsetY + (PLATE_SOURCE_Y / homeBgMeta.naturalHeight) * renderedHeight;

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

      console.groupCollapsed(
        `[HOME STAGE DEBUG] ${reason} | ${Math.round(stageRect.width)}x${Math.round(stageRect.height)}`,
      );

      console.table({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        stageWidth: Number(stageRect.width.toFixed(2)),
        stageHeight: Number(stageRect.height.toFixed(2)),
      });

      console.table({
        naturalWidth: homeBgMeta.naturalWidth,
        naturalHeight: homeBgMeta.naturalHeight,
        scale: Number(scale.toFixed(6)),
        renderedWidth: Number(renderedWidth.toFixed(2)),
        renderedHeight: Number(renderedHeight.toFixed(2)),
        offsetX: Number(offsetX.toFixed(2)),
        offsetY: Number(offsetY.toFixed(2)),
      });

      console.table({
        plateSourceX: PLATE_SOURCE_X,
        plateSourceY: PLATE_SOURCE_Y,
        plateRatioX: Number(
          (PLATE_SOURCE_X / homeBgMeta.naturalWidth).toFixed(6),
        ),
        plateRatioY: Number(
          (PLATE_SOURCE_Y / homeBgMeta.naturalHeight).toFixed(6),
        ),
        plateCenterX: Number(plateCenterX.toFixed(2)),
        plateCenterY: Number(plateCenterY.toFixed(2)),
      });

      console.groupEnd();
    };

    const scheduleStableUpdate = (reason = "stable-update", delay = 140) => {
      window.clearTimeout(resizeTimeoutId);
      resizeTimeoutId = window.setTimeout(() => {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(() => {
          frameRef.current = requestAnimationFrame(() => {
            updateMetrics(reason);
          });
        });
      }, delay);
    };

    const handleWindowResize = () => {
      scheduleStableUpdate("window-resize", 140);
    };

    const handleDesktopChange = (event) => {
      if (event.matches) {
        scheduleStableUpdate("media-enter-desktop", 0);
      } else {
        clearMetrics();
      }
    };

    if (desktopMediaQuery.matches) {
      resizeObserver = new ResizeObserver(() => {
        scheduleStableUpdate("resize-observer", 140);
      });

      resizeObserver.observe(stageElement);

      scheduleStableUpdate("initial", 0);
      window.setTimeout(() => scheduleStableUpdate("timeout-250", 0), 250);
      window.setTimeout(() => scheduleStableUpdate("timeout-500", 0), 500);
    } else {
      clearMetrics();
    }

    window.addEventListener("resize", handleWindowResize);

    if (desktopMediaQuery.addEventListener) {
      desktopMediaQuery.addEventListener("change", handleDesktopChange);
    } else {
      desktopMediaQuery.addListener(handleDesktopChange);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

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
            <section className="home-screen__hero">
              <HeroSection socialLinks={socialLinks} onOpenCv={openCvModal} />
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
