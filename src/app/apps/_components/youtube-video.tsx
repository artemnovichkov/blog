"use client"

import Image from "next/image"
import { useState } from "react"
import { FaPlay } from "react-icons/fa"
import type { AppVideo } from "@/lib/apps"

/**
 * A YouTube video that loads only when played: until then it's the poster
 * and a play button, so the page stays light and YouTube sets no cookies.
 * Played, it comes from YouTube's cookie-free domain.
 */
export default function YouTubeVideo({ video }: { video: AppVideo }) {
  const [isPlaying, setPlaying] = useState(false)

  return (
    <section className="promo-reveal mx-auto w-full max-w-4xl">
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg transition-transform group-hover:scale-110">
              <FaPlay aria-hidden="true" className="ml-1 size-7" />
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
