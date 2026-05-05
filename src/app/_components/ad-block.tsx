interface AdBlockProps {
  title: string
  description: string
  url: string
  isVisible?: boolean
}

const AdBlock = ({
  title,
  description,
  url,
  isVisible = true,
}: AdBlockProps) => {
  if (!isVisible) {
    return null
  }

  return (
    <div className="ad-block not-prose my-6 rounded-md border border-accent/25 bg-accent/10 p-4 dark:border-accent/35 dark:bg-accent/15">
      <div className="flex items-start gap-3">
        <span className="text-xl">📢</span>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 text-sm dark:text-gray-400">Sponsored</p>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-fit rounded-md bg-accent px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-accent/85"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdBlock
