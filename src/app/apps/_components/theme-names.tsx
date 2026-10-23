"use client"

import { useRef } from "react"

/**
 * The names under the device also pick a look. They cannot set one: the
 * looks are scrubbed by the scene's own pass through the screen, so a tap
 * scrolls to the point of that pass where its look is on the device and
 * lets the same animation carry it there.
 */
export default function ThemeNames({ names }: { names: string[] }) {
  const list = useRef<HTMLUListElement>(null)

  function show(index: number) {
    const scene = list.current?.closest<HTMLElement>(".themes-scene")
    if (!scene) return
    /*
     * The `contain` range runs from the scene's top meeting the viewport's
     * to its bottom meeting the viewport's, and each look holds the middle
     * of its own even share of it.
     */
    const span = scene.offsetHeight - window.innerHeight
    const top =
      scene.getBoundingClientRect().top +
      window.scrollY +
      (span * (index + 0.5)) / names.length
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    window.scrollTo({ top, behavior: reduced.matches ? "auto" : "smooth" })
  }

  return (
    <ul
      ref={list}
      className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-serif text-lg text-zinc-900 sm:gap-x-6 sm:text-xl dark:text-gray-100"
    >
      {names.map((name, index) => (
        <li
          key={name}
          className="themes-name whitespace-nowrap"
          style={{ animationName: `themes-name-${index}` }}
        >
          <button
            type="button"
            onClick={() => show(index)}
            className="-mx-1 cursor-pointer px-1 py-1 transition-colors hover:text-accent"
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  )
}
