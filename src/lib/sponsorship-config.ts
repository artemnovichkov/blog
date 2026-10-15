export interface SponsorshipConfig {
  isVisible: boolean
  title: string
  description: string
  url: string
}

export const sponsorshipConfig: SponsorshipConfig = {
  isVisible: false,
  title: "",
  description: "",
  url: "",
}

/** Fills the slot while no sponsor is booked, so it is never empty space. */
export const houseAdConfig: SponsorshipConfig = {
  isVisible: true,
  title: "iOS Daily",
  description:
    "One essential iOS development article a day, with a short summary. Free on Telegram.",
  url: "https://t.me/+ltQId2u7xvQxYWYy",
}
