import React from "react";
import styles from "./EducacionTecnologias.module.css";
import { FaGraduationCap, FaCode } from "react-icons/fa";

const formacion = [
  {
    periodo: "2026",
    centro: "Centro Informático y Gestión Meatte, S. L.",
    items: [
      "IFCT0209 - Sistemas Microinformáticos - 600 h.",
      "FCOS02 - Básico de Prevención de Riesgos Laborales - 30 h.",
    ],
  },
  {
    periodo: "2024 – 2025",
    centro: "Landibe / Fundación EDE",
    items: [
      "IFCD04PO - Web-programación PHP (Software libre) - 150 h.",
      "IFCD32 - Programación en Python - 100 h.",
      "IFCD52PO - Programación en Java - 210 h.",
      "CP Implantación y Gestión de Elementos Informáticos, Sistemas Domóticos e Inmóticos - 540 h.",
    ],
  },
  {
    periodo: "2023",
    centro: "Landibe / Fundación Peñascal",
    items: [
      "IFCD0110 - Confección y Publicación de Páginas Web - 520 h.",
      "IFCD0440H - Metodologías Ágiles - 30 h.",
      "IFCD0090H - Responsive Web Design - 20 h.",
    ],
  },
  {
    periodo: "2003 – 2007",
    centro: "IPI Lázaro Cárdenas del Río",
    items: ["Técnico de Nivel Medio Superior en Informática."],
  },
];

const tecnologias = [
  {
    titulo: "Desarrollo web",
    texto: "HTML5, CSS3, SASS, JavaScript, React, PHP y consumo de APIs.",
    tone: "blue",
  },
  {
    titulo: "Programación",
    texto:
      "Python y Java para lógica de negocio, automatización, aplicaciones y resolución de problemas.",
    tone: "slate",
  },
  {
    titulo: "Sistemas y automatización",
    texto:
      "Linux, Proxmox, Home Assistant, PLC, BMS, sensores, actuadores, protocolos e IoT.",
    tone: "green",
  },
  {
    titulo: "Infraestructura y redes",
    texto:
      "Virtualización, VLAN, pfSense, servicios internos, backup, videovigilancia y control de energía.",
    tone: "purple",
  },
];

const EducacionTecnologias = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.column}>
        <h2 className={styles.sectionTitle}>
          <FaGraduationCap className={styles.icon} />
          <span>Formación</span>
        </h2>

        <div className={styles.timeline}>
          {formacion.map((item, index) => (
            <article
              key={`${item.periodo}-${item.centro}`}
              className={styles.row}
            >
              <div className={styles.dotCol}>
                <span className={styles.dot} />
                {index !== formacion.length - 1 && (
                  <span className={styles.line} />
                )}
              </div>

              <div className={styles.mainBlock}>
                <div className={styles.periodo}>{item.periodo}</div>

                <div className={styles.content}>
                  <h3 className={styles.centro}>{item.centro}</h3>
                  <ul className={styles.list}>
                    {item.items.map((texto, idx) => (
                      <li key={idx}>{texto}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <h2 className={styles.sectionTitle}>
          <FaCode className={styles.icon} />
          <span>Tecnologías</span>
        </h2>

        <div className={styles.techList}>
          {tecnologias.map((item) => (
            <article
              key={item.titulo}
              className={`${styles.techCard} ${styles[item.tone]}`}
            >
              <div className={styles.techLabel}>{item.titulo}</div>
              <p className={styles.techText}>{item.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducacionTecnologias;
