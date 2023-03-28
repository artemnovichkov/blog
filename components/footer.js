import ExternalLink from './external-link'
import Image from "next/image"

const socialMedias = [
  {
    image: "/images/github.svg",
    url: "https://github.com/artemnovichkov",
  },
  {
    image: "/images/twitter.svg",
    url: "https://twitter.com/iosartem",
  },
  {
    image: "/images/telegram.svg",
    url: "https://t.me/artemnovichkov",
  },
]

export default function Footer() {
    return (
      <footer>
        <div className="text-center pb-8">
          {socialMedias.map((socialMedia) => (
          <ExternalLink href={socialMedia.url}>
            <Image className="hover:scale-110 dark:invert" src={socialMedia.image} width={28} height={28} />
          </ExternalLink>
          ))}
          <p className="pt-4">Made with ❤️ by Artem Novichkov</p>
        </div>
    </footer>
    )
}