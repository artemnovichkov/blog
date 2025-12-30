export interface SponsorshipConfig {
  isVisible: boolean
  title: string
  description: string
  url: string
}

export const sponsorshipConfig: SponsorshipConfig = {
  isVisible: true,
  title: "Point-Free End-of-Year Sale: 25% Off",
  description:
    "Get 25% off 1 year of Point-Free! Access hundreds of hours of advanced Swift content: SQLite persistence, concurrency, app architecture, cross-platform development. Limited time only!",
  url: "https://www.pointfree.co/discounts/eoy-2025?utm_source=artemnovichkov&utm_medium=blog&utm_campaign=eoy-2025",
}
