"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import { flushSync } from "react-dom"
import readingTime from "reading-time"
import type { Post } from "@/interfaces/post"

const fmtDate = (iso: string) => {
  const d = new Date(iso)
  return d
    .toLocaleDateString("en-GB", { month: "short", day: "2-digit" })
    .toUpperCase()
}

export default function BlogIndex({
  posts,
  tags,
}: {
  posts: Post[]
  tags: string[]
}) {
  const [tag, setTag] = useState<string>("all")

  const selectTag = useCallback((next: string) => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown
    }
    if (typeof doc.startViewTransition !== "function") {
      setTag(next)
      return
    }
    doc.startViewTransition(() => {
      flushSync(() => setTag(next))
    })
  }, [])

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) => tag === "all" || (p.categories && p.categories.includes(tag))
      ),
    [posts, tag]
  )

  const byYear = useMemo(() => {
    const m = new Map<string, Post[]>()
    filtered.forEach((p) => {
      const y = String(new Date(p.date).getFullYear())
      const list = m.get(y) || []
      list.push(p)
      m.set(y, list)
    })
    return Array.from(m.entries()).sort(([a], [b]) => Number(b) - Number(a))
  }, [filtered])

  const yearRange = useMemo(() => {
    if (posts.length === 0) return ""
    const years = posts.map((p) => new Date(p.date).getFullYear())
    return `${Math.min(...years)} — ${Math.max(...years)}`
  }, [posts])

  return (
    <div className="shell">
      <section className="idx-hero">
        <h1 className="reveal">
          Field notes <em>on shipping</em>
          <br />
          iOS in public.
        </h1>
        <div className="meta reveal d2">
          <div className="count">{posts.length} posts</div>
          <div style={{ marginTop: 6, color: "var(--ink-4)" }}>{yearRange}</div>
        </div>
      </section>

      <div className="idx-controls reveal d3">
        <span className="lbl">Filter ›</span>
        <div className="chips">
          <button
            type="button"
            className={"chip" + (tag === "all" ? " active" : "")}
            onClick={() => selectTag("all")}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              type="button"
              key={t}
              className={"chip" + (tag === t ? " active" : "")}
              onClick={() => selectTag(t)}
            >
              #{t}
            </button>
          ))}
        </div>
        <div className="count">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </div>
      </div>

      <div className="idx-list">
        {byYear.map(([year, list]) => (
          <div key={year} className="year-grp">
            <div className="y">{year}</div>
            <div>
              {list.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="idx-row"
                  style={{
                    viewTransitionName: `post-${p.slug.replace(/[^a-z0-9-]/gi, "_")}`,
                  }}
                >
                  <div className="cover">
                    <Image
                      src={p.cover}
                      alt=""
                      width={400}
                      height={300}
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 140px, 200px"
                    />
                  </div>
                  <div className="date">{fmtDate(p.date)}</div>
                  <div className="body">
                    <div className="idx-title">{p.title}</div>
                    <div className="dek">{p.description}</div>
                    {p.categories && (
                      <div className="tags">
                        {p.categories.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="read">{readingTime(p.content).text}</div>
                  <div className="arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              padding: "80px 0",
              textAlign: "center",
              color: "var(--ink-3)",
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            No posts under this tag.
          </div>
        )}
      </div>
    </div>
  )
}
