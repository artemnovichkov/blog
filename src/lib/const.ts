export const name: string = "Artem Novichkov"
export const about: string = "Bearded iOS developer 👨🏻‍💻"
export const title: string = `${name} – ${about}`

export type Project = {
  emoji?: string
  name: string
  url: string
  description: string
}

// Shared between the Projects component and the /api/home/markdown route.
export const projects: Project[] = [
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

export const categoryTitleMap: Record<string, string> = {
  ai: "AI",
  avkit: "AVKit",
  claude: "Claude",
  combine: "Combine",
  concurrency: "Concurrency",
  "core-animation": "Core Animation",
  corebluetooth: "Core Bluetooth",
  createml: "Create ML",
  "developer-tools": "Developer Tools",
  environment: "Environment",
  "foundation-models": "Foundation Models",
  ios: "iOS",
  ios15: "iOS 15",
  llm: "LLM",
  macos: "macOS",
  mapkit: "MapKit",
  "machine-learning": "Machine Learning",
  mcp: "MCP",
  naturallanguage: "Natural Language",
  "result-builders": "Result builders",
  security: "Security",
  shazamkit: "ShazamKit",
  swift: "Swift",
  "swift-charts": "Swift Charts",
  "swift-concurrency": "Swift Concurrency",
  "swift-package-manager": "Swift Package Manager",
  swiftui: "SwiftUI",
  texteditor: "TextEditor",
  tips: "Tips",
  tools: "Tools",
  uikit: "UIKit",
  vision: "Vision",
  webkit: "WebKit",
  wwdc21: "WWDC21",
  wwdc25: "WWDC25",
  xcode: "Xcode",
  "xcode-extension": "Xcode Extension",
}
