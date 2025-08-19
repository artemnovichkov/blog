interface AdBlockProps {
    title: string;
    description: string;
    url: string;
    isVisible?: boolean;
}

const AdBlock = ({ title, description, url, isVisible = true }: AdBlockProps) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="ad-block p-4 rounded-md bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-200/30 border my-6">
            <div className="flex items-start gap-3">
                <span className="text-xl">📢</span>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sponsored</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block w-fit px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Learn More →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdBlock;