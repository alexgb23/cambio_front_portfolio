import styles from "./ProjectTimeline.module.css";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function formatTimelineDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getTimelineSection(project) {
  return asArray(project?.secciones).find(
    (section) => section?.clave === "project_timeline",
  );
}

function getTimelineItems(project) {
  const section = getTimelineSection(project);
  return asArray(section?.metadata?.timeline);
}

function getItemTone(index, total) {
  if (index === total - 1) return "green";
  if (index >= total - 2) return "teal";
  return "blue";
}

function handleTrackWheel(event) {
  const el = event.currentTarget;
  const canScrollHorizontally = el.scrollWidth > el.clientWidth;

  if (!canScrollHorizontally) return;

  event.preventDefault();
  el.scrollLeft += event.deltaY;
}

function ProjectTimelime({ project }) {
  if (!project) return null;

  const section = getTimelineSection(project);
  const items = getTimelineItems(project);

  if (!section || items.length === 0) return null;

  return (
    <section
      className={styles.section}
      id="timeline"
      aria-label={section.titulo || "Timeline del desarrollo"}
    >
      <h2 className={styles.heading}>
        {section.titulo || "Timeline del desarrollo"}
      </h2>

      <div className={styles.viewport} onWheel={handleTrackWheel}>
        <div className={styles.track}>
          <div className={styles.railBase} aria-hidden="true" />
          <div className={styles.railArrow} aria-hidden="true" />

          {items.map((item, index) => {
            const tone = getItemTone(index, items.length);

            return (
              <article
                key={`${item?.date || "timeline"}-${index}`}
                className={styles.item}
              >
                <div className={styles.dateWrap}>
                  <p className={styles.date}>
                    {formatTimelineDate(item?.date)}
                  </p>
                </div>

                <div className={styles.railSlot} aria-hidden="true">
                  <span
                    className={`${styles.pulse} ${styles[`pulse${tone}`]}`}
                  />
                  <span className={`${styles.dot} ${styles[`dot${tone}`]}`} />
                </div>

                <h3 className={`${styles.title} ${styles[`title${tone}`]}`}>
                  {item?.title}
                </h3>

                <p className={styles.description}>{item?.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectTimelime;
