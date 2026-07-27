import { useState } from "react";
import { NavLink, Link } from "react-router";
import {
  FaMoon,
  FaSun,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaDownload,
} from "react-icons/fa";

import "./Navbar.css";

/*
  Navbar recibe desde el padre:
  - isDarkMode: indica si el tema actual resuelto es oscuro
  - themeMode: "light", "dark" o "system"
  - toggleTheme: función para alternar el tema
  - onOpenCv: función que abre la modal del CV en MainLayout
*/
function Navbar({ isDarkMode, themeMode, toggleTheme, onOpenCv }) {
  /*
    isOpen controla el menú móvil:
    - false => menú cerrado
    - true  => menú abierto
  */
  const [isOpen, setIsOpen] = useState(false);

  /*
    closeMenu:
    cierra el menú móvil.
    Se usa al hacer click en logo o links para que en mobile
    el panel desaparezca después de navegar o interactuar.
  */
  const closeMenu = () => setIsOpen(false);

  /*
    handleOpenCv:
    este handler se usa en el link "Ver CV".

    ¿Por qué lleva preventDefault()?
    Porque aunque visualmente usamos un NavLink,
    en realidad no queremos navegar a otra ruta.
    Queremos abrir una modal.

    Flujo:
    1. evita la navegación del enlace
    2. cierra el menú móvil si estaba abierto
    3. llama a onOpenCv() que viene del MainLayout
    4. MainLayout pone isCvOpen en true y renderiza CvModal
  */
  const handleOpenCv = (event) => {
    event.preventDefault();
    closeMenu();

    if (typeof onOpenCv === "function") {
      onOpenCv();
    }
  };

  /*
    themeLabel:
    texto descriptivo del botón de tema.
    Sirve para mostrar un title más claro al usuario.
  */
  const themeLabel =
    themeMode === "system"
      ? `Tema automático (${isDarkMode ? "oscuro" : "claro"})`
      : `Tema manual ${isDarkMode ? "oscuro" : "claro"}`;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/*
          Logo del navbar:
          - navega al inicio
          - también cierra el menú móvil
        */}
        <Link
  to="/home"
  className="nav-logo"
  onClick={(e) => {
    closeMenu();
    e.currentTarget.blur();
  }}
>
          <div className="logo-avatar-wrapper">
           <img
  src="/logoPortfolio-144.webp"
  alt="Logo"
  className="logo-avatar"
  width={72}
  height={72}
  fetchPriority="high"
/>
          </div>

          <div className="logo-meta">
            <div className="logo-text">
              ALEX<span className="logo-accent">.SYS</span>
            </div>
            <span className="logo-subtext">PORTFOLIO</span>
          </div>
        </Link>

        {/*
          nav-links:
          bloque principal de navegación.

          Si isOpen es true, se añade la clase "active"
          para mostrar el menú en móvil.
        */}
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/sobre-mi"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Sobre mí
          </NavLink>

          {/*
            Este link está oculto con display:none.
            Lo mantienes en el código por si lo recuperas luego,
            pero ahora mismo no se ve.
          */}
          <NavLink
            to="/certificaciones"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
            style={{ display: "none" }}
          >
            Certificaciones
          </NavLink>

          <NavLink
            to="/proyectos"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Proyectos
          </NavLink>

          <NavLink
            to="/laboratorio"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeMenu}
          >
            Laboratorio
          </NavLink>

          {/*
            "Ver CV" está dentro del grupo de navegación,
            después de "Laboratorio", como tú querías.

            Importante:
            - visualmente parece un link del navbar
            - funcionalmente abre una modal
            - no cambia de página
          */}
          <NavLink to="#cv" className="nav-cv-inline" onClick={handleOpenCv}>
            <FaDownload />
            <span>Ver CV</span>
          </NavLink>

          {/*
            Link de contacto para versión móvil o bloque interno
            de navegación.
          */}
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `nav-contact-mobile ${isActive ? "active" : ""}`
            }
            onClick={closeMenu}
          >
            Contacto
          </NavLink>
        </div>

        {/*
          nav-actions:
          bloque derecho del navbar.
          Aquí van acciones globales, no links principales:
          - cambio de tema
          - CTA de contacto en desktop
          - botón hamburguesa
        */}
        <div className="nav-actions">
          <button
            type="button"
            className={`theme-toggle ${themeMode === "system" ? "is-system" : ""}`}
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Activar modo claro" : "Activar modo oscuro"
            }
            aria-pressed={isDarkMode}
            title={themeLabel}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <NavLink
            to="/contacto"
            className="nav-cta nav-contact-desktop"
            onClick={closeMenu}
          >
            Contacto
            <FaArrowRight />
          </NavLink>

          {/*
            Botón del menú móvil:
            - alterna entre abrir y cerrar
            - muestra icono distinto según estado
          */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Menú de navegación"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
