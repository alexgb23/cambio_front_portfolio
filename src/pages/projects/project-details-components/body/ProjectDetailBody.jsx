import BodyHead from "./BodyHead";
import ProjectOverview from "./ProjectOverview";
import ProjectShowcase from "./ProjectShowcase"
import ProjectResources from "./ProjectResources";
import ProjectTimeline from "./ProjectTimeline";
import styles from "./ProjectDetailBody.module.css";

function ProjectDetailBody({ project }) {
  if (!project) return null;

  return (
    <div className={styles.body}>
      <BodyHead project={project} />
      <ProjectOverview project={project} />
      <ProjectShowcase project={project} />
      <ProjectResources project={project}/>
      <ProjectTimeline project={project}/>
    </div>
  );
}

export default ProjectDetailBody;
