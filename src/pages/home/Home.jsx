import { useEffect, useMemo } from "react";
import { useOutletContext } from "react-router";
import HeroSection from "../../layout/sections/heroSection/HeroSection";
import HomeStacks from "../../layout/sections/homeStacks/HomeStacks";
import HomeTechnologies from "../../layout/sections/homeTechnologies/HomeTechnologies";
import ContactPreview from "../../layout/sections/ContactPreview";
import { usePortfolioHome } from "../../hooks/usePortfolioData";
import usePageTitle from "../../hooks/usePageTitle";

import "./Home.css";

function Home() {
  const { openCvModal, setCvSocialLinks } = useOutletContext();

  usePageTitle(
    "Alexander Galvez | Sistemas, infraestructura y desarrollo de software",
  );

  const {
    socialLinks,
    loading: homeLoading,
    error: homeError,
  } = usePortfolioHome();

  useEffect(() => {
    if (typeof setCvSocialLinks === "function") {
      setCvSocialLinks(socialLinks);
    }
  }, [socialLinks, setCvSocialLinks]);

  const hasSocialLinks = Array.isArray(socialLinks) && socialLinks.length > 0;

  const homeSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://alex.syskovex.com/#website",
          url: "https://alex.syskovex.com/",
          name: "Portfolio de Alexander Galvez",
          description:
            "Portfolio técnico de Alexander Galvez especializado en infraestructura IT, redes, virtualización, automatización y desarrollo de software.",
          inLanguage: "es",
        },
        {
          "@type": "Person",
          "@id": "https://alex.syskovex.com/#alexander-galvez",
          name: "Alexander Galvez",
          alternateName: "Alex Galvez",
          url: "https://alex.syskovex.com/",
          image:
            "https://alex.syskovex.com/imagen_portfolio_mia_retocada-960.avif",
          jobTitle: "Systems, Infrastructure and Software Technician",
          description:
            "Perfil técnico especializado en infraestructura IT, redes, virtualización, automatización y desarrollo de software.",
          knowsAbout: [
            "Infraestructura IT",
            "Administración de sistemas",
            "Virtualización",
            "Redes",
            "Seguridad perimetral",
            "Automatización",
            "IoT",
            "Linux",
            "APIs",
            "Desarrollo de software",
          ],
          sameAs: [
            "https://github.com/alexgb23",
            "https://www.linkedin.com/in/alexander-galvez-benavides-450917281/",
            "https://instagram.com/_aaleex_88",
            "https://www.facebook.com/alexander.galvez.benavides",
          ],
          mainEntityOfPage: {
            "@id": "https://alex.syskovex.com/#website",
          },
        },
      ],
    }),
    [],
  );

  const safeJsonLd = useMemo(
    () => JSON.stringify(homeSchema).replace(/<\//g, "<\\/"),
    [homeSchema],
  );

  return (
    <section id="main-content" className="home-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />

      <div className="home-screen__inner container">
        <div className="home-screen__layout">
          <section className="home-screen__hero">
            <HeroSection socialLinks={socialLinks} onOpenCv={openCvModal} />
          </section>

          <section
            className="home-screen__stacks"
            aria-labelledby="home-stacks-title"
          >
            <HomeStacks />
          </section>

          <section
            className="home-screen__technologies"
            aria-labelledby="home-technologies-title"
          >
            <HomeTechnologies />
          </section>

          <aside
            className="home-screen__contact"
            aria-label="Enlaces de contacto"
          >
            <ContactPreview
              socialLinks={socialLinks}
              loading={homeLoading}
              error={homeError}
            />
          </aside>
        </div>
      </div>

      {homeError && !hasSocialLinks ? (
        <section className="section section-spaced section-separated">
          <div className="empty-inline-state">
            <p>
              No se pudieron cargar los enlaces de contacto en este momento.
            </p>
          </div>
        </section>
      ) : null}
    </section>
  );
}

export default Home;
