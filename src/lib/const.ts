export const siteUrl: string = "https://artemnovichkov.com"
export const name: string = "Artem Novichkov"
export const about: string = "Bearded iOS developer 👨🏻‍💻"
export const title: string = `${name} – ${about}`

export type Project = {
  emoji?: string
  name: string
  url: string
  description: string
  cta?: {
    label: string
    url: string
  }
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
    name: "skills",
    url: "https://github.com/artemnovichkov/skills",
    description: "Agent skills, MCP servers & subagents",
    cta: {
      label: "Install in Xcode",
      url: "xcode://agent-plugin-clone?repo=https%3A%2F%2Fgithub.com%2Fartemnovichkov%2Fskills.git",
    },
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

export const iphoneDuoProjects: Project[] = [
  {
    emoji: "📐",
    name: "iPhone-Duo-by-Examples",
    url: "https://github.com/artemnovichkov/iPhone-Duo-by-Examples",
    description: "SwiftUI examples for iPhone Duo APIs in iOS 27.1",
  },
  {
    emoji: "🎚️",
    name: "hinge",
    url: "https://github.com/artemnovichkov/hinge",
    description: "Control iPhone Duo Simulator hinge angle from CLI",
  },
  {
    emoji: "🪗",
    name: "Accorduon",
    url: "https://github.com/artemnovichkov/Accorduon",
    description: "Accordion where the hinge is the bellows",
  },
  {
    emoji: "🧸",
    name: "ClawKit",
    url: "https://github.com/artemnovichkov/ClawKit",
    description: "Clay claw machine split across the fold",
  },
  {
    emoji: "🦢",
    name: "Duogami",
    url: "https://github.com/artemnovichkov/Duogami",
    description: "Origami workshop: fold paper by folding the phone",
  },
  {
    emoji: "⏳",
    name: "SandValley",
    url: "https://github.com/artemnovichkov/SandValley",
    description: "Sand that slides into the fold",
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
  wwdc26: "WWDC26",
  xcode: "Xcode",
  "xcode-extension": "Xcode Extension",
}
