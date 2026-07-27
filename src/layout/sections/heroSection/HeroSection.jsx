import { Link } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineBeaker } from "react-icons/hi2";

import "./HeroSection.css";

function HeroSection({ onOpenCv }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const handleOpenCv = useCallback(() => {
    if (typeof onOpenCv === "function") {
      onOpenCv();
    }
  }, [onOpenCv]);

  return (
    <header
      id="inicio"
      className={`hero-centered-section ${isVisible ? "hero-mounted" : ""}`}
    >
      <div className="container hero-center-content">
        <div className="hero-top-row">
          <div className="hero-title-container hero-title-container--syskovex">
            <span className="hero-kicker hero-kicker--pill">
              <span className="hero-kicker-dot" aria-hidden="true"></span>
              <span>Bienvenido a mi portfolio</span>
            </span>

            <h1 className="hero-main-title hero-main-title--brand">
              <span className="hero-main-title-light">ALEX.</span>
              <span className="hero-main-title-accent">SYS</span>
            </h1>

            <h2 className="sr-only">
              Portfolio de Alexander Galvez - Desarrollador full stack e
              ingeniero de sistemas
            </h2>

            <div
              className="hero-role-lines"
              aria-label="Especialización principal"
            >
              <p className="hero-role-line">
                Desarrollador <span>Full Stack</span>
              </p>
              <p className="hero-role-line">
                Ingeniero de <span>Sistemas</span>
              </p>
            </div>

            <p className="hero-intro hero-intro--compact">
              Construyo soluciones digitales modernas, escalables y seguras.
              Especializado en desarrollo web, automatización, infraestructura y
              sistemas inteligentes.
            </p>

            <div className="hero-actions hero-actions--left">
              <Link to="/proyectos" className="hero-cta hero-cta--primary">
                <span>Ver proyectos</span>
                <FaArrowRight />
              </Link>

              <Link to="/laboratorio" className="hero-cta hero-cta--secondary">
                <span>Explorar laboratorio</span>
                <HiOutlineBeaker />
              </Link>
            </div>

            <div className="hero-mobile-actions">
              <button
                type="button"
                className="hero-inline-cv"
                onClick={handleOpenCv}
              >
                Ver CV
              </button>
            </div>
          </div>

          <div className="avatar-block">
            <Link
              to="/sobre-mi"
              className="avatar-wrapper avatar-link"
              aria-label="Ir a la sección Sobre mí"
            >
              <picture className="avatar-picture">
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
                  alt="Retrato profesional de Alexander Galvez"
                  className="profile-avatar"
                  width="640"
                  height="820"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
