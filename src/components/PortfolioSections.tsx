"use client";
import { useEffect, useState } from "react";
import {
  categories,
  featuredProjects,
  galleryProjects,
  formatDuration,
  type Category,
  type Project,
} from "@/data/projects";
import { site } from "@/data/site";
import { LanguageSwitch, useLanguage } from "./LanguageProvider";
import { Media } from "./Media";
import { MotionStudy } from "./MotionStudy";

export function Lines({
  lines,
  className = "",
  id,
}: {
  lines: string[];
  className?: string;
  id?: string;
}) {
  return (
    <h2 id={id} className={`display-title ${className}`} data-reveal>
      {lines.map((line, i) => (
        <span className="reveal-line" key={i}>
          <span>{line}</span>
        </span>
      ))}
    </h2>
  );
}
export function IntroHero() {
  const { t } = useLanguage();
  return (
    <section className="intro-hero" id="home">
      <header className="site-header">
        <a
          className="site-wordmark"
          href="#home"
          aria-label={`${site.name}, ${t.home}`}
        >
          GUILLERMO
          <br />
          RODRÍGUEZ<span aria-hidden="true">*</span>
        </a>
        <nav
          aria-label={
            t.language === "Idioma" ? "Navegación principal" : "Main navigation"
          }
        >
          <a href="#work">
            {t.nav.work}
            <span>↗</span>
          </a>
          <a href="#about">
            {t.nav.about}
            <span>↗</span>
          </a>
          <a href="#process">
            {t.nav.process}
            <span>↗</span>
          </a>
        </nav>
        <div className="header-actions">
          <LanguageSwitch />
          <a className="header-cta" href="#contact">
            {t.nav.contact}
            <span>↗</span>
          </a>
        </div>
      </header>
      <div className="intro-eyebrow">
        <span aria-hidden="true">✳</span>
        {t.hero.eyebrow}
      </div>
      <h1 className="intro-title">
        {t.hero.lines.map((line, i) => (
          <span className={`hero-line line-${i}`} key={i}>
            <span>{line}</span>
          </span>
        ))}
      </h1>
      <div className="intro-lower">
        <div className="intro-copy">
          <span className="small-label">{t.role}</span>
          <p>{t.hero.description}</p>
          <a className="solid-link" href="#work" data-magnetic>
            {t.actions.explore}
            <span>↗</span>
          </a>
        </div>
        <div className="edit-composition" aria-hidden="true">
          <div className="edit-top">
            <span>GR—01</span>
            <span>00:00:24</span>
            <i>✳</i>
          </div>
          <div className="edit-tracks">
            {t.hero.timeline.map((label, i) => (
              <div key={i}>
                <span>{label}</span>
                <b />
                <b />
                <b />
              </div>
            ))}
            <i className="playhead" />
          </div>
          <div className="edit-bottom">
            <span>{t.hero.badge}</span>
            <span>↗</span>
          </div>
        </div>
      </div>
      <div className="intro-bottom">
        <span>{t.hero.signature}</span>
        <a href="#work">
          {t.hero.scroll}
          <span>↓</span>
        </a>
      </div>
    </section>
  );
}

export function ProjectCard({
  project,
  onOpen,
  featured = false,
}: {
  project: Project;
  onOpen: (project: Project) => void;
  featured?: boolean;
}) {
  const [active, setActive] = useState(false);
  const { t, projectText } = useLanguage();
  const text = projectText(project);
  return (
    <article
      className={`work-card ${project.orientation} ${featured ? "featured-card" : "gallery-card"}`}
      data-project-id={project.id}
    >
      <button
        className="card-picture"
        data-cursor={t.actions.play}
        aria-label={`${t.actions.watch}: ${text.title}`}
        onClick={() => {
          setActive(false);
          onOpen(project);
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setActive(true);
        }}
        onPointerLeave={() => setActive(false)}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) setActive(true);
        }}
        onBlur={() => setActive(false)}
      >
        <Media project={project} active={active} />
        <span className="card-play" aria-hidden="true">
          ↗
        </span>
        <span className="card-time" aria-hidden="true">
          {formatDuration(project.duration)}
        </span>
      </button>
      <div className="card-meta">
        <span>{t.category[project.category]}</span>
        <span>{project.aspectRatio.replace(/ /g, "").replace("/", ":")}</span>
      </div>
      <h3>{text.title}</h3>
      <p>{text.description}</p>
      <button
        className="card-action"
        onClick={() => onOpen(project)}
        aria-label={`${t.actions.watch}: ${text.title}`}
      >
        {t.actions.watch}
        <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

export function FeaturedWork({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t } = useLanguage();
  return (
    <section
      className="featured-section section-pad"
      id="work"
      aria-labelledby="featured-title"
    >
      <div className="section-kicker">
        <span>{t.featured.kicker}</span>
        <span>{t.featured.note}</span>
      </div>
      <div className="section-heading">
        <Lines id="featured-title" lines={t.featured.lines} />
        <p>{t.featured.description}</p>
      </div>
      <div className="featured-grid">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
            featured
          />
        ))}
      </div>
    </section>
  );
}

