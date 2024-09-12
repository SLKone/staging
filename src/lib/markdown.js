const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const remark = require('remark')
const html = require('remark-html')

async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

function getMarkdownData(filename, directory) {
  const fullPath = path.join(process.cwd(), 'public', directory, filename)
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

function getAllMarkdownData(directory) {
  const fullPath = path.join(process.cwd(), 'public', directory)
  const filenames = fs.readdirSync(fullPath)

  const allData = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    return getMarkdownData(filename, directory)
  })

  return allData
}

module.exports = {
  markdownToHtml,
  getMarkdownData,
  getAllMarkdownData
}