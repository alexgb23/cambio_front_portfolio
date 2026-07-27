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

const HOME_BG_WIDTH = 1672;
const HOME_BG_HEIGHT = 1264;

/*
  Punto aproximado del centro del plato dentro de la imagen original.
  Ajustaremos fino luego si hace falta.
*/
const PLATE_SOURCE_X = 1148;
const PLATE_SOURCE_Y = 806;

function MainLayout() {
  const location = useLocation();
  const mainRef = useRef(null);

  const isHomeRoute = location.pathname === "/";
  const isProjectDetailRoute = /^\/proyectos\/[^/]+$/.test(location.pathname);

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

    const mainElement = mainRef.current;
    if (!mainElement) return;

    const updateHomeBackgroundMetrics = () => {
      const rect = mainElement.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      if (!containerWidth || !containerHeight) return;

      const scale = Math.max(
        containerWidth / HOME_BG_WIDTH,
        containerHeight / HOME_BG_HEIGHT,
      );

      const renderedWidth = HOME_BG_WIDTH * scale;
      const renderedHeight = HOME_BG_HEIGHT * scale;

      const offsetX = (containerWidth - renderedWidth) / 2;
      const offsetY = (containerHeight - renderedHeight) / 2;

      const plateCenterX = offsetX + PLATE_SOURCE_X * scale;
      const plateCenterY = offsetY + PLATE_SOURCE_Y * scale;

      mainElement.style.setProperty("--home-bg-width", `${HOME_BG_WIDTH}px`);
      mainElement.style.setProperty("--home-bg-height", `${HOME_BG_HEIGHT}px`);
      mainElement.style.setProperty("--home-bg-scale", `${scale}`);
      mainElement.style.setProperty(
        "--bg-rendered-width",
        `${renderedWidth}px`,
      );
      mainElement.style.setProperty(
        "--bg-rendered-height",
        `${renderedHeight}px`,
      );
      mainElement.style.setProperty("--bg-offset-x", `${offsetX}px`);
      mainElement.style.setProperty("--bg-offset-y", `${offsetY}px`);
      mainElement.style.setProperty(
        "--home-container-width",
        `${containerWidth}px`,
      );
      mainElement.style.setProperty(
        "--home-container-height",
        `${containerHeight}px`,
      );

      mainElement.style.setProperty("--plate-center-x", `${plateCenterX}px`);
      mainElement.style.setProperty("--plate-center-y", `${plateCenterY}px`);
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
  }, [isHomeRoute]);

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
