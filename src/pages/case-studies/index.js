import Layout from '../../components/Layout'
import Link from 'next/link'
import { getAllMarkdownData } from '../../lib/markdown'

export default function CaseStudies({ caseStudies }) {
  return (
    <Layout title="Case Studies">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <Link href={`/case-studies/${caseStudy.slug}`} key={caseStudy.slug}>
              <a className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-4">{caseStudy.title}</h2>
                <p className="text-gray-600">{caseStudy.intro}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const caseStudies = getAllMarkdownData('_case-studies')
  return { props: { caseStudies } }
}