import type { ReactNode } from "react"

interface CalloutProps {
  type?: "info" | "warning" | "error"
  emoji: string
  children: ReactNode
}

const Callout = ({ type = "info", emoji, children }: CalloutProps) => {
  const baseStyles = "callout p-4 rounded-md flex flex-col gap-2"

  const typeStyles: Record<string, string> = {
    info: "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-200/30 border",
    warning:
      "bg-yellow-50 border-yellow-100 dark:bg-yellow-700/30 dark:border-yellow-200/30 border",
    error:
      "bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-200/30 border",
  }

  const appliedStyles = `${baseStyles} ${typeStyles[type]}`

  return (
    <div className={appliedStyles}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{emoji}</span>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Callout
