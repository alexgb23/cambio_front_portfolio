import React from "react";
import styles from "./Sidebar.module.css";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaLayerGroup,
  FaStar,
  FaCheckCircle,
  FaCode,
} from "react-icons/fa";

const Sidebar = () => {
  const herramientas = [
    "Linux",
    "React",
    "Laravel",
    "PHP",
    "Python",
    "Java",
    "JavaScript",
    "Vue",
    "Proxmox",
    "pfSense",
    "APIs",
    "VLAN",
    "Networking",
    "Virtualización",
    "Home Assistant",
    "Automatización",
    "IoT",
    "Neon",
  ];

  return (
    <aside className={styles.sidebarInner}>
      <section className={styles.section}>
        <h3 className={styles.title}>
          <FaUserCircle className={styles.titleIcon} />
          <span>Contacto</span>
        </h3>

        <ul className={styles.contactList}>
          <li>
            <FaMapMarkerAlt className={styles.itemIcon} />
            <span>Bilbao, España</span>
          </li>
          <li>
            <FaPhoneAlt className={styles.itemIcon} />
            <span>614 794 625</span>
          </li>
          <li>
            <FaEnvelope className={styles.itemIcon} />
            <span>alex@syskovex.com</span>
          </li>
          <li>
            <FaGlobe className={styles.itemIcon} />
            <span>syskovex.com</span>
          </li>
          <li>
            <FaGithub className={styles.itemIcon} />
            <span>github.com/alexgb23</span>
          </li>
          <li>
            <FaLinkedin className={styles.itemIcon} />
            <span>linkedin.com/in/alexsyskovex</span>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>
          <FaLayerGroup className={styles.titleIcon} />
          <span>Core Stack</span>
        </h3>

        <div className={styles.techGrid}>
          {herramientas.map((tech) => (
            <span key={tech} className={styles.badge}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.title}>
          <FaStar className={styles.titleIcon} />
          <span>Fortalezas</span>
        </h3>

        <ul className={styles.bulletList}>
          <li>
            <FaCheckCircle className={styles.itemIcon} />
            <span>Resolución de problemas técnicos.</span>
          </li>
          <li>
            <FaCheckCircle className={styles.itemIcon} />
            <span>Aprendizaje rápido y autonomía.</span>
          </li>
          <li>
            <FaCheckCircle className={styles.itemIcon} />
            <span>Visión híbrida entre sistemas y desarrollo.</span>
          </li>
          <li>
            <FaCheckCircle className={styles.itemIcon} />
            <span>Enfoque práctico y orientado a producción.</span>
          </li>
        </ul>
      </section>

      <div className={styles.quoteBox}>
        <FaCode className={styles.quoteIcon} />
        <p>
          Mentalidad tecnológica, curiosidad constante y pasión por innovar.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
