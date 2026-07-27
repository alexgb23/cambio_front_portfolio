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
              Portfolio de Alexander Galvez - Tecnico de sistemas y
              Desarrollador full stack
            </h2>

            <div
              className="hero-role-lines"
              aria-label="Especialización principal"
            >
              <p className="hero-role-line">
                Tecnico de <span>Sistemas</span>
              </p>
              <p className="hero-role-line">
                Desarrollador <span>Full Stack</span>
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
        </div>
      </div>

      <div className="hero-avatar-anchor">
        <div className="avatar-block avatar-block--hex">
          <Link
            to="/sobre-mi"
            className="avatar-wrapper avatar-link avatar-wrapper--hex"
            aria-label="Ir a la sección Sobre mí"
          >
            <div className="avatar-hex-mask">
              <img
                src="/imagen_portfolio_mia_retocada-1280.png"
                alt="Retrato profesional de Alexander Galvez"
                className="profile-avatar profile-avatar--hex"
                width="640"
                height="820"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <svg
              className="avatar-hex-svg"
              viewBox="0 0 1000 1080"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Degradado metálico azul de fondo */}
                <linearGradient
                  id="hexBlueGlass"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00d2ff" />
                  <stop offset="50%" stopColor="#0066ff" />
                  <stop offset="100%" stopColor="#0022aa" />
                </linearGradient>

                {/* Filtro de resplandor para el acabado de cristal de la imagen */}
                <filter
                  id="crystalGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* UN SOLO PATH LIMPIO: Sin línea blanca central intermedia */}
              <path
                className="hex-solid-crystal"
                filter="url(#crystalGlow)"
                d="M 470,78 
   L 123,281 
   Q 93,298 96,335 
   L 96,745 
   Q 93,782 123,799 
   L 470,1002 
   Q 500,1019 530,1002 
   L 877,799 
   Q 907,782 904,745 
   L 904,335 
   Q 907,298 877,281 
   L 530,78 
   Q 500,61 470,78 Z"
              />

             
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
