const links = [
  { href: "https://x.com/iosartem", label: "X / Twitter" },
  { href: "https://github.com/artemnovichkov", label: "GitHub" },
  { href: "https://www.linkedin.com/in/artemnovichkov", label: "LinkedIn" },
  { href: "/feed.xml", label: "RSS" },
]

export default function Footer() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-inner">
          <div className="made-with">Made with ❤️ by Artem Novichkov</div>
          <div className="foot-links">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  l.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
