import type { LanguageRegistration } from "shiki"
import { bundledLanguages } from "shiki/langs"

type Rule = { patterns: unknown[] }

/**
 * Shiki ships the standard TextMate grammar for Swift, which deliberately
 * colors only a hardcoded list of stdlib types and predates a few Swift 6
 * keywords. Posts here are mostly SwiftUI and Foundation, so without these
 * patches `URL`, `Data` or `some View` render as plain text while `Int` and
 * `String` right next to them are colored.
 *
 * Patched in memory on every build rather than vendored, so grammar fixes
 * that land upstream still come through with a shiki bump.
 */
export async function swiftGrammar(): Promise<LanguageRegistration> {
  const [bundled] = (await bundledLanguages.swift()).default
  const lang = structuredClone(bundled)
  const repo = lang.repository as unknown as Record<string, Rule>
  const types = repo["declarations-available-types"]

  // `~Copyable` outside an inheritance clause, e.g. in a parameter type.
  types.patterns.unshift({
    match: "(~)(?=[_\\p{L}])",
    captures: {
      1: { name: "keyword.operator.type.requirement-suppression.swift" },
    },
  })

  // The one that matters in practice: in a type position, treat any unknown
  // capitalized name as a type. Last in the list, so builtin types keep their
  // more specific scopes. Only type positions, so `Color.red` in an
  // expression still reads as a member access.
  types.patterns.push({
    match: "\\b\\p{Lu}[_\\p{L}\\p{N}\\p{M}]*\\b",
    name: "support.type.swift",
  })

  // Typed throws: `func parse() throws(ParseError)`.
  repo["declarations-function"].patterns.unshift({
    begin: "\\b(throws)\\s*(\\()",
    beginCaptures: {
      1: { name: "storage.modifier.exception.swift" },
      2: { name: "punctuation.definition.arguments.begin.swift" },
    },
    end: "(\\))",
    endCaptures: {
      1: { name: "punctuation.definition.arguments.end.swift" },
    },
    patterns: [{ include: "#declarations-available-types" }],
  })

  // The grammar knows `nonisolated(nonsending)` but not `nonisolated(unsafe)`.
  repo.keywords.patterns.unshift({
    match: "(?<!\\.)\\bnonisolated\\(\\s*(?:unsafe|nonsending)\\s*\\)",
    name: "storage.modifier.swift",
  })

  // `consume` and `copy` are covered upstream, `discard` is not.
  repo.keywords.patterns.unshift({
    match: "(?<!\\.)\\bdiscard(?=\\s+`?[_\\p{L}])",
    name: "keyword.control.consume.swift",
  })

  return lang
}
