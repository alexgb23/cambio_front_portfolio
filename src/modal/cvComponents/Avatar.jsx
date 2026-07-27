import React from "react";
import styles from "./Avatar.module.css";

const Avatar = () => {
  return (
    <div className={styles.avatarContainer}>
      <picture className={styles.picture}>
        <source
          type="image/avif"
          srcSet="
            /imagen_portfolio_mia_retocada-480.avif 480w,
            /imagen_portfolio_mia_retocada-768.avif 768w,
            /imagen_portfolio_mia_retocada-960.avif 960w,
            /imagen_portfolio_mia_retocada-1280.avif 1280w
          "
          sizes="(max-width: 767px) 140px, (max-width: 1279px) 150px, 160px"
        />

        <source
          type="image/webp"
          srcSet="
            /imagen_portfolio_mia_retocada-480.webp 480w,
            /imagen_portfolio_mia_retocada-768.webp 768w,
            /imagen_portfolio_mia_retocada-960.webp 960w,
            /imagen_portfolio_mia_retocada-1280.webp 1280w
          "
          sizes="(max-width: 767px) 140px, (max-width: 1279px) 150px, 160px"
        />

        <img
          src="/imagen_portfolio_mia_retocada-768.webp"
          alt="Alexander Gálvez Benavides"
          className={styles.profileImg}
          width="160"
          height="160"
          decoding="async"
          loading="eager"
        />
      </picture>
    </div>
  );
};

export default Avatar;
