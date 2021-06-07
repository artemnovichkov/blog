import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import markdown from 'remark-parse'
import html from 'remark-html'
import highlight from 'remark-highlight.js'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.mdx$/, '')

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort(({date: a}, {date: b}) => {
        if (a < b) {
            return 1
          } else if (a > b) {
            return -1
          } else {
            return 0
          }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.mdx$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(markdown)
        .use(highlight)
        .use(html)
        .process(matterResult.content)
    const htmlContent = processedContent.toString()
    return {
      id,
      htmlContent,
      ...matterResult.data
    }
  }