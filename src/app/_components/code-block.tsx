"use client"

import React, { useState } from "react"
import { GoCheck, GoCopy } from "react-icons/go"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode }
    return extractText(props.children)
  }
  return ""
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = extractText(children)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-sm cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 px-1 py-0.5 shadow"
      >
        {copied ? <GoCheck /> : <GoCopy />}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  )
}
