import { useEffect, useState } from "react";
import { CHANNEL_ID } from "@/config/config";
import AnimateOnScroll from "@/components/molecules/AnimateOnScroll.tsx";
import { useTranslation } from "react-i18next";

interface VideoInfo {
  videoId: string;
  title: string;
  author?: string;
}

function LoadingVideo() {
  return (
    <div className="w-[70vw] aspect-video flex items-center justify-center bg-gray-100 rounded-xl shadow-lg mb-4 animate-pulse">
      <span className="text-gray-400 text-xl">Cargando video...</span>
    </div>
  );
}

export default function LatestYoutubeVideo() {
  const { t } = useTranslation();
  const [video, setVideo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const latest = data.items[0];
          const videoId = latest.link.split("v=")[1];
          setVideo({
            videoId,
            title: latest.title,
            author: latest.author || "IGLESIA BAUTISTA FUNDAMENTAL",
          });
        }
      } catch (e) {
        console.error("Error fetching latest YouTube video via rss2json:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestVideo();
  }, []);

  const latestVideoTitleSplitted = t("latest_video_title").split(" ");

  return (
    <section className="w-full flex flex-col items-center p-8 bg-white">
      <AnimateOnScroll animation="animate-fade-down animate-fill-both animate-duration-[2000ms] animate-ease-out">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center title">
          {latestVideoTitleSplitted[0]}{" "}
          <span className="text-orange-400">{latestVideoTitleSplitted[1]}</span>
        </h2>
      </AnimateOnScroll>
      {loading ? (
        <LoadingVideo />
      ) : (
        <div className="rounded-xl overflow-hidden shadow-lg mb-4">
          <iframe
            src={video ? `https://www.youtube.com/embed/${video.videoId}` : ""}
            title="Último video de YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-[70vw] aspect-video"
          ></iframe>
        </div>
      )}
      {video && !loading && (
        <div className="w-[70vw] px-2">
          <h3 className="font-bold text-lg md:text-xl mb-1">{video.title}</h3>
          <a href="https://www.youtube.com/@iglesiabautistafundamental9995" className="text-gray-700 text-sm">{video.author}</a>
        </div>
      )}
    </section>
  );
}