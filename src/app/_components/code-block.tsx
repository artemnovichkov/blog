"use client"

import type React from "react"
import { useRef, useState } from "react"
import { GoCheck, GoCopy } from "react-icons/go"
import { currentPostSlug, track } from "@/lib/analytics"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  const handleCopy = () => {
    const text = preRef.current?.innerText ?? ""
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)

    // Copies per view are the clearest signal that a post is used as a
    // reference rather than read once.
    track("code_copy", {
      slug: currentPostSlug(),
      language: preRef.current?.dataset.language || "unknown",
      line_count: text ? text.split("\n").length : 0,
      char_count: text.length,
    })
  }

  return (
    <div className="copyable-code-block relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white px-1 py-0.5 text-gray-700 text-sm shadow hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:ring-1 dark:ring-white/10 dark:hover:bg-gray-600"
      >
        {copied ? <GoCheck /> : <GoCopy />}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}
