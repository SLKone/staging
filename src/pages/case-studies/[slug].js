import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getMarkdownData } from '../../lib/markdown'
import fs from 'fs'
import path from 'path'

export default function CaseStudy({ caseStudyData }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout title={caseStudyData.title}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{caseStudyData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: caseStudyData.contentHtml }} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const caseStudiesDirectory = path.join(process.cwd(), '_case-studies')
  const filenames = fs.readdirSync(caseStudiesDirectory)

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const caseStudyData = getMarkdownData(`${params.slug}.md`, '_case-studies')
  return { props: { caseStudyData } }
}