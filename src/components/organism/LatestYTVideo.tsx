import { useEffect, useState } from "react";
import { CHANNEL_ID, YOUTUBE_API_KEY } from "@/config/config";

interface VideoInfo {
  videoId: string;
  title: string;
  description: string;
}

export default function LatestYoutubeVideo() {
  const [video, setVideo] = useState<VideoInfo | null>(null);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`
        );
        const data = await res.json();
        const latest = data.items?.[0];
        if (latest?.id?.videoId) {
          setVideo({
            videoId: latest.id.videoId,
            title: latest.snippet.title,
            description: latest.snippet.description
          });
        }
      } catch (e) {
        console.error("Error fetching latest YouTube video:", e);
      }
    }
    fetchLatestVideo();
  }, []);

  return (
    <section className="w-full flex flex-col items-center p-8 bg-white">
      <h2 className="text-4xl font-bold mb-4 text-center title">
        Último <span className="text-orange-400">Video</span>
      </h2>
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
      {video && (
        <div className="w-[70vw] px-2">
          <h3 className="font-bold text-lg md:text-xl mb-1">
            {video.title}
          </h3>
          <p className="text-gray-700 text-sm">{video.description}</p>
        </div>
      )}
    </section>
  );
}