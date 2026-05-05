import type { IconType } from "react-icons"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import {
  iconButtonClassName,
  iconButtonIconClassName,
} from "./icon-button-styles"

const socialLinks = [
  {
    href: "https://x.com/iosartem",
    label: "X (Twitter)",
    Icon: FaXTwitter,
  },
  {
    href: "https://github.com/artemnovichkov",
    label: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/artemnovichkov",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
]

function SocialButton({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: IconType
}) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      aria-label={label}
      className={iconButtonClassName}
    >
      <Icon className={iconButtonIconClassName} />
    </a>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="py-8 text-center">
        <div className="flex flex-row place-content-center gap-16">
          {socialLinks.map((item) => (
            <SocialButton key={item.href} {...item} />
          ))}
        </div>
        <p className="pt-4 text-gray-900 dark:text-white">
          Made with ❤️ by Artem Novichkov
        </p>
      </div>
    </footer>
  )
}
