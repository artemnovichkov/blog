const ExternalLink = ({ href, children }) => (
    <a
      className="text-gray-500 hover:text-gray-600 transition"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );

export default function Footer() {
    return (
    <div className="flex flex-row space-x-4 w-full bg-gray-100">
        <ExternalLink href="https://twitter.com/iosartem">Twitter</ExternalLink>
        <ExternalLink href="https://github.com/artemnovichkov">Github</ExternalLink>
        <ExternalLink href="https://t.me/subtlesettings">Telegram</ExternalLink>
    </div>
    )
}