"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { FiX } from "react-icons/fi"

const contentSelector = "[data-post-content]"
const openDuration = 320
const closeDuration = 260
const fadeDuration = 120
const springBackDuration = 200
const resetSlack = 80
const easing = "cubic-bezier(0.2, 0, 0, 1)"
const viewportFill = 0.92
const minZoomGain = 1.2
const dismissDistance = 90
const dismissFade = 0.6
const scrollCloseThreshold = 24
const tapSlop = 4
const borderRadius = 4

type ZoomState = {
  src: string
  alt: string
  width: number
  height: number
  // Tall screenshots already render wider in the article than a fit-to-viewport
  // overlay would, so they are shown at natural width and scroll instead.
  scrollable: boolean
}

type Drag = {
  pointerId: number
  startY: number
  moved: boolean
}

function isZoomable(image: HTMLImageElement) {
  return (
    !image.closest("a") &&
    !image.closest(".react-tweet-theme") &&
    !image.closest("[data-no-zoom]")
  )
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function PostImageZoom() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const figureRef = useRef<HTMLImageElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const sourceRef = useRef<HTMLImageElement | null>(null)
  const animationRef = useRef<Animation | null>(null)
  const dialogAnimationRef = useRef<Animation | null>(null)
  const closingRef = useRef(false)
  const dragRef = useRef<Drag | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [zoom, setZoom] = useState<ZoomState | null>(null)

  const reset = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    animationRef.current?.cancel()
    animationRef.current = null
    dialogAnimationRef.current?.cancel()
    dialogAnimationRef.current = null
    dragRef.current = null
    closingRef.current = false

    // Unhide the source before closing: close() hands focus back to whatever
    // was focused before showModal(), and a hidden element cannot take it.
    if (sourceRef.current) sourceRef.current.style.visibility = ""
    sourceRef.current = null

    if (backdropRef.current) backdropRef.current.style.opacity = ""

    const dialog = dialogRef.current
    if (dialog?.open) dialog.close()

    setZoom(null)
  }, [])

  const close = useCallback(() => {
    const dialog = dialogRef.current
    const figure = figureRef.current
    const source = sourceRef.current

    if (closingRef.current || !dialog?.open || !figure) return
    closingRef.current = true
    dragRef.current = null
    animationRef.current?.cancel()
    animationRef.current = null

    // The page may have scrolled behind the dialog, so measure the source again.
    const from = source?.getBoundingClientRect()

    // Animation events are not delivered while the tab is hidden, so a timer
    // backs up onfinish and guarantees the overlay always tears itself down.
    const scheduleReset = (duration: number) => {
      timeoutRef.current = window.setTimeout(reset, duration + resetSlack)
    }

    // The backdrop fades out through an inline opacity rather than a filling
    // animation: Chrome keeps a forwards fill applied to the persistent element
    // even after dropping it from getAnimations(), which leaves every later
    // open invisible.
    const fadeOut = (duration: number) => {
      const backdrop = backdropRef.current
      if (!backdrop) return null
      const from = backdrop.style.opacity || 1
      backdrop.style.opacity = "0"
      const fade = backdrop.animate([{ opacity: from }, { opacity: 0 }], {
        duration,
        easing,
      })
      dialogAnimationRef.current = fade
      return fade
    }

    if (!from || from.width === 0 || prefersReducedMotion()) {
      const fade = fadeOut(fadeDuration)
      if (fade) fade.onfinish = reset
      scheduleReset(fadeDuration)
      return
    }

    const dragged = figure.style.transform
    figure.style.transform = ""
    const to = figure.getBoundingClientRect()
    const scale = from.width / to.width

    const animation = figure.animate(
      [
        { transform: dragged || "none" },
        {
          transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${scale})`,
          borderRadius: `${borderRadius / scale}px`,
        },
      ],
      { duration: closeDuration, easing, fill: "forwards" }
    )
    fadeOut(closeDuration)

    animation.onfinish = reset
    animationRef.current = animation
    scheduleReset(closeDuration)
  }, [reset])

  const open = useCallback((image: HTMLImageElement) => {
    if (!image.complete) return

    // The width/height attributes describe the original asset; naturalWidth
    // only describes whichever srcset candidate happens to be loaded.
    const width = Number(image.getAttribute("width")) || image.naturalWidth
    const height = Number(image.getAttribute("height")) || image.naturalHeight
    // Broken images report no dimensions at all, so there is nothing to zoom.
    if (!width || !height) return

    // clientWidth/clientHeight, not innerWidth/innerHeight: these are the same
    // viewport the 92vw/92dvh caps in the stylesheet resolve against.
    const viewport = document.documentElement
    const rect = image.getBoundingClientRect()
    const containedWidth = Math.min(
      width,
      viewport.clientWidth * viewportFill,
      (viewport.clientHeight * viewportFill * width) / height
    )
    const exceedsViewport =
      width > viewport.clientWidth * viewportFill ||
      height > viewport.clientHeight * viewportFill

    if (sourceRef.current) sourceRef.current.style.visibility = ""
    sourceRef.current = image
    setZoom({
      src: image.currentSrc || image.src,
      alt: image.alt,
      width,
      height,
      // Fitting into the viewport is only worth it when it actually magnifies
      // the image. Tall screenshots on desktop and wide ones on phones gain
      // nothing that way, so those are shown at natural size and scrolled.
      scrollable: exceedsViewport && containedWidth < rect.width * minZoomGain,
    })
  }, [])

  // Mark zoomable images. Progressive enhancement: without JS nothing changes.
  // Runs once per mount; the post page keys this component by slug.
  useEffect(() => {
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(`${contentSelector} img`)
    ).filter(isZoomable)

    for (const image of images) {
      image.dataset.zoomable = "true"
      image.setAttribute("role", "button")
      image.setAttribute("tabindex", "0")
      image.setAttribute(
        "aria-label",
        image.alt ? `Zoom image: ${image.alt}` : "Zoom image"
      )
    }

    return () => {
      for (const image of images) {
        delete image.dataset.zoomable
        image.removeAttribute("role")
        image.removeAttribute("tabindex")
        image.removeAttribute("aria-label")
        image.style.visibility = ""
      }
      reset()
    }
  }, [reset])

  // Delegated open, so raw <img> tags in MDX are covered too.
  useEffect(() => {
    const root = document.querySelector(contentSelector)
    if (!root) return

    const findImage = (event: Event) =>
      (event.target as HTMLElement | null)?.closest<HTMLImageElement>(
        "img[data-zoomable]"
      ) ?? null

    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey
      )
        return
      const image = findImage(event)
      if (image) open(image)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return
      const image = findImage(event)
      if (!image) return
      event.preventDefault()
      open(image)
    }

    root.addEventListener("click", onClick as EventListener)
    root.addEventListener("keydown", onKeyDown as EventListener)

    return () => {
      root.removeEventListener("click", onClick as EventListener)
      root.removeEventListener("keydown", onKeyDown as EventListener)
    }
  }, [open])

  // FLIP from the in-article image to the overlay.
  useEffect(() => {
    const dialog = dialogRef.current
    const figure = figureRef.current
    const source = sourceRef.current
    if (!zoom || !dialog || !figure || !source) return

    dialog.showModal()
    dialog.scrollTop = 0
    // An image wider than the viewport opens centred rather than on its corner.
    dialog.scrollLeft = (dialog.scrollWidth - dialog.clientWidth) / 2
    source.style.visibility = "hidden"

    const backdrop = backdropRef.current

    if (prefersReducedMotion()) {
      dialogAnimationRef.current =
        backdrop?.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: fadeDuration,
          easing,
        }) ?? null
      return
    }

    const from = source.getBoundingClientRect()
    const to = figure.getBoundingClientRect()
    if (to.width === 0) return
    const scale = from.width / to.width

    const animation = figure.animate(
      [
        {
          transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${scale})`,
          borderRadius: `${borderRadius / scale}px`,
        },
        { transform: "none", borderRadius: `${borderRadius}px` },
      ],
      { duration: openDuration, easing }
    )
    dialogAnimationRef.current =
      backdrop?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: openDuration,
        easing,
      }) ?? null

    animationRef.current = animation
  }, [zoom])

  // Escape. A modal dialog does not reliably fire `cancel` (Chrome only sends a
  // close request once per user activation), so the key is handled directly.
  useEffect(() => {
    if (!zoom) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.preventDefault()
      close()
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [zoom, close])

  // Scrolling the page dismisses the overlay, unless the overlay itself scrolls.
  useEffect(() => {
    if (!zoom || zoom.scrollable) return

    const startY = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > scrollCloseThreshold) close()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", close, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("wheel", close)
    }
  }, [zoom, close])

  const onPointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    if (!zoom || zoom.scrollable) return
    if (event.target !== figureRef.current) return
    if (event.pointerType === "mouse" && event.button !== 0) return

    animationRef.current?.finish()
    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      moved: false,
    }
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // The pointer can already be gone; the drag still works without capture.
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDialogElement>) => {
    const drag = dragRef.current
    const figure = figureRef.current
    const backdrop = backdropRef.current
    if (!drag || drag.pointerId !== event.pointerId || !figure || !backdrop)
      return

    const offset = event.clientY - drag.startY
    if (Math.abs(offset) > tapSlop) drag.moved = true
    figure.style.transform = `translateY(${offset}px)`
    backdrop.style.opacity = String(
      1 - Math.min(Math.abs(offset) / 400, dismissFade)
    )
  }

  const onPointerUp = (event: React.PointerEvent<HTMLDialogElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null

    const offset = event.clientY - drag.startY
    if (!drag.moved || Math.abs(offset) > dismissDistance) {
      close()
      return
    }

    const figure = figureRef.current
    const backdrop = backdropRef.current
    if (!figure || !backdrop) return

    figure.style.transform = ""
    backdrop.style.opacity = ""
    figure.animate(
      [{ transform: `translateY(${offset}px)` }, { transform: "none" }],
      { duration: springBackDuration, easing }
    )
  }

  const onPointerCancel = () => {
    const figure = figureRef.current
    const backdrop = backdropRef.current
    dragRef.current = null
    if (figure) figure.style.transform = ""
    if (backdrop) backdrop.style.opacity = ""
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: the click only dismisses the overlay, which Escape (onCancel) and the close button already do
    <dialog
      ref={dialogRef}
      aria-label={zoom?.alt ? `Zoomed image: ${zoom.alt}` : "Zoomed image"}
      className={
        zoom?.scrollable
          ? "image-zoom-dialog image-zoom-dialog-scroll"
          : "image-zoom-dialog"
      }
      onCancel={(event) => {
        // Intercept Escape so the closing animation can play first.
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close()
          return
        }
        if (zoom?.scrollable && event.target === figureRef.current) close()
      }}
      onPointerCancel={onPointerCancel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* A separate layer so only the background fades: the image itself stays
          fully opaque and reads as growing out of the article. */}
      <div className="image-zoom-backdrop" ref={backdropRef} />
      {zoom && (
        <>
          <button
            aria-label="Close image"
            className="image-zoom-close"
            onClick={close}
            type="button"
          >
            <FiX aria-hidden="true" />
          </button>
          {/* biome-ignore lint/performance/noImgElement: reuses the already cached currentSrc, and next/image would refetch and flatten animated GIFs */}
          <img
            alt={zoom.alt}
            className="image-zoom-figure"
            draggable={false}
            height={zoom.height}
            ref={figureRef}
            src={zoom.src}
            width={zoom.width}
          />
        </>
      )}
    </dialog>
  )
}
