import { Globe, ArrowUpRight } from "lucide-react";
import styles from "./LaboratoryFooter.module.css";

export default function LaboratoryFooter() {
  return (
    <section className={styles.footer}>
      <div className="container_footer">
        <div className={styles.card}>
          <div className={styles.background} aria-hidden="true">
            <div className={styles.gradient} />
            <div className={`${styles.circuitLayer} ${styles.circuitLight}`} />
            <div className={`${styles.circuitLayer} ${styles.circuitDark}`} />
            <div className={styles.glow} />
          </div>

          <div className={styles.content}>
            <div className={styles.left}>
              <h2>¿Quieres ver todo lo que estoy construyendo?</h2>

              <p>
                En SYSKOVEX.com encontrarás documentación completa, tutoriales,
                diagramas, código abierto y mucho más sobre mis proyectos e
                investigaciones.
              </p>
            </div>

            <a
              href="https://syskovex.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              aria-label="Abrir SYSKOVEX.com en una nueva pestaña"
            >
              <div className={styles.iconWrapper}>
                <div className={styles.iconCircle}>
                  <Globe size={28} strokeWidth={2} />
                </div>
              </div>

              <div className={styles.ctaText}>
                <span className={styles.title}>Explorar SYSKOVEX.com</span>

                <span className={styles.subtitle}>
                  Laboratorio completo, documentación y recursos
                </span>
              </div>

              <ArrowUpRight size={22} className={styles.arrow} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}