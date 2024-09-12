import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const markdownDirectory = path.join(process.cwd(), 'markdown')

export function getMarkdownData(filename) {
  const fullPath = path.join(markdownDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return {
    content: matterResult.content,
    ...matterResult.data
  }
}

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}