import { Code2, Server, House, BrainCircuit, FlaskConical } from "lucide-react";
import "./HomeStacks.css";

const services = [
  {
    icon: Code2,
    title: "DESARROLLO WEB",
    text: "Apps modernas con React, Laravel y las mejores prácticas.",
  },
  {
    icon: Server,
    title: "INFRAESTRUCTURA",
    text: "Proxmox, Docker, redes y servicios optimizados para alto rendimiento.",
  },
  {
    icon: House,
    title: "AUTOMATIZACIÓN",
    text: "Domótica, IoT y sistemas inteligentes para un mundo conectado.",
  },
  {
    icon: BrainCircuit,
    title: "INTELIGENCIA ARTIFICIAL",
    text: "Integración de IA para automatizar, analizar y potenciar soluciones.",
  },
  {
    icon: FlaskConical,
    title: "LABORATORIO SYSKOVEX",
    text: "Experimentación constante con tecnología, seguridad y nuevas ideas.",
  },
];

function ServicesGrid() {
  return (
    <section className="services">
      <div className="services__grid">
        {services.map(({ icon: Icon, title, text }) => (
          <article key={title} className="service-card">
            <div className="service-card__top">
              <div className="service-card__icon" aria-hidden="true">
                <Icon size="100%" strokeWidth={2} />
              </div>

              <h3 className="service-card__title">{title}</h3>
            </div>

            <p className="service-card__text">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ServicesGrid;
