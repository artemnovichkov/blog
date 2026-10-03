"use client"

import type { ComponentPropsWithoutRef } from "react"
import { scrollToHeading } from "@/lib/scroll-to-heading"

type HeadingProps = ComponentPropsWithoutRef<"h2">

/**
 * Wraps the heading text in a link to its own id, so any section can be
 * shared. The "#" marker is a CSS pseudo-element, which keeps it out of the
 * heading's textContent that the table of contents reads.
 */
function anchored(Tag: "h2" | "h3") {
  return function AnchoredHeading({ id, children, ...props }: HeadingProps) {
    if (!id) return <Tag {...props}>{children}</Tag>

    return (
      <Tag id={id} {...props}>
        <a
          href={`#${id}`}
          className="heading-anchor"
          onClick={(event) => {
            const heading = event.currentTarget.parentElement
            if (!heading) return

            event.preventDefault()
            // Keeps the hash shareable without the instant native jump.
            window.history.pushState(null, "", `#${id}`)
            scrollToHeading(heading)
          }}
        >
          {children}
        </a>
      </Tag>
    )
  }
}

export const H2 = anchored("h2")
export const H3 = anchored("h3")
