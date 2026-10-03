// Leaves room for the sticky header above the heading.
export const headingOffset = 112

export function scrollToHeading(heading: HTMLElement) {
  const top =
    heading.getBoundingClientRect().top + window.scrollY - headingOffset

  window.scrollTo({
    behavior: "smooth",
    top,
  })
}
