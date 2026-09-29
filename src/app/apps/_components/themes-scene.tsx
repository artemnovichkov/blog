import Image from "next/image"
import type { AppSection } from "@/lib/apps"

type Theme = NonNullable<AppSection["themes"]>[number]

/** How much of the pinned scroll each change of look takes. */
const FADE = 0.1

/** Keyframe stop, as a percentage of the pinned scroll. */
const at = (fraction: number) => `${+(fraction * 100).toFixed(2)}%`

/**
 * A theme's name is lit while its look is on the device: it lights up as the
 * look fades in and dims as the next one takes over.
 */
function nameKeyframes(index: number, count: number): string {
  const dim = 0.35
  const stops: string[] = []
  if (index > 0) {
    stops.push(`0%, ${at(index / count - FADE / 2)} { opacity: ${dim} }`)
  }
  const on = [
    index > 0 ? at(index / count + FADE / 2) : "0%",
    index < count - 1 ? at((index + 1) / count - FADE / 2) : "100%",
  ]
  stops.push(`${on.join(", ")} { opacity: 1 }`)
  if (index < count - 1) {
    stops.push(
      `${at((index + 1) / count + FADE / 2)}, 100% { opacity: ${dim} }`
    )
  }
  return `@keyframes themes-name-${index} { ${stops.join(" ")} }`
}

/**
 * One device pinned while the page scrolls past, its looks taking turns on
 * it: each fades in over the last at an even share of the scroll, and the
 * names below follow. Driven by the scroll itself through CSS, so it
 * reverses at any instant; browsers without scroll-driven animations get the
 * plain showcase instead.
 */
export default function ThemesScene({ section }: { section: AppSection }) {
  const themes: Theme[] = section.themes ?? []
  const count = themes.length
  const { width, height } = themes[0].image

  return (
    <section
      className="themes-scene"
      style={{ height: `${100 + count * 50}vh` }}
    >
      <style>
        {themes.map((_, index) => nameKeyframes(index, count)).join("\n")}
      </style>
      <div className="themes-sticky">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold font-serif text-3xl text-zinc-900 tracking-tight sm:text-4xl dark:text-gray-100">
            {section.title}
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed sm:text-lg dark:text-gray-300">
            {section.body}
          </p>
        </div>
        <div
          className="themes-stage"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          {themes.map((theme, index) => (
            <Image
              key={theme.name}
              src={theme.image.src}
              alt={theme.image.alt}
              width={theme.image.width}
              height={theme.image.height}
              sizes="(min-width: 768px) 880px, 100vw"
              className={
                index === 0 ? "themes-look" : "themes-look themes-next"
              }
              style={
                index === 0
                  ? undefined
                  : {
                      animationRange: `contain ${at(index / count - FADE / 2)} contain ${at(index / count + FADE / 2)}`,
                    }
              }
            />
          ))}
        </div>
        <ul className="flex gap-6 font-serif text-lg text-zinc-900 sm:text-xl dark:text-gray-100">
          {themes.map((theme, index) => (
            <li
              key={theme.name}
              className="themes-name"
              style={{ animationName: `themes-name-${index}` }}
            >
              {theme.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
