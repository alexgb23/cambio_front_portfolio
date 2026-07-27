import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload, FaTimes, FaStamp, FaPrint } from "react-icons/fa";
import "./CvModal.css";

import Avatar from "./cvComponents/Avatar";
import Sidebar from "./cvComponents/Sidebar";
import HeaderBanner from "./cvComponents/HeaderBanner";
import SobreMi from "./cvComponents/SobreMi";
import Especializacion from "./cvComponents/Especializacion";
import Experiencia from "./cvComponents/Experiencia";
import EducacionTecnologias from "./cvComponents/EducacionTecnologias";
import ProyectosIdiomas from "./cvComponents/ProyectosIdiomas";
import Footer from "./cvComponents/Footer";

const VIEWPORT_PADDING = 10;
const MAX_SCALE = 1.22;
const MM_TO_PX = 96 / 25.4;
const PAGE_WIDTH_PX = 210 * MM_TO_PX;
const PAGE_HEIGHT_PX = 297 * MM_TO_PX;

function useCvScale({ enabled, viewportRef }) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!enabled) return;

    let frame1 = 0;
    let frame2 = 0;
    let timeoutId = 0;

    const calculate = () => {
      const viewport = viewportRef.current;
      if (!(viewport instanceof HTMLElement)) return;

      const viewportPadding = window.innerWidth <= 768 ? 0 : VIEWPORT_PADDING;

      const vw = Math.max(viewport.clientWidth - viewportPadding * 2, 0);
      const vh = Math.max(viewport.clientHeight - viewportPadding * 2, 0);

      const widthScale = vw / PAGE_WIDTH_PX;
      const heightScale = vh / PAGE_HEIGHT_PX;

      const isMobile = window.innerWidth <= 768;

      const next = isMobile ? widthScale : Math.min(widthScale, heightScale, 1);

      setScale(Math.max(next, 0.1));
    };

    const calculateDeferred = () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      clearTimeout(timeoutId);

      frame1 = requestAnimationFrame(() => {
        calculate();

        frame2 = requestAnimationFrame(() => {
          calculate();

          timeoutId = window.setTimeout(() => {
            calculate();
          }, 120);
        });
      });
    };

    calculateDeferred();

    const observer = new ResizeObserver(() => {
      calculateDeferred();
    });

    if (viewportRef.current instanceof HTMLElement) {
      observer.observe(viewportRef.current);
    }

    window.addEventListener("resize", calculateDeferred);
    window.addEventListener("orientationchange", calculateDeferred);
    window.visualViewport?.addEventListener("resize", calculateDeferred);
    window.visualViewport?.addEventListener("scroll", calculateDeferred);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
      clearTimeout(timeoutId);

      window.removeEventListener("resize", calculateDeferred);
      window.removeEventListener("orientationchange", calculateDeferred);
      window.visualViewport?.removeEventListener("resize", calculateDeferred);
      window.visualViewport?.removeEventListener("scroll", calculateDeferred);
    };
  }, [enabled, viewportRef]);

  return scale;
}

function CvModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  const downloadGroupRef = useRef(null);

  // Viewport donde se calcula el espacio disponible
  const viewportRef = useRef(null);

  // Hoja A4 real
  const pageRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleAfterPrint = () => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isDownloadMenuOpen) {
          setIsDownloadMenuOpen(false);
          return;
        }

        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isDownloadMenuOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Escala automática
  const scale = useCvScale({
    enabled: isOpen,
    viewportRef,
  });

  // SOLO una variable CSS
  const shellStyle = {
    "--cv-scale": scale,
  };

  const handleToggleDownloadMenu = (event) => {
    event.stopPropagation();
    setIsDownloadMenuOpen((prev) => !prev);
  };

  const handlePrintCurrentCV = (event) => {
    event.stopPropagation();
    setIsDownloadMenuOpen(false);
    window.print();
  };

  const handleCloseMenu = (event) => {
    event.stopPropagation();
    setIsDownloadMenuOpen(false);
  };

  if (!isMounted || !isOpen) return null;

  return createPortal(
    <div className="cv-modal-overlay" onClick={onClose} role="presentation">
      <section
        className="cv-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div className="cv-modal-shell" style={shellStyle}>
          <header className="cv-topbar no-print">
            <div className="cv-topbar-inner">
              <div className="cv-topbar-left">
                <FaStamp className="cv-icon-small" />
                <span id="cv-modal-title" className="cv-topbar-title">
                  Currículum interactivo
                </span>
              </div>

              <div className="cv-topbar-actions">
                <div
                  className="cv-download-group"
                  ref={downloadGroupRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="cv-download-btn"
                    onClick={handleToggleDownloadMenu}
                    aria-expanded={isDownloadMenuOpen}
                    aria-haspopup="menu"
                    aria-label="Opciones de descarga e impresión"
                  >
                    <FaDownload className="cv-icon-small" />
                    <span>Descargar CV</span>
                  </button>

                  {isDownloadMenuOpen && (
                    <div className="cv-download-menu" role="menu">
                      <button
                        type="button"
                        className="cv-download-menu-btn"
                        role="menuitem"
                        onClick={handlePrintCurrentCV}
                      >
                        <FaPrint className="cv-icon-small" />
                        <span>Imprimir / Guardar PDF</span>
                      </button>

                      <a
                        href="/cvv/curriculum-friendly-dev.pdf"
                        download="CV_Dev.pdf"
                        role="menuitem"
                        className="cv-download-link"
                        onClick={handleCloseMenu}
                      >
                        CV Desarrollo
                      </a>

                      <a
                        href="/cvv/curriculum-friendly-sistemas.pdf"
                        download="CV_Sistemas.pdf"
                        role="menuitem"
                        className="cv-download-link"
                        onClick={handleCloseMenu}
                      >
                        CV Sistemas
                      </a>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="cv-close-btn"
                  onClick={onClose}
                  aria-label="Cerrar currículum"
                >
                  <FaTimes className="cv-icon-small" />
                </button>
              </div>
            </div>
          </header>

          <div className="cv-modal-body">
            <div ref={viewportRef} className="cv-viewport">
              <div className="cv-stage">
                <article
                  ref={pageRef}
                  className="cv-page"
                  aria-label="Currículum A4"
                >
                  <aside className="cv-sidebar">
                    <Avatar />
                    <Sidebar />
                  </aside>

                  <div className="cv-header">
                    <HeaderBanner />
                  </div>

                  <main className="cv-body">
                    <SobreMi />
                    <Especializacion />
                    <Experiencia />
                    <EducacionTecnologias />
                  </main>

                  <section className="cv-bottom">
                    <ProyectosIdiomas />
                  </section>

                  <footer className="cv-footer">
                    <Footer />
                  </footer>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default CvModal;
