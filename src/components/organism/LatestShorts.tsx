import { useCallback, useEffect, useRef, useState } from "react";
import { CHANNEL_ID, YOUTUBE_API_KEY } from "@/config/config";
import AnimateOnScroll from "@/components/molecules/AnimateOnScroll.tsx";
import { useTranslation } from "react-i18next";

interface ShortInfo {
  videoId: string;
  title: string;
  thumbnail: string;
}

const MAX_SHORTS = 12;
/** Máxima duración (segundos) para considerar un video como short */
const SHORT_MAX_SECONDS = 185;

/** Clases literales para que Tailwind las genere (no usar strings dinámicos) */
const DELAY_CLASSES = [
  "animate-delay-0",
  "animate-delay-100",
  "animate-delay-200",
  "animate-delay-300",
  "animate-delay-500",
  "animate-delay-700",
];

const thumbFor = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

/** Convierte una duración ISO-8601 (PT1M30S) a segundos */
function parseISODuration(duration: string): number {
  const match = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(duration ?? "");
  if (!match) return Number.MAX_SAFE_INTEGER;
  const [, d, h, m, s] = match;
  return (
    Number(d ?? 0) * 86400 +
    Number(h ?? 0) * 3600 +
    Number(m ?? 0) * 60 +
    Number(s ?? 0)
  );
}

/** Playlist automática de shorts del canal (UC... -> UUSH...) */
const shortsPlaylistId = (channelId: string) => `UUSH${(channelId ?? "").slice(2)}`;
/** Playlist automática de subidas del canal (UC... -> UU...) */
const uploadsPlaylistId = (channelId: string) => `UU${(channelId ?? "").slice(2)}`;

export const CHANNEL_URL =
  "https://www.youtube.com/@iglesiabautistafundamental9995";

/* ------------------------------------------------------------------ */
/* API de YouTube (para saber cuándo termina un reel)                  */
/* ------------------------------------------------------------------ */

interface YTPlayer {
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
}

