"use client"

import { useEffect, useId, useRef, useState } from "react"
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiExternalLink,
  FiFileText,
} from "react-icons/fi"
import { SiClaude, SiOpenai } from "react-icons/si"
import { track } from "@/lib/analytics"
import { siteUrl } from "@/lib/const"

const copiedResetDelay = 2000

const itemClassName =
  "flex w-full items-start gap-3 px-3 py-2 text-left transition-colors hover:bg-accent/10 focus-visible:bg-accent/10 focus-visible:outline-none dark:hover:bg-accent/20 dark:focus-visible:bg-accent/20"
const itemIconClassName =
  "mt-0.5 h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400"
const itemTitleClassName =
  "flex items-center gap-1 font-medium text-gray-900 text-sm dark:text-gray-100"
const itemHintClassName = "text-gray-500 text-xs dark:text-gray-400"

export default function CopyPageMenu({ slug }: { slug: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  const markdownPath = `/blog/${slug}.md`
  const markdownUrl = `${siteUrl}${markdownPath}`
  const prompt = encodeURIComponent(
    `Read ${markdownUrl} so I can ask questions about it.`
  )
  const claudeUrl = `https://claude.ai/new?q=${prompt}`
  const chatGptUrl = `https://chatgpt.com/?q=${prompt}&hints=search`

  // Reset the confirmation tick without leaving a timer behind on unmount.
  useEffect(() => {
    if (!isCopied) return
    const timer = setTimeout(() => setIsCopied(false), copiedResetDelay)
    return () => clearTimeout(timer)
  }, [isCopied])

  useEffect(() => {
    if (!isOpen) return

    const close = () => {
      setIsOpen(false)
      triggerRef.current?.focus()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }

    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  async function copyPage() {
    try {
      const response = await fetch(markdownPath)
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      await navigator.clipboard.writeText(await response.text())
      setIsCopied(true)
      track("copy_page", { slug })
    } catch {
      setIsCopied(false)
    }
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center rounded-full border border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={copyPage}
          className="flex items-center gap-2 rounded-full py-1.5 pr-2 pl-3 text-gray-900 text-sm transition-colors hover:text-accent dark:text-gray-100 dark:hover:text-accent"
        >
          {isCopied ? (
            <FiCheck className="h-4 w-4" aria-hidden="true" />
          ) : (
            <FiCopy className="h-4 w-4" aria-hidden="true" />
          )}
          {isCopied ? "Copied" : "Copy page"}
        </button>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label="More page options"
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-full border-gray-200 border-l py-1.5 pr-2.5 pl-2 text-gray-900 transition-colors hover:text-accent dark:border-gray-700 dark:text-gray-100 dark:hover:text-accent"
        >
          <FiChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div
          id={menuId}
          className="absolute right-0 z-10 mt-2 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-left shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          <button type="button" onClick={copyPage} className={itemClassName}>
            <FiCopy className={itemIconClassName} aria-hidden="true" />
            <span>
              <span className={itemTitleClassName}>Copy page</span>
              <span className={`block ${itemHintClassName}`}>
                Copy page as Markdown for LLMs
              </span>
            </span>
          </button>

          <a
            href={markdownPath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("view_markdown", { slug })
              setIsOpen(false)
            }}
            className={itemClassName}
          >
            <FiFileText className={itemIconClassName} aria-hidden="true" />
            <span>
              <span className={itemTitleClassName}>
                View as Markdown
                <FiExternalLink className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className={`block ${itemHintClassName}`}>
                View this page as plain text
              </span>
            </span>
          </a>

          <a
            href={claudeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("open_in_claude", { slug })
              setIsOpen(false)
            }}
            className={itemClassName}
          >
            <SiClaude className={itemIconClassName} aria-hidden="true" />
            <span>
              <span className={itemTitleClassName}>
                Open in Claude
                <FiExternalLink className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className={`block ${itemHintClassName}`}>
                Ask questions about this page
              </span>
            </span>
          </a>

          <a
            href={chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("open_in_chatgpt", { slug })
              setIsOpen(false)
            }}
            className={itemClassName}
          >
            <SiOpenai className={itemIconClassName} aria-hidden="true" />
            <span>
              <span className={itemTitleClassName}>
                Open in ChatGPT
                <FiExternalLink className="h-3 w-3" aria-hidden="true" />
              </span>
              <span className={`block ${itemHintClassName}`}>
                Ask questions about this page
              </span>
            </span>
          </a>
        </div>
      )}
    </div>
  )
}
