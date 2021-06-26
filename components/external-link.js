export default function ExternalLink({ href, children }) {
    return (
        <a className="p-4"
           target="_blank"
           rel="noopener noreferrer"
           href={href}
        >
            {children}
        </a>
    )
}