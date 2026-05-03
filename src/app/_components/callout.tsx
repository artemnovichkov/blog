import type { ReactNode } from "react"

interface CalloutProps {
  type?: "info" | "warning" | "error"
  emoji?: string
  children: ReactNode
}

const labelFor = (type: "info" | "warning" | "error") => {
  switch (type) {
    case "warning":
      return "Warning"
    case "error":
      return "Important"
    default:
      return "Note"
  }
}

const Callout = ({ type = "info", emoji, children }: CalloutProps) => {
  return (
    <div className={`callout callout-${type}`}>
      <div className="callout-icon">
        {emoji ?? (type === "info" ? "i" : "!")}
      </div>
      <div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: type === "info" ? "var(--ink-3)" : "var(--accent)",
            display: "block",
            marginBottom: 4,
          }}
        >
          {labelFor(type)}
        </span>
        {children}
      </div>
    </div>
  )
}

export default Callout
