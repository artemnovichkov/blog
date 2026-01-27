export default function Projects() {
  return (
    <div>
      <p className="font-bold text-3xl tracking-tight mb-2 text-zinc-800 dark:text-gray-100">
        Current Projects
      </p>
      <p className="mb-4 text-zinc-500 dark:text-gray-400">
        Projects I&apos;m currently working on:
      </p>
      <ul className="flex flex-col gap-3">
        {projects.map((project) => (
          <li key={project.name}>
            {project.emoji && <span>{project.emoji} </span>}
            <a
              className="text-base underline text-zinc-800 dark:text-gray-100"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
            <span className="text-zinc-800 dark:text-gray-100">
              {" — "}
              {project.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const projects = [
  {
    emoji: "🎨",
    name: "asset-catalog-viewer",
    url: "https://github.com/artemnovichkov/asset-catalog-viewer",
    description: "VS Code extension for .xcassets preview",
  },
  {
    emoji: "🏠",
    name: "atmoshome",
    url: "https://atmoshome.vercel.app",
    description: "Home environment monitoring dashboard",
  },
  {
    emoji: "🔌",
    name: "claude-code-plugins",
    url: "https://github.com/artemnovichkov/claude-code-plugins",
    description: "Claude Code plugins collection",
  },
  {
    emoji: "🔮",
    name: "horoscope",
    url: "https://github.com/artemnovichkov/horoscope",
    description: "Dev horoscope powered by Foundation Models",
  },
  {
    emoji: "🆕",
    name: "iOS-26-by-Examples",
    url: "https://github.com/artemnovichkov/iOS-26-by-Examples",
    description: "Hands-on iOS 26 feature examples",
  },
  {
    emoji: "⌨️",
    name: "shortcuts-mcp-server",
    url: "https://github.com/artemnovichkov/shortcuts-mcp-server",
    description: "Shortcuts + MCP",
  },
  {
    emoji: "🐛",
    name: "TranscriptDebugMenu",
    url: "https://github.com/artemnovichkov/TranscriptDebugMenu",
    description: "Debug menu for LanguageModelSession transcripts",
  },
]
