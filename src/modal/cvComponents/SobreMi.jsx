import React from "react";
import styles from "./SobreMi.module.css";
import { FaUserCircle } from "react-icons/fa";

const SobreMi = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <FaUserCircle className={styles.icon} />
        <span>SOBRE MÍ</span>
      </h2>

      <p className={styles.text}>
        Profesional con perfil híbrido en sistemas, redes, desarrollo y
        automatización. Combino experiencia práctica en infraestructura y
        administración de sistemas con formación sólida en desarrollo web,
        programación y domótica. Me apasiona diseñar, implementar y optimizar
        soluciones tecnológicas completas, desde la infraestructura hasta las
        aplicaciones, con especial interés en la innovación, la IA y la
        automatización.
      </p>
    </section>
  );
};

export default SobreMi;
