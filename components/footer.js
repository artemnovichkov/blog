import ExternalLink from './external-link'

export default function Footer() {
    return (
      <footer>
        <hr />
        <div className="grid grid-flow-col w-full my-4 text-center">
        <ExternalLink href="https://twitter.com/iosartem">Twitter</ExternalLink>
        <ExternalLink href="https://github.com/artemnovichkov">Github</ExternalLink>
        <ExternalLink href="https://t.me/subtlesettings">Telegram</ExternalLink>
        </div>
    </footer>
    )
}