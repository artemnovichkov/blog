"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import type { AppSection } from "@/lib/apps"

type Unfold = NonNullable<AppSection["unfold"]>

/** Slices that give each half its edge, from the screen side to the back. */
const SLABS = 6

/** CSS `ease-in-out`, solved for x the way browsers do. */
function easeInOut(x: number): number {
  const [x1, y1, x2, y2] = [0.42, 0, 0.58, 1]
  const bezier = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3
  let lo = 0
  let hi = 1
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2
    if (bezier(mid, x1, x2) < x) lo = mid
    else hi = mid
  }
  return bezier((lo + hi) / 2, y1, y2)
}

/** Progress of `p` through [from, to], eased, held at both ends. */
function phase(p: number, from: number, to: number): number {
  return easeInOut(Math.min(1, Math.max(0, (p - from) / (to - from))))
}

/**
 * The whole fold at scroll progress `p`: closed and lying lid up, the phone
 * turns upright, tips back like a board on a table while the left half swings
 * over on its hinge, then settles flat.
 */
function pose(p: number) {
  const turn = phase(p, 0.08, 0.3)
  const open = phase(p, 0.3, 0.8)
  const tilt = phase(p, 0.15, 0.4) - phase(p, 0.7, 0.92)
  const angle = 180 * (1 - open)
  const shift = -0.25 * (1 - open)
  const lean = 24 * tilt
  const spin = -90 * (1 - turn)
  return {
    shift,
    lean,
    spin,
    angle,
    device: `translateX(${shift * 100}%) rotateX(${lean}deg) rotate(${spin}deg)`,
    flap: `rotateY(${angle}deg)`,
    // A half facing away from the light goes dark; the closed flap shadows
    // the half beneath it.
    front: 0.6 * Math.min(1, angle / 90),
    back: 0.6 * Math.min(1, (180 - angle) / 90),
    right: 0.5 * Math.min(1, Math.max(0, (angle - 110) / 60)),
    // How far each screen is into iPhone Duo's folding look: the inner one as
    // soon as it leaves flat, the outer one as soon as the phone opens.
    frontFold: Math.min(1, angle / 60),
    backFold: Math.min(1, (180 - angle) / 40),
    covered: angle > 175,
    flat: p >= 0.92,
  }
}

type Point = [number, number, number]

const rad = (deg: number) => (deg * Math.PI) / 180

/**
 * Outline of a screen as points in its half, from the fractions in the app
 * registry: a rounded rectangle, corners walked clockwise from the top left.
 */
function outline(screen: number[], w: number, h: number): [number, number][] {
  const [left, top, right, bottom, ...radii] = screen
  const [x0, y0, x1, y1] = [left * w, top * h, right * w, bottom * h]
  const corners: [number, number, number, number][] = [
    [x0, y0, 180, 270],
    [x1, y0, 270, 360],
    [x1, y1, 0, 90],
    [x0, y1, 90, 180],
  ]
  return corners.flatMap(([x, y, from, to], i) => {
    const r = radii[i] * w
    const cx = x + (x === x0 ? r : -r)
    const cy = y + (y === y0 ? r : -r)
    return Array.from({ length: r ? 7 : 1 }, (_, k) => {
      const a = rad(from + ((to - from) * k) / 6)
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number]
    })
  })
}

/**
 * Where the eye sees a point of the tilted half land on the phone's plane:
 * the picture of a folding screen is drawn there, so it looks as if it still
 * lay flat and the half were only a window onto it. Mirrors the CSS: stage
 * perspective, device turned about three quarters across, flap about the
 * hinge on the screen side.
 */
