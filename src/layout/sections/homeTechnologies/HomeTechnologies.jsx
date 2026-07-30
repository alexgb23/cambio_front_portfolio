import React, { useEffect, useRef } from "react";
import { usePortfolioHome } from "../../../hooks/usePortfolioData";
import "./HomeTechnologies.css";
import {
  Atom,
  Container,
  Terminal,
  Code2,
  Server,
  Cpu,
  Database,
  FileCode,
  Globe,
} from "lucide-react";

const ICON_MAP = {
  react: Atom,
  laravel: Server,
  node: Cpu,
  nodejs: Cpu,
  python: Terminal,
  docker: Container,
  proxmox: Server,
  linux: Terminal,
  php84: FileCode,
  php: FileCode,
  filament: Server,
  render: Globe,
  sanctum: Server,
  resend: Globe,
  neonpostgresql: Database,
  postgresql: Database,
  vite: Atom,
  javascript: FileCode,
  axios: Globe,
  reactrouter: Atom,
  cloudflare: Globe,
  css: FileCode,
  java: FileCode,
  mysql: Database,
};

export default function TecnologiasPrincipales() {
  const { projects, loading, error } = usePortfolioHome();
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleWheel = (event) => {
      if (!mediaQuery.matches) return;

      const canScrollHorizontally = el.scrollWidth > el.clientWidth;
      if (!canScrollHorizontally) return;

      const isInside = el.matches(":hover");
      if (!isInside) return;

      if (Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
        event.preventDefault();
        el.scrollLeft += event.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (loading || error) return null;

  const todasLasTecnologias = projects.reduce((acc, proyecto) => {
    if (proyecto.technologies) {
      proyecto.technologies.forEach((tech) => {
        if (!acc.includes(tech)) acc.push(tech);
      });
    }
    return acc;
  }, []);

  const tecnologiasAMostrar =
    todasLasTecnologias.length > 0
      ? todasLasTecnologias
      : ["React", "Laravel", "Node", "Python", "Docker", "Proxmox", "Linux"];

  return (
    <section
      className="home-technologies"
      aria-labelledby="home-technologies-title"
    >
      <div className="home-technologies__row">
        <div className="home-technologies__title" id="home-technologies-title">
          TECNOLOGÍAS PRINCIPALES
        </div>

        <div className="home-technologies__divider" aria-hidden="true"></div>

        <div
          ref={listRef}
          className="home-technologies__list"
          role="list"
          aria-label="Tecnologías principales"
        >
          {tecnologiasAMostrar.map((tech, index) => {
            const keyNormalizada = tech.toLowerCase().replace(/[\s.-]/g, "");
            const IconoComponente = ICON_MAP[keyNormalizada] || Code2;

            return (
              <div
                key={`${tech}-${index}`}
                className="home-technologies__item"
                role="listitem"
              >
                <IconoComponente
                  className="home-technologies__icon"
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="home-technologies__name">{tech}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
