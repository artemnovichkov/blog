import { getArdCatalog } from "@/lib/ard"

/**
 * Served at two paths: the spec names `/.well-known/ard.json`, while Google's
 * announcement and the scanners built from it look for `ai-catalog.json`. Both
 * are cheap to answer, so neither client goes away empty-handed.
 */
export function ardResponse() {
  return new Response(JSON.stringify(getArdCatalog(), null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
