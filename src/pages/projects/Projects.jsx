import ProjectCard from "../../components/cards/FeaturedProjectCard";
import { useProjects } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

function Projects() {
  usePageTitle("Proyectos de Desarrollo e Integración | Alexander Galvez");

  const projectsState = useProjects();

  const { projects, loading, error } = projectsState ?? {};

  const hasProjects = Array.isArray(projects) && projects.length > 0;

  if (loading) return null;

  if (error) {
    return (
      <section className="section section-spaced">
        <div className="section-head-centered">
          <span className="section-kicker">Portfolio</span>
          <h1>Proyectos de desarrollo e integración</h1>
          <p>
            Aplicaciones, paneles, integraciones y herramientas técnicas
            orientadas a resolver necesidades reales con software útil.
          </p>
        </div>

        <div className="state-wrapper error centered">
          <h2>Error al cargar proyectos</h2>
          <p>{error?.message || String(error)}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-spaced">
      <div className="section-head-centered">
        <span className="section-kicker">Portfolio</span>
        <h1>Proyectos de desarrollo e integración</h1>
        <p>
          Aplicaciones, paneles, integraciones y herramientas técnicas
          orientadas a resolver necesidades reales con software útil.
        </p>
      </div>

      {hasProjects ? (
        <>
          <h2 className="sr-only">Listado de proyectos</h2>

          <div className="grid-cards">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug ?? project.id ?? `${project.title}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-inline-state">
          <p>No hay proyectos cargados actualmente.</p>
        </div>
      )}
    </section>
  );
}

export default Projects;
