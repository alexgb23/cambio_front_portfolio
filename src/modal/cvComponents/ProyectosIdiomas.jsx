import React from "react";
import styles from "./ProyectosIdiomas.module.css";
import { FaRocket, FaLanguage } from "react-icons/fa";

const proyectos = [
  {
    titulo: "Portfolio profesional web",
    descripcion: "Desarrollo y publicación de mi portfolio profesional online.",
  },
  {
    titulo: "Homelab de sistemas y redes",
    descripcion: "Entorno personal con Proxmox, VLAN y firewall pfSense.",
  },
  {
    titulo: "Domótica personal",
    descripcion:
      "Automatización de servicios y dispositivos con Home Assistant OS.",
  },
  {
    titulo: "Infraestructura de backup",
    descripcion:
      "Servidor de backup sobre Proxmox para copias de seguridad y continuidad operativa.",
  },
  {
    titulo: "Control de acceso con IA",
    descripcion:
      "Sistema de control de accesos con detección facial (CodeProject.AI + Agent DVR).",
  },
  {
    titulo: "Laboratorio de pruebas",
    descripcion:
      "Entorno de pruebas para servicios, redes, contenedores y automatización.",
  },
];

const idiomas = [
  { nombre: "Español", nivel: "Nativo", valor: 100 },
  { nombre: "Inglés", nivel: "B1 - Intermedio", valor: 72 },
];

const leftProjects = proyectos.slice(0, 3);
const rightProjects = proyectos.slice(3, 6);

const ProyectosIdiomas = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.projectsCard}>
        <h2 className={styles.sectionTitle}>
          <FaRocket className={styles.icon} />
          <span>Proyectos destacados</span>
        </h2>

        <div className={styles.projectsColumns}>
          <div className={styles.projectsList}>
            {leftProjects.map((item, index) => (
              <article key={item.titulo} className={styles.projectItem}>
                <div className={styles.dotCol}>
                  <div className={styles.projectDot} />
                  {index !== leftProjects.length - 1 && (
                    <span className={styles.line} />
                  )}
                </div>

                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{item.titulo}</h3>
                  <p className={styles.projectText}>{item.descripcion}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.projectsList}>
            {rightProjects.map((item, index) => (
              <article key={item.titulo} className={styles.projectItem}>
                <div className={styles.dotCol}>
                  <div className={styles.projectDot} />
                  {index !== rightProjects.length - 1 && (
                    <span className={styles.line} />
                  )}
                </div>

                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{item.titulo}</h3>
                  <p className={styles.projectText}>{item.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.languagesCard}>
        <h2 className={styles.sectionTitle}>
          <FaLanguage className={styles.icon} />
          <span>Idiomas</span>
        </h2>

        <div className={styles.languagesList}>
          {idiomas.map((item) => (
            <div key={item.nombre} className={styles.languageRow}>
              <div className={styles.languageTop}>
                <span className={styles.languageName}>{item.nombre}</span>
                <span className={styles.languageLevel}>{item.nivel}</span>
              </div>

              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${item.valor}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProyectosIdiomas;