function projector(width: number, height: number, at: ReturnType<typeof pose>) {
  const w = width / 2
  const t = width * 0.022
  const eye: Point = [width / 2, height / 2, width * 2.2]
  const origin: Point = [width * 0.75, height / 2, 0]
  // The eye in the device's own space: undo translate, rotateX, rotate.
  let [x, y, z] = [
    eye[0] - origin[0] - at.shift * width,
    eye[1] - origin[1],
    eye[2],
  ]
  const [ca, sa] = [Math.cos(rad(at.lean)), Math.sin(rad(at.lean))]
  ;[y, z] = [y * ca + z * sa, -y * sa + z * ca]
  const [cr, sr] = [Math.cos(rad(at.spin)), Math.sin(rad(at.spin))]
  ;[x, y] = [x * cr + y * sr, -x * sr + y * cr]
  const camera: Point = [x + origin[0], y + origin[1], z]
  const [ct, st] = [Math.cos(rad(at.angle)), Math.sin(rad(at.angle))]

  return (u: number, v: number, back: boolean): [number, number] => {
    // Face point in the flap, then turned about the hinge.
    const fx = back ? w - u : u
    const fz = back ? -t / 2 : t / 2
    const [dx, dz] = [fx - w, fz - t / 2]
    const p: Point = [w + dx * ct + dz * st, v, t / 2 - dx * st + dz * ct]
    const k = camera[2] / (camera[2] - p[2])
    return [
      camera[0] + (p[0] - camera[0]) * k,
      camera[1] + (p[1] - camera[1]) * k,
    ]
  }
}

/**
 * The phone opens the way the game does. Scrolling drives every frame, eased
 * a little so it glides like a real object, and it plays back just as well.
 * The folding look only lasts while the hinge moves, like on the device. At
 * rest open, every 3D transform is dropped so Safari draws the screens at
 * full resolution. With reduced motion the section's still screenshot shows
 * instead.
 */