interface YTNamespace {
  Player: new (
    element: string | HTMLElement,
    options: {
      events?: {
        onStateChange?: (event: YTPlayerEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { ENDED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YTNamespace> | null = null;

/** Carga (una sola vez) el script de la IFrame Player API de YouTube */
function loadYoutubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      if (window.YT) resolve(window.YT);
      else reject(new Error("YT API no disponible"));
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("No se pudo cargar la API de YouTube"));
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

interface PlaylistItem {
  snippet?: {
    title?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, { url?: string } | undefined>;
  };
}

interface VideoItem {
  id: string;
  contentDetails?: { duration?: string };
}

interface RssItem {
  title?: string;
  link?: string;
  thumbnail?: string;
}

async function fetchFromPlaylist(playlistId: string): Promise<ShortInfo[]> {
  const url =
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet` +
    `&maxResults=${MAX_SHORTS}&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`playlistItems ${res.status}`);
  const data: { items?: PlaylistItem[] } = await res.json();
  return (data.items ?? [])
    .map((item) => {
      const videoId = item?.snippet?.resourceId?.videoId ?? "";
      const thumbnails = item?.snippet?.thumbnails ?? {};
      return {
        videoId,
        title: item?.snippet?.title ?? "",
        thumbnail:
          thumbnails.maxres?.url ?? thumbnails.high?.url ?? thumbFor(videoId),
      };
    })
    .filter((s) => Boolean(s.videoId));
}

/** Filtra por duración usando videos.list (para la playlist de subidas) */
async function keepOnlyShorts(candidates: ShortInfo[]): Promise<ShortInfo[]> {
  if (!candidates.length) return [];
  const ids = candidates.map((c) => c.videoId).join(",");
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`
  );
  if (!res.ok) throw new Error(`videos ${res.status}`);
  const data: { items?: VideoItem[] } = await res.json();
  const shortIds = new Set<string>(
    (data.items ?? [])
      .filter(
        (item) =>
          parseISODuration(item?.contentDetails?.duration ?? "") <=
          SHORT_MAX_SECONDS
      )
      .map((item) => item.id)
  );
  return candidates.filter((c) => shortIds.has(c.videoId));
}

/** Último recurso: feed RSS del canal (sin API key) */
async function fetchFromRss(): Promise<ShortInfo[]> {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${shortsPlaylistId(
    CHANNEL_ID
  )}`;
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
  );
  const data: { items?: RssItem[] } = await res.json();
  return (data?.items ?? [])
    .slice(0, MAX_SHORTS)
    .map((item) => {
      const link = item?.link ?? "";
      const videoId =
        (link.includes("/shorts/")
          ? link.split("/shorts/")[1]
          : link.split("v=")[1]
        )?.split(/[?&]/)[0] ?? "";
      return {
        videoId,
        title: item?.title ?? "",
        thumbnail: item?.thumbnail || thumbFor(videoId),
      };
    })
    .filter((s) => Boolean(s.videoId));
}

/** Mismos anchos y márgenes que el carrusel real para que no haya salto */
const TRACK_CLASSES = "mx-auto flex max-w-[1400px] gap-4 md:gap-6";
const CARD_WIDTH = "w-[58vw] sm:w-[38vw] md:w-[26vw] lg:w-[16vw]";
/** Espaciador: el padding lateral no es fiable en contenedores con scroll-x */
const EDGE_SPACER = "w-4 shrink-0 sm:w-6 md:w-10 lg:w-16";

function ShortsSkeleton() {
  return (
    <div className={`${TRACK_CLASSES} overflow-hidden`}>
      <div aria-hidden className={EDGE_SPACER} />
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`${CARD_WIDTH} aspect-[9/16] shrink-0 animate-pulse rounded-2xl bg-gray-200`}
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
      <div aria-hidden className={EDGE_SPACER} />
    </div>
  );
}

export default function LatestShorts() {
  const { t } = useTranslation();
  const [shorts, setShorts] = useState<ShortInfo[]>([]);
  const [loading, setLoading] = useState(true);
  /** Índice del reel con el que se abrió el visor (null = visor cerrado) */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  /** Reel que se está viendo dentro del visor vertical */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let result: ShortInfo[] = [];

      // Cada estrategia se intenta por separado: un fallo no rompe las demás.
      if (CHANNEL_ID && YOUTUBE_API_KEY) {
        try {
          result = await fetchFromPlaylist(shortsPlaylistId(CHANNEL_ID));
        } catch (e) {
          console.warn("[Shorts] playlist de shorts no disponible:", e);
        }

        if (!result.length) {
          try {
            const uploads = await fetchFromPlaylist(
              uploadsPlaylistId(CHANNEL_ID)
            );
            result = await keepOnlyShorts(uploads);
          } catch (e) {
            console.warn("[Shorts] playlist de subidas no disponible:", e);
          }
        }
      }

      if (!result.length && CHANNEL_ID) {
        try {
          result = await fetchFromRss();
        } catch (e) {
          console.warn("[Shorts] feed RSS no disponible:", e);
        }
      }

      if (!CHANNEL_ID) {
        console.warn(
          "[Shorts] Falta VITE_CHANNEL_ID en el archivo .env; no se pueden cargar los reels."
        );
      }

      if (!cancelled) {
        setShorts(result.slice(0, MAX_SHORTS));
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 8);
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [shorts, loading, updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-short-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setActiveIndex(index);
  };

  /** Desplaza el visor vertical al reel indicado */
  const goToReel = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const feed = feedRef.current;
      if (!feed || index < 0 || index >= shorts.length) return;
      feed.scrollTo({ top: index * feed.clientHeight, behavior });
      setCurrentIndex(index);
    },
    [shorts.length]
  );

  // Al abrir: posiciona el visor en el reel elegido (sin animación)
  useEffect(() => {
    if (activeIndex === null) return;
    const feed = feedRef.current;
    if (!feed) return;
    feed.scrollTop = activeIndex * feed.clientHeight;
  }, [activeIndex]);