export function Difference() {
  const { t } = useLanguage();
  return (
    <section className="why-section section-pad" aria-labelledby="why-title">
      <div className="section-kicker">
        <span>{t.why.kicker}</span>
        <span aria-hidden="true">✳</span>
      </div>
      <Lines id="why-title" lines={t.why.lines} />
      <div className="why-bottom">
        <div className="why-visual">
          <span className="small-label">{t.why.note}</span>
          <MotionStudy variant="frames" />
        </div>
        <div className="prose">
          <h3>{t.why.intro}</h3>
          {t.why.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a className="solid-link" href="#contact" data-magnetic>
            {t.actions.idea}
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function WorkGallery({ onOpen }: { onOpen: (p: Project) => void }) {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<Category | "All">("All");
  const visible = galleryProjects.filter(
    (p) => filter === "All" || p.tags.includes(filter),
  );
  useEffect(() => {
    window.dispatchEvent(new Event("portfolio:layout"));
  }, [filter]);
  return (
    <section
      className="work-gallery section-pad"
      id="explore"
      aria-labelledby="gallery-title"
    >
      <div className="section-kicker">
        <span>{t.gallery.kicker}</span>
        <span className="hover-instruction">{t.gallery.hover}</span>
        <span className="touch-instruction">{t.gallery.touch}</span>
      </div>
      <div className="section-heading">
        <Lines id="gallery-title" lines={t.gallery.lines} />
        <p>{t.gallery.description}</p>
      </div>
      <div className="gallery-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label={t.gallery.filter}
        >
          {(["All", ...categories] as const).map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              aria-controls="gallery-results"
              onClick={() => setFilter(category)}
            >
              {category === "All" ? t.actions.all : t.category[category]}
            </button>
          ))}
        </div>
        <span className="gallery-count" aria-live="polite" aria-atomic="true">
          {String(visible.length).padStart(2, "0")} /{" "}
          {String(galleryProjects.length).padStart(2, "0")} {t.gallery.count}
        </span>
      </div>
      <div
        className="gallery-grid"
        id="gallery-results"
        key={`${filter}-${locale}`}
      >
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={onOpen} />
        ))}
        {!visible.length && <p>{t.gallery.empty}</p>}
        {(filter === "All" || filter === "YouTube") && (
          <aside className="gallery-invite">
            <span className="small-label">{t.visual.inviteLabel}</span>
            <div className="invite-mark" aria-hidden="true">
              ✳
            </div>
            <h3>
              {t.visual.inviteLines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h3>
            <p>{t.visual.inviteBody}</p>
            <a className="card-action" href="#contact">
              {t.actions.idea}
              <span aria-hidden="true">↗</span>
            </a>
          </aside>
        )}
      </div>
      <div className="gallery-foot">
        <span>{t.gallery.featuredNote}</span>
        <a href="#work">
          {t.gallery.featuredLink}
          <span>↑</span>
        </a>
      </div>
    </section>
  );
}

export function Benefits() {
  const { t } = useLanguage();
  return (
    <section
      className="benefits-section section-pad"
      aria-labelledby="benefits-title"
    >
      <div className="section-kicker">
        <span>{t.benefits.kicker}</span>
        <span aria-hidden="true">↘</span>
      </div>
      <div className="benefits-layout">
        <div className="benefits-heading">
          <Lines id="benefits-title" lines={t.benefits.lines} />
          <p>{t.benefits.intro}</p>
          <MotionStudy variant="wave" />
        </div>
        <div className="benefit-list">
          {t.benefits.items.map((item, i) => (
            <article className="benefit-item editorial-row" key={i}>
              <span className="benefit-number">0{i + 1}</span>
              <div>
                <span className="small-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutEditor() {
  const { t } = useLanguage();
  return (
    <section
      className="about-editorial section-pad"
      id="about"
      aria-labelledby="about-name"
    >
      <div className="section-kicker">
        <span>{t.about.kicker}</span>
        <span>{t.role}</span>
      </div>
      <Lines id="about-name" lines={t.about.lines} />
      <div className="about-layout">
        <div className="signature-art" aria-hidden="true">
          <div className="signature-label">
            <span>01—GR</span>
            <span>✳</span>
          </div>
          <div className="signature-monogram">
            G<span>R</span>
            <i />
          </div>
          <div className="signature-label">
            <span>{t.about.artLabel}</span>
            <span>↗</span>
          </div>
          <p>{t.about.artCaption}</p>
        </div>
        <div className="prose">
          <h3>{t.about.intro}</h3>
          {t.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="service-tags">
            <span className="small-label">{t.about.servicesLabel}</span>
            <ul>
              {t.about.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLanguage();
  return (
    <section
      className="process-section section-pad"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="section-kicker">
        <span>{t.process.kicker}</span>
        <span aria-hidden="true">01 → 05</span>
      </div>
      <div className="section-heading">
        <Lines id="process-title" lines={t.process.lines} />
        <p>{t.process.note}</p>
      </div>
      <ol className="process-steps">
        {t.process.steps.map((step, i) => (
          <li className="editorial-row" key={i}>
            <span className="process-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <span className="process-arrow" aria-hidden="true">
              {i === 4 ? "↗" : "→"}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FinalContact() {
  const { t } = useLanguage();
  return (
    <section
      className="final-contact section-pad"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="section-kicker">
        <span>{t.contact.kicker}</span>
        <span aria-hidden="true">✳</span>
      </div>
      <p className="contact-pretitle">{t.contact.pretitle}</p>
      <Lines id="contact-title" lines={t.contact.lines} />
      <div className="contact-conversation">
        <p>{t.contact.description}</p>
        <div>
          <a
            className="solid-link"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(t.contact.subject)}`}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
          >
            {t.contact.button}
            <span>↗</span>
          </a>
          <p className="contact-micro">{t.contact.micro}</p>
        </div>
      </div>
      <div className="contact-direct">
        <a href={`mailto:${site.email}`}>
          {site.email}
          <span>↗</span>
        </a>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
          {site.instagram.handle}
          <span>↗</span>
        </a>
      </div>
      <footer className="site-footer">
        <div>
          <strong>{site.name}</strong>
          <span>{t.role}</span>
        </div>
        <span>
          © {site.year} — {t.contact.footer}
        </span>
        <a href="#home">
          {t.actions.back}
          <span>↑</span>
        </a>
      </footer>
    </section>
  );
}
