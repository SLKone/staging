import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getMarkdownData(filename, directory) {
  const fullPath = path.join(process.cwd(), directory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = remark()
    .use(html)
    .processSync(content)
  const contentHtml = processedContent.toString()

  return {
    ...data,
    contentHtml,
  }
}

export function getAllMarkdownData(directory) {
  const fullPath = path.join(process.cwd(), directory)
  const filenames = fs.readdirSync(fullPath)

  const allData = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    return getMarkdownData(filename, directory)
  })

  return allData
}