  // Detecta qué reel está en pantalla dentro del visor
  useEffect(() => {
    const feed = feedRef.current;
    if (!isOpen || !feed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.reelIndex ?? -1
          );
          if (index >= 0) setCurrentIndex(index);
        });
      },
      { root: feed, threshold: 0.6 }
    );

    feed
      .querySelectorAll<HTMLElement>("[data-reel-index]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isOpen, shorts.length]);

  // Al terminar un reel, avanza automáticamente al siguiente
  useEffect(() => {
    if (!isOpen) return;

    let player: YTPlayer | null = null;
    let cancelled = false;
    const iframeId = `reel-player-${currentIndex}`;

    loadYoutubeApi()
      .then((YT) => {
        if (cancelled || !document.getElementById(iframeId)) return;
        player = new YT.Player(iframeId, {
          events: {
            onStateChange: (event) => {
              if (event.data !== YT.PlayerState.ENDED) return;
              const next = currentIndex + 1;
              // El último vuelve al principio para poder seguir viéndolos
              goToReel(next < shorts.length ? next : 0);
            },
          },
        });
      })
      .catch((e) => console.warn("[Shorts] autoavance deshabilitado:", e));

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* el iframe ya fue desmontado */
      }
    };
  }, [isOpen, currentIndex, shorts.length, goToReel]);

  // Teclado (ESC / flechas) + bloqueo del scroll del body mientras el visor está abierto
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToReel(currentIndex + 1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToReel(currentIndex - 1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, currentIndex, goToReel]);

  const isEmpty = !loading && !shorts.length;
  const titleWords = t("shorts.title").split(" ");

  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-12 md:py-16">
      <AnimateOnScroll animation="animate-fade-down animate-fill-both animate-duration-[1200ms] animate-ease-out">
        <div className="flex flex-col items-center px-6 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-600">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary-500" />
            </span>
            {t("shorts.badge")}
          </span>
          <h2 className="title text-3xl font-bold md:text-5xl">
            {titleWords[0]}{" "}
            <span className="text-primary-500">
              {titleWords.slice(1).join(" ")}
            </span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-gray-500 md:text-base">
            {t("shorts.description")}
          </p>
        </div>
      </AnimateOnScroll>

      <div className="relative mt-8 md:mt-12">
        {loading ? (
          <ShortsSkeleton />
        ) : isEmpty ? (
          <div className="mx-4 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-10 text-center sm:mx-6 md:mx-10 lg:mx-16">
            <p className="text-sm text-gray-500 md:text-base">
              {t("shorts.empty")}
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-600"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
              </svg>
              {t("shorts.watch_channel")}
            </a>
          </div>
        ) : (
          <>
            <div
              ref={trackRef}
              className={`hide-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4 scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-10 lg:scroll-pl-16 ${TRACK_CLASSES}`}
            >
              <div aria-hidden className={EDGE_SPACER} />
              {shorts.map((short, index) => (
                <AnimateOnScroll
                  key={short.videoId}
                  animation={`animate-fade-up animate-fill-both animate-duration-700 animate-ease-out ${
                    DELAY_CLASSES[index % DELAY_CLASSES.length]
                  }`}
                >
                  <button
                    data-short-card
                    type="button"
                    onClick={() => openViewer(index)}
                    aria-label={`${t("shorts.play")}: ${short.title}`}
                    className={`group relative block ${CARD_WIDTH} shrink-0 snap-start overflow-hidden rounded-2xl bg-gray-900 shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-400`}
                  >
                    <div className="aspect-[9/16] w-full overflow-hidden">
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = thumbFor(
                            short.videoId
                          );
                        }}
                        className="size-full scale-[1.35] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.5]"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

                    <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                      Shorts
                    </span>

                    <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-primary-500/95 opacity-0 shadow-xl transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 size-6 text-white"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>

                    <p className="absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-left text-sm font-semibold text-white transition-transform duration-500 group-hover:-translate-y-1 md:text-[0.95rem]">
                      {short.title}
                    </p>
                  </button>
                </AnimateOnScroll>
              ))}
              <div aria-hidden className={EDGE_SPACER} />
            </div>

            {/* Flechas (desktop) */}
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t("accessibility.buttons.carousel_prev")}
              className={`absolute left-3 top-1/2 hidden size-11 lg:left-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition-all duration-300 hover:bg-white hover:scale-110 md:flex ${
                canScrollPrev ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t("accessibility.buttons.carousel_next")}
              className={`absolute right-3 top-1/2 hidden size-11 lg:right-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg backdrop-blur transition-all duration-300 hover:bg-white hover:scale-110 md:flex ${
                canScrollNext ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Visor vertical: todos los reels en fila para verlos de corrido */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("shorts.title")}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade animate-duration-300"
        >
          {/* Cerrar */}
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label={t("accessibility.buttons.close")}
            className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-110 hover:bg-white/30"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="size-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Contador */}
          <span className="absolute left-4 top-5 z-20 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
            {currentIndex + 1} / {shorts.length}
          </span>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-full animate-jump-in animate-duration-500 animate-ease-out sm:h-[92vh] sm:w-auto"
          >
            <div
              ref={feedRef}
              className="hide-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-contain"
            >
              {shorts.map((short, index) => {
                const isCurrent = index === currentIndex;
                const isNeighbor = Math.abs(index - currentIndex) <= 1;

                return (
                  <div
                    key={short.videoId}
                    data-reel-index={index}
                    className="flex h-full snap-start snap-always items-center justify-center px-4 py-3 sm:px-3 sm:py-2"
                  >
                    <div className="relative aspect-[9/16] h-full max-h-full w-auto max-w-[92vw] overflow-hidden rounded-2xl bg-black shadow-2xl">
                      {isCurrent ? (
                        <iframe
                          id={`reel-player-${index}`}
                          src={`https://www.youtube.com/embed/${short.videoId}?autoplay=1&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(
                            window.location.origin
                          )}`}
                          title={short.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="size-full"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => goToReel(index)}
                          aria-label={`${t("shorts.play")}: ${short.title}`}
                          className="group size-full"
                        >
                          {isNeighbor && (
                            <img
                              src={short.thumbnail}
                              alt={short.title}
                              className="size-full scale-[1.35] object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-80"
                            />
                          )}
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex size-16 items-center justify-center rounded-full bg-primary-500/90 shadow-xl transition-transform duration-300 group-hover:scale-110">
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="ml-1 size-7 text-white"
                                aria-hidden="true"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </span>
                          <span className="absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/90 to-transparent p-4 text-left text-sm font-semibold text-white">
                            {short.title}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Título del reel actual */}
            <p className="pointer-events-none absolute inset-x-0 bottom-3 z-10 line-clamp-2 px-6 text-center text-sm font-medium text-white/90 drop-shadow-lg sm:bottom-1">
              {shorts[currentIndex]?.title}
            </p>
          </div>

          {/* Navegación arriba/abajo (desktop) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToReel(currentIndex - 1);
            }}
            aria-label={t("accessibility.buttons.carousel_prev")}
            disabled={currentIndex === 0}
            className="absolute right-6 top-[38%] z-20 hidden size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-110 hover:bg-white/30 disabled:pointer-events-none disabled:opacity-30 lg:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToReel(currentIndex + 1);
            }}
            aria-label={t("accessibility.buttons.carousel_next")}
            disabled={currentIndex === shorts.length - 1}
            className="absolute right-6 top-[50%] z-20 hidden size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-110 hover:bg-white/30 disabled:pointer-events-none disabled:opacity-30 lg:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Pista de scroll (solo en el primer reel) */}
          {currentIndex === 0 && shorts.length > 1 && (
            <span className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 animate-bounce text-xs font-medium text-white/70">
              {t("shorts.scroll_hint")}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
