"use client"

import { useCallback, useMemo, useState } from "react"
import { flushSync } from "react-dom"
import type { Post } from "@/interfaces/post"
import PostPreview from "./post-preview"

const CHIPS_COLLAPSED = 6

export default function BlogIndex({
  posts,
  tags,
  title,
  subtitle,
  showFilter = true,
  showPostTags = true,
}: {
  posts: Post[]
  tags: string[]
  title?: React.ReactNode
  subtitle?: React.ReactNode
  showFilter?: boolean
  showPostTags?: boolean
}) {
  const [tag, setTag] = useState<string>("all")
  const [chipsExpanded, setChipsExpanded] = useState(false)
  const visibleTags = chipsExpanded ? tags : tags.slice(0, CHIPS_COLLAPSED)
  const hiddenCount = tags.length - visibleTags.length

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
          {title || (
            <>
              Field notes on shipping
              <br />
              iOS in public.
            </>
          )}
        </h1>
        <div className="meta reveal d2">
          <div className="count">{posts.length} posts</div>
          <div style={{ marginTop: 6, color: "var(--ink-4)" }}>
            {subtitle || yearRange}
          </div>
        </div>
      </section>

      {showFilter && (
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
            {visibleTags.map((t) => (
              <button
                type="button"
                key={t}
                className={"chip" + (tag === t ? " active" : "")}
                onClick={() => selectTag(t)}
              >
                #{t}
              </button>
            ))}
            {tags.length > CHIPS_COLLAPSED && (
              <button
                type="button"
                className="chip chip-more"
                onClick={() => setChipsExpanded((v) => !v)}
              >
                {chipsExpanded ? "Less" : `+${hiddenCount} More`}
              </button>
            )}
          </div>
          <div className="count">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
        </div>
      )}

      <div className="idx-list">
        {byYear.map(([year, list]) => (
          <div key={year} className="year-grp">
            <div className="y">{year}</div>
            <div className="year-grid">
              {list.map((p) => (
                <PostPreview key={p.slug} post={p} showTags={showPostTags} />
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
