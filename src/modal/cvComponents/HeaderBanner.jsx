import React from "react";
import styles from "./HeaderBanner.module.css";

const HeaderBanner = () => {
  return (
    <div className={styles.banner}>
      <svg
        className={styles.circuit}
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4D95FF" stopOpacity="0.02" />
            <stop offset="55%" stopColor="#4D95FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#6FC2FF" stopOpacity="0.22" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          fill="none"
          stroke="url(#trace)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        >
          <path d="M560 198 H640 C654 198 666 193 676 183 L724 135 C734 125 746 120 760 120 H890 C904 120 916 115 926 105 L990 41 C1000 31 1012 26 1026 26 H1160" />
          <path d="M548 206 H628 C642 206 654 201 664 191 L712 143 C722 133 734 128 748 128 H878 C892 128 904 123 914 113 L978 49 C988 39 1000 34 1014 34 H1148" />
          <path d="M536 214 H616 C630 214 642 209 652 199 L700 151 C710 141 722 136 736 136 H866 C880 136 892 131 902 121 L966 57 C976 47 988 42 1002 42 H1136" />

          <path d="M690 126 V64" />
          <path d="M730 126 V78" />
          <path d="M770 126 V92" />
          <path d="M810 126 V86" />
          <path d="M850 120 V54" />
          <path d="M892 120 V62" />
          <path d="M934 112 V70" />
          <path d="M976 56 V22" />
          <path d="M1018 42 V18" />

          <path d="M820 22 C930 -2 1085 8 1185 56" opacity="0.45" />
          <path d="M805 42 C940 24 1098 36 1190 86" opacity="0.38" />
          <path d="M798 70 C950 66 1108 80 1188 122" opacity="0.32" />
          <path d="M850 188 C984 202 1108 194 1182 162" opacity="0.20" />
        </g>

        <g fill="#78BEFF">
          <circle cx="690" cy="64" r="2" opacity="0.22" />
          <circle cx="730" cy="78" r="2" opacity="0.22" />
          <circle cx="770" cy="92" r="2" opacity="0.22" />
          <circle cx="810" cy="86" r="2" opacity="0.22" />
          <circle cx="850" cy="54" r="2" opacity="0.22" />
          <circle cx="892" cy="62" r="2" opacity="0.22" />
          <circle cx="934" cy="70" r="2" opacity="0.22" />
          <circle cx="976" cy="22" r="2" opacity="0.22" />
          <circle cx="1018" cy="18" r="2" opacity="0.22" />
        </g>
      </svg>

      <div className={styles.leftZone}>
        <h1 className={styles.name}>
          <span className={styles.nameTop}>ALEXANDER</span>
          <span className={styles.nameBottom}>GÁLVEZ BENAVIDES</span>
        </h1>

        <p className={styles.subTitle}>PERFIL TÉCNICO HÍBRIDO</p>

        <p className={styles.tags}>
          SISTEMAS • DESARROLLO • REDES • AUTOMATIZACIÓN
        </p>
      </div>

      <div className={styles.rightZone}>
        <div className={styles.logoRow}>
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
          <div className={styles.logoText}>SYSKOVEX</div>
        </div>

        <div className={styles.companyInfo}>
          <span>Infrastructure</span>
          <span>Development</span>
          <span>Automation</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
