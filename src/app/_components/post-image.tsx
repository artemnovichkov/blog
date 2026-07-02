import fs from "node:fs"
import { join } from "node:path"
import { imageSize } from "image-size"
import Image from "next/image"

export default function PostImage({
  src,
  alt,
}: {
  src?: string
  alt?: string
}) {
  if (!src) return null

  if (!src.startsWith("/")) {
    // biome-ignore lint/performance/noImgElement: next/image requires local files or configured remotePatterns
    return <img src={src} alt={alt} loading="lazy" />
  }

  const { width, height } = imageSize(
    fs.readFileSync(join(process.cwd(), "public", src))
  )

  return (
    <Image
      className="rounded"
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 672px"
    />
  )
}
