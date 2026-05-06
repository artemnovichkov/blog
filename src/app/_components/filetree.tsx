import type { ReactNode } from "react"
import { FaRegFileLines, FaRegFolderOpen, FaSwift } from "react-icons/fa6"

type FileProps = {
  name: string
  iconType?: "common" | "swift"
}

type FolderProps = {
  name: string
  children: ReactNode
}

const File = ({ name, iconType = "common" }: FileProps) => {
  const Icon = iconType === "swift" ? FaSwift : FaRegFileLines

  return (
    <div className="flex items-center py-1 pl-4">
      <Icon className="h-4 w-4" />
      <span className="ml-2">{name}</span>
    </div>
  )
}

const Folder = ({ name, children }: FolderProps) => {
  return (
    <div>
      <div className="flex items-center py-1">
        <FaRegFolderOpen className="h-4 w-4" />
        <span className="ml-2 font-medium">{name}</span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}

const FileTree = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-fit rounded border border-gray-300 p-4 font-mono text-sm dark:border-white/50">
      {children}
    </div>
  )
}

FileTree.File = File
FileTree.Folder = Folder

export { FileTree }
