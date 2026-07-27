import { useMemo } from "react";
import { Link, NavLink } from "react-router";
import "./ProjectDetailSidebar.css";
import {
  FiHome,
  FiUser,
  FiFolder,
  FiCpu,
  FiMail,
  FiDownload,
  FiLayers,
  FiCode,
  FiGitBranch,
  FiClock,
  FiArrowLeft,
} from "react-icons/fi";

function ProjectDetailSidebar({
  project,
  isMobile = false,
  onOpenCv,
  onNavigate,
  activeSectionId = "overview",
}) {
  const firstLetter = project?.title?.charAt(0)?.toUpperCase() || "P";

  const sectionsCount = Array.isArray(project?.secciones)
    ? project.secciones.filter((section) => section?.es_visible !== false)
        .length
    : 0;

  const closeMenu = () => {
    if (typeof onNavigate === "function") {
      onNavigate();
    }
  };

  const handleOpenCv = (event) => {
    if (event) event.preventDefault();

    if (typeof onOpenCv === "function") {
      onOpenCv();
    }

    closeMenu();
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    closeMenu();
  };

  const portfolioLinks = useMemo(
    () => [
      {
        type: "route",
        to: "/",
        label: "Inicio",
        icon: <FiHome />,
        accent: "cyan",
      },
      {
        type: "route",
        to: "/sobre-mi",
        label: "Sobre mí",
        icon: <FiUser />,
        accent: "violet",
      },
      {
        type: "route",
        to: "/proyectos",
        label: "Proyectos",
        icon: <FiFolder />,
        accent: "blue",
      },
      {
        type: "route",
        to: "/laboratorio",
        label: "Laboratorio",
        icon: <FiCpu />,
        accent: "green",
      },
      {
        type: "action",
        action: handleOpenCv,
        label: "Ver CV",
        icon: <FiDownload />,
        accent: "lime",
      },
      {
        type: "route",
        to: "/contacto",
        label: "Contacto",
        icon: <FiMail />,
        accent: "pink",
      },
    ],
    [],
  );

  const projectLinks = useMemo(
    () => [
      { id: "overview", label: "Resumen", icon: <FiLayers />, accent: "cyan" },
      { id: "showcase", label: "Estructura", icon: <FiCode />, accent: "blue" },
      {
        id: "resources",
        label: "Recursos",
        icon: <FiFolder />,
        accent: "violet",
      },
      { id: "timeline", label: "Timeline", icon: <FiClock />, accent: "green" },
      { id: "stack", label: "Stack", icon: <FiGitBranch />, accent: "lime" },
    ],
    [],
  );

  return (
    <aside
      className={`project-detail__sidebar ${isMobile ? "is-mobile-drawer" : ""}`}
    >
      <div className="project-sidebar__top">
        <Link
          to="/proyectos"
          className="project-sidebar__logo"
          aria-label="Volver a proyectos"
          title="Volver a proyectos"
          onClick={closeMenu}
        >
          <FiArrowLeft />
          <span className="project-sidebar__tooltip">Volver a proyectos</span>
        </Link>

        <nav className="project-sidebar__nav" aria-label="Navegación principal">
          {portfolioLinks.map((item) => {
            if (item.type === "action") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`project-sidebar__item project-sidebar__item--${item.accent}`}
                  aria-label={item.label}
                  title={item.label}
                  onClick={item.action}
                >
                  {item.icon}
                  <span className="project-sidebar__tooltip">{item.label}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `project-sidebar__item project-sidebar__item--${item.accent} ${isActive ? "is-active" : ""}`
                }
                aria-label={item.label}
                title={item.label}
                onClick={closeMenu}
              >
                {item.icon}
                <span className="project-sidebar__tooltip">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="project-sidebar__divider" />

        <nav
          className="project-sidebar__nav"
          aria-label="Secciones del proyecto"
        >
          {projectLinks.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`project-sidebar__item project-sidebar__item--${item.accent} ${
                activeSectionId === item.id || (!activeSectionId && index === 0)
                  ? "is-active"
                  : ""
              }`}
              aria-label={item.label}
              title={item.label}
              onClick={() => scrollToSection(item.id)}
            >
              {item.icon}
              <span className="project-sidebar__tooltip">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="project-sidebar__bottom">
        <div className="project-sidebar__meta">
          <span className="project-sidebar__badge">
            {project?.area_principal || "project"}
          </span>
          <span className="project-sidebar__count">
            {sectionsCount} secciones
          </span>
        </div>

        <button
          type="button"
          className="project-sidebar__avatar"
          aria-label={project?.title || "Proyecto"}
          title={project?.title || "Proyecto"}
          onClick={() => scrollToSection("project-top")}
        >
          <span>{firstLetter}</span>
          <i className="project-sidebar__status" />
        </button>
      </div>
    </aside>
  );
}

export default ProjectDetailSidebar;
