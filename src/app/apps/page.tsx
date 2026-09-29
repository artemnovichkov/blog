import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { apps } from "@/lib/apps"
import { name } from "@/lib/const"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: `${name} | Apps`,
  description: "Apps and games by Artem Novichkov.",
  path: "/apps",
})

export default function AppsPage() {
  return (
    <div className="py-10 md:py-16">
      <h1 className="font-bold font-serif text-5xl text-zinc-900 tracking-tight dark:text-gray-100">
        Apps
      </h1>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <li key={app.slug}>
            <Link
              href={`/apps/${app.slug}`}
              className="flex h-full flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
            >
              <Image
                src={app.icon}
                alt=""
                width={72}
                height={72}
                className="rounded-[22%]"
              />
              <div>
                <h2 className="font-bold font-serif text-2xl text-zinc-900 dark:text-gray-100">
                  {app.name}
                </h2>
                <p className="text-zinc-600 dark:text-gray-300">
                  {app.tagline}
                </p>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed dark:text-gray-400">
                {app.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
