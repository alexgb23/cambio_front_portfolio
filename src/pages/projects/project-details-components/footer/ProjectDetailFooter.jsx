import { FiCode, FiPlay, FiSend } from "react-icons/fi";
import "./ProjectDetailFooter.css";

function ProjectDetailFooter({ project }) {
  const visibleLinks = Array.isArray(project?.adjuntos)
    ? project.adjuntos.filter((item) => item.es_visible)
    : [];

  const codeLink =
    visibleLinks.find((item) => item.grupo === "backend") ||
    visibleLinks.find((item) => item.grupo === "api") ||
    visibleLinks[0];

  const demoLink =
    visibleLinks.find((item) => item.grupo === "general") ||
    visibleLinks.find((item) => item.es_destacado) ||
    visibleLinks[1];

  return (
    <footer className="project-detail__footer project-footer" id="stack">
      <div className="project-footer__card">
        <div className="project-footer__background" aria-hidden="true" />

        <div className="project-footer__content">
          <div className="project-footer__visual" aria-hidden="true" />

          <div className="project-footer__copy">
            <h2>¿Te interesa este proyecto?</h2>
            <p>
              Si tienes alguna pregunta o quieres colaborar en algo similar,
              estaré encantado de hablar contigo.
            </p>
          </div>

          <div className="project-footer__actions">
            {codeLink ? (
              <a
                href={codeLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-footer__button"
              >
                <FiCode />
                <span>Ver código</span>
              </a>
            ) : null}

            {demoLink ? (
              <a
                href={demoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-footer__button"
              >
                <FiPlay />
                <span>Ver demo</span>
              </a>
            ) : null}

            <a
              href="/contact"
              className="project-footer__button project-footer__button--primary"
            >
              <FiSend />
              <span>Contactar</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ProjectDetailFooter;
