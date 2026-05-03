interface AdBlockProps {
  title: string
  description: string
  url: string
  isVisible?: boolean
}

const AdBlock = ({
  title,
  description,
  url,
  isVisible = true,
}: AdBlockProps) => {
  if (!isVisible) {
    return null
  }

  return (
    <aside className="ad-block">
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-4)",
          marginBottom: 6,
        }}
      >
        Sponsored
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div style={{ marginTop: 12 }}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn">
          Learn More →
        </a>
      </div>
    </aside>
  )
}

export default AdBlock
