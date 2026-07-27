import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>
          <img
  src="/logoSyskovex-144.webp"
  alt="Logo Syskovex"
  className={styles.logoImg}
  width={72}
  height={72}
  fetchPriority="high"
/>
        </div>
        <span className={styles.logo}>SYSKOVEX</span>
      </div>

      <div className={styles.center}>
        Infrastructure • Development • Automation
      </div>

      <div className={styles.date}>Actualizado: Julio 2026</div>
    </footer>
  );
};

export default Footer;
