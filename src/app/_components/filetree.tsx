import type { ReactNode } from "react"
import {
  FaMarkdown,
  FaRegFileLines,
  FaRegFolderOpen,
  FaSwift,
} from "react-icons/fa6"

type FileIconType = "common" | "markdown" | "swift"

type FileProps = {
  name: string
  iconType?: FileIconType
}

type FolderProps = {
  name: string
  children: ReactNode
}

const iconByType = {
  common: FaRegFileLines,
  markdown: FaMarkdown,
  swift: FaSwift,
}

const iconClassNameByType = {
  common: "h-4 w-4",
  markdown: "h-4 w-5",
  swift: "h-4 w-4 text-orange-600 dark:text-orange-400",
}

const inferredIconType = (name: string): FileIconType => {
  const extension = name.split(".").pop()?.toLowerCase()

  if (extension === "md" || extension === "mdx") return "markdown"
  if (extension === "swift") return "swift"
  return "common"
}

const File = ({ name, iconType }: FileProps) => {
  const resolvedIconType = iconType ?? inferredIconType(name)
  const Icon = iconByType[resolvedIconType]

  return (
    <div className="flex items-center gap-2 py-1 pl-4">
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center"
      >
        <Icon className={iconClassNameByType[resolvedIconType]} />
      </span>
      <span>{name}</span>
    </div>
  )
}

const Folder = ({ name, children }: FolderProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 py-1">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 shrink-0 items-center justify-center"
        >
          <FaRegFolderOpen className="h-4 w-4" />
        </span>
        <span className="font-medium">{name}</span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}

const FileTree = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-fit py-2 font-mono text-sm leading-relaxed">
      {children}
    </div>
  )
}

FileTree.File = File
FileTree.Folder = Folder

export { FileTree }
