import React from 'react'
import { FaRegFileLines, FaSwift } from "react-icons/fa6";
import { FaRegFolderOpen } from "react-icons/fa6";

type FileProps = {
  name: string
  iconType?: 'common' | 'swift'
}

type FolderProps = {
  name: string
  children: React.ReactNode
}

const File: React.FC<FileProps> = ({ name, iconType = 'common' }) => {
  const Icon = iconType === 'swift' ? FaSwift : FaRegFileLines;
  
  return (
    <div className="pl-4 py-1 flex items-center">
      <Icon className="w-4 h-4" />
      <span className="ml-2">{name}</span>
    </div>
  )
}

const Folder: React.FC<FolderProps> = ({ name, children }) => {
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

const FileTree: React.FC<{ children: React.ReactNode }> & {
  File: typeof File
  Folder: typeof Folder
} = ({ children }) => {
  return <div className="font-mono text-sm border border-gray-300 dark:border-white/50 rounded p-4 w-fit">{children}</div>
}

FileTree.File = File
FileTree.Folder = Folder

export { FileTree } 