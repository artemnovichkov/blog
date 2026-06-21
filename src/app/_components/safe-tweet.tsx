import { Suspense } from "react"
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from "react-tweet"
import type { Tweet, TweetEntities } from "react-tweet/api"
import { getTweet } from "react-tweet/api"

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

function normalizeEntities(entities?: TweetEntities | null): TweetEntities {
  if (!entities || typeof entities !== "object" || Array.isArray(entities)) {
    return { hashtags: [], user_mentions: [], urls: [], symbols: [] }
  }
  const normalized: TweetEntities = {
    hashtags: asArray(entities.hashtags),
    user_mentions: asArray(entities.user_mentions),
    urls: asArray(entities.urls),
    symbols: asArray(entities.symbols),
  }
  const media = asArray(entities.media)
  if (media.length > 0) normalized.media = media
  return normalized
}

function normalizeTweet(tweet: Tweet): Tweet {
  return {
    ...tweet,
    entities: normalizeEntities(tweet.entities),
    ...(tweet.quoted_tweet
      ? {
          quoted_tweet: {
            ...tweet.quoted_tweet,
            entities: normalizeEntities(tweet.quoted_tweet.entities),
          },
        }
      : {}),
  }
}

async function TweetContent({ id }: { id: string }) {
  let tweet: Tweet | undefined
  try {
    const raw = await getTweet(id)
    tweet = raw ? normalizeTweet(raw) : undefined
  } catch {
    // ignore fetch errors
  }

  if (!tweet) return <TweetNotFound />
  return <EmbeddedTweet tweet={tweet} />
}

export function SafeTweet({ id }: { id: string }) {
  return (
    <Suspense fallback={<TweetSkeleton />}>
      <TweetContent id={id} />
    </Suspense>
  )
}
