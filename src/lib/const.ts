export const name: string = 'Artem Novichkov';
export const about: string = 'Bearded iOS developer 👨🏻‍💻';
export const title: string = `${name} – ${about}`;

export type CategoryKey =
  | "ai"
  | "avkit"
  | "combine"
  | "concurrency"
  | "core-animation"
  | "corebluetooth"
  | "createml"
  | "developer-tools"
  | "environment"
  | "foundation-models"
  | "ios"
  | "ios15"
  | "llm"
  | "macos"
  | "mapkit"
  | "machine-learning"
  | "mcp"
  | "naturallanguage"
  | "result-builders"
  | "security"
  | "shazamkit"
  | "swift"
  | "swift-charts"
  | "swift-package-manager"
  | "swiftui"
  | "texteditor"
  | "tips"
  | "tools"
  | "uikit"
  | "vision"
  | "webkit"
  | "wwdc21"
  | "wwdc25"
  | "xcode"
  | "xcode-extension";

export const categoryTitleMap: Record<CategoryKey, string> = {
  "ai": "AI",
  "avkit": "AVKit",
  "combine": "Combine",
  "concurrency": "Concurrency",
  "core-animation": "Core Animation",
  "corebluetooth": "Core Bluetooth",
  "createml": "Create ML",
  "developer-tools": "Developer Tools",
  "environment": "Environment",
  "foundation-models": "Foundation Models",
  "ios": "iOS",
  "ios15": "iOS 15",
  "llm": "LLM",
  "macos": "macOS",
  "mapkit": "MapKit",
  "machine-learning": "Machine Learning",
  "mcp": "MCP",
  "naturallanguage": "Natural Language",
  "result-builders": "Result builders",
  "security": "Security",
  "shazamkit": "ShazamKit",
  "swift": "Swift",
  "swift-charts": "Swift Charts",
  "swift-package-manager": "Swift Package Manager",
  "swiftui": "SwiftUI",
  "texteditor": "TextEditor",
  "tips": "Tips",
  "tools": "Tools",
  "uikit": "UIKit",
  "vision": "Vision",
  "webkit": "WebKit",
  "wwdc21": "WWDC21",
  "wwdc25": "WWDC25",
  "xcode": "Xcode",
  "xcode-extension": "Xcode Extension",
};
