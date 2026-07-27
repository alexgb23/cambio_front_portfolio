import { Link } from "react-router";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaArrowDown,
} from "react-icons/fa";
import "./ContactPreview.css";

function normalizeHref(href = "", type = "") {
  const safeHref = typeof href === "string" ? href.trim() : "";
  const normalizedType = String(type || "").toLowerCase();

  if (!safeHref) return "#";

  if (
    ["email", "envelope", "mail", "correo"].includes(normalizedType) &&
    !safeHref.startsWith("mailto:")
  ) {
    return `mailto:${safeHref}`;
  }

  return safeHref;
}

function ContactIconLink({ href = "#", icon, label }) {
  const safeHref = typeof href === "string" && href.trim() ? href : "#";
  const isMail = safeHref.startsWith("mailto:");

  return (
    <a
      href={safeHref}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className="contact-preview__icon"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}

function ContactPreview({ socialLinks = [] }) {
  const safeLinks = Array.isArray(socialLinks) ? socialLinks : [];

  const github = safeLinks.find(
    (item) =>
      (item?.platform || item?.icon_key || "").toLowerCase() === "github",
  );

  const linkedin = safeLinks.find(
    (item) =>
      (item?.platform || item?.icon_key || "").toLowerCase() === "linkedin",
  );

  const email = safeLinks.find((item) =>
    ["email", "envelope", "mail", "correo"].includes(
      (item?.platform || item?.icon_key || "").toLowerCase(),
    ),
  );

  return (
    <div className="contact-preview" aria-label="Canales de contacto">
      <div className="contact-preview__rail">
        {github?.url ? (
          <ContactIconLink
            href={normalizeHref(github.url, "github")}
            icon={<FaGithub />}
            label="GitHub"
          />
        ) : null}

        {linkedin?.url ? (
          <ContactIconLink
            href={normalizeHref(linkedin.url, "linkedin")}
            icon={<FaLinkedinIn />}
            label="LinkedIn"
          />
        ) : null}

        {email?.url ? (
          <ContactIconLink
            href={normalizeHref(
              email.url,
              email?.platform || email?.icon_key || "email",
            )}
            icon={<FaEnvelope />}
            label="Correo"
          />
        ) : null}

        <Link
          to="/contacto"
          className="contact-preview__icon contact-preview__icon--arrow"
          aria-label="Ir a contacto"
          title="Ir a contacto"
        >
          <FaArrowDown />
        </Link>
      </div>
    </div>
  );
}

export default ContactPreview;
