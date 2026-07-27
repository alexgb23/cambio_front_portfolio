import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./navbar/Navbar";

const CvModal = lazy(() => import("../modal/CvModal"));

const THEME_STORAGE_KEY = "syskovex-theme-mode";
const HOME_BG_SRC = "/fondo_home.webp";

const PLATE_SOURCE_X = 1155;
const PLATE_SOURCE_Y = 510;

function MainLayout() {
  const location = useLocation();
  const mainRef = useRef(null);

  const isHomeRoute = location.pathname === "/";
  const isProjectDetailRoute = /^\/proyectos\/[^/]+$/.test(location.pathname);

  const [homeBgMeta, setHomeBgMeta] = useState({
    src: HOME_BG_SRC,
    naturalWidth: 0,
    naturalHeight: 0,
    loaded: false,
  });

  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === "undefined") return "system";

    try {
      const savedMode = window.localStorage.getItem(THEME_STORAGE_KEY);

      if (
        savedMode === "light" ||
        savedMode === "dark" ||
        savedMode === "system"
      ) {
        return savedMode;
      }
    } catch {
      return "system";
    }

    return "system";
  });

  const [isCvOpen, setIsCvOpen] = useState(false);
  const [cvSocialLinks, setCvSocialLinks] = useState([]);

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      setSystemPrefersDark(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Ignora errores de storage
    }
  }, [themeMode]);

  const isDarkMode =
    themeMode === "dark" || (themeMode === "system" && systemPrefersDark);

  useEffect(() => {
    const resolvedTheme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode((currentMode) => {
      const currentIsDark =
        currentMode === "system" ? systemPrefersDark : currentMode === "dark";

      return currentIsDark ? "light" : "dark";
    });
  }, [systemPrefersDark]);

  const openCvModal = useCallback(() => {
    setIsCvOpen(true);
  }, []);

  const closeCvModal = useCallback(() => {
    setIsCvOpen(false);
  }, []);

  const updateCvSocialLinks = useCallback((links) => {
    setCvSocialLinks(Array.isArray(links) ? links : []);
  }, []);

  const websiteSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://alex.syskovex.com/#website",
      name: "Portfolio técnico de Alexander Galvez",
      url: "https://alex.syskovex.com/",
      inLanguage: "es-ES",
    }),
    [],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(websiteSchema).replace(/<\//g, "<\\/"),
    [websiteSchema],
  );

  useEffect(() => {
    if (!isHomeRoute) return;

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;

      setHomeBgMeta({
        src: HOME_BG_SRC,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        loaded: true,
      });

      console.groupCollapsed("[HOME BG] image loaded");
      console.table({
        src: HOME_BG_SRC,
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
        src: HOME_BG_SRC,
        naturalWidth: 0,
        naturalHeight: 0,
        loaded: false,
      });

      console.error("[HOME BG] No se pudo cargar la imagen:", HOME_BG_SRC);
    };

    img.src = HOME_BG_SRC;

    return () => {
      cancelled = true;
    };
  }, [isHomeRoute]);

  useEffect(() => {
    if (!isHomeRoute) return;
    if (!homeBgMeta.loaded) return;

    const mainElement = mainRef.current;
    if (!mainElement) return;

    const updateHomeBackgroundMetrics = () => {
      const rect = mainElement.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      if (!containerWidth || !containerHeight) return;
      if (!homeBgMeta.naturalWidth || !homeBgMeta.naturalHeight) return;

      const scaleX = containerWidth / homeBgMeta.naturalWidth;
      const scaleY = containerHeight / homeBgMeta.naturalHeight;
      const scale = Math.max(scaleX, scaleY);

      const renderedWidth = homeBgMeta.naturalWidth * scale;
      const renderedHeight = homeBgMeta.naturalHeight * scale;

      const offsetX = (containerWidth - renderedWidth) / 2;
      const offsetY = (containerHeight - renderedHeight) / 2;

      const plateRatioX = PLATE_SOURCE_X / homeBgMeta.naturalWidth;
      const plateRatioY = PLATE_SOURCE_Y / homeBgMeta.naturalHeight;

      const plateCenterX = offsetX + PLATE_SOURCE_X * scale;
      const plateCenterY = offsetY + PLATE_SOURCE_Y * scale;

      const heroElement = document.querySelector(".hero-centered-section");
      const heroRowElement = document.querySelector(".hero-top-row");
      const heroContainerElement = document.querySelector(
        ".hero-center-content",
      );
      const avatarAnchorElement = document.querySelector(".hero-avatar-anchor");
      const avatarBlockElement = document.querySelector(".avatar-block");
      const avatarWrapperElement = document.querySelector(".avatar-wrapper");

      const heroRect = heroElement?.getBoundingClientRect() ?? null;
      const heroRowRect = heroRowElement?.getBoundingClientRect() ?? null;
      const heroContainerRect =
        heroContainerElement?.getBoundingClientRect() ?? null;
      const avatarAnchorRect =
        avatarAnchorElement?.getBoundingClientRect() ?? null;
      const avatarBlockRect =
        avatarBlockElement?.getBoundingClientRect() ?? null;
      const avatarWrapperRect =
        avatarWrapperElement?.getBoundingClientRect() ?? null;

      let plateLocalX = plateCenterX;
      let plateLocalY = plateCenterY;

      if (avatarAnchorRect) {
        plateLocalX = plateCenterX - avatarAnchorRect.left;
        plateLocalY = plateCenterY - avatarAnchorRect.top;
      }

      mainElement.style.setProperty("--plate-center-x", `${plateCenterX}px`);
      mainElement.style.setProperty("--plate-center-y", `${plateCenterY}px`);
      mainElement.style.setProperty("--plate-local-x", `${plateLocalX}px`);
      mainElement.style.setProperty("--plate-local-y", `${plateLocalY}px`);
      mainElement.style.setProperty("--home-bg-scale", `${scale}`);
      mainElement.style.setProperty("--bg-offset-x", `${offsetX}px`);
      mainElement.style.setProperty("--bg-offset-y", `${offsetY}px`);
      mainElement.style.setProperty(
        "--bg-rendered-width",
        `${renderedWidth}px`,
      );
      mainElement.style.setProperty(
        "--bg-rendered-height",
        `${renderedHeight}px`,
      );

      const computedMain = window.getComputedStyle(mainElement);
      const computedHero = heroElement
        ? window.getComputedStyle(heroElement)
        : null;
      const computedAvatarBlock = avatarBlockElement
        ? window.getComputedStyle(avatarBlockElement)
        : null;
      const computedAvatarWrapper = avatarWrapperElement
        ? window.getComputedStyle(avatarWrapperElement)
        : null;

      console.groupCollapsed(
        `[HOME BG DEBUG] ${Math.round(containerWidth)}x${Math.round(containerHeight)}`,
      );

      console.table({
        route: location.pathname,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });

      console.table({
        imageNaturalWidth: homeBgMeta.naturalWidth,
        imageNaturalHeight: homeBgMeta.naturalHeight,
        plateSourceX: PLATE_SOURCE_X,
        plateSourceY: PLATE_SOURCE_Y,
        plateRatioX: Number(plateRatioX.toFixed(6)),
        plateRatioY: Number(plateRatioY.toFixed(6)),
      });

      console.table({
        containerLeft: Number(rect.left.toFixed(2)),
        containerTop: Number(rect.top.toFixed(2)),
        containerWidth: Number(containerWidth.toFixed(2)),
        containerHeight: Number(containerHeight.toFixed(2)),
        scaleX: Number(scaleX.toFixed(6)),
        scaleY: Number(scaleY.toFixed(6)),
        scale: Number(scale.toFixed(6)),
        renderedWidth: Number(renderedWidth.toFixed(2)),
        renderedHeight: Number(renderedHeight.toFixed(2)),
        offsetX: Number(offsetX.toFixed(2)),
        offsetY: Number(offsetY.toFixed(2)),
        cropLeft: Number(Math.abs(Math.min(offsetX, 0)).toFixed(2)),
        cropRight: Number(Math.abs(Math.min(offsetX, 0)).toFixed(2)),
        cropTop: Number(Math.abs(Math.min(offsetY, 0)).toFixed(2)),
        cropBottom: Number(Math.abs(Math.min(offsetY, 0)).toFixed(2)),
        plateCenterX: Number(plateCenterX.toFixed(2)),
        plateCenterY: Number(plateCenterY.toFixed(2)),
        plateLocalX: Number(plateLocalX.toFixed(2)),
        plateLocalY: Number(plateLocalY.toFixed(2)),
      });

      if (heroRect) {
        console.table({
          heroLeft: Number(heroRect.left.toFixed(2)),
          heroTop: Number(heroRect.top.toFixed(2)),
          heroWidth: Number(heroRect.width.toFixed(2)),
          heroHeight: Number(heroRect.height.toFixed(2)),
        });
      }

      if (heroContainerRect) {
        console.table({
          heroContainerLeft: Number(heroContainerRect.left.toFixed(2)),
          heroContainerTop: Number(heroContainerRect.top.toFixed(2)),
          heroContainerWidth: Number(heroContainerRect.width.toFixed(2)),
          heroContainerHeight: Number(heroContainerRect.height.toFixed(2)),
        });
      }

      if (heroRowRect) {
        console.table({
          heroRowLeft: Number(heroRowRect.left.toFixed(2)),
          heroRowTop: Number(heroRowRect.top.toFixed(2)),
          heroRowWidth: Number(heroRowRect.width.toFixed(2)),
          heroRowHeight: Number(heroRowRect.height.toFixed(2)),
        });
      }

      if (avatarAnchorRect) {
        console.table({
          avatarAnchorLeft: Number(avatarAnchorRect.left.toFixed(2)),
          avatarAnchorTop: Number(avatarAnchorRect.top.toFixed(2)),
          avatarAnchorWidth: Number(avatarAnchorRect.width.toFixed(2)),
          avatarAnchorHeight: Number(avatarAnchorRect.height.toFixed(2)),
          plateCenterXGlobal: Number(plateCenterX.toFixed(2)),
          plateCenterYGlobal: Number(plateCenterY.toFixed(2)),
          plateLocalX: Number(plateLocalX.toFixed(2)),
          plateLocalY: Number(plateLocalY.toFixed(2)),
        });
      }

      if (avatarBlockRect) {
        console.table({
          avatarBlockLeft: Number(avatarBlockRect.left.toFixed(2)),
          avatarBlockTop: Number(avatarBlockRect.top.toFixed(2)),
          avatarBlockWidth: Number(avatarBlockRect.width.toFixed(2)),
          avatarBlockHeight: Number(avatarBlockRect.height.toFixed(2)),
        });
      }

      if (avatarWrapperRect) {
        console.table({
          avatarWrapperLeft: Number(avatarWrapperRect.left.toFixed(2)),
          avatarWrapperTop: Number(avatarWrapperRect.top.toFixed(2)),
          avatarWrapperWidth: Number(avatarWrapperRect.width.toFixed(2)),
          avatarWrapperHeight: Number(avatarWrapperRect.height.toFixed(2)),
          avatarWrapperCenterX: Number(
            (avatarWrapperRect.left + avatarWrapperRect.width / 2).toFixed(2),
          ),
          avatarWrapperBottomY: Number(
            (avatarWrapperRect.top + avatarWrapperRect.height).toFixed(2),
          ),
        });
      }

      console.table({
        cssVarPlateCenterX:
          computedMain.getPropertyValue("--plate-center-x").trim() || "(empty)",
        cssVarPlateCenterY:
          computedMain.getPropertyValue("--plate-center-y").trim() || "(empty)",
        cssVarPlateLocalX:
          computedMain.getPropertyValue("--plate-local-x").trim() || "(empty)",
        cssVarPlateLocalY:
          computedMain.getPropertyValue("--plate-local-y").trim() || "(empty)",
        cssVarBgRenderedWidth:
          computedMain.getPropertyValue("--bg-rendered-width").trim() ||
          "(empty)",
        cssVarBgRenderedHeight:
          computedMain.getPropertyValue("--bg-rendered-height").trim() ||
          "(empty)",
        cssVarBgOffsetX:
          computedMain.getPropertyValue("--bg-offset-x").trim() || "(empty)",
        cssVarBgOffsetY:
          computedMain.getPropertyValue("--bg-offset-y").trim() || "(empty)",
      });

      if (computedHero) {
        console.table({
          heroPosition: computedHero.position,
          heroOverflow: computedHero.overflow,
          heroZIndex: computedHero.zIndex,
        });
      }

      if (computedAvatarBlock) {
        console.table({
          avatarBlockPosition: computedAvatarBlock.position,
          avatarBlockLeft: computedAvatarBlock.left,
          avatarBlockTop: computedAvatarBlock.top,
          avatarBlockRight: computedAvatarBlock.right,
          avatarBlockBottom: computedAvatarBlock.bottom,
          avatarBlockTransform: computedAvatarBlock.transform,
          avatarBlockPointerEvents: computedAvatarBlock.pointerEvents,
        });
      }

      if (computedAvatarWrapper) {
        console.table({
          avatarWrapperWidth: computedAvatarWrapper.width,
          avatarWrapperMaxWidth: computedAvatarWrapper.maxWidth,
          avatarWrapperTransform: computedAvatarWrapper.transform,
          avatarWrapperPosition: computedAvatarWrapper.position,
        });
      }

      console.groupEnd();
    };

    updateHomeBackgroundMetrics();

    const resizeObserver = new ResizeObserver(() => {
      updateHomeBackgroundMetrics();
    });

    resizeObserver.observe(mainElement);
    window.addEventListener("resize", updateHomeBackgroundMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHomeBackgroundMetrics);
    };
  }, [isHomeRoute, homeBgMeta, location.pathname]);

  const mainClassName = [
    "layout-main",
    isProjectDetailRoute ? "layout-main--project-detail" : "",
    isHomeRoute ? "layout-main--home" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      {!isProjectDetailRoute && (
        <Navbar
          isDarkMode={isDarkMode}
          themeMode={themeMode}
          toggleTheme={toggleTheme}
          onOpenCv={openCvModal}
        />
      )}

      <main ref={mainRef} className={mainClassName}>
        <Outlet
          context={{
            openCvModal,
            closeCvModal,
            setCvSocialLinks: updateCvSocialLinks,
            homeBgMeta,
          }}
        />
      </main>

      <Suspense fallback={null}>
        {isCvOpen ? (
          <CvModal
            isOpen={isCvOpen}
            onClose={closeCvModal}
            socialLinks={cvSocialLinks}
          />
        ) : null}
      </Suspense>
    </>
  );
}

export default MainLayout;
