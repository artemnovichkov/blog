import { FaTelegram } from "react-icons/fa"
import { primaryButtonClassName } from "./button-styles"

/** Named invite link, so Telegram counts joins that came from post endings. */
const inviteUrl = "https://t.me/+4SRpJFfsMxVhM2Zi"

export default function IosDailyCta({ slug }: { slug: string }) {
  return (
    <div className="not-prose mt-8 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700/60 dark:bg-gray-800/40">
      <div className="flex items-start gap-3">
        <FaTelegram className="mt-0.5 h-5 w-5 shrink-0 text-[#2AABEE]" />
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {"Enjoyed this post?"}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {
              "Get one essential iOS development article every day in iOS Daily on Telegram."
            }
          </p>
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="ios_daily_click"
            data-analytics-prop-slug={slug}
            data-analytics-prop-surface="post_end"
            className={`mt-2 inline-block w-fit ${primaryButtonClassName}`}
          >
            {"Join iOS Daily →"}
          </a>
        </div>
      </div>
    </div>
  )
}
