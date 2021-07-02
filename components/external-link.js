export default function ExternalLink({ href, children }) {
    return (
        <a className="p-4 text-gray-500 hover:text-gray-600 dark:text-white"
           target="_blank"
           rel="noopener noreferrer"
           href={href}
        >
            {children}
        </a>
    )
}