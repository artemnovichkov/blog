"use client"

import { useEffect } from "react"

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string
          title?: string
          description: string
          inputSchema?: object
          annotations?: { readOnlyHint?: boolean; openWorldHint?: boolean }
          execute: (input: Record<string, unknown>) => Promise<unknown>
        },
        options?: { signal?: AbortSignal }
      ) => void
    }
  }
}

export default function WebMcpTools() {
  useEffect(() => {
    if (!document.modelContext) return

    const controller = new AbortController()
    const { signal } = controller

    document.modelContext.registerTool(
      {
        name: "list_posts",
        title: "List Blog Posts",
        description:
          "Returns all blog posts with slug, title, description, date, and categories.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        execute: async () => {
          const res = await fetch("/api/blog")
          return res.json()
        },
      },
      { signal }
    )

    document.modelContext.registerTool(
      {
        name: "get_post",
        title: "Get Blog Post",
        description: "Returns the full markdown content of a post by its slug.",
        inputSchema: {
          type: "object",
          properties: {
            slug: { type: "string", description: "The post slug" },
          },
          required: ["slug"],
        },
        annotations: { readOnlyHint: true },
        execute: async ({ slug }: { slug?: string }) => {
          const res = await fetch(`/api/blog/${slug}/markdown`, {
            headers: { Accept: "text/markdown" },
          })
          if (!res.ok) return { error: "Post not found" }
          return { content: await res.text() }
        },
      },
      { signal }
    )

    document.modelContext.registerTool(
      {
        name: "navigate",
        title: "Navigate",
        description: "Navigate to a page on this site.",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              description:
                "Path to navigate to, e.g. /blog, /blog/my-post, /sponsorship",
            },
          },
          required: ["path"],
        },
        execute: async ({ path }: { path?: string }) => {
          window.location.href = path ?? "/"
          return { ok: true }
        },
      },
      { signal }
    )

    return () => controller.abort()
  }, [])

  return null
}
