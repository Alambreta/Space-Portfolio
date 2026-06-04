import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "FinTrack",
    category: "Web App",
    desc: "Dashboard para control de finanzas personales con visualización de gastos en tiempo real.",
    stack: ["React", "Node.js", "PostgreSQL"],
    color: "#7B6EF6",
    x: -30, y: -24, z: 60,
  },
  {
    id: 2,
    title: "Mercado.",
    category: "E-commerce",
    desc: "Tienda online con catálogo dinámico, carrito y pagos integrados con Stripe.",
    stack: ["Next.js", "Stripe", "Prisma"],
    color: "#2DD4A0",
    x: 10, y: -26, z: 20,
  },
  {
    id: 3,
    title: "Pulse API",
    category: "Backend",
    desc: "API REST escalable con autenticación JWT, rate limiting y documentación automática.",
    stack: ["Node.js", "Express", "Redis"],
    color: "#F97B4A",
    x: 36, y: -16, z: -30,
  },
  {
    id: 4,
    title: "Habitus",
    category: "Mobile",
    desc: "App de seguimiento de hábitos con notificaciones inteligentes y estadísticas semanales.",
    stack: ["React Native", "Expo", "SQLite"],
    color: "#4AB8F9",
    x: -4, y: 10, z: -50,
  },
  {
    id: 5,
    title: "Viz Studio",
    category: "Data",
    desc: "Plataforma de visualización de datos en tiempo real con WebSockets y dashboards configurables.",
    stack: ["D3.js", "WebSocket", "Python"],
    color: "#F9C84A",
    x: 24, y: 22, z: -10,
  },
  {
    id: 6,
    title: "Athena CMS",
    category: "Full Stack",
    desc: "CMS headless con editor visual, gestión de medios y API GraphQL.",
    stack: ["GraphQL", "React", "MongoDB"],
    color: "#E45C8A",
    x: -32, y: 22, z: 40,
  },
];

const NAV_LINKS = ["proyectos", "sobre mí", "contacto"];

