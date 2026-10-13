"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/data/projects";
import { Media } from "./Media";
import { useLanguage } from "./LanguageProvider";
import { youtubeEmbedUrl } from "@/lib/youtube";

const subscribeFullscreen = () => () => {};
function time(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}
export function VideoPlayer({
  project,
  sound,
  onSound,
  onClose,
}: {
  project: Project;
  sound: boolean;
  onSound: () => void;
  onClose: () => void;
}) {
  const { t, locale, projectText } = useLanguage();
  const text = projectText(project);
  const hosted = process.env.NEXT_PUBLIC_VIDEO_PROVIDER !== "local";
  const embedUrl = youtubeEmbedUrl(project.youtubeId, locale);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(hosted ? !embedUrl : !project.video);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const fullscreenSupported = useSyncExternalStore(
    subscribeFullscreen,
    () => !!document.fullscreenEnabled,
    () => false,
  );
  useEffect(() => {
    const element = dialog.current!;
    const previous = document.activeElement as HTMLElement;
    element.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("portfolio:modal", { detail: true }));
    return () => {
      element.close();
      document.body.style.overflow = oldOverflow;
      window.dispatchEvent(
        new CustomEvent("portfolio:modal", { detail: false }),
      );
      previous?.focus({ preventScroll: true });
    };
  }, []);
  const togglePlay = () => {
    const node = video.current;
    if (!node) return;
    if (node.paused) void node.play().catch(() => setPlaying(false));
    else node.pause();
  };
  return (
    <dialog
      className="player-dialog"
      ref={dialog}
      aria-labelledby="player-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div className="player-shell">
        <header className="player-header">
          <div>
            <span className="micro">{t.category[project.category]}</span>
            <h2 id="player-title">
              {text.title} <span>{project.year}</span>
            </h2>
          </div>
          <button
            autoFocus
            className="close-player"
            onClick={onClose}
            aria-label={t.player.close}
          >
            {t.player.closeText} <span>×</span>
          </button>
        </header>
        <div
          className={`player-screen ${project.orientation}${hosted ? " player-screen-youtube" : ""}`}
          style={{ aspectRatio: project.aspectRatio }}
        >
          <Media project={{ ...project, preview: "" }} priority />
          {hosted && embedUrl && !failed && (
            <iframe
              src={embedUrl}
              title={`${t.player.video} ${text.title}`}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => setFailed(true)}
            />
          )}
          {!hosted && !failed && (
            <video
              ref={video}
              src={project.video}
              muted={!sound}
              playsInline
              autoPlay
              preload="metadata"
              onLoadedMetadata={(event) =>
                setDuration(event.currentTarget.duration)
              }
              onTimeUpdate={(event) =>
                setCurrent(event.currentTarget.currentTime)
              }
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setFailed(true);
                setPlaying(false);
              }}
              aria-label={`${t.player.video} ${text.title}`}
            />
          )}
          {failed && (
            <div className="player-fallback">
              <span>{t.player.still}</span>
              <p>{t.player.unavailable}</p>
            </div>
          )}
        </div>
        {hosted && embedUrl && (
          <div className="player-external">
            <span>{t.player.youtubeNotice}</span>
            <a
              href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.player.watchYoutube} ↗
            </a>
          </div>
        )}
        {!hosted && !failed && (
          <div className="player-controls">
            <button
              onClick={togglePlay}
              aria-label={playing ? t.player.pause : t.player.play}
            >
              {playing ? `Ⅱ ${t.player.pauseText}` : `▶ ${t.player.playText}`}
            </button>
            <span className="timecode">{time(current)}</span>
            <input
              aria-label={t.player.progress}
              type="range"
              min="0"
              max={duration || 1}
              step="0.1"
              value={current}
              onChange={(event) => {
                if (video.current)
                  video.current.currentTime = Number(event.target.value);
                setCurrent(Number(event.target.value));
              }}
            />
            <span className="timecode">{time(duration)}</span>
            <button
              onClick={onSound}
              className="player-sound"
              aria-label={sound ? t.player.mute : t.player.unmute}
            >
              {sound ? t.player.soundOn : t.player.soundOff}
            </button>
            {fullscreenSupported && (
              <button
                className="fullscreen-button"
                aria-label={t.player.fullscreen}
                onClick={() => {
                  void dialog.current?.requestFullscreen().catch(() => {});
                }}
              >
                ⤢
              </button>
            )}
          </div>
        )}
        <div className="player-description">
          <span>
            {project.tags.map((tag) => t.category[tag]).join(" / ")}
            {project.client && ` / ${project.client}`}
          </span>
          <p>{text.description}</p>
        </div>
      </div>
    </dialog>
  );
}
