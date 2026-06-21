import { projects } from "@/lib/const"

export default function Projects() {
  return (
    <div>
      <p className="mb-2 font-bold text-3xl text-zinc-800 tracking-tight dark:text-gray-100">
        Current Projects
      </p>
      <p className="mb-4 text-zinc-500 dark:text-gray-400">
        Projects I&apos;m currently working on:
      </p>
      <ul className="flex flex-col gap-3">
        {projects.map((project) => (
          <li key={project.name}>
            {project.emoji && <span>{project.emoji} </span>}
            <a
              className="text-base text-zinc-800 underline dark:text-gray-100"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.name}
            </a>
            <span className="text-zinc-800 dark:text-gray-100">
              {" — "}
              {project.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