export default function DuoUnfold({ section }: { section: AppSection }) {
  const unfold = section.unfold as Unfold
  const scene = useRef<HTMLElement>(null)
  const device = useRef<HTMLDivElement>(null)
  const projection = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = scene.current
    const phone = device.current
    if (!root || !phone) return
    const part = (name: string) =>
      root.querySelector<HTMLElement>(`[data-part="${name}"]`)
    const all = (names: string[]) =>
      names.map(part).filter((el): el is HTMLElement => el !== null)
    const flap = part("flap")
    const right = part("right")
    const shades = all(["shade-front", "shade-back", "shade-right"])
    const fx = (side: string) =>
      all(["proj", "blur1", "blur2", "dark"].map((name) => `${name}-${side}`))
    const front = fx("front")
    const back = fx("back")
    const stage = phone.parentElement
    const overlay = projection.current
    if (!flap || !right || !stage || !overlay || shades.length < 3) return
    if (front.length < 4 || back.length < 4) return

    let shown = -1
    let target = 0
    let motion = 0
    let movingUntil = 0
    let frame = 0

    const progress = () => {
      const box = root.getBoundingClientRect()
      const travel = box.height - window.innerHeight
      return Math.min(1, Math.max(0, -box.top / travel))
    }

    const render = (p: number) => {
      const next = pose(p)
      phone.toggleAttribute("data-flat", next.flat)
      phone.style.transform = next.flat ? "" : next.device
      flap.style.transform = next.flat ? "" : next.flap
      right.style.visibility = next.covered ? "hidden" : ""
      shades[0].style.opacity = String(next.front)
      shades[1].style.opacity = String(next.back)
      shades[2].style.opacity = String(next.right)
      overlay.style.transform = next.flat ? "" : next.device
      const width = stage.offsetWidth
      const height = stage.offsetHeight
      const project = projector(width, height, next)
      const show = (
        parts: HTMLElement[],
        screen: number[],
        isBack: boolean,
        visible: boolean,
        fold: number
      ) => {
        const [layer, blur1, blur2, dark] = parts
        const on = !next.flat && visible && motion > 0.01
        layer.style.visibility = on ? "visible" : "hidden"
        if (!on) return
        const points = outline(screen, width / 2, height).map(([u, v]) =>
          project(u, v, isBack)
        )
        // The layer reaches past the stage by a quarter of its width and 30% of
        // its height each side (see promo.css), so shift into its box.
        const [ox, oy] = [width * 0.25, height * 0.3]
        layer.style.clipPath = `polygon(${points.map(([px, py]) => `${(px + ox).toFixed(1)}px ${(py + oy).toFixed(1)}px`).join(",")})`
        layer.style.opacity = String(motion)
        blur1.style.opacity = String(Math.min(1, 2 * fold))
        blur2.style.opacity = String(fold)
        dark.style.opacity = String(0.9 * fold)
      }
      show(front, unfold.leftScreen, false, next.angle < 90, next.frontFold)
      show(back, unfold.backScreen, true, next.angle > 90, next.backFold)
    }

    // Progress follows the scroll with a short lag, like a spring with no
    // overshoot. The folding look comes in quickly while scrolling and fades
    // over about half a second once it rests. Ticking stops when both settle.
    const tick = (now: number) => {
      const gap = target - shown
      shown = Math.abs(gap) < 0.0005 ? target : shown + gap * 0.18
      const goal = now < movingUntil ? 1 : 0
      const rate = goal > motion ? 0.25 : 0.08
      motion =
        Math.abs(goal - motion) < 0.005 ? goal : motion + (goal - motion) * rate
      render(shown)
      const settled = shown === target && motion === goal
      frame = settled && goal === 0 ? 0 : requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = progress()
      if (shown < 0) shown = target
      else movingUntil = performance.now() + 900
      if (!frame) frame = requestAnimationFrame(tick)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [unfold])

  const half = {
    width: unfold.width,
    height: unfold.height,
    unoptimized: true,
  }
  const slabs = (mask: string) =>
    Array.from({ length: SLABS }, (_, i) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed stack of slices
        key={i}
        className="duo-slab"
        style={
          {
            "--slab": i / (SLABS - 1),
            "--shine": `${100 - Math.abs(i / (SLABS - 1) - 0.5) * 200}%`,
            maskImage: `url("${mask}")`,
          } as React.CSSProperties
        }
      />
    ))
  // A folding screen's picture lying flat where the screen lay, cut by
  // script to what the tilted half shows of it.
  const flatPicture = (layers: string, side: string, hinge: string) => (
    <div className="duo-proj-layer" data-part={`proj-${side}`}>
      <div className="duo-fx" data-hinge={hinge}>
        <Image src={`${layers}-screen.webp`} alt="" {...half} />
        <Image
          src={`${layers}-blur1.webp`}
          alt=""
          className="duo-fx-blur1"
          data-part={`blur1-${side}`}
          {...half}
        />
        <Image
          src={`${layers}-blur2.webp`}
          alt=""
          className="duo-fx-blur2"
          data-part={`blur2-${side}`}
          {...half}
        />
        <div className="duo-fx-dark" data-part={`dark-${side}`} />
      </div>
    </div>
  )

  return (
    <section ref={scene} className="duo-scene">
      <div className="duo-sticky">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold font-serif text-3xl text-zinc-900 tracking-tight sm:text-4xl dark:text-gray-100">
            {section.title}
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed sm:text-lg dark:text-gray-300">
            {section.body}
          </p>
        </div>
        <div className="duo-stage">
          <div className="duo-body">
            <div
              ref={device}
              className="duo-device"
              role="img"
              aria-label={unfold.alt}
              style={{ transform: pose(0).device }}
            >
              <div className="duo-half duo-right" data-part="right">
                {slabs(unfold.right)}
                <div className="duo-face">
                  <Image src={unfold.right} alt="" {...half} />
                  <div
                    className="duo-shade"
                    data-part="shade-right"
                    style={{
                      maskImage: `url("${unfold.right}")`,
                      opacity: 0.5,
                    }}
                  />
                </div>
              </div>
              <div
                className="duo-half duo-flap"
                data-part="flap"
                style={{ transform: pose(0).flap }}
              >
                {slabs(unfold.left)}
                <div className="duo-face">
                  <Image src={unfold.left} alt="" {...half} />
                  <div
                    className="duo-shade"
                    data-part="shade-front"
                    style={{ maskImage: `url("${unfold.left}")`, opacity: 0.6 }}
                  />
                </div>
                <div className="duo-face duo-face-back">
                  <Image src={unfold.back} alt="" {...half} />
                  <div
                    className="duo-shade"
                    data-part="shade-back"
                    style={{ maskImage: `url("${unfold.back}")`, opacity: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={projection}
            className="duo-proj"
            aria-hidden="true"
            style={{ transform: pose(0).device }}
          >
            {flatPicture(unfold.leftLayers, "front", "right")}
            {flatPicture(unfold.backLayers, "back", "left")}
          </div>
        </div>
      </div>
    </section>
  )
}
