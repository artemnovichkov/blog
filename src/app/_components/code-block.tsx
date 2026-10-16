"use client"

import type React from "react"
import { useRef, useState } from "react"
import { GoCheck, GoCopy } from "react-icons/go"
import { currentPostSlug, track } from "@/lib/analytics"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
  "data-language"?: string
}

/**
 * Console blocks interleave commands with their output, and the output is the
 * bulk of them, so copying the block wholesale gives something unrunnable. A
 * line carrying the `$` prompt is a command and keeps going onto the next line
 * while it ends with a backslash; everything else is output.
 *
 * Same rule as sphinx-copybutton, fallback included: a block without a prompt
 * is copied whole. Shiki's console grammar marks output on its own, but it
 * reads backslash continuations as output and an output line starting with `#`
 * as a shell comment, so the prompt is the more reliable signal here.
 */
function commandsFrom(text: string) {
  const commands: string[] = []
  let continues = false
  for (const line of text.split("\n")) {
    const prompted = /^\s*\$\s/.test(line)
    if (prompted || continues) {
      commands.push(prompted ? line.replace(/^\s*\$ ?/, "") : line)
      continues = /\\\s*$/.test(line)
    } else {
      continues = false
    }
  }
  return commands.length > 0 ? commands.join("\n") : text
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const isConsole = props["data-language"] === "console"

  const handleCopy = () => {
    const text = preRef.current?.innerText ?? ""
    const payload = isConsole ? commandsFrom(text) : text
    navigator.clipboard.writeText(payload)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)

    // Copies per view are the clearest signal that a post is used as a
    // reference rather than read once. `mode` says whether the reader got the
    // commands alone, to tell whether copying output is ever missed.
    track("code_copy", {
      slug: currentPostSlug(),
      language: preRef.current?.dataset.language || "unknown",
      mode: payload === text ? "all" : "commands",
      line_count: payload ? payload.split("\n").length : 0,
      char_count: payload.length,
    })
  }

  return (
    <div className="copyable-code-block relative">
      <button
        type="button"
        onClick={handleCopy}
        title={isConsole ? "Copy commands" : "Copy"}
        aria-label={isConsole ? "Copy commands" : "Copy code"}
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
