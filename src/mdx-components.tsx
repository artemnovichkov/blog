import type { MDXComponents } from "mdx/types"
import { Tweet } from "react-tweet"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Tweet,
  }
}
