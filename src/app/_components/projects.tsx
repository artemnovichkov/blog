const projects = [
  {
    name: "asset-catalog-viewer",
    url: "https://github.com/artemnovichkov/asset-catalog-viewer",
    description: "VS Code extension for .xcassets preview",
    stack: "TypeScript · VS Code",
  },
  {
    name: "atmoshome",
    url: "https://atmoshome.vercel.app",
    description: "Home environment monitoring dashboard",
    stack: "Next.js · IoT",
  },
  {
    name: "claude-code-plugins",
    url: "https://github.com/artemnovichkov/claude-code-plugins",
    description: "Claude Code plugins collection",
    stack: "Node · CLI",
  },
  {
    name: "horoscope",
    url: "https://github.com/artemnovichkov/horoscope",
    description: "Dev horoscope powered by Foundation Models",
    stack: "Swift · FM",
  },
  {
    name: "iOS-26-by-Examples",
    url: "https://github.com/artemnovichkov/iOS-26-by-Examples",
    description: "Hands-on iOS 26 feature examples",
    stack: "Swift · UIKit",
  },
  {
    name: "shortcuts-mcp-server",
    url: "https://github.com/artemnovichkov/shortcuts-mcp-server",
    description: "Shortcuts + MCP",
    stack: "Swift · MCP",
  },
  {
    name: "TranscriptDebugMenu",
    url: "https://github.com/artemnovichkov/TranscriptDebugMenu",
    description: "Debug menu for LanguageModelSession transcripts",
    stack: "Swift · SwiftUI",
  },
]

const ArrowOut = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

export default function Projects() {
  return (
    <section className="projects">
      <div className="grid12 projects-head">
        <div className="left">
          <div className="eyebrow">
            <span>Current Projects</span>
          </div>
          <h2 style={{ marginTop: 14 }}>
            Open-source <em>in flight</em>
          </h2>
        </div>
      </div>

      <div className="proj-list">
        {projects.map((p) => (
          <a
            key={p.name}
            className="proj"
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="name">{p.name}</div>
            <div className="desc">{p.description}</div>
            <div className="stack">{p.stack}</div>
            <div className="ext">
              <ArrowOut />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