function StarField({ count = 160 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: Math.random() * 1.6 + 0.3,
      o: Math.random() * 0.55 + 0.08,
      speed: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.current.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.o,
            animation: `twinkle ${s.speed}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function ShootingStars({ count = 10 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 65,
      left: Math.random() * 85,
      duration: Math.random() * 6 + 12,
      delay: -(Math.random() * 18),
      length: Math.random() * 100 + 80,
    }))
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {stars.current.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.length,
            height: 1.5,
            borderRadius: 999,
            background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85))",
            boxShadow: "0 0 4px rgba(255,255,255,0.2)",
            animation: `shoot ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ProjectCard({ project, index, mouseX, mouseY, onClick, isActive }) {
  const depth = project.z;
  // parallax lives entirely in transform — GPU-accelerated, no layout thrash
  const parallaxX = mouseX * depth * 0.5;
  const parallaxY = mouseY * depth * 0.35;
  const scale = 0.82 + (depth + 80) / 420;

  return (
    <div
      onClick={() => onClick(project)}
      style={{
        position: "absolute",
        left: `calc(50% + ${project.x * 0.7}vw)`,
        top: `calc(50% + ${project.y * 0.7}vh)`,
        transform: `translate(calc(-50% + ${parallaxX}px), calc(-50% + ${parallaxY}px)) scale(${isActive ? scale * 1.06 : scale})`,
        zIndex: depth > 0 ? 10 : 5,
        cursor: "pointer",
        transition: "transform 0.15s ease-out",
        animation: `cardIn 0.8s cubic-bezier(0.23,1,0.32,1) ${index * 0.1 + 0.4}s both`,
        willChange: "transform",
      }}
    >
      <div
        style={{
          width: 210,
          background: isActive
            ? "rgba(255,255,255,0.11)"
            : "rgba(255,255,255,0.055)",
          border: `0.5px solid ${isActive ? project.color + "99" : "rgba(255,255,255,0.14)"}`,
          borderRadius: 14,
          padding: "18px 20px 16px",
          backdropFilter: "blur(6px)",
          transition: "background 0.3s, border-color 0.3s",
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.09)";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.055)";
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: project.color,
            marginBottom: 11,
            boxShadow: `0 0 8px ${project.color}88`,
          }}
        />
        <div style={{ fontSize: 9, letterSpacing: "1.8px", color: "rgba(255,255,255,0.38)", textTransform: "uppercase", marginBottom: 5, fontFamily: "'Space Mono', monospace" }}>
          {project.category}
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginBottom: 8, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.3px" }}>
          {project.title}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, marginBottom: 12 }}>
          {project.desc}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.stack.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.07)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Modal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 90vw)",
          background: "#0d0d18",
          border: `0.5px solid ${project.color}55`,
          borderRadius: 20,
          padding: "36px 40px",
          animation: "modalIn 0.35s cubic-bezier(0.23,1,0.32,1)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 18,
            background: "none", border: "none", color: "rgba(255,255,255,0.35)",
            fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4,
          }}
        >
          ✕
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: project.color, boxShadow: `0 0 12px ${project.color}` }} />
          <span style={{ fontSize: 10, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>
            {project.category}
          </span>
        </div>
        <h2 style={{ fontSize: 34, fontWeight: 700, color: "#fff", margin: "0 0 14px", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>
          {project.title}
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 28 }}>
          {project.desc} Este proyecto demuestra habilidades en arquitectura de sistemas, diseño de interfaces y optimización de rendimiento para producción.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
          {project.stack.map((t) => (
            <span key={t} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)", fontFamily: "'Space Mono', monospace" }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{
            flex: 1, padding: "12px", borderRadius: 10,
            background: project.color, border: "none", color: "#000",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Syne', sans-serif", letterSpacing: "0.3px",
          }}>
            Ver proyecto →
          </button>
          <button style={{
            flex: 1, padding: "12px", borderRadius: 10,
            background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)", fontSize: 13, cursor: "pointer",
            fontFamily: "'Syne', sans-serif",
          }}>
            Ver código
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SpacePortfolio() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const [section, setSection] = useState("proyectos");
  const spaceRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!spaceRef.current) return;
    const rect = spaceRef.current.getBoundingClientRect();
    setMouseX((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    setMouseY((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #06060f; color: #fff; font-family: 'Syne', sans-serif; overflow-x: hidden; }
        @keyframes twinkle { 0%,100%{opacity:var(--o,0.3)} 50%{opacity:calc(var(--o,0.3)*0.3)} }
        @keyframes cardIn { from{opacity:0} to{opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.94) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes heroSlide { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes shoot {
          0%   { opacity:0; transform:rotate(35deg) translateX(0); }
          5%   { opacity:0; }
          8%   { opacity:0.9; }
          18%  { opacity:0; transform:rotate(35deg) translateX(600px); }
          100% { opacity:0; transform:rotate(35deg) translateX(600px); }
        }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
      `}</style>

      {/* NAV — heroSlide is safe here: nav has no conflicting inline transform */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "20px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        background: "rgba(6,6,15,0.7)",
        backdropFilter: "blur(12px)",
        animation: "heroSlide 0.6s ease both",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.9)", letterSpacing: "0.5px" }}>
          <span style={{ color: "#7B6EF6" }}>◆</span> tu.nombre
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setSection(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: section === link ? "#fff" : "rgba(255,255,255,0.38)",
                fontFamily: "'Syne', sans-serif", letterSpacing: "0.5px",
                transition: "color 0.2s", padding: "4px 0",
                borderBottom: section === link ? "0.5px solid rgba(255,255,255,0.5)" : "0.5px solid transparent",
              }}
            >
              {link}
            </button>
          ))}
        </div>
        <a
          href="mailto:tu@email.com"
          style={{
            fontSize: 12, padding: "8px 20px", borderRadius: 8,
            border: "0.5px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)", textDecoration: "none",
            fontFamily: "'Space Mono', monospace",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
        >
          contactar →
        </a>
      </nav>

      {/* HERO + SPACE */}
      <div
        ref={spaceRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative", width: "100%", height: "100vh",
          background: "#06060f", overflow: "hidden",
        }}
      >
        <StarField />
        <ShootingStars />

        {/* Grid sutil */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Hero text — fadeIn (opacity only) para no pisar el translate(-50%,-50%) inline */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center", pointerEvents: "none", zIndex: 2,
          animation: "fadeIn 1s cubic-bezier(0.23,1,0.32,1) 0.15s both",
        }}>
          <div style={{ fontSize: 11, letterSpacing: "3.5px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 18 }}>
            front end developer
          </div>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 88px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.0, marginBottom: 14, margin: "0 0 14px" }}>
            Alan<br />Sanchez
          </h1>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.28)", letterSpacing: "0.5px" }}>
            explora los proyectos a tu alrededor
          </div>
          <div style={{ marginTop: 20, animation: "float 3s ease-in-out infinite" }}>
            <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)", margin: "0 auto" }} />
          </div>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            mouseX={mouseX}
            mouseY={mouseY}
            isActive={activeProject === project.id}
            onClick={(p) => {
              setActiveProject(p.id === activeProject ? null : p.id);
              setModalProject(p);
            }}
          />
        ))}

        {/* Hint — fadeIn también: tiene translateX(-50%) inline */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          fontSize: 10, letterSpacing: "2px", color: "rgba(255,255,255,0.2)",
          fontFamily: "'Space Mono', monospace", textTransform: "uppercase",
          pointerEvents: "none",
          animation: "fadeIn 1s ease 1.2s both",
        }}>
          mueve el cursor · haz clic para explorar
        </div>
      </div>

      {/* SOBRE MÍ */}
      <section style={{ minHeight: "100vh", background: "#07070f", padding: "100px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 24 }}>
          sobre mí
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 32 }}>
          Frontend developer.<br />
          <span style={{ color: "rgba(255,255,255,0.28)" }}>En construcción, como toda buena UI.</span>
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 580, marginBottom: 48 }}>
          Me enfoco en el frontend — la parte que la gente realmente ve y toca. Disfruto construir interfaces que se sientan bien, respondan rápido y tengan sentido visual. Por ahora ese es mi mundo, y lo estoy trabajando en serio.
        </p>

        {/* Stack que estoy usando */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, letterSpacing: "2px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 16 }}>
            stack actual
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { name: "HTML & CSS", color: "#F97B4A" },
              { name: "JavaScript", color: "#F9C84A" },
              { name: "React", color: "#4AB8F9" },
              { name: "Node.js", color: "#2DD4A0" },
              { name: "Git", color: "#7B6EF6" },
              { name: "Vite", color: "#E45C8A" },
            ].map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 14px", borderRadius: 8,
                  border: `0.5px solid ${tech.color}33`,
                  background: `${tech.color}0d`,
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: tech.color, boxShadow: `0 0 6px ${tech.color}` }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "'Space Mono', monospace" }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats honestas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, maxWidth: 580 }}>
          {[
            { label: "proyectos terminados", value: "6" },
            { label: "tecnologías activas", value: "6+" },
            { label: "commits este año", value: "100+" },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: "24px 20px", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'Space Mono', monospace" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section style={{ minHeight: "60vh", background: "#06060f", padding: "100px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <StarField count={60} />
        <ShootingStars count={5} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 24 }}>
            contacto
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20 }}>
            ¿Tienes un proyecto<br />en mente?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 40, lineHeight: 1.7 }}>
            Estoy disponible para proyectos freelance y oportunidades de tiempo completo. Hablemos.
          </p>
          <a
            href="mailto:tu@email.com"
            style={{
              display: "inline-block", padding: "16px 40px", borderRadius: 12,
              background: "#7B6EF6", color: "#fff", textDecoration: "none",
              fontSize: 15, fontWeight: 600, fontFamily: "'Syne', sans-serif",
              letterSpacing: "0.3px", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Enviar mensaje →
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 40 }}>
            {["GitHub", "LinkedIn", "Twitter"].map((net) => (
              <a
                key={net}
                href="#"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", fontFamily: "'Space Mono', monospace", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              >
                {net}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px 48px", borderTop: "0.5px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#06060f" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'Space Mono', monospace" }}>
          <span style={{ color: "#7B6EF6" }}>◆</span> Alan.Sanchez — {new Date().getFullYear()}
        </span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontFamily: "'Space Mono', monospace" }}>
          hecho con React
        </span>
      </footer>

      {/* Modal */}
      {modalProject && <Modal project={modalProject} onClose={() => { setModalProject(null); setActiveProject(null); }} />}
    </>
  );
}
