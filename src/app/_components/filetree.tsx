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
    <div className="pl-4 py-1 flex items-center">
      <Icon className="w-4 h-4" />
      <span className="ml-2">{name}</span>
    </div>
  )
}

const Folder = ({ name, children }: FolderProps) => {
  return (
    <div>
      <div className="py-1 flex items-center">
        <FaRegFolderOpen className="w-4 h-4" />
        <span className="ml-2 font-medium">{name}</span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}

const FileTree = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-mono text-sm border border-gray-300 dark:border-white/50 rounded p-4 w-fit">
      {children}
    </div>
  )
}

FileTree.File = File
FileTree.Folder = Folder

export { FileTree }
