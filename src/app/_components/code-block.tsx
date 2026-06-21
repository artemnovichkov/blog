"use client"

import type React from "react"
import { useRef, useState } from "react"
import { GoCheck, GoCopy } from "react-icons/go"

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
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white px-1 py-0.5 text-sm shadow hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {copied ? <GoCheck /> : <GoCopy />}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}
