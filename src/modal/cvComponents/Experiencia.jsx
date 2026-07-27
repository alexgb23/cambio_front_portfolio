import React from "react";
import styles from "./Experiencia.module.css";
import { FaBriefcase } from "react-icons/fa";

const puestos = [
  {
    periodo: "2007 – 2011",
    empresa: "Técnico de laboratorio informático",
    descripcion:
      "Mantenimiento e instalación de software y hardware, soporte técnico y tareas asociadas a laboratorio.",
  },
  {
    periodo: "2023 – 2024",
    empresa: "Prácticas en EDE · Domótica e inmótica",
    descripcion:
      "Participación en la implantación y gestión de elementos informáticos, sistemas domóticos e inmóticos, con trabajo práctico sobre automatización, integración de sistemas y soporte técnico en entorno formativo.",
  },
  {
    periodo: "2023 – 2024",
    empresa: "Proyecto técnico · Control de acceso con IA",
    descripcion:
      "Desarrollo de un sistema de control de accesos con detección facial usando CodeProject.AI y Agent DVR, con parametrización, alertas, reporting y mantenimiento del sistema.",
  },
  {
    periodo: "2023 – 2024",
    empresa: "Prácticas profesionales · Fundación Peñascal y Fundación EDE",
    descripcion:
      "Formación práctica vinculada a páginas web, sistemas informáticos, domótica, inmótica y automatización aplicada.",
  },
];

const Experiencia = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <FaBriefcase className={styles.icon} />
        <span>Experiencia Profesional</span>
      </h2>

      <div className={styles.timeline}>
        {puestos.map((puesto, index) => (
          <article key={index} className={styles.item}>
            <div className={styles.left}>
              <span className={styles.periodo}>{puesto.periodo}</span>
            </div>

            <div className={styles.dotCol}>
              <span className={styles.dot} />
              {index !== puestos.length - 1 && <span className={styles.line} />}
            </div>

            <div className={styles.right}>
              <h3 className={styles.company}>{puesto.empresa}</h3>
              <p className={styles.descripcion}>{puesto.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experiencia;
